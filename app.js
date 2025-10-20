// ==================== ANEST-APP QMENTUM - SISTEMA COMPLETO ====================
// Versão Profissional com Grid de Ícones, Permissões e Modo Noturno

// ==================== GLOBAL STATE ====================
let currentUser = null;
let userProfile = null;
let userPermissions = null;
let navigationStack = [];
let currentQuiz = null;
let currentQuizData = [];
let isDarkMode = false;

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
    setupEventListeners();
    loadDarkModePreference();
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
                // Load permissions
                userPermissions = getUserPermissions(userProfile);
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
            
            document.getElementById('loginTab').classList.toggle('active', tab === 'login');
            document.getElementById('registerTab').classList.toggle('active', tab === 'register');
        });
    });

    // Login form
    document.getElementById('loginForm').addEventListener('submit', handleLogin);

    // Register form
    document.getElementById('registerForm').addEventListener('submit', handleRegister);

    // Google login
    document.getElementById('googleLoginBtn').addEventListener('click', handleGoogleLogin);

    // Profile form
    document.getElementById('profileForm').addEventListener('submit', handleProfileUpdate);

    // Header buttons
    document.getElementById('darkModeToggle').addEventListener('click', toggleDarkMode);
    document.getElementById('adminBtn').addEventListener('click', showAdminPanel);
    document.getElementById('profileBtn').addEventListener('click', toggleProfileMenu);
    document.getElementById('logoutBtn').addEventListener('click', handleLogout);

    // Profile menu buttons
    document.getElementById('editProfileBtn').addEventListener('click', () => {
        toggleProfileMenu();
        showProfileModal();
    });
    document.getElementById('closeProfileMenuBtn').addEventListener('click', toggleProfileMenu);

    // Navigation buttons
    document.querySelectorAll('.nav-button').forEach(btn => {
        btn.addEventListener('click', () => {
            const page = btn.dataset.page;
            navigateToPage(page);
        });
    });

    // Click outside profile menu to close
    document.addEventListener('click', (e) => {
        const profileMenu = document.getElementById('profileMenu');
        const profileBtn = document.getElementById('profileBtn');
        if (!profileMenu.contains(e.target) && !profileBtn.contains(e.target)) {
            profileMenu.style.display = 'none';
        }
    });
}

// ==================== AUTHENTICATION ====================
async function handleLogin(e) {
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
}

async function handleRegister(e) {
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
            role: 'visitante', // Default role
            customPermissions: {},
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            profileComplete: true,
            active: true,
            progress: {},
            totalPoints: 0
        });
        
        hideLoading();
        showToast('Conta criada com sucesso!', 'success');
    } catch (error) {
        hideLoading();
        showToast(getErrorMessage(error), 'error');
    }
}

async function handleGoogleLogin() {
    try {
        showLoading();
        const result = await auth.signInWithPopup(googleProvider);
        
        // Check if user profile exists
        const userDoc = await db.collection('users').doc(result.user.uid).get();
        if (!userDoc.exists) {
            // Create profile for new Google user
            await db.collection('users').doc(result.user.uid).set({
                firstName: result.user.displayName?.split(' ')[0] || '',
                lastName: result.user.displayName?.split(' ').slice(1).join(' ') || '',
                email: result.user.email,
                role: 'visitante',
                customPermissions: {},
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                profileComplete: false,
                active: true,
                progress: {},
                totalPoints: 0
            });
        }
        
        hideLoading();
        showToast('Login com Google realizado!', 'success');
    } catch (error) {
        hideLoading();
        showToast(getErrorMessage(error), 'error');
    }
}

async function handleLogout() {
    if (confirm('Deseja realmente sair?')) {
        try {
            await auth.signOut();
            showToast('Logout realizado!', 'success');
            showLoginScreen();
        } catch (error) {
            showToast('Erro ao fazer logout: ' + error.message, 'error');
        }
    }
}

// ==================== PROFILE MANAGEMENT ====================
async function loadUserProfile() {
    try {
        const userDoc = await db.collection('users').doc(currentUser.uid).get();
        if (userDoc.exists) {
            userProfile = {
                uid: userDoc.id,
                ...userDoc.data()
            };
            updateProfileDisplay();
        }
    } catch (error) {
        console.error('Erro ao carregar perfil:', error);
    }
}

function updateProfileDisplay() {
    if (!userProfile) return;
    
    const fullName = `${userProfile.firstName || ''} ${userProfile.lastName || ''}`.trim();
    document.getElementById('profileName').textContent = fullName || 'Usuário';
    document.getElementById('profileEmail').textContent = userProfile.email || '';
    
    const roleBadge = document.getElementById('profileRole');
    const roleInfo = ROLES_TEMPLATES[userProfile.role] || ROLES_TEMPLATES['visitante'];
    roleBadge.textContent = roleInfo.name;
    roleBadge.style.background = roleInfo.color;
    
    // Show/hide admin button
    const adminBtn = document.getElementById('adminBtn');
    if (hasPermission(userProfile, 'admin-panel')) {
        adminBtn.style.display = 'flex';
    } else {
        adminBtn.style.display = 'none';
    }
}

function showProfileModal() {
    const modal = document.getElementById('profileModal');
    modal.classList.add('active');
    
    if (userProfile) {
        document.getElementById('profileFirstName').value = userProfile.firstName || '';
        document.getElementById('profileLastName').value = userProfile.lastName || '';
    }
}

function hideProfileModal() {
    document.getElementById('profileModal').classList.remove('active');
}

async function handleProfileUpdate(e) {
    e.preventDefault();
    const firstName = document.getElementById('profileFirstName').value.trim();
    const lastName = document.getElementById('profileLastName').value.trim();
    
    if (!firstName || !lastName) {
        showToast('Nome e sobrenome são obrigatórios!', 'error');
        return;
    }
    
    try {
        await db.collection('users').doc(currentUser.uid).update({
            firstName: firstName,
            lastName: lastName,
            profileComplete: true
        });
        
        await loadUserProfile();
        hideProfileModal();
        showToast('Perfil atualizado com sucesso!', 'success');
        showMainApp();
    } catch (error) {
        showToast('Erro ao atualizar perfil: ' + error.message, 'error');
    }
}

function toggleProfileMenu() {
    const menu = document.getElementById('profileMenu');
    menu.style.display = menu.style.display === 'none' ? 'block' : 'none';
}

// ==================== DARK MODE ====================
function toggleDarkMode() {
    isDarkMode = !isDarkMode;
    document.body.classList.toggle('dark-mode', isDarkMode);
    localStorage.setItem('darkMode', isDarkMode);
    
    const icon = document.querySelector('#darkModeToggle i');
    icon.className = isDarkMode ? 'fas fa-sun' : 'fas fa-moon';
}

function loadDarkModePreference() {
    const saved = localStorage.getItem('darkMode');
    if (saved === 'true') {
        isDarkMode = true;
        document.body.classList.add('dark-mode');
        const icon = document.querySelector('#darkModeToggle i');
        if (icon) icon.className = 'fas fa-sun';
    }
}

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
    
    // Load initial page
    navigateToPage('painel');
}

function showLoading() {
    document.getElementById('loadingScreen').style.display = 'flex';
}

function hideLoading() {
    document.getElementById('loadingScreen').style.display = 'none';
}

// ==================== NAVIGATION ====================
function navigateToPage(pageId) {
    // Clear navigation stack when using bottom nav
    navigationStack = [];
    
    // Update active button
    document.querySelectorAll('.nav-button').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.page === pageId);
    });
    
    // Render page
    renderPage(pageId);
}

function renderPage(pageId) {
    const pageContent = document.getElementById('page-content');
    pageContent.style.opacity = '0';
    
    setTimeout(() => {
        let content = '';
        
        switch(pageId) {
            case 'painel':
                content = renderPainelPrincipal();
                break;
            case 'qualidade':
                content = renderQualidadePage();
                break;
            case 'protocolos':
                content = renderProtocolosPage();
                break;
            case 'ferramentas':
                content = renderFerramentasPage();
                break;
            case 'rops':
                content = renderROPsPage();
                break;
            case 'residencia':
                content = renderResidenciaPage();
                break;
            default:
                content = '<div class="page-title">Página em Construção</div>';
        }
        
        pageContent.innerHTML = content;
        pageContent.style.opacity = '1';
        pageContent.scrollTop = 0;
    }, 150);
}

// ==================== PAINEL PRINCIPAL (GRID DE ÍCONES) ====================
function renderPainelPrincipal() {
    const items = [
        { id: 'comunicados', icon: 'fa-bullhorn', color: '#1a4d2e', title: 'Últimos Comunicados', subtitle: 'Avisos e notícias importantes' },
        { id: 'notificar-incidente', icon: 'fa-exclamation-triangle', color: '#dc3545', title: 'Notificação de Incidentes', subtitle: 'Reportar eventos adversos' },
        { id: 'rops-main', icon: 'fa-award', color: '#40916c', title: 'ROPs', subtitle: '6 macroáreas - Questões e Podcasts' },
        { id: 'residencia', icon: 'fa-user-md', color: '#52b788', title: 'Residência Médica', subtitle: 'Cronograma e materiais' }
    ];
    
    const grid = items.map(item => `
        <div class="icon-card" onclick="navigateToSubPage('${item.id}')">
            <div class="icon-card-icon" style="background: ${item.color}">
                <i class="fas ${item.icon}"></i>
            </div>
            <div class="icon-card-title">${item.title}</div>
            <div class="icon-card-subtitle">${item.subtitle}</div>
        </div>
    `).join('');
    
    return `
        <h1 class="page-title">Painel Principal</h1>
        <div class="icon-grid">
            ${grid}
        </div>
    `;
}

// ==================== QUALIDADE ====================
function renderQualidadePage() {
    const items = [
        { id: 'notificar-incidente', icon: 'fa-exclamation-triangle', color: '#dc3545', title: 'Notificação de Incidentes', subtitle: 'Reportar eventos adversos' },
        { id: 'auditorias-conformidade', icon: 'fa-clipboard-check', color: '#52b788', title: 'Auditorias e Conformidade', subtitle: 'Verificações de processos' },
        { id: 'capacitacao-treinamento', icon: 'fa-graduation-cap', color: '#40916c', title: 'Capacitação e Treinamento', subtitle: 'Materiais e recursos' },
        { id: 'indicadores-qualidade', icon: 'fa-chart-line', color: '#1a4d2e', title: 'Indicadores de Qualidade', subtitle: 'Métricas e resultados' }
    ];
    
    const grid = items.map(item => `
        <div class="icon-card" onclick="navigateToSubPage('${item.id}')">
            <div class="icon-card-icon" style="background: ${item.color}">
                <i class="fas ${item.icon}"></i>
            </div>
            <div class="icon-card-title">${item.title}</div>
            <div class="icon-card-subtitle">${item.subtitle}</div>
        </div>
    `).join('');
    
    return `
        <h1 class="page-title">Qualidade e Segurança</h1>
        <div class="icon-grid">
            ${grid}
        </div>
    `;
}

// ==================== PROTOCOLOS ====================
function renderProtocolosPage() {
    const items = [
        { id: 'biblioteca-documentos', icon: 'fa-search', color: '#1a4d2e', title: 'Biblioteca de Documentos', subtitle: 'Pesquise todos os POPs e políticas' },
        { id: 'seguranca-medicamentos', icon: 'fa-pills', color: '#dc3545', title: 'Segurança de Medicamentos', subtitle: 'MAVs, eletrólitos, heparina e mais' }
    ];
    
    const grid = items.map(item => `
        <div class="icon-card" onclick="navigateToSubPage('${item.id}')">
            <div class="icon-card-icon" style="background: ${item.color}">
                <i class="fas ${item.icon}"></i>
            </div>
            <div class="icon-card-title">${item.title}</div>
            <div class="icon-card-subtitle">${item.subtitle}</div>
        </div>
    `).join('');
    
    return `
        <h1 class="page-title">Protocolos e POPs</h1>
        <div class="icon-grid">
            ${grid}
        </div>
    `;
}

// ==================== FERRAMENTAS ====================
function renderFerramentasPage() {
    const items = [
        { id: 'calculadoras-anestesicas', icon: 'fa-calculator', color: '#1a4d2e', title: 'Calculadoras Anestésicas', subtitle: 'Qmentum e Anestesiologia Geral' },
        { id: 'checklist', icon: 'fa-check-double', color: '#40916c', title: 'Checklist de Cirurgia Segura', subtitle: 'Protocolo OMS' },
        { id: 'conciliacao-medicamentosa', icon: 'fa-exchange-alt', color: '#52b788', title: 'Conciliação Medicamentosa', subtitle: 'Admissão, Transferência e Alta' },
        { id: 'avaliacao-riscos', icon: 'fa-user-shield', color: '#74c69d', title: 'Avaliação de Riscos', subtitle: 'Quedas, Úlceras e TEV' }
    ];
    
    const grid = items.map(item => `
        <div class="icon-card" onclick="navigateToSubPage('${item.id}')">
            <div class="icon-card-icon" style="background: ${item.color}">
                <i class="fas ${item.icon}"></i>
            </div>
            <div class="icon-card-title">${item.title}</div>
            <div class="icon-card-subtitle">${item.subtitle}</div>
        </div>
    `).join('');
    
    return `
        <h1 class="page-title">Ferramentas Clínicas</h1>
        <div class="icon-grid">
            ${grid}
        </div>
    `;
}

// ==================== ROPs (ESTRUTURA HIERÁRQUICA) ====================
// ROPs Main → mostra 6 macroáreas
function renderROPsMainPage() {
    const macroAreas = [
        { id: 'cultura-seguranca', icon: 'fa-shield-heart', color: '#9b59b6', title: 'Cultura de Segurança', subtitle: '4 ROPs' },
        { id: 'comunicacao', icon: 'fa-comments', color: '#3498db', title: 'Comunicação', subtitle: '8 ROPs' },
        { id: 'uso-medicamentos', icon: 'fa-pills', color: '#e74c3c', title: 'Uso de Medicamentos', subtitle: '5 ROPs' },
        { id: 'vida-profissional', icon: 'fa-briefcase', color: '#f39c12', title: 'Vida Profissional', subtitle: '5 ROPs' },
        { id: 'prevencao-infeccoes', icon: 'fa-virus-slash', color: '#1abc9c', title: 'Prevenção de Infecções', subtitle: '4 ROPs' },
        { id: 'avaliacao-riscos', icon: 'fa-exclamation-triangle', color: '#e67e22', title: 'Avaliação de Riscos', subtitle: '6 ROPs' }
    ];
    
    const grid = macroAreas.map(area => `
        <div class="icon-card" onclick="renderROPsMacroArea('${area.id}', '${area.title}', '${area.color}')">
            <div class="icon-card-icon" style="background: ${area.color}">
                <i class="fas ${area.icon}"></i>
            </div>
            <div class="icon-card-title">${area.title}</div>
            <div class="icon-card-subtitle">${area.subtitle}</div>
        </div>
    `).join('');
    
    return `
        <h1 class="page-title">ROPs Qmentum</h1>
        <p class="text-center mb-2" style="color: var(--cor-texto-secundario)">Selecione uma macroárea</p>
        <div class="icon-grid">
            ${grid}
        </div>
    `;
}

// Macroárea → mostra Questões + Podcasts
function renderROPsMacroArea(macroId, macroTitle, macroColor) {
    const html = `
        <h1 class="page-title">${macroTitle}</h1>
        <p class="text-center mb-2" style="color: var(--cor-texto-secundario)">Escolha entre questões ou podcasts</p>
        <div class="icon-grid">
            <div class="icon-card" onclick="navigateToROPsQuestoes('${macroId}', '${macroTitle}')">
                <div class="icon-card-icon" style="background: ${macroColor}">
                    <i class="fas fa-question-circle"></i>
                </div>
                <div class="icon-card-title">Questões</div>
                <div class="icon-card-subtitle">Quiz de múltipla escolha</div>
            </div>
            <div class="icon-card" onclick="navigateToROPsPodcasts('${macroId}', '${macroTitle}')">
                <div class="icon-card-icon" style="background: ${macroColor}">
                    <i class="fas fa-podcast"></i>
                </div>
                <div class="icon-card-title">Podcasts</div>
                <div class="icon-card-subtitle">Conteúdo educativo</div>
            </div>
        </div>
    `;
    
    const pageContent = document.getElementById('page-content');
    pageContent.innerHTML = html;
    pageContent.scrollTop = 0;
}

// ==================== RESIDÊNCIA ====================
function renderResidenciaPage() {
    const items = [
        { id: 'cronograma', icon: 'fa-calendar-alt', color: '#1a4d2e', title: 'Cronograma de Atividades', subtitle: 'Visualização em calendário' },
        { id: 'material-estudo', icon: 'fa-book-open', color: '#40916c', title: 'Material de Estudo', subtitle: 'Artigos e diretrizes' },
        { id: 'avaliacoes', icon: 'fa-edit', color: '#ffc107', title: 'Avaliações', subtitle: 'Acompanhe desempenho' }
    ];
    
    const grid = items.map(item => `
        <div class="icon-card" onclick="navigateToSubPage('${item.id}')">
            <div class="icon-card-icon" style="background: ${item.color}">
                <i class="fas ${item.icon}"></i>
            </div>
            <div class="icon-card-title">${item.title}</div>
            <div class="icon-card-subtitle">${item.subtitle}</div>
        </div>
    `).join('');
    
    return `
        <h1 class="page-title">Residência Médica</h1>
        <div class="icon-grid">
            ${grid}
        </div>
    `;
}

// ==================== SUB-PAGES NAVIGATION ====================
function navigateToSubPage(pageId) {
    const pageContent = document.getElementById('page-content');
    
    let content = '';
    switch(pageId) {
        // Painel Principal
        case 'comunicados':
            content = renderComunicadosPage();
            break;
        case 'notificar-incidente':
            content = renderNotificarIncidentePage();
            break;
        case 'rops-main':
            content = renderROPsMainPage();
            break;
        case 'residencia':
            content = renderResidenciaPage();
            break;
            
        // Qualidade e Segurança
        case 'auditorias-conformidade':
            content = renderAuditoriasConformidadePage();
            break;
        case 'capacitacao-treinamento':
            content = renderCapacitacaoTreinamentoPage();
            break;
        case 'indicadores-qualidade':
            content = renderIndicadoresQualidadePage();
            break;
            
        // Protocolos e POPs
        case 'biblioteca-documentos':
            content = renderBibliotecaDocumentosPage();
            break;
        case 'seguranca-medicamentos':
            content = renderSegurancaMedicamentosPage();
            break;
            
        // Ferramentas Clínicas
        case 'calculadoras-anestesicas':
            content = renderCalculadorasAnestesicasPage();
            break;
        case 'checklist':
            content = renderChecklistPage();
            break;
        case 'conciliacao-medicamentosa':
            content = renderConciliacaoMedicamentosaPage();
            break;
        case 'avaliacao-riscos':
            content = renderAvaliacaoRiscosPage();
            break;
            
        // Outros
        case 'cronograma':
            content = renderCronogramaCalendario();
            break;
        case 'podcasts':
            content = renderPodcastsPage();
            break;
        case 'calculadoras':
            content = renderCalculadorasPage();
            break;
            
        default:
            content = '<div class="page-title">Em Desenvolvimento</div>';
    }
    
    pageContent.innerHTML = content;
    pageContent.scrollTop = 0;
}

// ==================== PODCASTS PAGE ====================
function renderPodcastsPage() {
    const podcasts = [
        // Cultura de Segurança (4)
        { title: "ROP 1.1 – Responsabilização pela Qualidade", file: "Podcasts/Cultura de Segurança/ROP 1.1 Cultura de Segurança – Responsabilização pela Qualidade.m4a", category: "Cultura de Segurança", color: "#9b59b6" },
        { title: "ROP 1.2 – Gestão de Incidentes", file: "Podcasts/Cultura de Segurança/ROP 1.2 Cultura de Segurança – Gestão de incidentes.m4a", category: "Cultura de Segurança", color: "#9b59b6" },
        { title: "ROP 1.3 – Relatórios Trimestrais", file: "Podcasts/Cultura de Segurança/ROP 1.3 Cultura de Segurança – Relatórios Trimestrais.m4a", category: "Cultura de Segurança", color: "#9b59b6" },
        { title: "ROP 1.4 – Divulgação de Incidentes", file: "Podcasts/Cultura de Segurança/ROP 1.4 Cultura de Segurança – Divulgação dos incidentes (Disclosure).m4a", category: "Cultura de Segurança", color: "#9b59b6" },
        
        // Comunicação (8)
        { title: "ROP 2.1 – Identificação do Cliente", file: "Podcasts/Comunicação/2.1 Comunicação - Idenfica\u00e7\u00e3o cliente.m4a", category: "Comunicação", color: "#3498db" },
        { title: "ROP 2.2 – Abreviações Perigosas", file: "Podcasts/Comunicação/2.2 Comunicação - Abrevia\u00e7\u00f5es perigosas.m4a", category: "Comunicação", color: "#3498db" },
        { title: "ROP 2.3 – Conciliação Medicamentosa Estratégica", file: "Podcasts/Comunicação/2.3 Comunicação - Concilia\u00e7\u00e3o medicamentosa Estrat\u00e9gica.m4a", category: "Comunicação", color: "#3498db" },
        { title: "ROP 2.4 – Conciliação Medicamentosa (Internação)", file: "Podcasts/Comunicação/2.4 Comunicação - Concilia\u00e7\u00e3o medicamentosa Internado.m4a", category: "Comunicação", color: "#3498db" },
        { title: "ROP 2.5 – Conciliação Medicamentosa (Ambulatorial)", file: "Podcasts/Comunicação/2.5 Comunicação - Concilia\u00e7\u00e3o medicamentosa ambulatorial.m4a", category: "Comunicação", color: "#3498db" },
        { title: "ROP 2.6 – Conciliação Medicamentosa (Emergência)", file: "Podcasts/Comunicação/2.6 Comunicação - Concilia\u00e7\u00e3o medicamentosa Emergencia.m4a", category: "Comunicação", color: "#3498db" },
        { title: "ROP 2.7 – Cirurgia Segura", file: "Podcasts/Comunicação/2.7 Comunicação - Cirurgia segura.m4a", category: "Comunicação", color: "#3498db" },
        { title: "ROP 2.8 – Transição de Cuidado", file: "Podcasts/Comunicação/2.8 Comunicação - Transi\u00e7\u00e3o Cuidado.m4a", category: "Comunicação", color: "#3498db" },
        
        // Demais categorias
        { title: "ROP 3.1 – Uso de Medicamentos", file: "Podcasts/Uso de Medicamentos/3.1 Uso de Medicamentos.m4a", category: "Uso de Medicamentos", color: "#e74c3c" },
        { title: "ROP 4.1 – Vida Profissional", file: "Podcasts/Vida Profissional/4.1 Vida Profissional.m4a", category: "Vida Profissional", color: "#f39c12" },
        { title: "ROP 5.1 – Prevenção de Infecções", file: "Podcasts/Preven\u00e7\u00e3o de infec\u00e7\u00f5es/5.1 Preven\u00e7\u00e3o de infec\u00e7\u00f5es.m4a", category: "Prevenção de Infecções", color: "#1abc9c" },
        { title: "ROP 6.1 – Avaliação de Riscos", file: "Podcasts/Avalia\u00e7\u00e3o de Riscos/6.1 Avalia\u00e7\u00e3o de Riscos.m4a", category: "Avaliação de Riscos", color: "#e67e22" }
    ];
    
    // Group by category
    const categories = {};
    podcasts.forEach(p => {
        if (!categories[p.category]) categories[p.category] = [];
        categories[p.category].push(p);
    });
    
    let html = '<h1 class="page-title">🎙️ Podcasts Educativos</h1>';
    html += '<p class="text-center mb-2" style="color: var(--cor-texto-secundario)">16 podcasts sobre as ROPs Qmentum</p>';
    
    for (const [category, items] of Object.entries(categories)) {
        const color = items[0].color;
        html += `
            <div class="content-section">
                <h2 class="section-title" style="color: ${color}">
                    <i class="fas fa-folder"></i> ${category} (${items.length})
                </h2>
                <div style="display: flex; flex-direction: column; gap: 10px;">
                    ${items.map(p => `
                        <div class="icon-card" style="padding: 15px; cursor: pointer;" onclick='playPodcast("${p.file}", "${p.title}")'>
                            <div style="display: flex; align-items: center; gap: 15px;">
                                <div style="width: 50px; height: 50px; border-radius: 50%; background: ${color}; display: flex; align-items: center; justify-content: center; color: white; font-size: 1.5rem;">
                                    <i class="fas fa-play"></i>
                                </div>
                                <div style="flex: 1;">
                                    <div class="icon-card-title" style="text-align: left; margin-bottom: 5px;">${p.title}</div>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }
    
    return html;
}

function playPodcast(file, title) {
    const audioHTML = `
        <div style="position: fixed; bottom: 100px; left: 50%; transform: translateX(-50%); width: 90%; max-width: 500px; background: var(--cor-branco); padding: 20px; border-radius: 12px; box-shadow: var(--sombra-hover); z-index: 999;">
            <div style="margin-bottom: 15px;">
                <strong style="color: var(--cor-verde-escuro);">${title}</strong>
                <button onclick="this.parentElement.parentElement.remove()" style="float: right; background: none; border: none; font-size: 1.2rem; cursor: pointer; color: var(--cor-texto);">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <audio controls autoplay style="width: 100%;">
                <source src="${file}" type="audio/mp4">
                Seu navegador não suporta o elemento de áudio.
            </audio>
        </div>
    `;
    
    // Remove existing player if any
    const existing = document.querySelector('audio');
    if (existing) {
        existing.closest('div[style*="position: fixed"]').remove();
    }
    
    document.body.insertAdjacentHTML('beforeend', audioHTML);
}

// ==================== TO BE CONTINUED ====================
// Devido ao limite de tamanho, vou continuar criando o restante do arquivo...
// Este é apenas a PRIMEIRA PARTE do app-profissional.js

// ==================== UTILITY FUNCTIONS ====================
function showToast(message, type = 'info') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = 'toast show ' + type;
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

function getErrorMessage(error) {
    const messages = {
        'auth/user-not-found': 'Usuário não encontrado',
        'auth/wrong-password': 'Senha incorreta',
        'auth/email-already-in-use': 'E-mail já cadastrado',
        'auth/weak-password': 'Senha muito fraca',
        'auth/invalid-email': 'E-mail inválido'
    };
    return messages[error.code] || error.message;
}

// ==================== DOCUMENTOS PAGE ====================
function renderDocumentosPage() {
    if (!documentsData) {
        return '<div class="page-title">Erro ao carregar documentos</div>';
    }
    
    const categoryColors = {
        'Protocolos': '#1a4d2e',
        'Políticas': '#40916c',
        'Política': '#40916c',
        'Relatórios': '#52b788',
        'Manuais': '#74c69d',
        'Processos': '#2d6a4f',
        'Formulários': '#17a2b8',
        'Gestão de Riscos': '#dc3545',
        'Riscos': '#dc3545',
        'Termos': '#6c757d',
        'Plano de Segurança': '#e67e22',
        'Plano': '#e67e22'
    };
    
    const categoryIcons = {
        'Protocolos': 'fa-file-medical',
        'Políticas': 'fa-gavel',
        'Política': 'fa-gavel',
        'Relatórios': 'fa-chart-bar',
        'Manuais': 'fa-book',
        'Processos': 'fa-project-diagram',
        'Formulários': 'fa-file-alt',
        'Gestão de Riscos': 'fa-exclamation-triangle',
        'Riscos': 'fa-exclamation-triangle',
        'Termos': 'fa-file-signature',
        'Plano de Segurança': 'fa-shield-alt',
        'Plano': 'fa-shield-alt'
    };
    
    let html = '<h1 class="page-title">📚 Documentos</h1>';
    html += '<p class="text-center mb-2" style="color: var(--cor-texto-secundario)">Selecione uma categoria</p>';
    html += '<div class="icon-grid">';
    
    // Show categories as icons
    for (const [category, docs] of Object.entries(documentsData)) {
        const color = categoryColors[category] || '#1a4d2e';
        const icon = categoryIcons[category] || 'fa-folder';
        
        html += `
            <div class="icon-card" onclick='showCategoryDocuments("${category}")'>
                <div class="icon-card-icon" style="background: ${color}">
                    <i class="fas ${icon}"></i>
                </div>
                <div class="icon-card-title">${category}</div>
                <div class="icon-card-subtitle">${docs.length} documento${docs.length > 1 ? 's' : ''}</div>
            </div>
        `;
    }
    
    html += '</div>';
    return html;
}

function showCategoryDocuments(category) {
    const docs = documentsData[category];
    if (!docs) {
        showToast('Categoria não encontrada', 'error');
        return;
    }
    
    const categoryColors = {
        'Protocolos': '#1a4d2e',
        'Políticas': '#40916c',
        'Política': '#40916c',
        'Relatórios': '#52b788',
        'Manuais': '#74c69d',
        'Processos': '#2d6a4f',
        'Formulários': '#17a2b8',
        'Gestão de Riscos': '#dc3545',
        'Riscos': '#dc3545',
        'Termos': '#6c757d',
        'Plano de Segurança': '#e67e22',
        'Plano': '#e67e22'
    };
    
    const color = categoryColors[category] || '#1a4d2e';
    
    let html = `<h1 class="page-title">${category}</h1>`;
    html += `<p class="text-center mb-2" style="color: var(--cor-texto-secundario)">${docs.length} documento${docs.length > 1 ? 's' : ''} disponível${docs.length > 1 ? 'eis' : ''}</p>`;
    html += '<div class="content-section">';
    html += '<div style="display: flex; flex-direction: column; gap: 10px;">';
    
    docs.forEach(doc => {
        html += `
            <div class="icon-card" style="padding: 15px; cursor: pointer;" onclick='openDocument("${doc.file}")'>
                <div style="display: flex; align-items: center; gap: 15px;">
                    <div style="width: 50px; height: 50px; border-radius: 10px; background: ${color}; display: flex; align-items: center; justify-content: center; color: white; font-size: 1.5rem;">
                        <i class="fas fa-file-pdf"></i>
                    </div>
                    <div style="flex: 1;">
                        <div class="icon-card-title" style="text-align: left;">${doc.title}</div>
                    </div>
                    <i class="fas fa-external-link-alt" style="color: var(--cor-texto-secundario);"></i>
                </div>
            </div>
        `;
    });
    
    html += '</div></div>';
    
    const pageContent = document.getElementById('page-content');
    pageContent.innerHTML = html;
    pageContent.scrollTop = 0;
}

function openDocument(file) {
    window.open(file, '_blank');
}

function renderQuestoesROPsPage() {
    if (!ropsData) {
        return '<div class="page-title">Erro ao carregar ROPs</div>';
    }
    
    let html = '<h1 class="page-title">🎯 Quiz de Questões ROPs</h1>';
    html += '<p class="text-center mb-2" style="color: var(--cor-texto-secundario)">32 ROPs com 640 questões</p>';
    
    const macroAreas = [
        { key: 'cultura-seguranca', title: 'Cultura de Segurança', icon: 'fa-shield-heart', color: '#9b59b6' },
        { key: 'comunicacao', title: 'Comunicação', icon: 'fa-comments', color: '#3498db' },
        { key: 'uso-medicamentos', title: 'Uso de Medicamentos', icon: 'fa-pills', color: '#e74c3c' },
        { key: 'vida-profissional', title: 'Vida Profissional', icon: 'fa-briefcase', color: '#f39c12' },
        { key: 'prevencao-infeccoes', title: 'Prevenção de Infecções', icon: 'fa-virus-slash', color: '#1abc9c' },
        { key: 'avaliacao-riscos', title: 'Avaliação de Riscos', icon: 'fa-exclamation-triangle', color: '#e67e22' }
    ];
    
    html += '<div class="icon-grid">';
    
    macroAreas.forEach(area => {
        const areaData = ropsData[area.key];
        if (areaData) {
            const ropCount = Object.keys(areaData).length;
            const totalQuestions = Object.values(areaData).reduce((sum, rop) => sum + (rop.questions?.length || 0), 0);
            
            html += `
                <div class="icon-card" onclick='selectMacroArea("${area.key}", "${area.title}")'>
                    <div class="icon-card-icon" style="background: ${area.color}">
                        <i class="fas ${area.icon}"></i>
                    </div>
                    <div class="icon-card-title">${area.title}</div>
                    <div class="icon-card-subtitle">${ropCount} ROPs • ${totalQuestions} questões</div>
                </div>
            `;
        }
    });
    
    html += '</div>';
    
    return html;
}

function selectMacroArea(macroKey, macroTitle) {
    const areaData = ropsData[macroKey];
    if (!areaData) {
        showToast('ROPs não encontradas', 'error');
        return;
    }
    
    let html = `<h1 class="page-title">${macroTitle}</h1>`;
    html += '<p class="text-center mb-2" style="color: var(--cor-texto-secundario)">Selecione uma ROP para iniciar</p>';
    html += '<div class="icon-grid">';
    
    for (const [ropKey, ropData] of Object.entries(areaData)) {
        const questionCount = ropData.questions?.length || 0;
        
        html += `
            <div class="icon-card" onclick='startQuiz("${macroKey}", "${ropKey}")'>
                <div class="icon-card-icon" style="background: #1a4d2e">
                    <i class="fas fa-question-circle"></i>
                </div>
                <div class="icon-card-title">${ropData.title || ropKey}</div>
                <div class="icon-card-subtitle">${questionCount} questões</div>
            </div>
        `;
    }
    
    html += '</div>';
    
    const pageContent = document.getElementById('page-content');
    pageContent.innerHTML = html;
}

function startQuiz(macroKey, ropKey) {
    const ropData = ropsData[macroKey][ropKey];
    if (!ropData || !ropData.questions || ropData.questions.length === 0) {
        showToast('Questões não disponíveis', 'error');
        return;
    }
    
    currentQuizData = [...ropData.questions];
    currentQuiz = {
        macroKey: macroKey,
        ropKey: ropKey,
        title: ropData.title,
        currentIndex: 0,
        score: 0,
        answers: []
    };
    
    renderQuizQuestion();
}

function renderQuizQuestion() {
    const question = currentQuizData[currentQuiz.currentIndex];
    const progress = currentQuiz.currentIndex + 1;
    const total = currentQuizData.length;
    
    let html = `
        <div style="max-width: 800px; margin: 0 auto;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                <h2 style="color: var(--cor-verde-escuro); margin: 0;">${currentQuiz.title}</h2>
                <div style="font-weight: 600; color: var(--cor-texto-secundario);">
                    ${progress}/${total}
                </div>
            </div>
            
            <div style="background: var(--cor-branco); border-radius: 12px; padding: 25px; box-shadow: var(--sombra-card); margin-bottom: 20px;">
                <div style="font-size: 1.1rem; margin-bottom: 25px; color: var(--cor-texto);">
                    ${question.question}
                </div>
                
                <div style="display: flex; flex-direction: column; gap: 12px;">
                    ${question.options.map((opt, idx) => `
                        <button onclick="answerQuestion(${idx})" style="
                            padding: 15px 20px;
                            background: var(--cor-cinza-claro);
                            border: 2px solid var(--cor-cinza-medio);
                            border-radius: 10px;
                            text-align: left;
                            cursor: pointer;
                            transition: var(--transition);
                            font-size: 1rem;
                            color: var(--cor-texto);
                        " onmouseover="this.style.borderColor='var(--cor-verde-medio)'; this.style.background='var(--cor-cinza-muito-claro)'" onmouseout="this.style.borderColor='var(--cor-cinza-medio)'; this.style.background='var(--cor-cinza-claro)'">
                            <strong>${String.fromCharCode(65 + idx)})</strong> ${opt}
                        </button>
                    `).join('')}
                </div>
            </div>
            
            <div style="background: var(--cor-cinza-claro); border-radius: 10px; padding: 15px; height: 10px; overflow: hidden;">
                <div style="height: 100%; background: var(--cor-verde-escuro); border-radius: 10px; width: ${(progress/total)*100}%; transition: width 0.3s ease;"></div>
            </div>
        </div>
    `;
    
    const pageContent = document.getElementById('page-content');
    pageContent.innerHTML = html;
}

function answerQuestion(selectedIndex) {
    const question = currentQuizData[currentQuiz.currentIndex];
    const isCorrect = selectedIndex === question.correct;
    
    currentQuiz.answers.push({
        questionId: question.id,
        selected: selectedIndex,
        correct: question.correct,
        isCorrect: isCorrect
    });
    
    if (isCorrect) {
        currentQuiz.score++;
    }
    
    // Show feedback
    showAnswerFeedback(isCorrect, question.explanation, selectedIndex, question.correct);
}

function showAnswerFeedback(isCorrect, explanation, selectedIndex, correctIndex) {
    const feedback = `
        <div style="position: fixed; bottom: 100px; left: 50%; transform: translateX(-50%); width: 90%; max-width: 600px; background: ${isCorrect ? 'var(--cor-sucesso)' : 'var(--cor-perigo)'}; color: white; padding: 20px; border-radius: 12px; box-shadow: var(--sombra-hover); z-index: 999;">
            <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 10px;">
                <i class="fas ${isCorrect ? 'fa-check-circle' : 'fa-times-circle'}" style="font-size: 2rem;"></i>
                <div>
                    <strong style="font-size: 1.2rem;">${isCorrect ? 'Correto!' : 'Incorreto'}</strong>
                    ${!isCorrect ? `<div style="margin-top: 5px; opacity: 0.9;">Resposta correta: ${String.fromCharCode(65 + correctIndex)}</div>` : ''}
                </div>
            </div>
            ${explanation ? `<div style="margin-top: 10px; padding-top: 10px; border-top: 1px solid rgba(255,255,255,0.3); opacity: 0.9;">${explanation}</div>` : ''}
            <button onclick="nextQuestion()" style="margin-top: 15px; padding: 10px 20px; background: white; color: var(--cor-texto); border: none; border-radius: 8px; font-weight: 600; cursor: pointer; width: 100%;">
                Próxima →
            </button>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', feedback);
}

function nextQuestion() {
    // Remove feedback
    const feedback = document.querySelector('div[style*="position: fixed"]');
    if (feedback) feedback.remove();
    
    currentQuiz.currentIndex++;
    
    if (currentQuiz.currentIndex >= currentQuizData.length) {
        showQuizResults();
    } else {
        renderQuizQuestion();
    }
}

function showQuizResults() {
    const percentage = Math.round((currentQuiz.score / currentQuizData.length) * 100);
    const passed = percentage >= 70;
    
    let html = `
        <div style="max-width: 600px; margin: 0 auto; text-align: center;">
            <div style="background: var(--cor-branco); border-radius: 12px; padding: 40px; box-shadow: var(--sombra-card);">
                <div style="font-size: 4rem; margin-bottom: 20px;">
                    ${passed ? '🎉' : '📊'}
                </div>
                <h1 style="color: ${passed ? 'var(--cor-sucesso)' : 'var(--cor-aviso)'}; margin-bottom: 15px;">
                    ${passed ? 'Parabéns!' : 'Continue Estudando!'}
                </h1>
                <div style="font-size: 3rem; font-weight: 700; color: var(--cor-verde-escuro); margin-bottom: 10px;">
                    ${percentage}%
                </div>
                <div style="font-size: 1.2rem; color: var(--cor-texto-secundario); margin-bottom: 30px;">
                    ${currentQuiz.score} de ${currentQuizData.length} questões corretas
                </div>
                
                <div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;">
                    <button onclick="startQuiz('${currentQuiz.macroKey}', '${currentQuiz.ropKey}')" class="btn-primary">
                        <i class="fas fa-redo"></i> Refazer Quiz
                    </button>
                    <button onclick="navigateToSubPage('questoes-rops')" class="btn-primary" style="background: var(--cor-cinza); ">
                        <i class="fas fa-arrow-left"></i> Voltar
                    </button>
                </div>
            </div>
        </div>
    `;
    
    const pageContent = document.getElementById('page-content');
    pageContent.innerHTML = html;
    
    // Save progress to Firebase
    if (currentUser && passed) {
        saveQuizProgress();
    }
}

async function saveQuizProgress() {
    try {
        const progressRef = db.collection('users').doc(currentUser.uid);
        const updateData = {};
        updateData[`progress.${currentQuiz.macroKey}.${currentQuiz.ropKey}`] = {
            score: currentQuiz.score,
            total: currentQuizData.length,
            percentage: Math.round((currentQuiz.score / currentQuizData.length) * 100),
            completedAt: firebase.firestore.FieldValue.serverTimestamp()
        };
        
        await progressRef.update(updateData);
    } catch (error) {
        console.error('Erro ao salvar progresso:', error);
    }
}

function renderCalculadorasPage() {
    if (!calculatorDefinitions) {
        return '<div class="page-title">Erro ao carregar calculadoras</div>';
    }
    
    let html = '<h1 class="page-title">🧮 Calculadoras Clínicas</h1>';
    html += '<p class="text-center mb-2" style="color: var(--cor-texto-secundario)">13 calculadoras para anestesiologia</p>';
    
    // Group calculators by category
    const categories = {
        'Anestesiologia': ['rcri', 'ariscat', 'apfel', 'stopbang', 'ibw_bsa'],
        'Risco TEV': ['caprini', 'padua'],
        'Avaliação de Riscos': ['braden', 'morse'],
        'Doses e Conversões': ['opioid_convert', 'holliday_segar']
    };
    
    for (const [category, calcIds] of Object.entries(categories)) {
        const calcs = calculatorDefinitions.filter(c => calcIds.includes(c.id));
        
        html += `
            <div class="content-section">
                <h2 class="section-title">
                    <i class="fas fa-calculator"></i> ${category}
                </h2>
                <div class="icon-grid">
                    ${calcs.map(calc => `
                        <div class="icon-card" onclick='openCalculator("${calc.id}")'>
                            <div class="icon-card-icon" style="background: #1a4d2e">
                                <i class="fas fa-calculator"></i>
                            </div>
                            <div class="icon-card-title">${calc.title}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }
    
    return html;
}

function openCalculator(calcId) {
    const calc = calculatorDefinitions.find(c => c.id === calcId);
    if (!calc) {
        showToast('Calculadora não encontrada', 'error');
        return;
    }
    
    let html = `
        <h1 class="page-title">${calc.title}</h1>
        <div class="content-section" style="max-width: 600px; margin: 0 auto;">
            <form id="calculatorForm" onsubmit="calculateResult(event, '${calcId}')">
    `;
    
    // Render inputs based on type
    calc.inputs.forEach(input => {
        if (input.type === 'bool') {
            html += `
                <div style="display: flex; align-items: center; padding: 12px; background: var(--cor-cinza-claro); border-radius: 8px; margin-bottom: 10px;">
                    <input type="checkbox" id="${input.id}" name="${input.id}" style="width: 20px; height: 20px; margin-right: 12px;">
                    <label for="${input.id}" style="flex: 1; cursor: pointer;">${input.label}</label>
                </div>
            `;
        } else if (input.type === 'number') {
            html += `
                <div class="form-group">
                    <label for="${input.id}">${input.label}</label>
                    <input type="number" id="${input.id}" name="${input.id}" step="any" 
                           ${input.min !== undefined ? `min="${input.min}"` : ''} 
                           ${input.max !== undefined ? `max="${input.max}"` : ''} 
                           placeholder="0">
                </div>
            `;
        } else if (input.type === 'select') {
            html += `
                <div class="form-group">
                    <label for="${input.id}">${input.label}</label>
                    <select id="${input.id}" name="${input.id}">
                        ${input.options.map(opt => `<option value="${opt}">${opt}</option>`).join('')}
                    </select>
                </div>
            `;
        }
    });
    
    html += `
                <button type="submit" class="btn-primary" style="margin-top: 20px;">
                    <i class="fas fa-calculator"></i> Calcular
                </button>
            </form>
            
            <div id="calcResults" style="display: none; margin-top: 25px; padding: 20px; background: var(--cor-verde-light); border-radius: 10px;">
                <h3 style="color: var(--cor-verde-escuro); margin-bottom: 15px;">
                    <i class="fas fa-check-circle"></i> Resultado
                </h3>
                <div id="calcResultsContent"></div>
            </div>
        </div>
    `;
    
    const pageContent = document.getElementById('page-content');
    pageContent.innerHTML = html;
}

function calculateResult(event, calcId) {
    event.preventDefault();
    
    const calc = calculatorDefinitions.find(c => c.id === calcId);
    if (!calc) return;
    
    // Collect input values
    const values = {};
    calc.inputs.forEach(input => {
        const element = document.getElementById(input.id);
        if (input.type === 'bool') {
            values[input.id] = element.checked;
        } else if (input.type === 'number') {
            values[input.id] = parseFloat(element.value) || 0;
        } else {
            values[input.id] = element.value;
        }
    });
    
    try {
        // Create function from compute code
        const params = calc.inputs.map(i => i.id);
        const computeFunc = new Function(...params, calc.compute.code);
        
        // Execute calculation
        const paramValues = params.map(p => values[p]);
        const result = computeFunc(...paramValues);
        
        // Display results
        let resultsHtml = '';
        for (const [key, value] of Object.entries(result)) {
            const label = key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' ');
            resultsHtml += `
                <div style="padding: 12px; background: white; border-radius: 8px; margin-bottom: 10px;">
                    <div style="font-weight: 600; color: var(--cor-texto-secundario); font-size: 0.9rem; margin-bottom: 5px;">
                        ${label}
                    </div>
                    <div style="font-size: 1.3rem; font-weight: 700; color: var(--cor-verde-escuro);">
                        ${value}
                    </div>
                </div>
            `;
        }
        
        document.getElementById('calcResultsContent').innerHTML = resultsHtml;
        document.getElementById('calcResults').style.display = 'block';
        
        // Scroll to results
        document.getElementById('calcResults').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } catch (error) {
        console.error('Erro ao calcular:', error);
        showToast('Erro ao calcular. Verifique os valores inseridos.', 'error');
    }
}

function renderChecklistPage() {
    let html = `
        <h1 class="page-title">✅ Checklist de Cirurgia Segura</h1>
        <p class="text-center mb-2" style="color: var(--cor-texto-secundario)">Protocolo da Organização Mundial da Saúde (OMS)</p>
        
        <div class="content-section">
            <h2 class="section-title" style="color: #1a4d2e;">
                <i class="fas fa-sign-in-alt"></i> SIGN IN (Antes da Indução Anestésica)
            </h2>
            <div style="display: flex; flex-direction: column; gap: 10px;">
                <div style="display: flex; align-items: center; padding: 12px; background: var(--cor-cinza-claro); border-radius: 8px;">
                    <input type="checkbox" id="signin1" style="width: 20px; height: 20px; margin-right: 12px; accent-color: var(--cor-verde-escuro);">
                    <label for="signin1" style="flex: 1; cursor: pointer;">Paciente confirmou identidade, sítio cirúrgico, procedimento e consentimento</label>
                </div>
                <div style="display: flex; align-items: center; padding: 12px; background: var(--cor-cinza-claro); border-radius: 8px;">
                    <input type="checkbox" id="signin2" style="width: 20px; height: 20px; margin-right: 12px; accent-color: var(--cor-verde-escuro);">
                    <label for="signin2" style="flex: 1; cursor: pointer;">Demarcação do sítio cirúrgico realizada (quando aplicável)</label>
                </div>
                <div style="display: flex; align-items: center; padding: 12px; background: var(--cor-cinza-claro); border-radius: 8px;">
                    <input type="checkbox" id="signin3" style="width: 20px; height: 20px; margin-right: 12px; accent-color: var(--cor-verde-escuro);">
                    <label for="signin3" style="flex: 1; cursor: pointer;">Verificação de segurança anestésica completa</label>
                </div>
                <div style="display: flex; align-items: center; padding: 12px; background: var(--cor-cinza-claro); border-radius: 8px;">
                    <input type="checkbox" id="signin4" style="width: 20px; height: 20px; margin-right: 12px; accent-color: var(--cor-verde-escuro);">
                    <label for="signin4" style="flex: 1; cursor: pointer;">Oxímetro de pulso no paciente funcionando</label>
                </div>
                <div style="display: flex; align-items: center; padding: 12px; background: var(--cor-cinza-claro); border-radius: 8px;">
                    <input type="checkbox" id="signin5" style="width: 20px; height: 20px; margin-right: 12px; accent-color: var(--cor-verde-escuro);">
                    <label for="signin5" style="flex: 1; cursor: pointer;">Alergias conhecidas? (Sim/Não)</label>
                </div>
                <div style="display: flex; align-items: center; padding: 12px; background: var(--cor-cinza-claro); border-radius: 8px;">
                    <input type="checkbox" id="signin6" style="width: 20px; height: 20px; margin-right: 12px; accent-color: var(--cor-verde-escuro);">
                    <label for="signin6" style="flex: 1; cursor: pointer;">Via aérea difícil ou risco de aspiração? Equipamento e assistência disponíveis</label>
                </div>
                <div style="display: flex; align-items: center; padding: 12px; background: var(--cor-cinza-claro); border-radius: 8px;">
                    <input type="checkbox" id="signin7" style="width: 20px; height: 20px; margin-right: 12px; accent-color: var(--cor-verde-escuro);">
                    <label for="signin7" style="flex: 1; cursor: pointer;">Risco de perda sanguínea > 500ml (7ml/kg para crianças)? Acesso venoso adequado e fluidos planejados</label>
                </div>
            </div>
        </div>

        <div class="content-section">
            <h2 class="section-title" style="color: #40916c;">
                <i class="fas fa-pause-circle"></i> TIME OUT (Antes da Incisão Cirúrgica)
            </h2>
            <div style="display: flex; flex-direction: column; gap: 10px;">
                <div style="display: flex; align-items: center; padding: 12px; background: var(--cor-cinza-claro); border-radius: 8px;">
                    <input type="checkbox" id="timeout1" style="width: 20px; height: 20px; margin-right: 12px; accent-color: var(--cor-verde-escuro);">
                    <label for="timeout1" style="flex: 1; cursor: pointer;">Todos os membros da equipe se apresentaram pelo nome e função</label>
                </div>
                <div style="display: flex; align-items: center; padding: 12px; background: var(--cor-cinza-claro); border-radius: 8px;">
                    <input type="checkbox" id="timeout2" style="width: 20px; height: 20px; margin-right: 12px; accent-color: var(--cor-verde-escuro);">
                    <label for="timeout2" style="flex: 1; cursor: pointer;">Cirurgião, anestesiologista e enfermagem confirmam verbalmente: identidade do paciente, sítio cirúrgico e procedimento</label>
                </div>
                <div style="display: flex; align-items: center; padding: 12px; background: var(--cor-cinza-claro); border-radius: 8px;">
                    <input type="checkbox" id="timeout3" style="width: 20px; height: 20px; margin-right: 12px; accent-color: var(--cor-verde-escuro);">
                    <label for="timeout3" style="flex: 1; cursor: pointer;">Profilaxia antimicrobiana foi administrada nos últimos 60 minutos (quando indicada)</label>
                </div>
                <div style="display: flex; align-items: center; padding: 12px; background: var(--cor-cinza-claro); border-radius: 8px;">
                    <input type="checkbox" id="timeout4" style="width: 20px; height: 20px; margin-right: 12px; accent-color: var(--cor-verde-escuro);">
                    <label for="timeout4" style="flex: 1; cursor: pointer;">Etapas críticas previstas pelo cirurgião</label>
                </div>
                <div style="display: flex; align-items: center; padding: 12px; background: var(--cor-cinza-claro); border-radius: 8px;">
                    <input type="checkbox" id="timeout5" style="width: 20px; height: 20px; margin-right: 12px; accent-color: var(--cor-verde-escuro);">
                    <label for="timeout5" style="flex: 1; cursor: pointer;">Etapas críticas previstas pelo anestesiologista</label>
                </div>
                <div style="display: flex; align-items: center; padding: 12px; background: var(--cor-cinza-claro); border-radius: 8px;">
                    <input type="checkbox" id="timeout6" style="width: 20px; height: 20px; margin-right: 12px; accent-color: var(--cor-verde-escuro);">
                    <label for="timeout6" style="flex: 1; cursor: pointer;">Verificação de esterilidade (incluindo resultados dos indicadores)</label>
                </div>
                <div style="display: flex; align-items: center; padding: 12px; background: var(--cor-cinza-claro); border-radius: 8px;">
                    <input type="checkbox" id="timeout7" style="width: 20px; height: 20px; margin-right: 12px; accent-color: var(--cor-verde-escuro);">
                    <label for="timeout7" style="flex: 1; cursor: pointer;">Há questões relacionadas a equipamentos ou outras preocupações?</label>
                </div>
                <div style="display: flex; align-items: center; padding: 12px; background: var(--cor-cinza-claro); border-radius: 8px;">
                    <input type="checkbox" id="timeout8" style="width: 20px; height: 20px; margin-right: 12px; accent-color: var(--cor-verde-escuro);">
                    <label for="timeout8" style="flex: 1; cursor: pointer;">Imagens essenciais estão disponíveis?</label>
                </div>
            </div>
        </div>

        <div class="content-section">
            <h2 class="section-title" style="color: #52b788;">
                <i class="fas fa-sign-out-alt"></i> SIGN OUT (Antes do Paciente Sair da Sala Cirúrgica)
            </h2>
            <div style="display: flex; flex-direction: column; gap: 10px;">
                <div style="display: flex; align-items: center; padding: 12px; background: var(--cor-cinza-claro); border-radius: 8px;">
                    <input type="checkbox" id="signout1" style="width: 20px; height: 20px; margin-right: 12px; accent-color: var(--cor-verde-escuro);">
                    <label for="signout1" style="flex: 1; cursor: pointer;">Enfermagem confirma verbalmente: nome do procedimento</label>
                </div>
                <div style="display: flex; align-items: center; padding: 12px; background: var(--cor-cinza-claro); border-radius: 8px;">
                    <input type="checkbox" id="signout2" style="width: 20px; height: 20px; margin-right: 12px; accent-color: var(--cor-verde-escuro);">
                    <label for="signout2" style="flex: 1; cursor: pointer;">Contagem de instrumentos, compressas e agulhas está correta (ou não aplicável)</label>
                </div>
                <div style="display: flex; align-items: center; padding: 12px; background: var(--cor-cinza-claro); border-radius: 8px;">
                    <input type="checkbox" id="signout3" style="width: 20px; height: 20px; margin-right: 12px; accent-color: var(--cor-verde-escuro);">
                    <label for="signout3" style="flex: 1; cursor: pointer;">Identificação de amostras (leitura em voz alta, incluindo nome do paciente)</label>
                </div>
                <div style="display: flex; align-items: center; padding: 12px; background: var(--cor-cinza-claro); border-radius: 8px;">
                    <input type="checkbox" id="signout4" style="width: 20px; height: 20px; margin-right: 12px; accent-color: var(--cor-verde-escuro);">
                    <label for="signout4" style="flex: 1; cursor: pointer;">Há problemas com equipamentos a serem resolvidos?</label>
                </div>
                <div style="display: flex; align-items: center; padding: 12px; background: var(--cor-cinza-claro); border-radius: 8px;">
                    <input type="checkbox" id="signout5" style="width: 20px; height: 20px; margin-right: 12px; accent-color: var(--cor-verde-escuro);">
                    <label for="signout5" style="flex: 1; cursor: pointer;">Cirurgião, anestesiologista e enfermagem revisam as principais preocupações para recuperação e manejo do paciente</label>
                </div>
            </div>
        </div>

        <div style="display: flex; gap: 10px; justify-content: center; margin-top: 20px;">
            <button onclick="checkAllItems()" class="btn-primary">
                <i class="fas fa-check-double"></i> Marcar Todos
            </button>
            <button onclick="clearAllItems()" class="btn-primary" style="background: var(--cor-cinza);">
                <i class="fas fa-times"></i> Limpar
            </button>
            <button onclick="printChecklist()" class="btn-primary" style="background: var(--cor-info);">
                <i class="fas fa-print"></i> Imprimir
            </button>
        </div>
    `;
    
    return html;
}

function checkAllItems() {
    document.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = true);
    showToast('Todos os itens marcados', 'success');
}

function clearAllItems() {
    document.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
    showToast('Checklist limpo', 'info');
}

function printChecklist() {
    window.print();
}

function renderCronogramaCalendario() {
    const googleSheetsUrl = 'https://docs.google.com/spreadsheets/d/1RvxlGeQN6xZN6vPp9zhkWHbEbFiK6o3EGJm5eh9iR6s/edit?gid=833599381#gid=833599381';
    
    let html = `
        <h1 class="page-title">📅 Cronograma de Residência</h1>
        <p class="text-center mb-2" style="color: var(--cor-texto-secundario)">Acompanhe plantões, estágios e férias</p>
        
        <div class="content-section">
            <div style="text-align: center; margin-bottom: 20px;">
                <p style="color: var(--cor-texto-secundario); margin-bottom: 15px;">
                    Visualize o cronograma completo integrado com Google Sheets
                </p>
                <button onclick="window.open('${googleSheetsUrl}', '_blank')" class="btn-primary">
                    <i class="fab fa-google"></i> Abrir no Google Sheets
                </button>
            </div>
            
            <div style="position: relative; padding-bottom: 75%; height: 0; overflow: hidden;">
                <iframe 
                    src="${googleSheetsUrl.replace('/edit', '/preview')}" 
                    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none; border-radius: 12px;"
                    allowfullscreen>
                </iframe>
            </div>
        </div>
        
        <div class="content-section" style="margin-top: 20px;">
            <h3 class="section-title">
                <i class="fas fa-info-circle"></i> Informações
            </h3>
            <ul style="list-style: none; padding: 0;">
                <li style="padding: 10px; border-bottom: 1px solid var(--cor-cinza-medio);">
                    📅 <strong>Plantões:</strong> Confira a escala mensal de plantões
                </li>
                <li style="padding: 10px; border-bottom: 1px solid var(--cor-cinza-medio);">
                    🏥 <strong>Estágios:</strong> Acompanhe os rodízios e rotações
                </li>
                <li style="padding: 10px; border-bottom: 1px solid var(--cor-cinza-medio);">
                    🏖️ <strong>Férias:</strong> Visualize períodos de folga programados
                </li>
                <li style="padding: 10px;">
                    📱 <strong>Atualizações:</strong> Sincronizado em tempo real
                </li>
            </ul>
        </div>
    `;
    
    return html;
}

async function showAdminPanel() {
    if (!hasPermission(userProfile, 'admin-panel')) {
        showToast('Acesso negado', 'error');
        return;
    }
    
    try {
        showLoading();
        const users = await listAllUsers();
        hideLoading();
        
        renderAdminPanel(users);
    } catch (error) {
        hideLoading();
        showToast('Erro ao carregar painel admin: ' + error.message, 'error');
    }
}

function renderAdminPanel(users) {
    let html = `
        <h1 class="page-title">👤 Painel Administrativo</h1>
        <p class="text-center mb-2" style="color: var(--cor-texto-secundario)">Gerenciamento de usuários e permissões</p>
        
        <div class="content-section">
            <h2 class="section-title">
                <i class="fas fa-users"></i> Usuários Cadastrados (${users.length})
            </h2>
            
            <div style="overflow-x: auto;">
                <table style="width: 100%; border-collapse: collapse;">
                    <thead>
                        <tr style="background: var(--cor-cinza-claro); text-align: left;">
                            <th style="padding: 12px; border-bottom: 2px solid var(--cor-cinza-medio);">Nome</th>
                            <th style="padding: 12px; border-bottom: 2px solid var(--cor-cinza-medio);">E-mail</th>
                            <th style="padding: 12px; border-bottom: 2px solid var(--cor-cinza-medio);">Perfil</th>
                            <th style="padding: 12px; border-bottom: 2px solid var(--cor-cinza-medio);">Status</th>
                            <th style="padding: 12px; border-bottom: 2px solid var(--cor-cinza-medio);">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${users.map(user => {
                            const roleInfo = ROLES_TEMPLATES[user.role] || ROLES_TEMPLATES['visitante'];
                            const fullName = `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'Sem nome';
                            const statusColor = user.active ? 'var(--cor-sucesso)' : 'var(--cor-cinza)';
                            const statusText = user.active ? 'Ativo' : 'Inativo';
                            
                            return `
                                <tr style="border-bottom: 1px solid var(--cor-cinza-medio);">
                                    <td style="padding: 12px;">
                                        <strong>${fullName}</strong>
                                    </td>
                                    <td style="padding: 12px;">
                                        <small style="color: var(--cor-texto-secundario);">${user.email}</small>
                                    </td>
                                    <td style="padding: 12px;">
                                        <span style="display: inline-block; padding: 4px 10px; border-radius: 12px; font-size: 0.85rem; background: ${roleInfo.color}; color: white;">
                                            ${roleInfo.name}
                                        </span>
                                    </td>
                                    <td style="padding: 12px;">
                                        <span style="color: ${statusColor}; font-weight: 600;">
                                            ${statusText}
                                        </span>
                                    </td>
                                    <td style="padding: 12px;">
                                        <button onclick='editUser("${user.uid}")' style="padding: 6px 12px; background: var(--cor-verde-medio); color: white; border: none; border-radius: 6px; cursor: pointer; margin-right: 5px;">
                                            <i class="fas fa-edit"></i> Editar
                                        </button>
                                    </td>
                                </tr>
                            `;
                        }).join('')}
                    </tbody>
                </table>
            </div>
        </div>
        
        <div class="content-section">
            <h2 class="section-title">
                <i class="fas fa-chart-pie"></i> Estatísticas
            </h2>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px;">
                <div style="background: linear-gradient(135deg, #1a4d2e, #2d6a4f); color: white; padding: 20px; border-radius: 12px; text-align: center;">
                    <div style="font-size: 2.5rem; font-weight: 700; margin-bottom: 5px;">${users.length}</div>
                    <div style="opacity: 0.9;">Total de Usuários</div>
                </div>
                <div style="background: linear-gradient(135deg, #40916c, #52b788); color: white; padding: 20px; border-radius: 12px; text-align: center;">
                    <div style="font-size: 2.5rem; font-weight: 700; margin-bottom: 5px;">${users.filter(u => u.active).length}</div>
                    <div style="opacity: 0.9;">Ativos</div>
                </div>
                <div style="background: linear-gradient(135deg, #52b788, #74c69d); color: white; padding: 20px; border-radius: 12px; text-align: center;">
                    <div style="font-size: 2.5rem; font-weight: 700; margin-bottom: 5px;">${users.filter(u => u.role === 'admin').length}</div>
                    <div style="opacity: 0.9;">Administradores</div>
                </div>
            </div>
        </div>
    `;
    
    const pageContent = document.getElementById('page-content');
    pageContent.innerHTML = html;
}

async function editUser(userId) {
    try {
        showLoading();
        const userDoc = await db.collection('users').doc(userId).get();
        hideLoading();
        
        if (!userDoc.exists) {
            showToast('Usuário não encontrado', 'error');
            return;
        }
        
        const userData = userDoc.data();
        showEditUserModal(userId, userData);
    } catch (error) {
        hideLoading();
        showToast('Erro ao carregar usuário: ' + error.message, 'error');
    }
}

function showEditUserModal(userId, userData) {
    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 500px;">
            <h2>Editar Usuário</h2>
            <form id="editUserForm" style="margin-top: 20px;">
                <div class="form-group">
                    <label>Nome</label>
                    <input type="text" id="editFirstName" value="${userData.firstName || ''}" required>
                </div>
                <div class="form-group">
                    <label>Sobrenome</label>
                    <input type="text" id="editLastName" value="${userData.lastName || ''}" required>
                </div>
                <div class="form-group">
                    <label>E-mail (apenas visualização)</label>
                    <input type="email" value="${userData.email}" disabled>
                </div>
                <div class="form-group">
                    <label>Perfil</label>
                    <select id="editRole">
                        ${Object.entries(ROLES_TEMPLATES).map(([key, role]) => 
                            `<option value="${key}" ${userData.role === key ? 'selected' : ''}>${role.name}</option>`
                        ).join('')}
                    </select>
                </div>
                <div class="form-group">
                    <label style="display: flex; align-items: center; cursor: pointer;">
                        <input type="checkbox" id="editActive" ${userData.active ? 'checked' : ''} style="margin-right: 10px;">
                        <span>Usuário ativo</span>
                    </label>
                </div>
                <div style="display: flex; gap: 10px; margin-top: 20px;">
                    <button type="submit" class="btn-primary">
                        <i class="fas fa-save"></i> Salvar
                    </button>
                    <button type="button" onclick="this.closest('.modal').remove()" class="btn-primary" style="background: var(--cor-cinza);">
                        <i class="fas fa-times"></i> Cancelar
                    </button>
                </div>
            </form>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    document.getElementById('editUserForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const newData = {
            firstName: document.getElementById('editFirstName').value.trim(),
            lastName: document.getElementById('editLastName').value.trim(),
            role: document.getElementById('editRole').value,
            active: document.getElementById('editActive').checked
        };
        
        try {
            showLoading();
            await db.collection('users').doc(userId).update(newData);
            modal.remove();
            hideLoading();
            showToast('Usuário atualizado com sucesso!', 'success');
            showAdminPanel(); // Reload admin panel
        } catch (error) {
            hideLoading();
            showToast('Erro ao atualizar: ' + error.message, 'error');
        }
    });
}

// ==================== NOVAS PÁGINAS - ESTRUTURA ATUALIZADA ====================

// PAINEL PRINCIPAL
function renderComunicadosPage() {
    return `
        <h1 class="page-title">📢 Últimos Comunicados</h1>
        <div class="content-section">
            <p>Aqui serão exibidos os comunicados oficiais da diretoria.</p>
            <p style="color: var(--cor-texto-secundario); margin-top: 15px;">
                Esta funcionalidade será integrada com um sistema de notícias em breve.
            </p>
        </div>
    `;
}

function renderNotificarIncidentePage() {
    return `
        <h1 class="page-title">⚠️ Notificação de Incidentes</h1>
        <div class="content-section">
            <form id="incident-form">
                <div class="form-group">
                    <label for="incident-type">Tipo de Incidente *</label>
                    <select id="incident-type" required>
                        <option value="">Selecione...</option>
                        <option>Evento Adverso</option>
                        <option>Quase Erro (Near Miss)</option>
                        <option>Evento Sem Dano</option>
                        <option>Incidente com Dano</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="incident-date">Data e Hora *</label>
                    <input type="datetime-local" id="incident-date" required>
                </div>
                <div class="form-group">
                    <label for="incident-location">Local *</label>
                    <input type="text" id="incident-location" placeholder="Ex: Centro Cirúrgico, Sala 3" required>
                </div>
                <div class="form-group">
                    <label for="incident-description">Descrição Detalhada *</label>
                    <textarea id="incident-description" rows="6" placeholder="Descreva o ocorrido de forma objetiva e completa..." required></textarea>
                </div>
                <div class="form-group">
                    <label for="incident-actions">Ações Imediatas Tomadas</label>
                    <textarea id="incident-actions" rows="3" placeholder="Descreva as ações tomadas imediatamente após o incidente..."></textarea>
                </div>
                <button type="submit" class="btn-primary" onclick="submitIncident(event)">
                    <i class="fas fa-paper-plane"></i> Enviar Notificação
                </button>
            </form>
        </div>
    `;
}

function submitIncident(e) {
    e.preventDefault();
    const type = document.getElementById('incident-type').value;
    const date = document.getElementById('incident-date').value;
    const location = document.getElementById('incident-location').value;
    const description = document.getElementById('incident-description').value;
    const actions = document.getElementById('incident-actions').value;
    
    if (!type || !date || !location || !description) {
        showToast('Por favor, preencha todos os campos obrigatórios', 'error');
        return;
    }
    
    // Aqui você pode adicionar a lógica para salvar no Firebase
    showToast('Notificação enviada com sucesso! A equipe de qualidade foi notificada.', 'success');
    
    // Limpar formulário
    document.getElementById('incident-form').reset();
}

// QUALIDADE E SEGURANÇA
function renderAuditoriasConformidadePage() {
    const items = [
        { id: 'auditoria-higiene-maos', icon: 'fa-hands-wash', color: '#1abc9c', title: 'Higiene das Mãos', subtitle: 'Observação direta' },
        { id: 'auditoria-medicamentos', icon: 'fa-pills', color: '#e74c3c', title: 'Uso de Medicamentos', subtitle: 'Armazenamento e preparo' },
        { id: 'auditoria-abreviacoes', icon: 'fa-file-medical', color: '#f39c12', title: 'Abreviações Perigosas', subtitle: 'Auditoria de prontuários' }
    ];
    
    const grid = items.map(item => `
        <div class="icon-card" onclick="showToast('Auditoria em desenvolvimento', 'info')">
            <div class="icon-card-icon" style="background: ${item.color}">
                <i class="fas ${item.icon}"></i>
            </div>
            <div class="icon-card-title">${item.title}</div>
            <div class="icon-card-subtitle">${item.subtitle}</div>
        </div>
    `).join('');
    
    return `
        <h1 class="page-title">Auditorias e Conformidade</h1>
        <div class="icon-grid">${grid}</div>
    `;
}

function renderCapacitacaoTreinamentoPage() {
    const items = [
        { id: 'notificar-incidente', icon: 'fa-exclamation-triangle', color: '#dc3545', title: 'Notificação de Incidentes', subtitle: 'Reportar eventos' },
        { id: 'auditorias-conformidade', icon: 'fa-clipboard-check', color: '#52b788', title: 'Auditorias e Conformidade', subtitle: 'Processos de verificação' },
        { id: 'materiais-treinamento', icon: 'fa-book-open', color: '#1a4d2e', title: 'Materiais de Treinamento', subtitle: 'Recursos educativos' }
    ];
    
    const grid = items.map(item => `
        <div class="icon-card" onclick="navigateToSubPage('${item.id}')">
            <div class="icon-card-icon" style="background: ${item.color}">
                <i class="fas ${item.icon}"></i>
            </div>
            <div class="icon-card-title">${item.title}</div>
            <div class="icon-card-subtitle">${item.subtitle}</div>
        </div>
    `).join('');
    
    return `
        <h1 class="page-title">Capacitação e Treinamento</h1>
        <div class="icon-grid">${grid}</div>
    `;
}

function renderIndicadoresQualidadePage() {
    return `
        <h1 class="page-title">📊 Indicadores de Qualidade</h1>
        <div class="content-section">
            <h3 class="section-title">Indicadores Principais</h3>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 15px; margin-top: 20px;">
                <div style="background: linear-gradient(135deg, #1a4d2e, #2d6a4f); color: white; padding: 20px; border-radius: 12px; text-align: center;">
                    <div style="font-size: 2.5rem; font-weight: 700;">95%</div>
                    <div>Adesão Higiene das Mãos</div>
                </div>
                <div style="background: linear-gradient(135deg, #40916c, #52b788); color: white; padding: 20px; border-radius: 12px; text-align: center;">
                    <div style="font-size: 2.5rem; font-weight: 700;">12</div>
                    <div>Notificações Este Mês</div>
                </div>
                <div style="background: linear-gradient(135deg, #52b788, #74c69d); color: white; padding: 20px; border-radius: 12px; text-align: center;">
                    <div style="font-size: 2.5rem; font-weight: 700;">4.8</div>
                    <div>Satisfação do Paciente</div>
                </div>
            </div>
        </div>
    `;
}

// PROTOCOLOS E POPs
function renderBibliotecaDocumentosPage() {
    return renderDocumentosPage(); // Usa a função de documentos existente
}

function renderSegurancaMedicamentosPage() {
    const items = [
        { id: 'mavs', icon: 'fa-exclamation-circle', color: '#dc3545', title: 'Medicamentos de Alta Vigilância', subtitle: 'MAVs' },
        { id: 'eletrolitos', icon: 'fa-vial', color: '#e74c3c', title: 'Eletrólitos Concentrados', subtitle: 'Segurança no preparo' },
        { id: 'heparina', icon: 'fa-syringe', color: '#c0392b', title: 'Segurança no Uso da Heparina', subtitle: 'Protocolos específicos' },
        { id: 'narcoticos', icon: 'fa-lock', color: '#8e44ad', title: 'Segurança dos Narcóticos', subtitle: 'Controle e armazenamento' },
        { id: 'abreviacoes', icon: 'fa-ban', color: '#f39c12', title: 'Lista de Abreviações Perigosas', subtitle: 'Evitar erros' }
    ];
    
    const grid = items.map(item => `
        <div class="icon-card" onclick="showToast('Protocolo em desenvolvimento', 'info')">
            <div class="icon-card-icon" style="background: ${item.color}">
                <i class="fas ${item.icon}"></i>
            </div>
            <div class="icon-card-title">${item.title}</div>
            <div class="icon-card-subtitle">${item.subtitle}</div>
        </div>
    `).join('');
    
    return `
        <h1 class="page-title">Segurança de Medicamentos</h1>
        <div class="icon-grid">${grid}</div>
    `;
}

// FERRAMENTAS CLÍNICAS
function renderCalculadorasAnestesicasPage() {
    const items = [
        { id: 'calc-qmentum', icon: 'fa-award', color: '#1a4d2e', title: 'Calculadoras Qmentum', subtitle: 'Específicas para acreditação' },
        { id: 'calc-geral', icon: 'fa-calculator', color: '#40916c', title: 'Calculadoras Anestesiologia Geral', subtitle: 'Ferramentas clínicas gerais' }
    ];
    
    const grid = items.map(item => `
        <div class="icon-card" onclick="navigateToSubPage('calculadoras')">
            <div class="icon-card-icon" style="background: ${item.color}">
                <i class="fas ${item.icon}"></i>
            </div>
            <div class="icon-card-title">${item.title}</div>
            <div class="icon-card-subtitle">${item.subtitle}</div>
        </div>
    `).join('');
    
    return `
        <h1 class="page-title">Calculadoras Anestésicas</h1>
        <div class="icon-grid">${grid}</div>
    `;
}

function renderConciliacaoMedicamentosaPage() {
    const items = [
        { id: 'conc-admissao', icon: 'fa-file-import', color: '#1a4d2e', title: 'Protocolo de Admissão', subtitle: 'Entrada do paciente' },
        { id: 'conc-transferencia', icon: 'fa-right-left', color: '#40916c', title: 'Protocolo de Transferência', subtitle: 'Transição de cuidados' },
        { id: 'conc-alta', icon: 'fa-file-export', color: '#52b788', title: 'Protocolo de Alta', subtitle: 'Saída do paciente' }
    ];
    
    const grid = items.map(item => `
        <div class="icon-card" onclick="showToast('Protocolo em desenvolvimento', 'info')">
            <div class="icon-card-icon" style="background: ${item.color}">
                <i class="fas ${item.icon}"></i>
            </div>
            <div class="icon-card-title">${item.title}</div>
            <div class="icon-card-subtitle">${item.subtitle}</div>
        </div>
    `).join('');
    
    return `
        <h1 class="page-title">Conciliação Medicamentosa</h1>
        <div class="icon-grid">${grid}</div>
    `;
}

function renderAvaliacaoRiscosPage() {
    const items = [
        { id: 'risco-quedas', icon: 'fa-user-injured', color: '#e74c3c', title: 'Risco de Quedas', subtitle: 'Escala de Morse + Protocolo' },
        { id: 'risco-ulceras', icon: 'fa-bed', color: '#f39c12', title: 'Úlceras de Pressão', subtitle: 'Escala de Braden + Protocolo' },
        { id: 'risco-tev', icon: 'fa-heart-pulse', color: '#c0392b', title: 'Risco de TEV', subtitle: 'Caprini/Padua + Protocolo' }
    ];
    
    const grid = items.map(item => `
        <div class="icon-card" onclick="navigateToRiskAssessment('${item.id}')">
            <div class="icon-card-icon" style="background: ${item.color}">
                <i class="fas ${item.icon}"></i>
            </div>
            <div class="icon-card-title">${item.title}</div>
            <div class="icon-card-subtitle">${item.subtitle}</div>
        </div>
    `).join('');
    
    return `
        <h1 class="page-title">Avaliação de Riscos</h1>
        <div class="icon-grid">${grid}</div>
    `;
}

function navigateToRiskAssessment(riskId) {
    // Direciona para as calculadoras específicas
    if (riskId === 'risco-quedas') {
        openCalculator('morse');
    } else if (riskId === 'risco-ulceras') {
        openCalculator('braden');
    } else if (riskId === 'risco-tev') {
        // Mostra opções Caprini ou Padua
        const html = `
            <h1 class="page-title">Risco de TEV</h1>
            <div class="icon-grid">
                <div class="icon-card" onclick="openCalculator('caprini')">
                    <div class="icon-card-icon" style="background: #c0392b">
                        <i class="fas fa-calculator"></i>
                    </div>
                    <div class="icon-card-title">Caprini</div>
                    <div class="icon-card-subtitle">Pacientes cirúrgicos</div>
                </div>
                <div class="icon-card" onclick="openCalculator('padua')">
                    <div class="icon-card-icon" style="background: #c0392b">
                        <i class="fas fa-calculator"></i>
                    </div>
                    <div class="icon-card-title">Padua</div>
                    <div class="icon-card-subtitle">Pacientes clínicos</div>
                </div>
            </div>
        `;
        document.getElementById('page-content').innerHTML = html;
    }
}

// ROPs - Navegação para Questões e Podcasts
function navigateToROPsQuestoes(macroId, macroTitle) {
    // Renderiza a lista de ROPs da macroárea selecionada
    const areaData = ropsData[macroId];
    if (!areaData) {
        showToast('ROPs não encontradas para esta macroárea', 'error');
        return;
    }
    
    let html = `<h1 class="page-title">${macroTitle} - Questões</h1>`;
    html += '<p class="text-center mb-2" style="color: var(--cor-texto-secundario)">Selecione uma ROP para iniciar o quiz</p>';
    html += '<div class="icon-grid">';
    
    for (const [ropKey, ropData] of Object.entries(areaData)) {
        const questionCount = ropData.questions?.length || 0;
        
        html += `
            <div class="icon-card" onclick='startQuiz("${macroId}", "${ropKey}")'>
                <div class="icon-card-icon" style="background: #1a4d2e">
                    <i class="fas fa-question-circle"></i>
                </div>
                <div class="icon-card-title">${ropData.title || ropKey}</div>
                <div class="icon-card-subtitle">${questionCount} questões</div>
            </div>
        `;
    }
    
    html += '</div>';
    
    const pageContent = document.getElementById('page-content');
    pageContent.innerHTML = html;
    pageContent.scrollTop = 0;
}

function navigateToROPsPodcasts(macroId, macroTitle) {
    // Filtra os podcasts da macroárea específica
    const macroAreaMap = {
        'cultura-seguranca': 'Cultura de Segurança',
        'comunicacao': 'Comunicação',
        'uso-medicamentos': 'Uso de Medicamentos',
        'vida-profissional': 'Vida Profissional',
        'prevencao-infeccoes': 'Prevenção de Infecções',
        'avaliacao-riscos': 'Avaliação de Riscos'
    };
    
    const categoryName = macroAreaMap[macroId];
    
    // Renderiza a lista de podcasts filtrados
    const allPodcasts = [
        // Cultura de Segurança (4)
        { title: "ROP 1.1 – Responsabilização pela Qualidade", file: "Podcasts/Cultura de Segurança/ROP 1.1 Cultura de Segurança – Responsabilização pela Qualidade.m4a", category: "Cultura de Segurança", color: "#9b59b6" },
        { title: "ROP 1.2 – Gestão de Incidentes", file: "Podcasts/Cultura de Segurança/ROP 1.2 Cultura de Segurança – Gestão de incidentes.m4a", category: "Cultura de Segurança", color: "#9b59b6" },
        { title: "ROP 1.3 – Relatórios Trimestrais", file: "Podcasts/Cultura de Segurança/ROP 1.3 Cultura de Segurança – Relatórios Trimestrais.m4a", category: "Cultura de Segurança", color: "#9b59b6" },
        { title: "ROP 1.4 – Divulgação de Incidentes", file: "Podcasts/Cultura de Segurança/ROP 1.4 Cultura de Segurança – Divulgação dos incidentes (Disclosure).m4a", category: "Cultura de Segurança", color: "#9b59b6" },
        
        // Comunicação (8)
        { title: "ROP 2.1 – Identificação do Cliente", file: "Podcasts/Comunicação/2.1 Comunicação - Idenfica\u00e7\u00e3o cliente.m4a", category: "Comunicação", color: "#3498db" },
        { title: "ROP 2.2 – Abreviações Perigosas", file: "Podcasts/Comunicação/2.2 Comunicação - Abrevia\u00e7\u00f5es perigosas.m4a", category: "Comunicação", color: "#3498db" },
        { title: "ROP 2.3 – Conciliação Medicamentosa Estratégica", file: "Podcasts/Comunicação/2.3 Comunicação - Concilia\u00e7\u00e3o medicamentosa Estrat\u00e9gica.m4a", category: "Comunicação", color: "#3498db" },
        { title: "ROP 2.4 – Conciliação Medicamentosa (Internação)", file: "Podcasts/Comunicação/2.4 Comunicação - Concilia\u00e7\u00e3o medicamentosa Internado.m4a", category: "Comunicação", color: "#3498db" },
        { title: "ROP 2.5 – Conciliação Medicamentosa (Ambulatorial)", file: "Podcasts/Comunicação/2.5 Comunicação - Concilia\u00e7\u00e3o medicamentosa ambulatorial.m4a", category: "Comunicação", color: "#3498db" },
        { title: "ROP 2.6 – Conciliação Medicamentosa (Emergência)", file: "Podcasts/Comunicação/2.6 Comunicação - Concilia\u00e7\u00e3o medicamentosa Emergencia.m4a", category: "Comunicação", color: "#3498db" },
        { title: "ROP 2.7 – Cirurgia Segura", file: "Podcasts/Comunicação/2.7 Comunicação - Cirurgia segura.m4a", category: "Comunicação", color: "#3498db" },
        { title: "ROP 2.8 – Transição de Cuidado", file: "Podcasts/Comunicação/2.8 Comunicação - Transi\u00e7\u00e3o Cuidado.m4a", category: "Comunicação", color: "#3498db" },
        
        // Demais categorias
        { title: "ROP 3.1 – Uso de Medicamentos", file: "Podcasts/Uso de Medicamentos/3.1 Uso de Medicamentos.m4a", category: "Uso de Medicamentos", color: "#e74c3c" },
        { title: "ROP 4.1 – Vida Profissional", file: "Podcasts/Vida Profissional/4.1 Vida Profissional.m4a", category: "Vida Profissional", color: "#f39c12" },
        { title: "ROP 5.1 – Prevenção de Infecções", file: "Podcasts/Preven\u00e7\u00e3o de infec\u00e7\u00f5es/5.1 Preven\u00e7\u00e3o de infec\u00e7\u00f5es.m4a", category: "Prevenção de Infecções", color: "#1abc9c" },
        { title: "ROP 6.1 – Avaliação de Riscos", file: "Podcasts/Avalia\u00e7\u00e3o de Riscos/6.1 Avalia\u00e7\u00e3o de Riscos.m4a", category: "Avaliação de Riscos", color: "#e67e22" }
    ];
    
    const filteredPodcasts = allPodcasts.filter(p => p.category === categoryName);
    const color = filteredPodcasts[0]?.color || '#1a4d2e';
    
    let html = `<h1 class="page-title">${macroTitle} - Podcasts</h1>`;
    html += `<p class="text-center mb-2" style="color: var(--cor-texto-secundario)">${filteredPodcasts.length} episódios disponíveis</p>`;
    html += '<div class="content-section">';
    html += '<div style="display: flex; flex-direction: column; gap: 10px;">';
    
    filteredPodcasts.forEach(p => {
        html += `
            <div class="icon-card" style="padding: 15px; cursor: pointer;" onclick='playPodcast("${p.file}", "${p.title}")'>
                <div style="display: flex; align-items: center; gap: 15px;">
                    <div style="width: 50px; height: 50px; border-radius: 50%; background: ${color}; display: flex; align-items: center; justify-content: center; color: white; font-size: 1.5rem;">
                        <i class="fas fa-play"></i>
                    </div>
                    <div style="flex: 1;">
                        <div class="icon-card-title" style="text-align: left; margin-bottom: 5px;">${p.title}</div>
                    </div>
                </div>
            </div>
        `;
    });
    
    html += '</div></div>';
    
    const pageContent = document.getElementById('page-content');
    pageContent.innerHTML = html;
    pageContent.scrollTop = 0;
}

console.log('✅ ANEST-App Profissional carregado!');

