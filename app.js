// ==================== GLOBAL STATE ====================
let currentUser = null;
let userProfile = null;
let navigationStack = [];
let currentQuiz = null;
let currentQuizData = [];

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
    setupEventListeners();
});

function initializeApp() {
    // Check authentication state
    auth.onAuthStateChanged(async (user) => {
        if (user) {
            currentUser = user;
            await loadUserProfile();
            
            // Check if profile is complete
            if (!userProfile || !userProfile.firstName || !userProfile.lastName) {
                showProfileModal();
            } else {
                showMainApp();
            }
        } else {
            showLoginScreen();
        }
    });
}

function setupEventListeners() {
    // Auth tabs
    document.querySelectorAll('.auth-tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const tab = btn.dataset.tab;
            document.querySelectorAll('.auth-tab-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            document.getElementById('loginForm').style.display = tab === 'login' ? 'block' : 'none';
            document.getElementById('registerForm').style.display = tab === 'register' ? 'block' : 'none';
        });
    });

    // Login form
    document.getElementById('loginForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        
        try {
            showLoading();
            await auth.signInWithEmailAndPassword(email, password);
            hideLoading();
            showToast('Login realizado com sucesso!', 'success');
        } catch (error) {
            hideLoading();
            showToast(getErrorMessage(error), 'error');
        }
    });

    // Register form
    document.getElementById('registerForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const firstName = document.getElementById('registerFirstName').value.trim();
        const lastName = document.getElementById('registerLastName').value.trim();
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;
        const confirmPassword = document.getElementById('registerPasswordConfirm').value;
        
        if (password !== confirmPassword) {
            showToast('As senhas não coincidem!', 'error');
            return;
        }
        
        if (password.length < 6) {
            showToast('A senha deve ter pelo menos 6 caracteres!', 'error');
            return;
        }

        if (!firstName || !lastName) {
            showToast('Nome e sobrenome são obrigatórios!', 'error');
            return;
        }
        
        try {
            showLoading();
            const userCredential = await auth.createUserWithEmailAndPassword(email, password);
            
            // Create user profile with mandatory fields
            await db.collection('users').doc(userCredential.user.uid).set({
                firstName: firstName,
                lastName: lastName,
                email: email,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                profileComplete: true,
                progress: {},
                totalPoints: 0
            });
            
            hideLoading();
            showToast('Conta criada com sucesso!', 'success');
        } catch (error) {
            hideLoading();
            showToast(getErrorMessage(error), 'error');
        }
    });

    // Profile form
    document.getElementById('profileForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const firstName = document.getElementById('profileFirstName').value.trim();
        const lastName = document.getElementById('profileLastName').value.trim();
        
        if (!firstName || !lastName) {
            showToast('Nome e sobrenome são obrigatórios!', 'error');
            return;
        }
        
        try {
            showLoading();
            await db.collection('users').doc(currentUser.uid).update({
                firstName: firstName,
                lastName: lastName,
                profileComplete: true,
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            });
            
            userProfile.firstName = firstName;
            userProfile.lastName = lastName;
            userProfile.profileComplete = true;
            
            hideLoading();
            hideProfileModal();
            showMainApp();
            showToast('Perfil atualizado com sucesso!', 'success');
        } catch (error) {
            hideLoading();
            showToast('Erro ao atualizar perfil: ' + error.message, 'error');
        }
    });

    // Forgot password
    document.getElementById('forgotPasswordLink').addEventListener('click', async (e) => {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        
        if (!email) {
            showToast('Digite seu email no campo acima', 'info');
            return;
        }
        
        try {
            await auth.sendPasswordResetEmail(email);
            showToast('Email de recuperação enviado!', 'success');
        } catch (error) {
            showToast('Erro ao enviar email: ' + error.message, 'error');
        }
    });

    // Navigation buttons
    document.querySelectorAll('.nav-button').forEach(btn => {
        btn.addEventListener('click', () => {
            const pageName = btn.dataset.page;
            document.querySelectorAll('.nav-button').forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            navigationStack = [];
            renderPage(pageName);
        });
    });

    // Back button
    document.getElementById('back-button').addEventListener('click', () => {
        if (navigationStack.length > 0) {
            const previousPageId = navigationStack.pop();
            renderPage(previousPageId, false);
        }
    });

    // Profile button
    document.getElementById('profileButton').addEventListener('click', () => {
        showProfileMenu();
    });

    // Page content click delegation
    document.getElementById('page-content').addEventListener('click', handlePageClick);
}

// ==================== USER PROFILE ====================
async function loadUserProfile() {
    try {
        const doc = await db.collection('users').doc(currentUser.uid).get();
        if (doc.exists) {
            userProfile = doc.data();
        } else {
            // Create initial profile
            userProfile = {
                email: currentUser.email,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                profileComplete: false,
                progress: {},
                totalPoints: 0
            };
            await db.collection('users').doc(currentUser.uid).set(userProfile);
        }
    } catch (error) {
        console.error('Error loading profile:', error);
    }
}

function showProfileModal() {
    const modal = document.getElementById('profileModal');
    modal.classList.add('active');
    modal.style.display = 'flex';
    
    // Pre-fill if data exists
    if (userProfile.firstName) {
        document.getElementById('profileFirstName').value = userProfile.firstName;
    }
    if (userProfile.lastName) {
        document.getElementById('profileLastName').value = userProfile.lastName;
    }
}

function hideProfileModal() {
    const modal = document.getElementById('profileModal');
    modal.classList.remove('active');
    modal.style.display = 'none';
}

function showProfileMenu() {
    const userName = userProfile.firstName && userProfile.lastName ?
        `${userProfile.firstName} ${userProfile.lastName}` :
        currentUser.email;
    
    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.innerHTML = `
        <div class="modal-content">
            <h2>Perfil</h2>
            <div class="content-section">
                <p><strong>Nome:</strong> ${userProfile.firstName || 'Não informado'}</p>
                <p><strong>Sobrenome:</strong> ${userProfile.lastName || 'Não informado'}</p>
                <p><strong>Email:</strong> ${currentUser.email}</p>
                <p><strong>Pontos:</strong> ${userProfile.totalPoints || 0}</p>
            </div>
            <button class="btn-primary" onclick="editProfile()">Editar Perfil</button>
            <button class="btn-primary" style="background: var(--cor-perigo); margin-top: 10px;" onclick="logout()">Sair</button>
            <button class="btn-primary" style="background: var(--cor-texto-claro); margin-top: 10px;" onclick="closeModal(this)">Fechar</button>
        </div>
    `;
    document.body.appendChild(modal);
}

window.editProfile = function() {
    closeModal();
    showProfileModal();
};

window.closeModal = function(btn) {
    const modal = btn ? btn.closest('.modal') : document.querySelector('.modal');
    if (modal && !modal.id) {
        modal.remove();
    }
};

window.logout = async function() {
    try {
        await auth.signOut();
        showToast('Logout realizado!', 'success');
    } catch (error) {
        showToast('Erro ao sair: ' + error.message, 'error');
    }
};

// ==================== SCREEN MANAGEMENT ====================
function showLoginScreen() {
    document.getElementById('loginScreen').style.display = 'flex';
    document.getElementById('appContainer').style.display = 'none';
    document.getElementById('loadingScreen').style.display = 'none';
}

function showMainApp() {
    document.getElementById('loginScreen').style.display = 'none';
    document.getElementById('appContainer').style.display = 'flex';
    document.getElementById('loadingScreen').style.display = 'none';
    renderPage('painel');
}

function showLoading() {
    document.getElementById('loadingScreen').style.display = 'flex';
}

function hideLoading() {
    document.getElementById('loadingScreen').style.display = 'none';
}

// ==================== PAGE DATABASE ====================
const pages = {
    // NÍVEL 1: PRINCIPAL
    painel: {
        title: "Painel Principal",
        type: 'list',
        items: [
            { id: 'comunicados', icon: 'fa-bullhorn', color: 'var(--cor-perigo)', title: 'Últimos Comunicados', subtitle: 'Avisos e notícias da diretoria' },
            { id: 'podcasts', icon: 'fa-podcast', color: '#9b59b6', title: 'Podcasts Educativos', subtitle: 'Cultura de segurança e qualidade' },
            { id: 'kpis', icon: 'fa-chart-line', color: 'var(--cor-sucesso)', title: 'Indicadores de Qualidade', subtitle: 'Acompanhe as métricas' }
        ]
    },
    qualidade: {
        title: "Qualidade e Segurança",
        type: 'list',
        items: [
            { id: 'incidentes', icon: 'fa-exclamation-triangle', color: 'var(--cor-perigo)', title: 'Gestão de Incidentes', subtitle: 'Notificar eventos adversos' },
            { id: 'auditorias', icon: 'fa-clipboard-check', color: 'var(--cor-info)', title: 'Auditorias e Conformidade', subtitle: 'Verificações de processos' },
            { id: 'relatorios', icon: 'fa-file-alt', color: 'var(--cor-texto-claro)', title: 'Relatórios de Segurança', subtitle: 'Consulte os relatórios trimestrais' },
            { id: 'capacitacao', icon: 'fa-graduation-cap', color: 'var(--cor-secundaria)', title: 'Capacitação e Treinamento', subtitle: 'Acesse os materiais de estudo' }
        ]
    },
    protocolos: {
        title: "Protocolos e Documentos",
        type: 'list',
        items: [
            { id: 'documentos', icon: 'fa-folder-open', color: 'var(--cor-primaria)', title: 'Biblioteca de Documentos', subtitle: 'Todos os POPs, políticas e protocolos' },
            { id: 'protocolos_anest', icon: 'fa-file-medical', color: '#e74c3c', title: 'Protocolos de Anestesia', subtitle: 'Protocolos específicos do serviço' },
            { id: 'segMedicamentos', icon: 'fa-pills', color: 'var(--cor-perigo)', title: 'Segurança de Medicamentos', subtitle: 'Medicações de alto risco' }
        ]
    },
    ferramentas: {
        title: "Ferramentas Clínicas",
        type: 'list',
        items: [
            { id: 'calculadoras', icon: 'fa-calculator', color: '#6f42c1', title: 'Calculadoras Anestésicas', subtitle: 'Calculadoras clínicas completas' },
            { id: 'checklist', icon: 'fa-check-double', color: 'var(--cor-sucesso)', title: 'Checklist de Cirurgia Segura', subtitle: 'Ferramenta interativa da OMS' },
            { id: 'avaliacaoRiscos', icon: 'fa-user-shield', color: 'var(--cor-secundaria)', title: 'Avaliação de Riscos', subtitle: 'Escalas de risco' }
        ]
    },
    rops: {
        title: "ROPs - Desafio",
        type: 'custom',
        render: renderROPsMainPage
    },
    residencia: {
        title: "Residência Médica",
        type: 'list',
        items: [
            { id: 'residencia_sheets', icon: 'fa-calendar-alt', color: 'var(--cor-info)', title: 'Escalas e Cronogramas', subtitle: 'Plantões, estágios e férias' },
            { id: 'materialEstudo', icon: 'fa-book-open', color: 'var(--cor-primaria)', title: 'Material de Estudo', subtitle: 'Artigos e diretrizes' }
        ]
    },

    // NÍVEL 2: SUBPÁGINAS
    podcasts: {
        title: "Podcasts Educativos",
        type: 'custom',
        render: renderPodcastsPage
    },
    documentos: {
        title: "Biblioteca de Documentos",
        type: 'custom',
        render: renderDocumentosPage
    },
    calculadoras: {
        title: "Calculadoras Anestésicas",
        type: 'list',
        items: [
            { id: 'calc_qmentum', icon: 'fa-certificate', color: '#e74c3c', title: 'Calculadoras Qmentum', subtitle: 'Escalas para acreditação' },
            { id: 'calc_anestesiologia', icon: 'fa-kit-medical', color: '#003B73', title: 'Anestesiologia Geral', subtitle: 'Calculadoras gerais' }
        ]
    },
    calc_qmentum: {
        title: "Calculadoras Qmentum",
        type: 'custom',
        render: () => renderCalculatorList('qmentum')
    },
    calc_anestesiologia: {
        title: "Anestesiologia Geral",
        type: 'custom',
        render: () => renderCalculatorList('anestesiologia')
    },
    checklist: {
        title: "Cirurgia Segura (OMS)",
        type: 'custom',
        render: renderChecklistPage
    },
    residencia_sheets: {
        title: "Escalas e Cronogramas",
        type: 'custom',
        render: renderResidenciaSheets
    }
};

// Add calculator pages dynamically
calculatorDefinitions.forEach(calc => {
    pages[calc.id] = {
        title: calc.title,
        type: 'calculator',
        calcData: calc
    };
});

// ==================== PAGE RENDERING ====================
function renderPage(pageId, addToStack = true) {
    const pageData = pages[pageId];
    const pageContent = document.getElementById('page-content');
    const headerTitle = document.getElementById('header-title');
    const backButton = document.getElementById('back-button');
    
    // Add current page to stack before navigating
    if (addToStack && navigationStack.length === 0) {
        const currentActive = document.querySelector('.nav-button.active');
        if (currentActive && currentActive.dataset.page !== pageId) {
            navigationStack.push(currentActive.dataset.page);
        }
    } else if (addToStack) {
        const lastPage = navigationStack[navigationStack.length - 1];
        if (lastPage !== pageId) {
            navigationStack.push(lastPage);
        }
    }
    
    pageContent.style.opacity = 0;
    setTimeout(() => {
        if (!pageData) {
            pageContent.innerHTML = `<h1 class="page-title">Página em Construção</h1>`;
            headerTitle.textContent = "Erro";
        } else {
            headerTitle.textContent = pageData.title;
            let contentHTML = '';
            
            if (pageData.type === 'list') {
                contentHTML = renderListPage(pageData);
            } else if (pageData.type === 'custom') {
                contentHTML = pageData.render();
            } else if (pageData.type === 'calculator') {
                contentHTML = renderCalculatorPage(pageData.calcData);
            } else {
                contentHTML = `<h1 class="page-title">Página em Construção</h1>`;
            }
            
            pageContent.innerHTML = contentHTML;
        }
        
        pageContent.scrollTop = 0;
        backButton.style.display = navigationStack.length > 0 ? 'block' : 'none';
        pageContent.style.opacity = 1;
    }, 100);
}

function renderListPage(pageData) {
    let itemsHTML = pageData.items.map(item => {
        const subtitleHTML = item.subtitle ? `<div class="subtitle">${item.subtitle}</div>` : '';
        return `<li class="list-item" data-target-page="${item.id}">
                    <span class="icon" style="background-color: ${item.color};"><i class="fas ${item.icon}"></i></span>
                    <div class="text-content">
                        <div class="title">${item.title}</div>${subtitleHTML}
                    </div><i class="chevron fas fa-chevron-right"></i>
                </li>`;
    }).join('');
    return `<h1 class="page-title">${pageData.title}</h1><ul class="list-section">${itemsHTML}</ul>`;
}

// ==================== PAGE CLICK HANDLER ====================
function handlePageClick(e) {
    const target = e.target;
    const listItem = target.closest('.list-item');
    const quizOption = target.closest('.quiz-option');
    const calcForm = target.closest('#calc-form');
    
    if (listItem) {
        const targetPage = listItem.dataset.targetPage;
        if (pages[targetPage]) {
            navigateTo(targetPage);
        } else {
            showToast('Funcionalidade em desenvolvimento', 'info');
        }
    }
    
    if (quizOption && !quizOption.classList.contains('answered')) {
        handleQuizAnswer(quizOption);
    }
    
    if (target.classList.contains('submit-button') && calcForm) {
        e.preventDefault();
        handleCalculation(calcForm.dataset.calcId);
    }
    
    // ROPs specific handlers
    if (target.closest('.rop-macro')) {
        handleRopMacroClick(e);
    }
    if (target.closest('.rop-item')) {
        handleRopItemClick(e);
    }
    if (target.id === 'nextQuestion') {
        loadNextQuestion();
    }
}

function navigateTo(pageId) {
    renderPage(pageId, true);
}

// ==================== CALCULATOR RENDERING ====================
function renderCalculatorList(category) {
    const calcs = calculatorDefinitions.filter(c => c.category === category);
    const itemsHTML = calcs.map(calc => {
        const color = category === 'qmentum' ? '#e74c3c' : '#003B73';
        return `<li class="list-item" data-target-page="${calc.id}">
                    <span class="icon" style="background-color: ${color};"><i class="fas fa-calculator"></i></span>
                    <div class="text-content">
                        <div class="title">${calc.title}</div>
                    </div><i class="chevron fas fa-chevron-right"></i>
                </li>`;
    }).join('');
    return `<h1 class="page-title">${category === 'qmentum' ? 'Calculadoras Qmentum' : 'Anestesiologia Geral'}</h1>
            <ul class="list-section">${itemsHTML}</ul>`;
}

function renderCalculatorPage(calcDef) {
    let formHTML = `<h1 class="page-title">${calcDef.title}</h1>
                    <div class="content-section">
                    <form id="calc-form" data-calc-id="${calcDef.id}">`;
    
    calcDef.inputs.forEach(input => {
        const inputId = `calc_${input.id}`;
        switch (input.type) {
            case 'bool':
                formHTML += `<div class="form-group-bool">
                                <input type="checkbox" id="${inputId}" name="${input.id}">
                                <label for="${inputId}">${input.label}</label>
                             </div>`;
                break;
            case 'number':
                formHTML += `<div class="form-group">
                                <label for="${inputId}">${input.label}</label>
                                <input type="number" id="${inputId}" name="${input.id}" placeholder="0" 
                                    ${input.min !== undefined ? `min="${input.min}"` : ''} 
                                    ${input.max !== undefined ? `max="${input.max}"` : ''}>
                             </div>`;
                break;
            case 'select':
                const options = input.options.map(opt => {
                    const value = opt.value !== undefined ? opt.value : opt.label;
                    const label = opt.label || opt.value;
                    return `<option value="${value}">${label}</option>`;
                }).join('');
                formHTML += `<div class="form-group">
                                <label for="${inputId}">${input.label}</label>
                                <select id="${inputId}" name="${input.id}">
                                    ${options}
                                </select>
                             </div>`;
                break;
        }
    });

    formHTML += `<button type="submit" class="submit-button">Calcular</button>
                 </form>
                 <div id="calc-results" style="display:none;"></div>
                 </div>`;
    return formHTML;
}

function handleCalculation(calcId) {
    const calcDef = calculatorDefinitions.find(c => c.id === calcId);
    if (!calcDef) return;

    const inputs = {};
    
    calcDef.inputs.forEach(input => {
        const el = document.getElementById(`calc_${input.id}`);
        if (!el) return;
        
        if (input.type === 'bool') {
            inputs[input.id] = el.checked;
        } else if (input.type === 'number') {
            let value = parseFloat(el.value);
            if (isNaN(value)) value = 0;
            if (input.min !== undefined && value < input.min) value = input.min;
            if (input.max !== undefined && value > input.max) value = input.max;
            inputs[input.id] = value;
        } else {
            inputs[input.id] = el.value;
        }
    });

    try {
        const result = calcDef.compute(inputs);
        
        const resultDiv = document.getElementById('calc-results');
        let resultHTML = '<h4>Resultado:</h4>';
        for (const key in result) {
            const formattedKey = key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' ');
            resultHTML += `<p><strong>${formattedKey}:</strong> ${result[key]}</p>`;
        }
        
        resultDiv.innerHTML = resultHTML;
        resultDiv.style.display = 'block';

    } catch (error) {
        console.error("Erro ao calcular:", error);
        const resultDiv = document.getElementById('calc-results');
        resultDiv.innerHTML = '<h4>Erro ao calcular.</h4><p>Verifique os valores inseridos.</p>';
        resultDiv.style.display = 'block';
    }
}

// ==================== UTILITY FUNCTIONS ====================
function showToast(message, type = 'info') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = `toast ${type} show`;
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

function getErrorMessage(error) {
    const errorMessages = {
        'auth/email-already-in-use': 'Este email já está em uso',
        'auth/invalid-email': 'Email inválido',
        'auth/weak-password': 'Senha muito fraca',
        'auth/user-not-found': 'Usuário não encontrado',
        'auth/wrong-password': 'Senha incorreta'
    };
    return errorMessages[error.code] || error.message;
}

// ==================== ROPS RENDERING ====================
function renderROPsMainPage() {
    if (!ropsData) {
        return `<div class="content-section">
                    <h3>Erro ao Carregar ROPs</h3>
                    <p>Os dados das ROPs não foram carregados. Recarregue a página.</p>
                </div>`;
    }

    let html = `<h1 class="page-title">ROPs - Desafio</h1>`;
    
    Object.keys(ropsData).forEach(macroKey => {
        const macro = ropsData[macroKey];
        const macroTitle = macroKey.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
        
        html += `<div class="content-section">
                    <h3 style="cursor: pointer;" class="rop-macro" data-macro="${macroKey}">
                        <i class="fas fa-folder"></i> ${macroTitle}
                    </h3>
                    <div class="rop-list" id="rop-list-${macroKey}" style="display: none;">`;
        
        Object.keys(macro).forEach(ropKey => {
            const rop = macro[ropKey];
            const ropTitle = ropKey.replace(/_/g, ' ').toUpperCase();
            const questionCount = rop.questions ? rop.questions.length : 0;
            
            html += `<div class="list-item rop-item" data-macro="${macroKey}" data-rop="${ropKey}">
                        <span class="icon" style="background-color: var(--cor-primaria);">
                            <i class="fas fa-question-circle"></i>
                        </span>
                        <div class="text-content">
                            <div class="title">${ropTitle}</div>
                            <div class="subtitle">${questionCount} questões</div>
                        </div>
                        <i class="chevron fas fa-chevron-right"></i>
                    </div>`;
        });
        
        html += `</div></div>`;
    });
    
    return html;
}

function handleRopMacroClick(e) {
    const macroEl = e.target.closest('.rop-macro');
    if (!macroEl) return;
    
    const macroKey = macroEl.dataset.macro;
    const listEl = document.getElementById(`rop-list-${macroKey}`);
    
    if (listEl) {
        const isVisible = listEl.style.display !== 'none';
        listEl.style.display = isVisible ? 'none' : 'block';
    }
}

function handleRopItemClick(e) {
    const ropEl = e.target.closest('.rop-item');
    if (!ropEl) return;
    
    const macroKey = ropEl.dataset.macro;
    const ropKey = ropEl.dataset.rop;
    
    startQuiz(macroKey, ropKey);
}

function startQuiz(macroKey, ropKey) {
    const rop = ropsData[macroKey][ropKey];
    if (!rop || !rop.questions || rop.questions.length === 0) {
        showToast('Nenhuma questão disponível para esta ROP', 'error');
        return;
    }
    
    currentQuizData = [...rop.questions];
    currentQuiz = {
        macroKey,
        ropKey,
        currentIndex: 0,
        score: 0,
        answers: []
    };
    
    renderQuizPage();
}

function renderQuizPage() {
    const question = currentQuizData[currentQuiz.currentIndex];
    const progress = currentQuiz.currentIndex + 1;
    const total = currentQuizData.length;
    
    const pageContent = document.getElementById('page-content');
    const headerTitle = document.getElementById('header-title');
    
    headerTitle.textContent = `Questão ${progress}/${total}`;
    
    let html = `
        <div class="quiz-container">
            <div class="quiz-progress" style="background: var(--cor-fundo); height: 8px; border-radius: 4px; margin-bottom: 20px;">
                <div style="background: var(--cor-primaria); height: 100%; width: ${(progress/total)*100}%; border-radius: 4px;"></div>
            </div>
            <div class="quiz-question">${progress}. ${question.question}</div>
            <div class="quiz-options">`;
    
    question.options.forEach((option, index) => {
        html += `<div class="quiz-option" data-option="${index}">
                    <strong>${String.fromCharCode(65 + index)})</strong> ${option}
                 </div>`;
    });
    
    html += `</div></div>`;
    
    if (currentQuiz.currentIndex < currentQuizData.length - 1) {
        html += `<button id="nextQuestion" class="submit-button" style="display: none; margin-top: 20px;">Próxima Questão</button>`;
    } else {
        html += `<button id="nextQuestion" class="submit-button" style="display: none; margin-top: 20px;">Ver Resultado</button>`;
    }
    
    pageContent.innerHTML = html;
}

function handleQuizAnswer(optionEl) {
    const selectedIndex = parseInt(optionEl.dataset.option);
    const question = currentQuizData[currentQuiz.currentIndex];
    const isCorrect = selectedIndex === question.correctAnswer;
    
    // Mark all options as answered
    document.querySelectorAll('.quiz-option').forEach(opt => {
        opt.classList.add('answered');
        const idx = parseInt(opt.dataset.option);
        if (idx === question.correctAnswer) {
            opt.classList.add('correct');
        } else if (idx === selectedIndex && !isCorrect) {
            opt.classList.add('incorrect');
        }
    });
    
    if (isCorrect) {
        currentQuiz.score++;
    }
    
    currentQuiz.answers.push({
        questionIndex: currentQuiz.currentIndex,
        selected: selectedIndex,
        correct: question.correctAnswer,
        isCorrect
    });
    
    // Show explanation if available
    if (question.explanation) {
        const container = document.querySelector('.quiz-container');
        const explanationDiv = document.createElement('div');
        explanationDiv.className = 'content-section';
        explanationDiv.style.marginTop = '20px';
        explanationDiv.innerHTML = `<h4>Explicação:</h4><p>${question.explanation}</p>`;
        container.appendChild(explanationDiv);
    }
    
    document.getElementById('nextQuestion').style.display = 'block';
}

function loadNextQuestion() {
    currentQuiz.currentIndex++;
    
    if (currentQuiz.currentIndex < currentQuizData.length) {
        renderQuizPage();
    } else {
        showQuizResults();
    }
}

async function showQuizResults() {
    const percentage = Math.round((currentQuiz.score / currentQuizData.length) * 100);
    const passed = percentage >= 70;
    
    // Update user progress
    try {
        await db.collection('users').doc(currentUser.uid).update({
            [`progress.${currentQuiz.macroKey}.${currentQuiz.ropKey}`]: {
                score: currentQuiz.score,
                total: currentQuizData.length,
                percentage,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            },
            totalPoints: firebase.firestore.FieldValue.increment(currentQuiz.score)
        });
    } catch (error) {
        console.error('Error saving progress:', error);
    }
    
    const pageContent = document.getElementById('page-content');
    const headerTitle = document.getElementById('header-title');
    
    headerTitle.textContent = 'Resultado';
    
    let html = `
        <div class="quiz-container">
            <h2 style="text-align: center; color: ${passed ? 'var(--cor-sucesso)' : 'var(--cor-perigo)'};">
                ${passed ? '🎉 Parabéns!' : '📚 Continue Estudando'}
            </h2>
            <div class="content-section" style="text-align: center;">
                <h1 style="font-size: 3rem; color: var(--cor-primaria); margin: 20px 0;">
                    ${percentage}%
                </h1>
                <p style="font-size: 1.2rem;">
                    <strong>${currentQuiz.score}</strong> de <strong>${currentQuizData.length}</strong> corretas
                </p>
                <p style="color: var(--cor-texto-claro); margin-top: 20px;">
                    ${passed ? 
                        'Você demonstrou bom conhecimento sobre este tema!' : 
                        'Continue estudando para melhorar sua pontuação.'}
                </p>
            </div>
            <button class="submit-button" onclick="window.location.reload();">Voltar ao Início</button>
        </div>`;
    
    pageContent.innerHTML = html;
}

// ==================== DOCUMENTOS RENDERING ====================
function renderDocumentosPage() {
    const documentos = {
        "Protocolos": [
            { name: "Avaliação Pré-Anestésica", file: "Documentos/1 - Protocolos/PRO.ANEST.0001-00 avaliação pré anestesica.pdf" },
            { name: "Manejo da Cefaleia Pós-Punção", file: "Documentos/1 - Protocolos/PRO.ANEST.0002-00 Manejo da cefaleira pós punção dural.pdf" },
            { name: "Manutenção da Normotermia", file: "Documentos/1 - Protocolos/PRO.CCG.0011-01 Manutenção da normotermia.pdf" },
            { name: "Profilaxia de Dor Aguda Pós-Op", file: "Documentos/1 - Protocolos/PRO.CCG.0018-00 Profilaxia tratamento e resgate de dor aguda pós operatoria na SRPA..pdf" },
            { name: "Prevenção de Intoxicação por AL", file: "Documentos/1 - Protocolos/PRO.CCG.0020-00 Prevenção e manejo de intoxicação por anestésicos locais.pdf" },
            { name: "Prevenção da Broncoaspiração", file: "Documentos/1 - Protocolos/PRO.INSH.0007-16 Protocolo de prevenção da broncoaspiração..pdf" },
            { name: "Prevenção de Deterioração Clínica (MEWS)", file: "Documentos/1 - Protocolos/PRO.INSH.0008-12 Prevenção de Deterioração Clínica no Adulto - MEWS.pdf" },
            { name: "Prevenção de Alergia ao Látex", file: "Documentos/1 - Protocolos/PRO.INSH.0009-04 Prevenção de Alergia ao látex(AG. Anest 15.02.24).pdf" },
            { name: "Prevenção de TEV", file: "Documentos/1 - Protocolos/PRO.INSH.0053-05 Prevenção de TEV (AG. ANALICE 22.04) (2).docx.pdf" },
            { name: "Gestão de Medicamentos de Alta Vigilância", file: "Documentos/1 - Protocolos/PRO.INSH.0080-13 Gestão de Medicamentos de Alta Vigilância (AG. Iara 30.04.24).docx.pdf" },
            { name: "Manejo da Glicemia", file: "Documentos/1 - Protocolos/PRO.INSH.0094_00 Manejo glicemia.pdf" },
            { name: "Abreviação de Jejum Prolongado", file: "Documentos/1 - Protocolos/PRO.NUT.0002-19 Abreviação de jejum prolongado(AG. Anest 15.02.24).pdf" },
            { name: "Recuperação Pós-Anestésica", file: "Documentos/1 - Protocolos/PRO.RPA.0003-00 Recuperação pós anestésica.pdf" },
            { name: "Prevenção de NVPO", file: "Documentos/1 - Protocolos/PRO.RPA.0004-00 Prevenção de náusea e vômito no pós-operatório.pdf" },
            { name: "Antibioticoprofilaxia Cirúrgica", file: "Documentos/1 - Protocolos/PRO.SCI.0007-14 Antibioticoprofilaxia cirúrgica.pdf" },
            { name: "Identificação do Cliente", file: "Documentos/1 - Protocolos/PT 02 Identificação do cliente.pdf" },
            { name: "Higiene de Mãos", file: "Documentos/1 - Protocolos/PT 03 Higiene de Mãos.pdf" }
        ],
        "Políticas": [
            { name: "Política de Gestão da Qualidade", file: "Documentos/2 - Politicas/PLI.ANEST.0001-00 Politica de gestão da qualidade.pdf" }
        ],
        "Relatórios de Segurança": [
            { name: "Relatório 3º Trimestre 2024", file: "Documentos/4 - Relatórios de Segurança/RELATÓRIO DE SEGURANÇA 3° TRIMESTRE 2024.pdf" },
            { name: "Segurança do Paciente - Serviço de Anestesia", file: "Documentos/4 - Relatórios de Segurança/Seguranca-do-Paciente-Servico-de-Anestesia-ANEST-Chapeco.pdf" }
        ],
        "Manuais": [
            { name: "Manual de Gestão Documental", file: "Documentos/4 - Manuais/MAN.NQS.0001.00 Manual de gestão documental^.pdf" }
        ]
    };
    
    let html = `<h1 class="page-title">Biblioteca de Documentos</h1>`;
    
    Object.keys(documentos).forEach(category => {
        html += `<div class="content-section">
                    <h3><i class="fas fa-folder-open"></i> ${category}</h3>`;
        
        documentos[category].forEach(doc => {
            html += `<div class="list-item" onclick="openDocument('${doc.file}')">
                        <span class="icon" style="background-color: var(--cor-perigo);">
                            <i class="fas fa-file-pdf"></i>
                        </span>
                        <div class="text-content">
                            <div class="title">${doc.name}</div>
                        </div>
                        <i class="chevron fas fa-external-link-alt"></i>
                    </div>`;
        });
        
        html += `</div>`;
    });
    
    return html;
}

window.openDocument = function(filePath) {
    // Open in new window/tab
    window.open(filePath, '_blank');
};

// ==================== PODCASTS RENDERING ====================
function renderPodcastsPage() {
    const podcastsByCategory = {
        "Cultura de Segurança": [
            { title: "ROP 1.1 – Responsabilização pela Qualidade", file: "Podcasts/Cultura de Segurança/ROP 1.1 Cultura de Segurança – Responsabilização pela Qualidade.m4a" },
            { title: "ROP 1.2 – Gestão de Incidentes", file: "Podcasts/Cultura de Segurança/ROP 1.2 Cultura de Segurança – Gestão de Incidentes sobre a Segurança dos Pacientes.m4a" },
            { title: "ROP 1.3 – Relatórios Trimestrais", file: "Podcasts/Cultura de Segurança/ROP 1.3 Cultura de Segurança – Relatórios Trimestrais sobre a Segurança dos Pacientes.m4a" },
            { title: "ROP 1.4 – Divulgação de Incidentes", file: "Podcasts/Cultura de Segurança/ROP 1.4 Cultura de Segurança – Divulgação de Incidentes (Disclosure).m4a" }
        ],
        "Comunicação": [
            { title: "ROP 2.1 – Identificação do Cliente", file: "Podcasts/Comunicação/2.1 Comunicação - Idenficação cliente.m4a" },
            { title: "ROP 2.2 – Abreviações Perigosas", file: "Podcasts/Comunicação/2.2 Comunicação - Abreviações perigosas.m4a" },
            { title: "ROP 2.3 – Conciliação Medicamentosa Estratégica", file: "Podcasts/Comunicação/2.3 Comunicação - Conciliação medicamentosa Estratégica.m4a" },
            { title: "ROP 2.4 – Conciliação Medicamentosa (Internação)", file: "Podcasts/Comunicação/2.4 Comunicação - Conciliação medicamentosa Internado.m4a" },
            { title: "ROP 2.5 – Conciliação Medicamentosa (Ambulatorial)", file: "Podcasts/Comunicação/2.5 Comunicação - Conciliação medicamentosa ambulatorial.m4a" },
            { title: "ROP 2.6 – Conciliação Medicamentosa (Emergência)", file: "Podcasts/Comunicação/2.6 Comunicação - Conciliação medicamentosa Emergencia.m4a" },
            { title: "ROP 2.7 – Cirurgia Segura", file: "Podcasts/Comunicação/2.7 Comunicação - Cirurgia segura.m4a" },
            { title: "ROP 2.8 – Transição de Cuidado", file: "Podcasts/Comunicação/2.8 Comunicação - Transição Cuidado.m4a" }
        ],
        "Uso de Medicamentos": [
            { title: "ROP 3.1 – Uso de Medicamentos", file: "Podcasts/Uso de Medicamentos/3.1 Uso de Medicamentos.m4a" }
        ],
        "Vida Profissional": [
            { title: "ROP 4.1 – Vida Profissional", file: "Podcasts/Vida Profissional/4.1 Vida Profissional.m4a" }
        ],
        "Prevenção de Infecções": [
            { title: "ROP 5.1 – Prevenção de Infecções", file: "Podcasts/Prevenção de infecções/5.1 Prevenção de infecções.m4a" }
        ],
        "Avaliação de Riscos": [
            { title: "ROP 6.1 – Avaliação de Riscos", file: "Podcasts/Avaliação de Riscos/6.1 Avaliação de Riscos.m4a" }
        ]
    };
    
    let html = `<h1 class="page-title">Podcasts Educativos</h1>
                <p style="padding: 0 5px 15px; color: var(--cor-texto-claro); font-size: 0.9rem;">
                    16 podcasts sobre as ROPs Qmentum
                </p>`;
    
    Object.keys(podcastsByCategory).forEach(category => {
        const podcasts = podcastsByCategory[category];
        const categoryColor = {
            "Cultura de Segurança": "#9b59b6",
            "Comunicação": "#3498db",
            "Uso de Medicamentos": "#e74c3c",
            "Vida Profissional": "#f39c12",
            "Prevenção de Infecções": "#1abc9c",
            "Avaliação de Riscos": "#e67e22"
        }[category] || "#9b59b6";
        
        html += `<div class="content-section">
                    <h3><i class="fas fa-podcast"></i> ${category}</h3>`;
        
        podcasts.forEach(podcast => {
            html += `<div class="list-item" onclick="playPodcast('${podcast.file}', '${podcast.title}')">
                        <span class="icon" style="background-color: ${categoryColor};">
                            <i class="fas fa-play-circle"></i>
                        </span>
                        <div class="text-content">
                            <div class="title">${podcast.title}</div>
                        </div>
                    </div>`;
        });
        
        html += `</div>`;
    });
    
    return html;
}

window.playPodcast = function(filePath, title) {
    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.innerHTML = `
        <div class="modal-content">
            <h2><i class="fas fa-podcast"></i> ${title}</h2>
            <audio controls style="width: 100%; margin: 20px 0;">
                <source src="${filePath}" type="audio/mp4">
                Seu navegador não suporta o elemento de áudio.
            </audio>
            <button class="btn-primary" onclick="this.closest('.modal').remove()">Fechar</button>
        </div>
    `;
    document.body.appendChild(modal);
};

// ==================== CHECKLIST RENDERING ====================
function renderChecklistPage() {
    return `<h1 class="page-title">Checklist de Cirurgia Segura</h1>
        <div class="content-section">
            <h3><i class="fas fa-sign-in-alt"></i> Sign In (Antes da Anestesia)</h3>
            <div style="display: flex; align-items: center; margin-bottom: 12px; font-size: 0.9rem;">
                <input type="checkbox" style="width: 20px; height: 20px; margin-right: 12px; accent-color: var(--cor-secundaria);">
                <label>Identidade, Sítio, Procedimento confirmados</label>
            </div>
            <div style="display: flex; align-items: center; margin-bottom: 12px; font-size: 0.9rem;">
                <input type="checkbox" style="width: 20px; height: 20px; margin-right: 12px; accent-color: var(--cor-secundaria);">
                <label>Consentimento Informado assinado</label>
            </div>
            <div style="display: flex; align-items: center; margin-bottom: 12px; font-size: 0.9rem;">
                <input type="checkbox" style="width: 20px; height: 20px; margin-right: 12px; accent-color: var(--cor-secundaria);">
                <label>Checagem de Equipamentos de Anestesia</label>
            </div>
            <div style="display: flex; align-items: center; margin-bottom: 12px; font-size: 0.9rem;">
                <input type="checkbox" style="width: 20px; height: 20px; margin-right: 12px; accent-color: var(--cor-secundaria);">
                <label>Alergias Conhecidas verificadas</label>
            </div>
            <div style="display: flex; align-items: center; margin-bottom: 12px; font-size: 0.9rem;">
                <input type="checkbox" style="width: 20px; height: 20px; margin-right: 12px; accent-color: var(--cor-secundaria);">
                <label>Via aérea difícil avaliada</label>
            </div>
        </div>
        <div class="content-section">
            <h3><i class="fas fa-pause-circle"></i> Time Out (Antes da Incisão)</h3>
            <div style="display: flex; align-items: center; margin-bottom: 12px; font-size: 0.9rem;">
                <input type="checkbox" style="width: 20px; height: 20px; margin-right: 12px; accent-color: var(--cor-secundaria);">
                <label>Apresentação da Equipe</label>
            </div>
            <div style="display: flex; align-items: center; margin-bottom: 12px; font-size: 0.9rem;">
                <input type="checkbox" style="width: 20px; height: 20px; margin-right: 12px; accent-color: var(--cor-secundaria);">
                <label>Confirmação Cirúrgica (paciente, procedimento, sítio)</label>
            </div>
            <div style="display: flex; align-items: center; margin-bottom: 12px; font-size: 0.9rem;">
                <input type="checkbox" style="width: 20px; height: 20px; margin-right: 12px; accent-color: var(--cor-secundaria);">
                <label>Profilaxia Antimicrobiana realizada</label>
            </div>
            <div style="display: flex; align-items: center; margin-bottom: 12px; font-size: 0.9rem;">
                <input type="checkbox" style="width: 20px; height: 20px; margin-right: 12px; accent-color: var(--cor-secundaria);">
                <label>Eventos Críticos Antecipados revisados</label>
            </div>
        </div>
        <div class="content-section">
            <h3><i class="fas fa-sign-out-alt"></i> Sign Out (Antes da Saída)</h3>
            <div style="display: flex; align-items: center; margin-bottom: 12px; font-size: 0.9rem;">
                <input type="checkbox" style="width: 20px; height: 20px; margin-right: 12px; accent-color: var(--cor-secundaria);">
                <label>Contagem de Instrumentos correta</label>
            </div>
            <div style="display: flex; align-items: center; margin-bottom: 12px; font-size: 0.9rem;">
                <input type="checkbox" style="width: 20px; height: 20px; margin-right: 12px; accent-color: var(--cor-secundaria);">
                <label>Identificação de Amostras realizada</label>
            </div>
            <div style="display: flex; align-items: center; margin-bottom: 12px; font-size: 0.9rem;">
                <input type="checkbox" style="width: 20px; height: 20px; margin-right: 12px; accent-color: var(--cor-secundaria);">
                <label>Plano de Cuidados Pós-Operatórios definido</label>
            </div>
            <div style="display: flex; align-items: center; margin-bottom: 12px; font-size: 0.9rem;">
                <input type="checkbox" style="width: 20px; height: 20px; margin-right: 12px; accent-color: var(--cor-secundaria);">
                <label>Preocupações da Equipe sobre Recuperação discutidas</label>
            </div>
        </div>`;
}

// ==================== RESIDÊNCIA RENDERING ====================
function renderResidenciaSheets() {
    const sheetsUrl = "https://docs.google.com/spreadsheets/d/1RvxlGeQN6xZN6vPp9zhkWHbEbFiK6o3EGJm5eh9iR6s/edit?gid=833599381#gid=833599381";
    
    return `<h1 class="page-title">Escalas e Cronogramas</h1>
            <div class="content-section">
                <h3><i class="fas fa-calendar-alt"></i> Acesse a Planilha</h3>
                <p style="margin-bottom: 20px;">
                    Consulte as escalas de plantões, estágios e férias na planilha do Google Sheets.
                </p>
                <button class="btn-primary" onclick="window.open('${sheetsUrl}', '_blank')">
                    <i class="fas fa-external-link-alt"></i> Abrir Planilha
                </button>
            </div>
            <div class="content-section">
                <h3><i class="fas fa-info-circle"></i> Informações</h3>
                <p style="font-size: 0.9rem; color: var(--cor-texto-claro);">
                    A planilha contém informações sobre:
                </p>
                <ul style="margin-left: 20px; color: var(--cor-texto-claro); font-size: 0.9rem;">
                    <li>Escalas de plantões</li>
                    <li>Cronograma de estágios</li>
                    <li>Calendário de férias</li>
                    <li>Atividades programadas</li>
                </ul>
            </div>`;
}

console.log('✅ Aplicativo inicializado!');

