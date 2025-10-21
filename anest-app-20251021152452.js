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
        showUserMenu();
    });

    // User menu buttons
    document.getElementById('closeUserMenu').addEventListener('click', () => {
        closeUserMenu();
    });
    
    document.getElementById('logoutButton').addEventListener('click', async () => {
        try {
            await auth.signOut();
            showToast('Logout realizado com sucesso', 'success');
        } catch (error) {
            showToast('Erro ao fazer logout', 'error');
        }
    });
    
    // Dark mode toggle
    document.getElementById('themeToggle').addEventListener('click', () => {
        toggleDarkMode();
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
            
            // Apply dark mode preference
            if (userProfile.darkMode) {
                document.body.classList.add('dark-mode');
                updateThemeToggleUI(true);
            }
        } else {
            // Create initial profile
            userProfile = {
                email: currentUser.email,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                profileComplete: false,
                progress: {},
                totalPoints: 0,
                darkMode: false,
                role: 'user' // user, admin
            };
            await db.collection('users').doc(currentUser.uid).set(userProfile);
        }
        
        // Show admin button if user is admin
        updateAdminButtonVisibility();
    } catch (error) {
        console.error('Error loading profile:', error);
    }
}

function isAdmin() {
    return userProfile?.role === 'admin';
}

function updateAdminButtonVisibility() {
    // This will be called after profile loads
    if (isAdmin()) {
        const adminBtn = document.getElementById('adminButton');
        if (adminBtn) {
            adminBtn.style.display = 'block';
        }
    }
}

function showAdminPanel() {
    if (!isAdmin()) {
        showToast('Acesso negado: Você não tem permissão de administrador', 'error');
        return;
    }
    navigateTo('admin_panel');
}

// Make function available globally
window.showAdminPanel = showAdminPanel;

function showUserMenu() {
    const modal = document.getElementById('userMenuModal');
    const userFullName = document.getElementById('userFullName');
    const userEmail = document.getElementById('userEmail');
    
    // Update user info
    if (userProfile) {
        userFullName.textContent = `${userProfile.firstName || ''} ${userProfile.lastName || ''}`.trim() || 'Usuário';
        userEmail.textContent = currentUser?.email || '';
    }
    
    // Update theme toggle state
    updateThemeToggleUI(document.body.classList.contains('dark-mode'));
    
    modal.style.display = 'flex';
}

function closeUserMenu() {
    const modal = document.getElementById('userMenuModal');
    modal.style.display = 'none';
}

async function toggleDarkMode() {
    const isDarkMode = document.body.classList.toggle('dark-mode');
    
    // Update UI
    updateThemeToggleUI(isDarkMode);
    
    // Save preference to Firestore
    try {
        if (currentUser) {
            await db.collection('users').doc(currentUser.uid).update({
                darkMode: isDarkMode
            });
            userProfile.darkMode = isDarkMode;
            showToast(`Modo ${isDarkMode ? 'escuro' : 'claro'} ativado`, 'success');
        }
    } catch (error) {
        console.error('Error saving theme preference:', error);
        showToast('Erro ao salvar preferência de tema', 'error');
    }
}

function updateThemeToggleUI(isDarkMode) {
    const themeSwitch = document.getElementById('themeSwitch');
    const themeLabel = document.querySelector('.theme-toggle-label i');
    const themeLabelText = document.querySelector('.theme-toggle-label span');
    
    if (isDarkMode) {
        themeSwitch.classList.add('active');
        themeLabel.className = 'fas fa-sun';
        themeLabelText.textContent = 'Modo Claro';
    } else {
        themeSwitch.classList.remove('active');
        themeLabel.className = 'fas fa-moon';
        themeLabelText.textContent = 'Modo Escuro';
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
            { id: 'kpis', icon: 'fa-chart-line', color: 'var(--cor-sucesso)', title: 'Indicadores de Qualidade', subtitle: 'Acompanhe as métricas' },
            { id: 'rops', icon: 'fa-award', color: '#ffa500', title: 'ROPs - Desafio', subtitle: 'Teste seus conhecimentos sobre as ROPs' },
            { id: 'residencia', icon: 'fa-user-md', color: '#38f9d7', title: 'Residência Médica', subtitle: 'Escalas, materiais e cronogramas' },
            { id: 'podcasts', icon: 'fa-podcast', color: '#9b59b6', title: 'Podcasts Educativos', subtitle: 'Cultura de segurança e qualidade' }
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
            { id: 'calc_anestesiologia', icon: 'fa-kit-medical', color: '#003B73', title: 'Anestesiologia Geral', subtitle: 'Calculadoras gerais' },
            { id: 'calc_doses_pediatricas', icon: 'fa-baby', color: '#9b59b6', title: 'Doses Pediátricas', subtitle: 'Calculadora automática de doses por peso' }
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
    calc_doses_pediatricas: {
        title: "Doses Pediátricas",
        type: 'custom',
        render: renderDosesPediatricasPage
    },
    checklist: {
        title: "Cirurgia Segura (OMS)",
        type: 'custom',
        render: renderChecklistPage
    },
    incidentes: {
        title: "Notificação de Incidentes",
        type: 'custom',
        render: renderNotificacaoIncidentePage
    },
    residencia_sheets: {
        title: "Escalas e Cronogramas",
        type: 'custom',
        render: renderResidenciaSheets
    },
    
    // ADMIN PAGES
    admin_panel: {
        title: "Painel de Administração",
        type: 'custom',
        render: renderAdminPanel
    },
    admin_comunicados: {
        title: "Gerenciar Comunicados",
        type: 'custom',
        render: renderAdminComunicados
    },
    admin_indicadores: {
        title: "Gerenciar Indicadores",
        type: 'custom',
        render: renderAdminIndicadores
    },
    admin_documentos: {
        title: "Gerenciar Documentos",
        type: 'custom',
        render: renderAdminDocumentos
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
    const incidentForm = target.closest('#incident-form');
    
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
    
    if (target.type === 'submit' && incidentForm) {
        e.preventDefault();
        handleIncidentSubmit();
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

// ==================== DOSES PEDIÁTRICAS ====================
function renderDosesPediatricasPage() {
    return `
        <h1 class="page-title">Calculadora de Doses Pediátricas</h1>
        <div class="content-section">
            <div class="form-group">
                <label for="peso_crianca">Peso da Criança (kg)</label>
                <input type="number" id="peso_crianca" placeholder="Ex: 15" min="0" max="150" step="0.1">
            </div>
            <button type="button" class="submit-button" onclick="calcularDosesPediatricas()">Calcular Todas as Doses</button>
            
            <div id="doses-results" style="display:none; margin-top: 20px;"></div>
        </div>
        
        <style>
            .dose-category {
                background: #f8f9fa;
                border-radius: 8px;
                padding: 15px;
                margin: 15px 0;
                border-left: 4px solid #43e97b;
            }
            .dose-category h3 {
                margin-top: 0;
                color: #003B73;
                font-size: 1.1rem;
                border-bottom: 2px solid #43e97b;
                padding-bottom: 8px;
                margin-bottom: 15px;
            }
            .dose-table {
                width: 100%;
                border-collapse: collapse;
                margin: 10px 0;
                background: white;
                border-radius: 8px;
                overflow: hidden;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            }
            .dose-table th {
                background: #003B73;
                color: white;
                padding: 10px 8px;
                text-align: left;
                font-size: 0.85rem;
                font-weight: 600;
            }
            .dose-table td {
                padding: 10px 8px;
                border-bottom: 1px solid #e9ecef;
                font-size: 0.9rem;
            }
            .dose-table tr:last-child td {
                border-bottom: none;
            }
            .dose-table tr:hover {
                background: #f8f9fa;
            }
            .dose-value {
                font-weight: 700;
                color: #e74c3c;
                font-size: 1rem;
            }
            .dose-obs {
                font-size: 0.8rem;
                color: #666;
                font-style: italic;
            }
        </style>
    `;
}

function calcularDosesPediatricas() {
    const peso = parseFloat(document.getElementById('peso_crianca').value);
    const resultsDiv = document.getElementById('doses-results');
    
    if (!peso || peso <= 0) {
        showToast('Por favor, insira um peso válido', 'error');
        return;
    }
    
    // Verifica se os dados estão disponíveis
    if (typeof dosesPediatricasData === 'undefined') {
        resultsDiv.innerHTML = '<div class="dose-category"><h3>Erro</h3><p>Dados de doses pediátricas não carregados. Recarregue a página.</p></div>';
        resultsDiv.style.display = 'block';
        return;
    }
    
    let html = `<h2 style="color: #003B73; text-align: center; margin-bottom: 20px;">Resultados para: ${peso} kg</h2>`;
    
    // PCR - Parada Cardiorrespiratória
    html += '<div class="dose-category">';
    html += '<h3><i class="fas fa-heartbeat"></i> PCR - Parada Cardiorrespiratória</h3>';
    html += '<table class="dose-table">';
    html += '<thead><tr><th>Droga</th><th>Apresentação</th><th>Dose Padrão</th><th>Diluição</th><th class="dose-value">Dose Final</th></tr></thead><tbody>';
    
    dosesPediatricasData.pcr.forEach(item => {
        const resultado = item.calcularDose(peso);
        html += `<tr>
            <td><strong>${item.droga}</strong></td>
            <td>${item.apresentacao}</td>
            <td>${item.dosePadrao}</td>
            <td>${item.diluicao}</td>
            <td class="dose-value">${resultado.dose} ${resultado.unidade}</td>
        </tr>`;
        if (resultado.obs) {
            html += `<tr><td colspan="5" class="dose-obs">${resultado.obs}</td></tr>`;
        }
    });
    html += '</tbody></table></div>';
    
    // Sedação, Analgesia e Bloqueio Neuromuscular
    html += '<div class="dose-category">';
    html += '<h3><i class="fas fa-syringe"></i> Sedação, Analgesia e Bloqueio Neuromuscular</h3>';
    html += '<table class="dose-table">';
    html += '<thead><tr><th>Droga</th><th>Apresentação</th><th>Dose Padrão</th><th>Diluição</th><th class="dose-value">Dose Final</th></tr></thead><tbody>';
    
    dosesPediatricasData.sedacao.forEach(item => {
        const resultado = item.calcularDose(peso);
        html += `<tr>
            <td><strong>${item.droga}</strong></td>
            <td>${item.apresentacao}</td>
            <td>${item.dosePadrao}</td>
            <td>${item.diluicao}</td>
            <td class="dose-value">${resultado.dose} ${resultado.unidade}</td>
        </tr>`;
        if (resultado.obs) {
            html += `<tr><td colspan="5" class="dose-obs">${resultado.obs}</td></tr>`;
        }
    });
    html += '</tbody></table></div>';
    
    // Anticonvulsivantes
    html += '<div class="dose-category">';
    html += '<h3><i class="fas fa-brain"></i> Anticonvulsivantes</h3>';
    html += '<table class="dose-table">';
    html += '<thead><tr><th>Droga</th><th>Apresentação</th><th>Dose Padrão</th><th>Diluição</th><th class="dose-value">Dose Final</th></tr></thead><tbody>';
    
    dosesPediatricasData.anticonvulsivantes.forEach(item => {
        const resultado = item.calcularDose(peso);
        html += `<tr>
            <td><strong>${item.droga}</strong></td>
            <td>${item.apresentacao}</td>
            <td>${item.dosePadrao}</td>
            <td>${item.diluicao}</td>
            <td class="dose-value">${resultado.dose} ${resultado.unidade}</td>
        </tr>`;
        if (resultado.obs) {
            html += `<tr><td colspan="5" class="dose-obs">${resultado.obs}</td></tr>`;
        }
    });
    html += '</tbody></table></div>';
    
    // Antídotos
    html += '<div class="dose-category">';
    html += '<h3><i class="fas fa-shield-virus"></i> Antídotos</h3>';
    html += '<table class="dose-table">';
    html += '<thead><tr><th>Droga</th><th>Apresentação</th><th>Dose Padrão</th><th>Diluição</th><th class="dose-value">Dose Final</th></tr></thead><tbody>';
    
    dosesPediatricasData.antidotos.forEach(item => {
        const resultado = item.calcularDose(peso);
        html += `<tr>
            <td><strong>${item.droga}</strong></td>
            <td>${item.apresentacao}</td>
            <td>${item.dosePadrao}</td>
            <td>${item.diluicao}</td>
            <td class="dose-value">${resultado.dose} ${resultado.unidade}</td>
        </tr>`;
        if (resultado.obs) {
            html += `<tr><td colspan="5" class="dose-obs">${resultado.obs}</td></tr>`;
        }
    });
    html += '</tbody></table></div>';
    
    // Infusões Contínuas
    html += '<div class="dose-category">';
    html += '<h3><i class="fas fa-pump-medical"></i> Infusões Contínuas</h3>';
    html += '<table class="dose-table">';
    html += '<thead><tr><th>Droga</th><th>Apresentação</th><th>Dose Padrão</th><th>Diluição</th><th class="dose-value">Velocidade (ml/h)</th></tr></thead><tbody>';
    
    dosesPediatricasData.infusoes.forEach(item => {
        const resultado = item.calcularDose(peso);
        html += `<tr>
            <td><strong>${item.droga}</strong></td>
            <td>${item.apresentacao}</td>
            <td>${item.dosePadrao}</td>
            <td>${item.diluicao}</td>
            <td class="dose-value">${resultado.dose} ${resultado.unidade}</td>
        </tr>`;
        if (resultado.obs) {
            html += `<tr><td colspan="5" class="dose-obs">${resultado.obs}</td></tr>`;
        }
    });
    html += '</tbody></table></div>';
    
    // Desfibrilação
    const defib = dosesPediatricasData.desfibrilacao.calcularCarga(peso);
    html += '<div class="dose-category">';
    html += '<h3><i class="fas fa-bolt"></i> Desfibrilação</h3>';
    html += `<p style="font-size: 1rem; margin: 10px 0;"><strong>Primeira Carga:</strong> <span class="dose-value">${defib.primeiraCarga} J</span></p>`;
    html += `<p style="font-size: 1rem; margin: 10px 0;"><strong>Cargas Seguintes:</strong> <span class="dose-value">${defib.cargasSeguintes} J</span></p>`;
    html += `<p class="dose-obs">${defib.obs}</p>`;
    html += '</div>';
    
    resultsDiv.innerHTML = html;
    resultsDiv.style.display = 'block';
    showToast('Doses calculadas com sucesso!', 'success');
}

// ==================== NOTIFICAÇÃO DE INCIDENTES ====================
async function handleIncidentSubmit() {
    const form = document.getElementById('incident-form');
    const resultDiv = document.getElementById('incident-result');
    
    // Coletar dados do formulário
    const incidentData = {
        date: document.getElementById('incident_date').value,
        time: document.getElementById('incident_time').value || 'Não informado',
        location: document.getElementById('incident_location').value,
        type: document.getElementById('incident_type').value,
        severity: document.getElementById('incident_severity').value,
        patientId: document.getElementById('patient_identification').value || 'Não informado',
        description: document.getElementById('incident_description').value,
        immediateActions: document.getElementById('immediate_actions').value || 'Nenhuma ação imediata registrada',
        contributingFactors: document.getElementById('contributing_factors').value || 'Não especificado',
        anonymous: document.getElementById('incident_anonymous').checked,
        submittedBy: document.getElementById('incident_anonymous').checked ? 'Anônimo' : (currentUser?.email || 'Não identificado'),
        submittedAt: firebase.firestore.FieldValue.serverTimestamp(),
        status: 'pendente', // pendente, em_analise, resolvido
        reviewed: false
    };
    
    // Validação básica
    if (!incidentData.date || !incidentData.location || !incidentData.type || !incidentData.severity || !incidentData.description) {
        showToast('Por favor, preencha todos os campos obrigatórios (*)', 'error');
        return;
    }
    
    try {
        showLoading();
        
        // Salvar no Firestore
        const docRef = await db.collection('incidents').add(incidentData);
        
        hideLoading();
        
        // Exibir mensagem de sucesso
        resultDiv.innerHTML = `
            <div style="background: #d4edda; border: 1px solid #c3e6cb; border-radius: 8px; padding: 20px; color: #155724;">
                <h3 style="margin-top: 0;"><i class="fas fa-check-circle"></i> Notificação Enviada com Sucesso!</h3>
                <p><strong>Protocolo:</strong> ${docRef.id.substring(0, 8).toUpperCase()}</p>
                <p>Sua notificação foi registrada e será analisada pela equipe de qualidade e segurança.</p>
                <p style="font-size: 0.9rem; margin-bottom: 0;">Agradecemos sua contribuição para a melhoria contínua da segurança do paciente.</p>
            </div>
        `;
        resultDiv.style.display = 'block';
        
        // Limpar formulário
        form.reset();
        
        // Scroll para o resultado
        resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
        showToast('Incidente registrado com sucesso!', 'success');
        
    } catch (error) {
        hideLoading();
        console.error('Erro ao salvar incidente:', error);
        
        resultDiv.innerHTML = `
            <div style="background: #f8d7da; border: 1px solid #f5c6cb; border-radius: 8px; padding: 20px; color: #721c24;">
                <h3 style="margin-top: 0;"><i class="fas fa-exclamation-triangle"></i> Erro ao Enviar</h3>
                <p>Ocorreu um erro ao registrar a notificação. Por favor, tente novamente.</p>
                <p style="font-size: 0.85rem; color: #666;">Erro: ${error.message}</p>
            </div>
        `;
        resultDiv.style.display = 'block';
        
        showToast('Erro ao registrar incidente', 'error');
    }
}

function renderNotificacaoIncidentePage() {
    return `
        <h1 class="page-title">Notificação de Incidentes</h1>
        <div class="content-section">
            <p style="color: #666; margin-bottom: 20px; font-size: 0.9rem;">
                <i class="fas fa-info-circle"></i> Utilize este formulário para notificar eventos adversos, quase-erros (near miss) ou situações de risco relacionadas à segurança do paciente.
            </p>
            
            <form id="incident-form">
                <div class="form-group">
                    <label for="incident_date">Data do Incidente *</label>
                    <input type="date" id="incident_date" required>
                </div>
                
                <div class="form-group">
                    <label for="incident_time">Horário do Incidente</label>
                    <input type="time" id="incident_time">
                </div>
                
                <div class="form-group">
                    <label for="incident_location">Local do Incidente *</label>
                    <select id="incident_location" required>
                        <option value="">Selecione...</option>
                        <option value="centro_cirurgico">Centro Cirúrgico</option>
                        <option value="sala_recuperacao">Sala de Recuperação (SRPA)</option>
                        <option value="ambulatorio">Ambulatório</option>
                        <option value="enfermaria">Enfermaria</option>
                        <option value="uti">UTI</option>
                        <option value="emergencia">Emergência</option>
                        <option value="outro">Outro</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label for="incident_type">Tipo de Incidente *</label>
                    <select id="incident_type" required>
                        <option value="">Selecione...</option>
                        <option value="medicamento">Erro de Medicação</option>
                        <option value="queda">Queda de Paciente</option>
                        <option value="identificacao">Erro de Identificação</option>
                        <option value="equipamento">Falha de Equipamento</option>
                        <option value="via_aerea">Relacionado a Via Aérea</option>
                        <option value="comunicacao">Falha de Comunicação</option>
                        <option value="infeccao">Infecção Relacionada à Assistência</option>
                        <option value="cirurgia_sitio_errado">Cirurgia em Local/Sítio Errado</option>
                        <option value="lesao_pressao">Lesão por Pressão</option>
                        <option value="queimadura">Queimadura</option>
                        <option value="hemorragia">Hemorragia</option>
                        <option value="broncoaspiracao">Broncoaspiração</option>
                        <option value="reacao_adversa">Reação Adversa (Alergia)</option>
                        <option value="outro">Outro</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label for="incident_severity">Gravidade do Incidente *</label>
                    <select id="incident_severity" required>
                        <option value="">Selecione...</option>
                        <option value="near_miss">Quase-erro (Near Miss) - Sem dano</option>
                        <option value="leve">Leve - Dano mínimo, sem necessidade de intervenção</option>
                        <option value="moderado">Moderado - Intervenção necessária, sem sequelas</option>
                        <option value="grave">Grave - Dano significativo, com sequelas temporárias</option>
                        <option value="critico">Crítico - Dano permanente ou óbito</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label for="patient_identification">Identificação do Paciente</label>
                    <input type="text" id="patient_identification" placeholder="Ex: Iniciais ou número do prontuário (opcional)">
                    <small style="color: #666; font-size: 0.8rem;">Para preservar a confidencialidade, use apenas iniciais ou número de prontuário</small>
                </div>
                
                <div class="form-group">
                    <label for="incident_description">Descrição Detalhada do Incidente *</label>
                    <textarea id="incident_description" rows="6" required placeholder="Descreva o que aconteceu, quando, onde, quem estava envolvido e quais as circunstâncias..."></textarea>
                    <small style="color: #666; font-size: 0.8rem;">Seja o mais específico possível. Inclua detalhes relevantes para a investigação.</small>
                </div>
                
                <div class="form-group">
                    <label for="immediate_actions">Ações Imediatas Tomadas</label>
                    <textarea id="immediate_actions" rows="4" placeholder="Descreva as ações imediatas que foram tomadas após o incidente..."></textarea>
                </div>
                
                <div class="form-group">
                    <label for="contributing_factors">Fatores Contribuintes (opcional)</label>
                    <textarea id="contributing_factors" rows="4" placeholder="Liste fatores que podem ter contribuído: comunicação, equipamento, processos, fadiga, etc."></textarea>
                </div>
                
                <div class="form-group-bool">
                    <input type="checkbox" id="incident_anonymous">
                    <label for="incident_anonymous">Notificação Anônima</label>
                </div>
                
                <p style="font-size: 0.85rem; color: #999; margin: 15px 0;">
                    <i class="fas fa-lock"></i> Todas as notificações são confidenciais e serão utilizadas apenas para fins de melhoria da qualidade e segurança.
                </p>
                
                <button type="submit" class="submit-button">
                    <i class="fas fa-paper-plane"></i> Enviar Notificação
                </button>
            </form>
            
            <div id="incident-result" style="display: none; margin-top: 20px;"></div>
        </div>
        
        <style>
            #incident-form textarea {
                width: 100%;
                padding: 10px;
                border: 1px solid var(--cor-borda);
                border-radius: 8px;
                font-family: inherit;
                font-size: 0.95rem;
                resize: vertical;
                box-sizing: border-box;
            }
            #incident-form small {
                display: block;
                margin-top: 5px;
            }
        </style>
    `;
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
async function renderROPsMainPage() {
    if (!ropsData) {
        return `<div class="content-section">
                    <h3>Erro ao Carregar ROPs</h3>
                    <p>Os dados das ROPs não foram carregados. Recarregue a página.</p>
                </div>`;
    }

    // Calculate overall progress
    let totalROPs = 0;
    let completedROPs = 0;
    const userProgress = userProfile?.progress || {};
    
    Object.keys(ropsData).forEach(macroKey => {
        const macro = ropsData[macroKey];
        Object.keys(macro).forEach(ropKey => {
            totalROPs++;
            if (userProgress[macroKey] && userProgress[macroKey][ropKey]) {
                completedROPs++;
            }
        });
    });
    
    const overallProgress = totalROPs > 0 ? Math.round((completedROPs / totalROPs) * 100) : 0;

    let html = `
        <h1 class="page-title">ROPs - Desafio</h1>
        
        <!-- Overall Progress Card -->
        <div class="content-section" style="background: linear-gradient(135deg, var(--cor-primaria) 0%, var(--cor-secundaria) 100%); color: white;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                <div>
                    <h2 style="margin: 0; font-size: 1.5rem;"><i class="fas fa-trophy"></i> Seu Progresso</h2>
                    <p style="margin: 5px 0 0 0; opacity: 0.9;">${completedROPs} de ${totalROPs} ROPs concluídas</p>
                </div>
                <div style="text-align: right;">
                    <div style="font-size: 2.5rem; font-weight: 700;">${overallProgress}%</div>
                    <div style="font-size: 0.85rem; opacity: 0.9;">Pontos: ${userProfile?.totalPoints || 0}</div>
                </div>
            </div>
            <div style="background: rgba(255,255,255,0.3); height: 12px; border-radius: 6px; overflow: hidden;">
                <div style="background: white; height: 100%; width: ${overallProgress}%; transition: width 0.5s ease;"></div>
            </div>
        </div>
        
        <!-- Ranking Button -->
        <div class="content-section" style="padding: 0;">
            <button class="list-item" onclick="showRanking()" style="width: 100%; border: none; background: var(--cor-card); cursor: pointer;">
                <span class="icon" style="background-color: #ffa500;"><i class="fas fa-ranking-star"></i></span>
                <div class="text-content">
                    <div class="title">Ver Ranking</div>
                    <div class="subtitle">Compare sua pontuação com outros usuários</div>
                </div>
                <i class="chevron fas fa-chevron-right"></i>
            </button>
        </div>
    `;
    
    Object.keys(ropsData).forEach(macroKey => {
        const macro = ropsData[macroKey];
        const macroTitle = macroKey.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
        
        // Calculate macro progress
        let macroTotal = 0;
        let macroCompleted = 0;
        Object.keys(macro).forEach(ropKey => {
            macroTotal++;
            if (userProgress[macroKey] && userProgress[macroKey][ropKey]) {
                macroCompleted++;
            }
        });
        const macroProgress = macroTotal > 0 ? Math.round((macroCompleted / macroTotal) * 100) : 0;
        
        html += `<div class="content-section">
                    <h3 style="cursor: pointer;" class="rop-macro" data-macro="${macroKey}">
                        <i class="fas fa-folder"></i> ${macroTitle}
                        <span style="float: right; font-size: 0.9rem; color: var(--cor-primaria);">${macroProgress}%</span>
                    </h3>
                    <div style="background: var(--cor-fundo); height: 6px; border-radius: 3px; margin: 10px 0; overflow: hidden;">
                        <div style="background: var(--cor-primaria); height: 100%; width: ${macroProgress}%; transition: width 0.5s ease;"></div>
                    </div>
                    <div class="rop-list" id="rop-list-${macroKey}" style="display: none;">`;
        
        Object.keys(macro).forEach(ropKey => {
            const rop = macro[ropKey];
            const ropTitle = ropKey.replace(/_/g, ' ').toUpperCase();
            const questionCount = rop.questions ? rop.questions.length : 0;
            const isCompleted = userProgress[macroKey] && userProgress[macroKey][ropKey];
            const completedIcon = isCompleted ? '<i class="fas fa-check-circle" style="color: var(--cor-sucesso); margin-left: 10px;"></i>' : '';
            
            html += `<div class="list-item rop-item" data-macro="${macroKey}" data-rop="${ropKey}">
                        <span class="icon" style="background-color: ${isCompleted ? 'var(--cor-sucesso)' : 'var(--cor-primaria)'};">
                            <i class="fas ${isCompleted ? 'fa-check' : 'fa-question-circle'}"></i>
                        </span>
                        <div class="text-content">
                            <div class="title">${ropTitle} ${completedIcon}</div>
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
    const spreadsheetId = "1RvxlGeQN6xZN6vPp9zhkWHbEbFiK6o3EGJm5eh9iR6s";
    
    // GIDs das abas (você pode ajustar conforme necessário)
    const sheets = [
        { id: 'plantoes', gid: '0', name: 'Plantões', icon: 'fa-moon', color: '#38f9d7' },
        { id: 'estagios', gid: '833599381', name: 'Estágios', icon: 'fa-graduation-cap', color: '#43e97b' },
        { id: 'ferias', gid: '2', name: 'Férias', icon: 'fa-umbrella-beach', color: '#ffa500' }
    ];
    
    let html = `
        <h1 class="page-title">Escalas e Cronogramas</h1>
        
        <div class="residencia-tabs">
            ${sheets.map((sheet, index) => `
                <button class="residencia-tab ${index === 0 ? 'active' : ''}" data-sheet="${sheet.id}" data-gid="${sheet.gid}">
                    <i class="fas ${sheet.icon}"></i>
                    <span>${sheet.name}</span>
                </button>
            `).join('')}
        </div>
        
        <div class="content-section" style="padding: 0; overflow: hidden;">
            <div id="sheets-iframe-container" style="position: relative; width: 100%; height: 600px;">
                <iframe 
                    id="sheets-iframe"
                    src="https://docs.google.com/spreadsheets/d/${spreadsheetId}/preview?gid=0&widget=false&chrome=false"
                    style="width: 100%; height: 100%; border: none; border-radius: 12px;"
                    loading="lazy">
                </iframe>
            </div>
        </div>
        
        <div class="content-section">
            <button class="btn-primary" style="width: 100%;" onclick="window.open('https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit', '_blank')">
                <i class="fas fa-external-link-alt"></i> Abrir Planilha Completa
            </button>
        </div>
        
        <style>
            .residencia-tabs {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 10px;
                margin-bottom: 15px;
                padding: 0 15px;
            }
            
            .residencia-tab {
                display: flex;
                flex-direction: column;
                align-items: center;
                padding: 15px 10px;
                background: var(--cor-card);
                border: 2px solid var(--cor-borda);
                border-radius: 12px;
                cursor: pointer;
                transition: all 0.3s ease;
                font-size: 0.85rem;
                font-weight: 500;
                color: var(--cor-texto);
            }
            
            .residencia-tab i {
                font-size: 1.5rem;
                margin-bottom: 8px;
                color: var(--cor-primaria);
            }
            
            .residencia-tab:hover {
                border-color: var(--cor-primaria);
                transform: translateY(-2px);
            }
            
            .residencia-tab.active {
                background: linear-gradient(135deg, var(--cor-primaria) 0%, var(--cor-secundaria) 100%);
                border-color: var(--cor-primaria);
                color: white;
            }
            
            .residencia-tab.active i {
                color: white;
            }
            
            body.dark-mode .residencia-tab {
                background: #2a2a2a;
            }
            
            body.dark-mode .residencia-tab.active {
                background: linear-gradient(135deg, var(--cor-primaria) 0%, var(--cor-secundaria) 100%);
            }
            
            @media (max-width: 480px) {
                #sheets-iframe-container {
                    height: 500px;
                }
                .residencia-tab {
                    padding: 12px 8px;
                    font-size: 0.75rem;
                }
                .residencia-tab i {
                    font-size: 1.2rem;
                }
            }
        </style>
    `;
    
    // Add event listener after rendering
    setTimeout(() => {
        document.querySelectorAll('.residencia-tab').forEach(tab => {
            tab.addEventListener('click', function() {
                // Remove active class from all tabs
                document.querySelectorAll('.residencia-tab').forEach(t => t.classList.remove('active'));
                // Add active class to clicked tab
                this.classList.add('active');
                
                // Update iframe
                const gid = this.dataset.gid;
                const iframe = document.getElementById('sheets-iframe');
                iframe.src = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/preview?gid=${gid}&widget=false&chrome=false`;
            });
        });
    }, 100);
    
    return html;
}

// ==================== RANKING SYSTEM ====================
window.showRanking = async function() {
    try {
        showLoading();
        
        // Fetch top users
        const usersSnapshot = await db.collection('users')
            .orderBy('totalPoints', 'desc')
            .limit(20)
            .get();
        
        const users = [];
        usersSnapshot.forEach(doc => {
            const data = doc.data();
            if (data.firstName && data.lastName) {
                users.push({
                    id: doc.id,
                    name: `${data.firstName} ${data.lastName}`,
                    points: data.totalPoints || 0,
                    email: data.email
                });
            }
        });
        
        hideLoading();
        
        // Find current user position
        const currentUserIndex = users.findIndex(u => u.id === currentUser.uid);
        const currentUserPosition = currentUserIndex >= 0 ? currentUserIndex + 1 : null;
        
        // Render ranking page
        const pageContent = document.getElementById('page-content');
        const headerTitle = document.getElementById('header-title');
        headerTitle.textContent = 'Ranking';
        
        let html = `
            <h1 class="page-title">🏆 Ranking de Pontuação</h1>
            
            ${currentUserPosition ? `
                <div class="content-section" style="background: linear-gradient(135deg, #ffa500 0%, #ff6b6b 100%); color: white;">
                    <h3 style="margin: 0; color: white; border: none;">Sua Posição</h3>
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 10px;">
                        <div style="font-size: 2.5rem; font-weight: 700;">#${currentUserPosition}</div>
                        <div style="text-align: right;">
                            <div style="font-size: 1.2rem; font-weight: 600;">${userProfile?.totalPoints || 0} pontos</div>
                            <div style="font-size: 0.9rem; opacity: 0.9;">${userProfile.firstName} ${userProfile.lastName}</div>
                        </div>
                    </div>
                </div>
            ` : ''}
            
            <div class="content-section" style="padding: 0; overflow: hidden;">
                <div style="padding: 20px; background: var(--cor-card); border-bottom: 2px solid var(--cor-borda);">
                    <h3 style="margin: 0; color: var(--cor-primaria);"><i class="fas fa-medal"></i> Top 20 Usuários</h3>
                    <p style="color: var(--cor-texto-claro); margin: 5px 0 0 0; font-size: 0.9rem;">Complete mais quizzes para subir no ranking!</p>
                </div>
                <div style="max-height: 500px; overflow-y: auto;">
        `;
        
        users.forEach((user, index) => {
            const position = index + 1;
            let medalIcon = '';
            let bgColor = 'transparent';
            
            if (position === 1) {
                medalIcon = '<i class="fas fa-trophy" style="color: #FFD700; margin-right: 10px;"></i>';
                bgColor = 'rgba(255, 215, 0, 0.1)';
            } else if (position === 2) {
                medalIcon = '<i class="fas fa-medal" style="color: #C0C0C0; margin-right: 10px;"></i>';
                bgColor = 'rgba(192, 192, 192, 0.1)';
            } else if (position === 3) {
                medalIcon = '<i class="fas fa-award" style="color: #CD7F32; margin-right: 10px;"></i>';
                bgColor = 'rgba(205, 127, 50, 0.1)';
            }
            
            const isCurrentUser = user.id === currentUser.uid;
            const userBgColor = isCurrentUser ? 'rgba(67, 233, 123, 0.1)' : bgColor;
            const userBorder = isCurrentUser ? 'border-left: 4px solid var(--cor-primaria);' : '';
            
            html += `
                <div style="display: flex; align-items: center; justify-content: space-between; padding: 15px 20px; border-bottom: 1px solid var(--cor-borda); background: ${userBgColor}; ${userBorder}">
                    <div style="display: flex; align-items: center; flex: 1;">
                        <div style="width: 40px; font-size: 1.2rem; font-weight: 700; color: var(--cor-texto-claro);">
                            ${medalIcon || `#${position}`}
                        </div>
                        <div style="flex: 1;">
                            <div style="font-weight: 600; font-size: 0.95rem;">${user.name}${isCurrentUser ? ' (Você)' : ''}</div>
                            <div style="font-size: 0.8rem; color: var(--cor-texto-claro);">${user.points} pontos</div>
                        </div>
                    </div>
                    <div style="text-align: right;">
                        <i class="fas fa-star" style="color: #ffa500;"></i>
                    </div>
                </div>
            `;
        });
        
        html += `
                </div>
            </div>
        `;
        
        pageContent.innerHTML = html;
        pageContent.scrollTop = 0;
        
    } catch (error) {
        hideLoading();
        console.error('Error loading ranking:', error);
        showToast('Erro ao carregar ranking', 'error');
    }
};

// ==================== ADMIN PANEL ====================
function renderAdminPanel() {
    if (!isAdmin()) {
        return `<div class="content-section">
                    <h3><i class="fas fa-lock"></i> Acesso Negado</h3>
                    <p>Você não tem permissão para acessar esta página.</p>
                </div>`;
    }
    
    return `
        <h1 class="page-title">Painel de Administração</h1>
        
        <div class="content-section" style="background: linear-gradient(135deg, var(--cor-perigo) 0%, var(--cor-aviso) 100%); color: white;">
            <h2 style="margin: 0; color: white; border: none;">
                <i class="fas fa-user-shield"></i> Área Restrita
            </h2>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">Gerencieconteúdo do aplicativo</p>
        </div>
        
        <ul class="list-section">
            <li class="list-item" data-target-page="admin_comunicados">
                <span class="icon" style="background-color: var(--cor-perigo);"><i class="fas fa-bullhorn"></i></span>
                <div class="text-content">
                    <div class="title">Gerenciar Comunicados</div>
                    <div class="subtitle">Criar, editar e excluir comunicados</div>
                </div>
                <i class="chevron fas fa-chevron-right"></i>
            </li>
            <li class="list-item" data-target-page="admin_indicadores">
                <span class="icon" style="background-color: var(--cor-sucesso);"><i class="fas fa-chart-line"></i></span>
                <div class="text-content">
                    <div class="title">Gerenciar Indicadores</div>
                    <div class="subtitle">Atualizar indicadores de qualidade</div>
                </div>
                <i class="chevron fas fa-chevron-right"></i>
            </li>
            <li class="list-item" data-target-page="admin_documentos">
                <span class="icon" style="background-color: var(--cor-info);"><i class="fas fa-file-alt"></i></span>
                <div class="text-content">
                    <div class="title">Gerenciar Documentos</div>
                    <div class="subtitle">Upload e organização de documentos</div>
                </div>
                <i class="chevron fas fa-chevron-right"></i>
            </li>
        </ul>
        
        <div class="content-section">
            <h3><i class="fas fa-users"></i> Gerenciar Usuários</h3>
            <button class="submit-button" onclick="showUserManagement()">
                <i class="fas fa-user-cog"></i> Ver Todos os Usuários
            </button>
        </div>
    `;
}

function renderAdminComunicados() {
    return `
        <h1 class="page-title">Gerenciar Comunicados</h1>
        
        <div class="content-section">
            <h3><i class="fas fa-plus-circle"></i> Novo Comunicado</h3>
            <form id="comunicado-form">
                <div class="form-group">
                    <label for="comunicado_title">Título *</label>
                    <input type="text" id="comunicado_title" required placeholder="Ex: Reunião Geral - 20/10/2025">
                </div>
                
                <div class="form-group">
                    <label for="comunicado_content">Conteúdo *</label>
                    <textarea id="comunicado_content" rows="6" required placeholder="Digite o conteúdo do comunicado..."></textarea>
                </div>
                
                <div class="form-group">
                    <label for="comunicado_priority">Prioridade</label>
                    <select id="comunicado_priority">
                        <option value="baixa">Baixa</option>
                        <option value="media" selected>Média</option>
                        <option value="alta">Alta</option>
                        <option value="urgente">Urgente</option>
                    </select>
                </div>
                
                <button type="submit" class="submit-button">
                    <i class="fas fa-paper-plane"></i> Publicar Comunicado
                </button>
            </form>
        </div>
        
        <div class="content-section">
            <h3><i class="fas fa-list"></i> Comunicados Publicados</h3>
            <div id="comunicados-list">
                <p style="text-align: center; color: var(--cor-texto-claro);">
                    <i class="fas fa-spinner fa-spin"></i> Carregando...
                </p>
            </div>
        </div>
        
        <style>
            #comunicado-form textarea {
                width: 100%;
                padding: 10px;
                border: 1px solid var(--cor-borda);
                border-radius: 8px;
                font-family: inherit;
                font-size: 0.95rem;
                resize: vertical;
                box-sizing: border-box;
            }
            
            body.dark-mode #comunicado-form textarea {
                background: #2a2a2a;
                color: var(--cor-texto);
            }
            
            .comunicado-item {
                padding: 15px;
                border: 2px solid var(--cor-borda);
                border-radius: 8px;
                margin-bottom: 10px;
                position: relative;
            }
            
            .comunicado-item.alta {
                border-left: 4px solid var(--cor-perigo);
            }
            
            .comunicado-item.urgente {
                border-left: 4px solid #dc3545;
                background: rgba(220, 53, 69, 0.05);
            }
            
            .comunicado-actions {
                display: flex;
                gap: 10px;
                margin-top: 10px;
            }
            
            .comunicado-actions button {
                flex: 1;
                padding: 8px 12px;
                border: none;
                border-radius: 6px;
                cursor: pointer;
                font-weight: 500;
                transition: all 0.3s ease;
            }
            
            .btn-edit {
                background: var(--cor-info);
                color: white;
            }
            
            .btn-delete {
                background: var(--cor-perigo);
                color: white;
            }
        </style>
    `;
}

function renderAdminIndicadores() {
    return `
        <h1 class="page-title">Gerenciar Indicadores</h1>
        
        <div class="content-section">
            <h3><i class="fas fa-chart-bar"></i> Atualizar Indicadores de Qualidade</h3>
            <form id="indicador-form">
                <div class="form-group">
                    <label for="indicador_name">Nome do Indicador *</label>
                    <select id="indicador_name" required>
                        <option value="">Selecione...</option>
                        <option value="higiene_maos">Adesão à Higiene das Mãos</option>
                        <option value="incidentes">Taxa de Notificação de Incidentes</option>
                        <option value="nvpo">Incidência de NVPO</option>
                        <option value="dor">Controle da Dor Pós-operatória</option>
                        <option value="satisfacao">Satisfação do Paciente</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label for="indicador_valor">Valor Atual (%)</label>
                    <input type="number" id="indicador_valor" min="0" max="100" step="0.1" required placeholder="Ex: 95.5">
                </div>
                
                <div class="form-group">
                    <label for="indicador_meta">Meta (%)</label>
                    <input type="number" id="indicador_meta" min="0" max="100" step="0.1" required placeholder="Ex: 90">
                </div>
                
                <div class="form-group">
                    <label for="indicador_periodo">Período de Referência *</label>
                    <input type="text" id="indicador_periodo" required placeholder="Ex: Outubro/2025">
                </div>
                
                <button type="submit" class="submit-button">
                    <i class="fas fa-save"></i> Salvar Indicador
                </button>
            </form>
        </div>
        
        <div class="content-section">
            <h3><i class="fas fa-list-alt"></i> Indicadores Atuais</h3>
            <div id="indicadores-list">
                <p style="text-align: center; color: var(--cor-texto-claro);">
                    <i class="fas fa-spinner fa-spin"></i> Carregando...
                </p>
            </div>
        </div>
    `;
}

function renderAdminDocumentos() {
    return `
        <h1 class="page-title">Gerenciar Documentos</h1>
        
        <div class="content-section">
            <h3><i class="fas fa-cloud-upload-alt"></i> Upload de Documento</h3>
            <p style="color: var(--cor-texto-claro); margin-bottom: 15px;">
                Faça upload de documentos PDF para a biblioteca do aplicativo.
            </p>
            
            <form id="documento-form">
                <div class="form-group">
                    <label for="doc_title">Título do Documento *</label>
                    <input type="text" id="doc_title" required placeholder="Ex: Protocolo de Higiene das Mãos">
                </div>
                
                <div class="form-group">
                    <label for="doc_category">Categoria *</label>
                    <select id="doc_category" required>
                        <option value="">Selecione...</option>
                        <option value="protocolos">Protocolos</option>
                        <option value="politicas">Políticas</option>
                        <option value="formularios">Formulários</option>
                        <option value="manuais">Manuais</option>
                        <option value="relatorios">Relatórios</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label for="doc_file">Arquivo PDF *</label>
                    <input type="file" id="doc_file" accept=".pdf" required>
                    <small style="color: var(--cor-texto-claro); display: block; margin-top: 5px;">
                        Formato: PDF | Tamanho máximo: 10 MB
                    </small>
                </div>
                
                <button type="submit" class="submit-button">
                    <i class="fas fa-upload"></i> Fazer Upload
                </button>
            </form>
        </div>
        
        <div class="content-section">
            <h3><i class="fas fa-folder-open"></i> Documentos Existentes</h3>
            <div id="documentos-list">
                <p style="text-align: center; color: var(--cor-texto-claro);">
                    <i class="fas fa-spinner fa-spin"></i> Carregando...
                </p>
            </div>
        </div>
        
        <style>
            #doc_file {
                padding: 10px;
                border: 2px dashed var(--cor-borda);
                border-radius: 8px;
                cursor: pointer;
            }
            
            #doc_file:hover {
                border-color: var(--cor-primaria);
                background: rgba(67, 233, 123, 0.05);
            }
        </style>
    `;
}

// Initialize admin forms after page render
setTimeout(() => {
    const comunicadoForm = document.getElementById('comunicado-form');
    if (comunicadoForm) {
        comunicadoForm.addEventListener('submit', handleComunicadoSubmit);
        loadComunicados();
    }
    
    const indicadorForm = document.getElementById('indicador-form');
    if (indicadorForm) {
        indicadorForm.addEventListener('submit', handleIndicadorSubmit);
        loadIndicadores();
    }
    
    const documentoForm = document.getElementById('documento-form');
    if (documentoForm) {
        documentoForm.addEventListener('submit', handleDocumentoSubmit);
        loadDocumentos();
    }
}, 100);

async function handleComunicadoSubmit(e) {
    e.preventDefault();
    
    const comunicado = {
        title: document.getElementById('comunicado_title').value,
        content: document.getElementById('comunicado_content').value,
        priority: document.getElementById('comunicado_priority').value,
        author: `${userProfile.firstName} ${userProfile.lastName}`,
        authorEmail: currentUser.email,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
    };
    
    try {
        showLoading();
        await db.collection('comunicados').add(comunicado);
        hideLoading();
        
        showToast('Comunicado publicado com sucesso!', 'success');
        document.getElementById('comunicado-form').reset();
        loadComunicados();
    } catch (error) {
        hideLoading();
        console.error('Error creating comunicado:', error);
        showToast('Erro ao publicar comunicado', 'error');
    }
}

async function loadComunicados() {
    try {
        const snapshot = await db.collection('comunicados').orderBy('createdAt', 'desc').limit(20).get();
        const list = document.getElementById('comunicados-list');
        
        if (snapshot.empty) {
            list.innerHTML = '<p style="text-align: center; color: var(--cor-texto-claro);">Nenhum comunicado publicado ainda.</p>';
            return;
        }
        
        let html = '';
        snapshot.forEach(doc => {
            const data = doc.data();
            const date = data.createdAt ? data.createdAt.toDate().toLocaleDateString('pt-BR') : 'N/A';
            
            html += `
                <div class="comunicado-item ${data.priority}">
                    <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 10px;">
                        <strong style="font-size: 1.05rem;">${data.title}</strong>
                        <span style="background: var(--cor-aviso); color: white; padding: 3px 8px; border-radius: 4px; font-size: 0.75rem;">
                            ${data.priority}
                        </span>
                    </div>
                    <p style="color: var(--cor-texto-claro); margin: 10px 0;">${data.content}</p>
                    <div style="font-size: 0.85rem; color: var(--cor-texto-claro); margin-top: 10px;">
                        <i class="fas fa-user"></i> ${data.author} | <i class="fas fa-calendar"></i> ${date}
                    </div>
                    <div class="comunicado-actions">
                        <button class="btn-delete" onclick="deleteComunicado('${doc.id}')">
                            <i class="fas fa-trash"></i> Excluir
                        </button>
                    </div>
                </div>
            `;
        });
        
        list.innerHTML = html;
    } catch (error) {
        console.error('Error loading comunicados:', error);
    }
}

window.deleteComunicado = async function(id) {
    if (!confirm('Tem certeza que deseja excluir este comunicado?')) {
        return;
    }
    
    try {
        showLoading();
        await db.collection('comunicados').doc(id).delete();
        hideLoading();
        showToast('Comunicado excluído com sucesso!', 'success');
        loadComunicados();
    } catch (error) {
        hideLoading();
        console.error('Error deleting comunicado:', error);
        showToast('Erro ao excluir comunicado', 'error');
    }
};

async function handleIndicadorSubmit(e) {
    e.preventDefault();
    
    const indicador = {
        name: document.getElementById('indicador_name').value,
        value: parseFloat(document.getElementById('indicador_valor').value),
        target: parseFloat(document.getElementById('indicador_meta').value),
        period: document.getElementById('indicador_periodo').value,
        updatedBy: `${userProfile.firstName} ${userProfile.lastName}`,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    };
    
    try {
        showLoading();
        // Use name as document ID for easy updates
        await db.collection('indicadores').doc(indicador.name).set(indicador);
        hideLoading();
        
        showToast('Indicador atualizado com sucesso!', 'success');
        document.getElementById('indicador-form').reset();
        loadIndicadores();
    } catch (error) {
        hideLoading();
        console.error('Error saving indicador:', error);
        showToast('Erro ao salvar indicador', 'error');
    }
}

async function loadIndicadores() {
    try {
        const snapshot = await db.collection('indicadores').get();
        const list = document.getElementById('indicadores-list');
        
        if (snapshot.empty) {
            list.innerHTML = '<p style="text-align: center; color: var(--cor-texto-claro);">Nenhum indicador cadastrado ainda.</p>';
            return;
        }
        
        const indicadoresMap = {
            higiene_maos: 'Adesão à Higiene das Mãos',
            incidentes: 'Taxa de Notificação de Incidentes',
            nvpo: 'Incidência de NVPO',
            dor: 'Controle da Dor Pós-operatória',
            satisfacao: 'Satisfação do Paciente'
        };
        
        let html = '';
        snapshot.forEach(doc => {
            const data = doc.data();
            const percentage = (data.value / data.target) * 100;
            const isGood = data.value >= data.target;
            
            html += `
                <div style="padding: 15px; border: 2px solid var(--cor-borda); border-radius: 8px; margin-bottom: 10px;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                        <strong>${indicadoresMap[data.name] || data.name}</strong>
                        <span style="font-size: 1.2rem; font-weight: 700; color: ${isGood ? 'var(--cor-sucesso)' : 'var(--cor-perigo)'};">
                            ${data.value.toFixed(1)}%
                        </span>
                    </div>
                    <div style="background: var(--cor-fundo); height: 8px; border-radius: 4px; overflow: hidden; margin-bottom: 10px;">
                        <div style="background: ${isGood ? 'var(--cor-sucesso)' : 'var(--cor-aviso)'}; height: 100%; width: ${Math.min(percentage, 100)}%;"></div>
                    </div>
                    <div style="font-size: 0.85rem; color: var(--cor-texto-claro);">
                        <i class="fas fa-bullseye"></i> Meta: ${data.target}% | 
                        <i class="fas fa-calendar"></i> ${data.period}
                    </div>
                </div>
            `;
        });
        
        list.innerHTML = html;
    } catch (error) {
        console.error('Error loading indicadores:', error);
    }
}

async function handleDocumentoSubmit(e) {
    e.preventDefault();
    
    const title = document.getElementById('doc_title').value;
    const category = document.getElementById('doc_category').value;
    const file = document.getElementById('doc_file').files[0];
    
    if (!file) {
        showToast('Por favor, selecione um arquivo', 'error');
        return;
    }
    
    if (file.size > 10 * 1024 * 1024) {
        showToast('Arquivo muito grande! Máximo: 10 MB', 'error');
        return;
    }
    
    try {
        showLoading();
        
        // Upload file to Firebase Storage
        const storageRef = firebase.storage().ref();
        const fileRef = storageRef.child(`documentos/${category}/${Date.now()}_${file.name}`);
        await fileRef.put(file);
        
        // Get download URL
        const downloadURL = await fileRef.getDownloadURL();
        
        // Save document metadata to Firestore
        await db.collection('documentos').add({
            title: title,
            category: category,
            fileName: file.name,
            fileSize: file.size,
            fileURL: downloadURL,
            uploadedBy: `${userProfile.firstName} ${userProfile.lastName}`,
            uploadedAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        
        hideLoading();
        showToast('Documento enviado com sucesso!', 'success');
        document.getElementById('documento-form').reset();
        loadDocumentos();
    } catch (error) {
        hideLoading();
        console.error('Error uploading document:', error);
        showToast('Erro ao fazer upload do documento', 'error');
    }
}

async function loadDocumentos() {
    try {
        const snapshot = await db.collection('documentos').orderBy('uploadedAt', 'desc').limit(20).get();
        const list = document.getElementById('documentos-list');
        
        if (snapshot.empty) {
            list.innerHTML = '<p style="text-align: center; color: var(--cor-texto-claro);">Nenhum documento enviado ainda.</p>';
            return;
        }
        
        let html = '';
        snapshot.forEach(doc => {
            const data = doc.data();
            const date = data.uploadedAt ? data.uploadedAt.toDate().toLocaleDateString('pt-BR') : 'N/A';
            const sizeKB = (data.fileSize / 1024).toFixed(0);
            
            html += `
                <div style="padding: 15px; border: 2px solid var(--cor-borda); border-radius: 8px; margin-bottom: 10px;">
                    <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
                        <i class="fas fa-file-pdf" style="font-size: 2rem; color: var(--cor-perigo);"></i>
                        <div style="flex: 1;">
                            <strong>${data.title}</strong>
                            <div style="font-size: 0.85rem; color: var(--cor-texto-claro); margin-top: 3px;">
                                ${data.category} | ${sizeKB} KB | ${date}
                            </div>
                        </div>
                    </div>
                    <div style="display: flex; gap: 10px;">
                        <button class="submit-button" style="flex: 1; background: var(--cor-info);" onclick="window.open('${data.fileURL}', '_blank')">
                            <i class="fas fa-download"></i> Baixar
                        </button>
                        <button class="submit-button" style="flex: 1; background: var(--cor-perigo);" onclick="deleteDocumento('${doc.id}', '${data.fileURL}')">
                            <i class="fas fa-trash"></i> Excluir
                        </button>
                    </div>
                </div>
            `;
        });
        
        list.innerHTML = html;
    } catch (error) {
        console.error('Error loading documentos:', error);
    }
}

window.deleteDocumento = async function(id, fileURL) {
    if (!confirm('Tem certeza que deseja excluir este documento?')) {
        return;
    }
    
    try {
        showLoading();
        
        // Delete file from Storage
        const fileRef = firebase.storage().refFromURL(fileURL);
        await fileRef.delete();
        
        // Delete metadata from Firestore
        await db.collection('documentos').doc(id).delete();
        
        hideLoading();
        showToast('Documento excluído com sucesso!', 'success');
        loadDocumentos();
    } catch (error) {
        hideLoading();
        console.error('Error deleting document:', error);
        showToast('Erro ao excluir documento', 'error');
    }
};

window.showUserManagement = async function() {
    try {
        showLoading();
        
        const usersSnapshot = await db.collection('users').orderBy('createdAt', 'desc').limit(50).get();
        const users = [];
        usersSnapshot.forEach(doc => {
            users.push({ id: doc.id, ...doc.data() });
        });
        
        hideLoading();
        
        const pageContent = document.getElementById('page-content');
        const headerTitle = document.getElementById('header-title');
        headerTitle.textContent = 'Gerenciar Usuários';
        
        let html = `
            <h1 class="page-title">Gerenciar Usuários</h1>
            
            <div class="content-section">
                <p style="color: var(--cor-texto-claro); margin-bottom: 10px;">
                    Total de usuários: <strong>${users.length}</strong>
                </p>
            </div>
        `;
        
        users.forEach(user => {
            const date = user.createdAt ? user.createdAt.toDate().toLocaleDateString('pt-BR') : 'N/A';
            const isAdmin = user.role === 'admin';
            
            html += `
                <div class="content-section" style="margin-bottom: 10px;">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <div>
                            <strong>${user.firstName} ${user.lastName}</strong>
                            <div style="font-size: 0.85rem; color: var(--cor-texto-claro); margin-top: 3px;">
                                ${user.email}
                            </div>
                            <div style="font-size: 0.8rem; color: var(--cor-texto-claro); margin-top: 3px;">
                                Cadastro: ${date} | Pontos: ${user.totalPoints || 0}
                            </div>
                        </div>
                        <div>
                            <button class="submit-button" style="padding: 8px 12px; ${isAdmin ? 'background: var(--cor-perigo);' : 'background: var(--cor-sucesso);'}" 
                                onclick="toggleUserAdmin('${user.id}', ${!isAdmin})">
                                ${isAdmin ? '<i class="fas fa-user-minus"></i> Remover Admin' : '<i class="fas fa-user-shield"></i> Tornar Admin'}
                            </button>
                        </div>
                    </div>
                </div>
            `;
        });
        
        pageContent.innerHTML = html;
        pageContent.scrollTop = 0;
    } catch (error) {
        hideLoading();
        console.error('Error loading users:', error);
        showToast('Erro ao carregar usuários', 'error');
    }
};

window.toggleUserAdmin = async function(userId, makeAdmin) {
    try {
        showLoading();
        await db.collection('users').doc(userId).update({
            role: makeAdmin ? 'admin' : 'user'
        });
        hideLoading();
        showToast(`Usuário ${makeAdmin ? 'promovido a' : 'removido de'} administrador!`, 'success');
        showUserManagement(); // Reload list
    } catch (error) {
        hideLoading();
        console.error('Error toggling admin:', error);
        showToast('Erro ao atualizar usuário', 'error');
    }
};

console.log('✅ Aplicativo inicializado!');

// ==================== PAINEL PRINCIPAL CORRIGIDO ====================
// Versão 8.1.0 - 4 Cards Funcionais

// Mapeamento de ROPs por Macro-Área para Progress Bars
const ROPS_POR_AREA = {
    'cultura_seguranca': ['1.1', '1.2', '1.3', '1.4'],
    'comunicacao': ['2.1', '2.2', '2.3', '2.4', '2.5', '2.6', '2.7', '2.8'],
    'uso_medicamentos': ['3.1', '3.2', '3.3', '3.4', '3.5'],
    'vida_profissional': ['4.1', '4.2', '4.3', '4.4', '4.5'],
    'prevencao_infeccoes': ['5.1', '5.2', '5.3', '5.4'],
    'avaliacao_riscos': ['6.1', '6.2', '6.3', '6.4', '6.5']
};

// Podcasts por área
const PODCASTS_POR_AREA = {
    'cultura_seguranca': [
        { nome: 'ROP 1.1 – Responsabilização pela Qualidade', arquivo: 'Podcasts/Cultura de Segurança/ROP 1.1 Cultura de Segurança – Responsabilização pela Qualidade.m4a' },
        { nome: 'ROP 1.2 – Gestão de Incidentes', arquivo: 'Podcasts/Cultura de Segurança/ROP 1.2 Cultura de Segurança – Gestão de Incidentes sobre a Segurança dos Pacientes.m4a' },
        { nome: 'ROP 1.3 – Relatórios Trimestrais', arquivo: 'Podcasts/Cultura de Segurança/ROP 1.3 Cultura de Segurança – Relatórios Trimestrais sobre a Segurança dos Pacientes.m4a' },
        { nome: 'ROP 1.4 – Divulgação de Incidentes', arquivo: 'Podcasts/Cultura de Segurança/ROP 1.4 Cultura de Segurança – Divulgação de Incidentes (Disclosure).m4a' }
    ],
    'comunicacao': [
        { nome: '2.1 – Identificação do Cliente', arquivo: 'Podcasts/Comunicação/2.1 Comunicação - Idenficação cliente.m4a' },
        { nome: '2.2 – Abreviações Perigosas', arquivo: 'Podcasts/Comunicação/2.2 Comunicação - Abreviações perigosas.m4a' },
        { nome: '2.3 – Conciliação Estratégica', arquivo: 'Podcasts/Comunicação/2.3 Comunicação - Conciliação medicamentosa Estratégica.m4a' },
        { nome: '2.4 – Conciliação Internado', arquivo: 'Podcasts/Comunicação/2.4 Comunicação - Conciliação medicamentosa Internado.m4a' },
        { nome: '2.5 – Conciliação Ambulatorial', arquivo: 'Podcasts/Comunicação/2.5 Comunicação - Conciliação medicamentosa ambulatorial.m4a' },
        { nome: '2.6 – Conciliação Emergência', arquivo: 'Podcasts/Comunicação/2.6 Comunicação - Conciliação medicamentosa Emergencia.m4a' },
        { nome: '2.7 – Cirurgia Segura', arquivo: 'Podcasts/Comunicação/2.7 Comunicação - Cirurgia segura.m4a' },
        { nome: '2.8 – Transição de Cuidado', arquivo: 'Podcasts/Comunicação/2.8 Comunicação - Transição Cuidado.m4a' }
    ],
    'uso_medicamentos': [
        { nome: '3.1 – Uso de Medicamentos', arquivo: 'Podcasts/Uso de Medicamentos/3.1 Uso de Medicamentos.m4a' }
    ],
    'vida_profissional': [
        { nome: '4.1 – Vida Profissional', arquivo: 'Podcasts/Vida Profissional/4.1 Vida Profissional.m4a' }
    ],
    'prevencao_infeccoes': [
        { nome: '5.1 – Prevenção de Infecções', arquivo: 'Podcasts/Prevenção de infecções/5.1 Prevenção de infecções.m4a' }
    ],
    'avaliacao_riscos': [
        { nome: '6.1 – Avaliação de Riscos', arquivo: 'Podcasts/Avaliação de Riscos/6.1 Avaliação de Riscos.m4a' }
    ]
};

// Renderiza o Painel Principal Completo
function renderPainelPrincipal() {
    return `
        <h1 class="page-title">Painel Principal</h1>
        
        <!-- Card 1: Últimos Comunicados -->
        <div class="content-section">
            <h3><i class="fas fa-bullhorn"></i> Últimos Comunicados</h3>
            <div id="comunicados-preview">
                <p style="color: var(--cor-texto-claro); font-style: italic; text-align: center;">
                    <i class="fas fa-spinner fa-spin"></i> Carregando comunicados...
                </p>
            </div>
        </div>
        
        <!-- Card 2: Minhas Pendências -->
        <div class="content-section">
            <h3><i class="fas fa-tasks"></i> Minhas Pendências</h3>
            <div id="pendencias-preview">
                <p style="color: var(--cor-texto-claro); font-style: italic; text-align: center;">
                    <i class="fas fa-spinner fa-spin"></i> Carregando pendências...
                </p>
            </div>
        </div>
        
        <!-- Card 3: Indicadores de Qualidade -->
        <div class="content-section">
            <h3><i class="fas fa-chart-line"></i> Indicadores de Qualidade</h3>
            <div id="indicadores-preview">
                <p style="color: var(--cor-texto-claro); font-style: italic; text-align: center;">
                    <i class="fas fa-spinner fa-spin"></i> Carregando indicadores...
                </p>
            </div>
        </div>
        
        <!-- Card 4: ROPs Desafio (Gamificação) -->
        <div class="content-section">
            <h3><i class="fas fa-trophy"></i> ROPs Desafio</h3>
            <div id="rops-desafio-preview">
                <p style="color: var(--cor-texto-claro); font-style: italic; text-align: center;">
                    <i class="fas fa-spinner fa-spin"></i> Carregando progresso...
                </p>
            </div>
        </div>
    `;
}

// Carrega conteúdo dinâmico dos cards após renderização
async function loadPainelDashboard() {
    await loadComunicadosPreview();
    await loadPendenciasPreview();
    await loadIndicadoresPreview();
    await loadROPsDesafioPreview();
}

// Card 1: Comunicados
async function loadComunicadosPreview() {
    const container = document.getElementById('comunicados-preview');
    if (!container) return;
    
    try {
        const snapshot = await db.collection('comunicados')
            .orderBy('dataPublicacao', 'desc')
            .limit(3)
            .get();
        
        if (snapshot.empty) {
            container.innerHTML = `
                <p style="color: var(--cor-texto-claro); text-align: center;">
                    <i class="fas fa-info-circle"></i> Nenhum comunicado recente
                </p>
            `;
            return;
        }
        
        let html = '';
        snapshot.forEach(doc => {
            const data = doc.data();
            const date = data.dataPublicacao?.toDate().toLocaleDateString('pt-BR') || 'Data não disponível';
            const prioridade = data.prioridade || 'normal';
            
            const corPrioridade = {
                'baixa': '#6c757d',
                'media': '#ffc107',
                'alta': '#fd7e14',
                'urgente': '#dc3545'
            };
            
            html += `
                <div style="padding: 12px; margin-bottom: 10px; border-left: 4px solid ${corPrioridade[prioridade]}; background: var(--cor-fundo); border-radius: 4px;">
                    <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 5px;">
                        <strong style="font-size: 0.95rem;">${data.titulo}</strong>
                        <span style="font-size: 0.75rem; color: var(--cor-texto-claro);">${date}</span>
                    </div>
                    <p style="margin: 0; font-size: 0.85rem; color: var(--cor-texto-claro); line-height: 1.4;">
                        ${data.conteudo.substring(0, 100)}${data.conteudo.length > 100 ? '...' : ''}
                    </p>
                </div>
            `;
        });
        
        html += `
            <button class="submit-button" onclick="navigateTo('comunicados_lista')" style="margin-top: 10px; padding: 8px 16px;">
                <i class="fas fa-list"></i> Ver Todos
            </button>
        `;
        
        container.innerHTML = html;
    } catch (error) {
        console.error('[PAINEL] Erro ao carregar comunicados:', error);
        container.innerHTML = `
            <p style="color: var(--cor-perigo); text-align: center;">
                <i class="fas fa-exclamation-triangle"></i> Erro ao carregar comunicados
            </p>
        `;
    }
}

// Card 2: Pendências
async function loadPendenciasPreview() {
    const container = document.getElementById('pendencias-preview');
    if (!container) return;
    
    try {
        const completedROPs = userProfile.completedROPs || [];
        const totalROPs = 32;
        const pendingROPs = totalROPs - completedROPs.length;
        
        let html = `
            <div style="padding: 12px; background: var(--cor-fundo); border-radius: 8px; margin-bottom: 10px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                    <span style="font-size: 0.9rem;">
                        <i class="fas fa-award" style="color: var(--cor-aviso);"></i> ROPs Pendentes
                    </span>
                    <strong style="font-size: 1.1rem; color: var(--cor-aviso);">${pendingROPs}</strong>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span style="font-size: 0.9rem;">
                        <i class="fas fa-check-circle" style="color: var(--cor-sucesso);"></i> ROPs Completas
                    </span>
                    <strong style="font-size: 1.1rem; color: var(--cor-sucesso);">${completedROPs.length}</strong>
                </div>
            </div>
            <button class="submit-button" onclick="navigateTo('rops')" style="padding: 8px 16px;">
                <i class="fas fa-play"></i> Continuar Desafio
            </button>
        `;
        
        container.innerHTML = html;
    } catch (error) {
        console.error('[PAINEL] Erro ao carregar pendências:', error);
        container.innerHTML = `
            <p style="color: var(--cor-perigo); text-align: center;">
                <i class="fas fa-exclamation-triangle"></i> Erro ao carregar pendências
            </p>
        `;
    }
}

// Card 3: Indicadores
async function loadIndicadoresPreview() {
    const container = document.getElementById('indicadores-preview');
    if (!container) return;
    
    try {
        const snapshot = await db.collection('indicadores').limit(5).get();
        
        if (snapshot.empty) {
            // Criar indicadores padrão se não existirem
            if (isAdmin()) {
                container.innerHTML = `
                    <p style="color: var(--cor-texto-claro); text-align: center; margin-bottom: 10px;">
                        <i class="fas fa-info-circle"></i> Nenhum indicador configurado
                    </p>
                    <button class="submit-button" onclick="navigateTo('admin_indicadores')" style="padding: 8px 16px;">
                        <i class="fas fa-cog"></i> Configurar Indicadores
                    </button>
                `;
            } else {
                container.innerHTML = `
                    <p style="color: var(--cor-texto-claro); text-align: center;">
                        <i class="fas fa-info-circle"></i> Indicadores em configuração
                    </p>
                `;
            }
            return;
        }
        
        let html = '';
        snapshot.forEach(doc => {
            const data = doc.data();
            const progresso = (data.valorAtual / data.meta) * 100;
            const cor = progresso >= 90 ? 'var(--cor-sucesso)' : progresso >= 70 ? 'var(--cor-aviso)' : 'var(--cor-perigo)';
            
            html += `
                <div style="margin-bottom: 15px;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                        <span style="font-size: 0.85rem; font-weight: 500;">${data.nome}</span>
                        <span style="font-size: 0.85rem; color: var(--cor-texto-claro);">
                            ${data.valorAtual}% / ${data.meta}%
                        </span>
                    </div>
                    <div style="width: 100%; height: 8px; background: var(--cor-borda); border-radius: 4px; overflow: hidden;">
                        <div style="width: ${Math.min(progresso, 100)}%; height: 100%; background: ${cor}; transition: width 0.3s;"></div>
                    </div>
                </div>
            `;
        });
        
        html += `
            <button class="submit-button" onclick="navigateTo('kpis_detalhes')" style="margin-top: 10px; padding: 8px 16px;">
                <i class="fas fa-chart-bar"></i> Ver Detalhes
            </button>
        `;
        
        container.innerHTML = html;
    } catch (error) {
        console.error('[PAINEL] Erro ao carregar indicadores:', error);
        container.innerHTML = `
            <p style="color: var(--cor-perigo); text-align: center;">
                <i class="fas fa-exclamation-triangle"></i> Erro ao carregar indicadores
            </p>
        `;
    }
}

// Card 4: ROPs Desafio com Gamificação
async function loadROPsDesafioPreview() {
    const container = document.getElementById('rops-desafio-preview');
    if (!container) return;
    
    try {
        const completedROPs = userProfile.completedROPs || [];
        const totalROPs = 32;
        const progressoGeral = Math.round((completedROPs.length / totalROPs) * 100);
        
        let html = `
            <div style="text-align: center; margin-bottom: 15px;">
                <div style="font-size: 2rem; font-weight: bold; color: var(--cor-primaria);">
                    ${completedROPs.length} / ${totalROPs}
                </div>
                <div style="font-size: 0.9rem; color: var(--cor-texto-claro);">
                    ROPs Completadas
                </div>
                <div style="width: 100%; height: 12px; background: var(--cor-borda); border-radius: 6px; overflow: hidden; margin-top: 10px;">
                    <div style="width: ${progressoGeral}%; height: 100%; background: linear-gradient(90deg, var(--cor-primaria), var(--cor-secundaria)); transition: width 0.3s;"></div>
                </div>
            </div>
            
            <h4 style="font-size: 0.95rem; margin: 15px 0 10px 0; color: var(--cor-primaria);">
                <i class="fas fa-chart-bar"></i> Progresso por Área
            </h4>
        `;
        
        // Progress por área
        const areas = [
            { id: 'cultura_seguranca', nome: 'Cultura de Segurança', icon: '🛡️' },
            { id: 'comunicacao', nome: 'Comunicação', icon: '💬' },
            { id: 'uso_medicamentos', nome: 'Uso de Medicamentos', icon: '💊' },
            { id: 'vida_profissional', nome: 'Vida Profissional', icon: '👥' },
            { id: 'prevencao_infeccoes', nome: 'Controle de Infecção', icon: '🦠' },
            { id: 'avaliacao_riscos', nome: 'Avaliação de Riscos', icon: '⚠️' }
        ];
        
        areas.forEach(area => {
            const ropsArea = ROPS_POR_AREA[area.id];
            const completasArea = ropsArea.filter(rop => completedROPs.includes(rop)).length;
            const progressoArea = Math.round((completasArea / ropsArea.length) * 100);
            const podcasts = PODCASTS_POR_AREA[area.id] || [];
            
            html += `
                <div style="margin-bottom: 12px; padding: 10px; background: var(--cor-fundo); border-radius: 8px;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                        <span style="font-size: 0.85rem;">
                            ${area.icon} <strong>${area.nome}</strong>
                        </span>
                        <div style="display: flex; gap: 8px; align-items: center;">
                            <span style="font-size: 0.75rem; color: var(--cor-texto-claro);">
                                ${completasArea}/${ropsArea.length}
                            </span>
                            ${podcasts.length > 0 ? `
                                <button onclick="showPodcastsArea('${area.id}')" 
                                        style="background: none; border: none; color: var(--cor-secundaria); cursor: pointer; font-size: 1.1rem; padding: 2px 6px;"
                                        title="Podcasts Educativos">
                                    <i class="fas fa-podcast"></i>
                                </button>
                            ` : ''}
                        </div>
                    </div>
                    <div style="width: 100%; height: 6px; background: var(--cor-borda); border-radius: 3px; overflow: hidden;">
                        <div style="width: ${progressoArea}%; height: 100%; background: var(--cor-primaria); transition: width 0.3s;"></div>
                    </div>
                </div>
            `;
        });
        
        html += `
            <div style="display: flex; gap: 10px; margin-top: 15px;">
                <button class="submit-button" onclick="navigateTo('rops')" style="flex: 1; padding: 10px;">
                    <i class="fas fa-play"></i> Iniciar Desafio
                </button>
                <button class="submit-button" onclick="showRanking()" style="flex: 1; padding: 10px; background: var(--cor-aviso);">
                    <i class="fas fa-trophy"></i> Ver Ranking
                </button>
            </div>
        `;
        
        container.innerHTML = html;
    } catch (error) {
        console.error('[PAINEL] Erro ao carregar ROPs desafio:', error);
        container.innerHTML = `
            <p style="color: var(--cor-perigo); text-align: center;">
                <i class="fas fa-exclamation-triangle"></i> Erro ao carregar progresso
            </p>
        `;
    }
}

// Mostra podcasts de uma área específica
function showPodcastsArea(areaId) {
    const podcasts = PODCASTS_POR_AREA[areaId];
    if (!podcasts || podcasts.length === 0) {
        showToast('Nenhum podcast disponível para esta área', 'info');
        return;
    }
    
    const areas = {
        'cultura_seguranca': '🛡️ Cultura de Segurança',
        'comunicacao': '💬 Comunicação',
        'uso_medicamentos': '💊 Uso de Medicamentos',
        'vida_profissional': '👥 Vida Profissional',
        'prevencao_infeccoes': '🦠 Controle de Infecção',
        'avaliacao_riscos': '⚠️ Avaliação de Riscos'
    };
    
    let html = `
        <h1 class="page-title">${areas[areaId]}</h1>
        <h3 style="margin-bottom: 15px;">
            <i class="fas fa-podcast"></i> Podcasts Educativos
        </h3>
    `;
    
    podcasts.forEach((podcast, index) => {
        html += `
            <div class="content-section" style="margin-bottom: 15px;">
                <h4 style="margin: 0 0 10px 0; font-size: 0.95rem;">
                    <i class="fas fa-microphone"></i> ${podcast.nome}
                </h4>
                <audio controls style="width: 100%;">
                    <source src="${podcast.arquivo}" type="audio/mp4">
                    Seu navegador não suporta o elemento de áudio.
                </audio>
            </div>
        `;
    });
    
    const pageContent = document.getElementById('page-content');
    const headerTitle = document.getElementById('header-title');
    
    pageContent.innerHTML = html;
    headerTitle.textContent = areas[areaId];
    pageContent.scrollTop = 0;
    
    // Atualizar navegação
    navigationStack.push(`podcasts_${areaId}`);
    document.getElementById('back-button').style.display = 'block';
}

// Exportar funções globais
window.renderPainelPrincipal = renderPainelPrincipal;
window.loadPainelDashboard = loadPainelDashboard;
window.showPodcastsArea = showPodcastsArea;
window.PODCASTS_POR_AREA = PODCASTS_POR_AREA;
window.ROPS_POR_AREA = ROPS_POR_AREA;

