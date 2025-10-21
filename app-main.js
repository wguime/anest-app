// ==================== ANEST-APP QMENTUM - CORE PRINCIPAL ====================
// Versão 8.0.0 - Arquitetura Modular
// Cores: VERDE/BRANCO (#43e97b, #38f9d7)

// ==================== VARIÁVEIS GLOBAIS ====================
let currentUser = null;
let userProfile = {};
let db = null;
let storage = null;
let navigationStack = [];

// ==================== INICIALIZAÇÃO DO FIREBASE ====================
function initializeApp() {
    console.log('[INIT] Inicializando aplicativo...');
    
    if (typeof firebase === 'undefined' || !firebase.apps || firebase.apps.length === 0) {
        console.error('[INIT] Firebase não carregado!');
        showToast('Erro ao carregar Firebase', 'error');
        return;
    }
    
    db = firebase.firestore();
    storage = firebase.storage();
    
    console.log('[INIT] Firebase inicializado com sucesso');
    
    // Verificar autenticação
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            console.log('[AUTH] Usuário autenticado:', user.email);
            currentUser = user;
            loadUserProfile();
            hideAuthScreen();
            showMainApp();
        } else {
            console.log('[AUTH] Usuário não autenticado');
            showAuthScreen();
        }
    });
    
    // Setup event listeners
    setupEventListeners();
    
    // Registrar Service Worker
    registerServiceWorker();
}

// ==================== AUTENTICAÇÃO ====================
function showAuthScreen() {
    document.getElementById('authScreen').style.display = 'flex';
    document.getElementById('mainApp').style.display = 'none';
}

function hideAuthScreen() {
    document.getElementById('authScreen').style.display = 'none';
}

function showMainApp() {
    document.getElementById('mainApp').style.display = 'flex';
    hideLoading();
    navigateTo('painel');
}

async function handleLogin() {
    const email = document.getElementById('emailInput').value.trim();
    const password = document.getElementById('passwordInput').value;
    
    if (!email || !password) {
        showToast('Por favor, preencha email e senha', 'error');
        return;
    }
    
    showLoading();
    
    try {
        await firebase.auth().signInWithEmailAndPassword(email, password);
        console.log('[AUTH] Login realizado com sucesso');
    } catch (error) {
        hideLoading();
        console.error('[AUTH] Erro no login:', error);
        let message = 'Erro ao fazer login';
        
        if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
            message = 'Email ou senha incorretos';
        } else if (error.code === 'auth/invalid-email') {
            message = 'Email inválido';
        }
        
        showToast(message, 'error');
    }
}

async function handleRegister() {
    const email = document.getElementById('registerEmail').value.trim();
    const password = document.getElementById('registerPassword').value;
    const firstName = document.getElementById('registerFirstName').value.trim();
    const lastName = document.getElementById('registerLastName').value.trim();
    
    if (!email || !password || !firstName || !lastName) {
        showToast('Por favor, preencha todos os campos', 'error');
        return;
    }
    
    if (password.length < 6) {
        showToast('A senha deve ter pelo menos 6 caracteres', 'error');
        return;
    }
    
    showLoading();
    
    try {
        const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
        const user = userCredential.user;
        
        // Criar perfil do usuário no Firestore
        await db.collection('users').doc(user.uid).set({
            email: email,
            firstName: firstName,
            lastName: lastName,
            role: 'user',
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            totalPoints: 0,
            completedROPs: [],
            darkMode: false
        });
        
        console.log('[AUTH] Cadastro realizado com sucesso');
        showToast('Cadastro realizado com sucesso!', 'success');
    } catch (error) {
        hideLoading();
        console.error('[AUTH] Erro no cadastro:', error);
        let message = 'Erro ao criar conta';
        
        if (error.code === 'auth/email-already-in-use') {
            message = 'Este email já está em uso';
        } else if (error.code === 'auth/invalid-email') {
            message = 'Email inválido';
        } else if (error.code === 'auth/weak-password') {
            message = 'Senha muito fraca';
        }
        
        showToast(message, 'error');
    }
}

async function handleLogout() {
    try {
        await firebase.auth().signOut();
        console.log('[AUTH] Logout realizado');
        navigationStack = [];
        currentUser = null;
        userProfile = {};
        showAuthScreen();
    } catch (error) {
        console.error('[AUTH] Erro no logout:', error);
        showToast('Erro ao sair', 'error');
    }
}

// ==================== PERFIL DO USUÁRIO ====================
async function loadUserProfile() {
    if (!currentUser) return;
    
    try {
        const doc = await db.collection('users').doc(currentUser.uid).get();
        
        if (doc.exists) {
            userProfile = doc.data();
            
            // Inicializar campos se não existirem
            if (!userProfile.role) userProfile.role = 'user';
            if (!userProfile.darkMode) userProfile.darkMode = false;
            if (!userProfile.totalPoints) userProfile.totalPoints = 0;
            if (!userProfile.completedROPs) userProfile.completedROPs = [];
            
            // Aplicar dark mode se ativo
            if (userProfile.darkMode) {
                document.body.classList.add('dark-mode');
                updateThemeToggleUI();
            }
            
            // Atualizar botão admin
            updateAdminButtonVisibility();
            
            // Verificar se precisa preencher nome
            if (!userProfile.firstName || !userProfile.lastName) {
                showProfileCompletionModal();
            }
        } else {
            console.warn('[PROFILE] Perfil não encontrado, criando...');
            await createUserProfile();
        }
    } catch (error) {
        console.error('[PROFILE] Erro ao carregar perfil:', error);
    }
}

async function createUserProfile() {
    if (!currentUser) return;
    
    try {
        await db.collection('users').doc(currentUser.uid).set({
            email: currentUser.email,
            firstName: '',
            lastName: '',
            role: 'user',
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            totalPoints: 0,
            completedROPs: [],
            darkMode: false
        });
        
        userProfile = {
            email: currentUser.email,
            firstName: '',
            lastName: '',
            role: 'user',
            totalPoints: 0,
            completedROPs: [],
            darkMode: false
        };
        
        showProfileCompletionModal();
    } catch (error) {
        console.error('[PROFILE] Erro ao criar perfil:', error);
    }
}

function showProfileCompletionModal() {
    const modal = document.createElement('div');
    modal.className = 'modal' style='display: flex;';
    modal.innerHTML = `
        <div class="modal-content">
            <h2><i class="fas fa-user-edit"></i> Complete seu Perfil</h2>
            <p>Por favor, complete suas informações de perfil:</p>
            
            <div style="margin: 20px 0;">
                <div class="form-group">
                    <label>Nome:</label>
                    <input type="text" id="profileFirstName" placeholder="Seu primeiro nome">
                </div>
                <div class="form-group">
                    <label>Sobrenome:</label>
                    <input type="text" id="profileLastName" placeholder="Seu sobrenome">
                </div>
            </div>
            
            <button class="submit-button" onclick="saveProfileCompletion()">
                <i class="fas fa-check"></i> Salvar
            </button>
        </div>
    `;
    
    document.body.appendChild(modal);
}

async function saveProfileCompletion() {
    const firstName = document.getElementById('profileFirstName').value.trim();
    const lastName = document.getElementById('profileLastName').value.trim();
    
    if (!firstName || !lastName) {
        showToast('Por favor, preencha nome e sobrenome', 'error');
        return;
    }
    
    showLoading();
    
    try {
        await db.collection('users').doc(currentUser.uid).update({
            firstName: firstName,
            lastName: lastName
        });
        
        userProfile.firstName = firstName;
        userProfile.lastName = lastName;
        
        // Remover modal
        const modals = document.querySelectorAll('.modal');
        modals.forEach(m => m.remove());
        
        hideLoading();
        showToast('Perfil atualizado com sucesso!', 'success');
    } catch (error) {
        hideLoading();
        console.error('[PROFILE] Erro ao atualizar perfil:', error);
        showToast('Erro ao atualizar perfil', 'error');
    }
}

function showUserMenu() {
    const modal = document.getElementById('userMenuModal');
    modal.style.display = 'flex';
    
    // Atualizar informações
    document.getElementById('userFullName').textContent = 
        userProfile.firstName && userProfile.lastName 
            ? `${userProfile.firstName} ${userProfile.lastName}`
            : 'Usuário';
    document.getElementById('userEmailDisplay').textContent = currentUser.email;
    
    updateThemeToggleUI();
}

function closeUserMenu() {
    document.getElementById('userMenuModal').style.display = 'none';
}

async function toggleDarkMode() {
    const newMode = !userProfile.darkMode;
    userProfile.darkMode = newMode;
    
    if (newMode) {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
    
    updateThemeToggleUI();
    
    // Salvar no Firestore
    try {
        await db.collection('users').doc(currentUser.uid).update({
            darkMode: newMode
        });
    } catch (error) {
        console.error('[THEME] Erro ao salvar preferência:', error);
    }
}

function updateThemeToggleUI() {
    const checkbox = document.getElementById('darkModeToggle');
    const icon = checkbox.parentElement.querySelector('i');
    const label = checkbox.parentElement.querySelector('.theme-toggle-label span');
    
    if (userProfile.darkMode) {
        checkbox.checked = true;
        icon.className = 'fas fa-moon';
        label.textContent = 'Modo Escuro';
    } else {
        checkbox.checked = false;
        icon.className = 'fas fa-sun';
        label.textContent = 'Modo Claro';
    }
}

// ==================== CONTROLE DE PERMISSÕES ====================
function isAdmin() {
    return userProfile.role === 'admin';
}

function updateAdminButtonVisibility() {
    const adminButton = document.getElementById('adminButton');
    if (adminButton) {
        adminButton.style.display = isAdmin() ? 'block' : 'none';
    }
}

function showAdminPanel() {
    if (!isAdmin()) {
        showToast('Acesso negado: apenas administradores', 'error');
        return;
    }
    navigateTo('admin_panel');
}

// ==================== NAVEGAÇÃO ====================
function navigateTo(pageId) {
    console.log('[NAV] Navegando para:', pageId);
    
    if (navigationStack.length === 0 || navigationStack[navigationStack.length - 1] !== pageId) {
        navigationStack.push(pageId);
    }
    
    renderPage(pageId);
    updateNavigationUI(pageId);
}

function goBack() {
    if (navigationStack.length > 1) {
        navigationStack.pop();
        const previousPage = navigationStack[navigationStack.length - 1];
        console.log('[NAV] Voltando para:', previousPage);
        renderPage(previousPage);
        updateNavigationUI(previousPage);
    } else {
        navigateTo('painel');
    }
}

function updateNavigationUI(pageId) {
    // Atualizar botões da barra inferior
    document.querySelectorAll('.nav-button').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-page') === pageId) {
            btn.classList.add('active');
        }
    });
    
    // Mostrar/ocultar botão voltar
    const backButton = document.getElementById('back-button');
    const mainPages = ['painel', 'qualidade', 'protocolos', 'ferramentas'];
    
    if (mainPages.includes(pageId) && navigationStack.length <= 1) {
        backButton.style.display = 'none';
    } else {
        backButton.style.display = 'block';
    }
}

// ==================== RENDERIZAÇÃO DE PÁGINAS ====================
function renderPage(pageId) {
    const pageContent = document.getElementById('page-content');
    const headerTitle = document.getElementById('header-title');
    
    // Verificar se página existe nos módulos
    if (typeof window.renderPage_Modules === 'function') {
        const content = window.renderPage_Modules(pageId);
        if (content) {
            pageContent.innerHTML = content;
            headerTitle.textContent = getPageTitle(pageId);
            pageContent.scrollTop = 0;
            return;
        }
    }
    
    // Página não encontrada
    pageContent.innerHTML = `
        <div class="content-section">
            <h3><i class="fas fa-exclamation-triangle"></i> Página Não Encontrada</h3>
            <p>A página "${pageId}" não foi encontrada.</p>
            <button class="submit-button" onclick="navigateTo('painel')">
                <i class="fas fa-home"></i> Voltar ao Painel
            </button>
        </div>
    `;
    headerTitle.textContent = "Erro";
}

function getPageTitle(pageId) {
    const titles = {
        'painel': 'Painel Principal',
        'qualidade': 'Qualidade e Segurança',
        'protocolos': 'Protocolos',
        'ferramentas': 'Ferramentas',
        'rops': 'ROPs - Desafio',
        'residencia': 'Residência Médica',
        'admin_panel': 'Painel de Administração'
    };
    return titles[pageId] || 'Anest-App';
}

// ==================== UI UTILITIES ====================
function showLoading() {
    document.getElementById('loadingScreen').style.display = 'flex';
}

function hideLoading() {
    document.getElementById('loadingScreen').style.display = 'none';
}

function showToast(message, type = 'info') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = `toast toast-${type} show`;
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// ==================== EVENT LISTENERS ====================
function setupEventListeners() {
    // Auth buttons
    document.getElementById('loginButton').addEventListener('click', handleLogin);
    document.getElementById('registerButton').addEventListener('click', handleRegister);
    document.getElementById('showRegisterForm').addEventListener('click', () => {
        document.getElementById('loginForm').style.display = 'none';
        document.getElementById('registerForm').style.display = 'block';
    });
    document.getElementById('showLoginForm').addEventListener('click', () => {
        document.getElementById('registerForm').style.display = 'none';
        document.getElementById('loginForm').style.display = 'block';
    });
    
    // Enter key on login
    document.getElementById('passwordInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleLogin();
    });
    
    // Navigation buttons
    document.querySelectorAll('.nav-button').forEach(button => {
        button.addEventListener('click', () => {
            const page = button.getAttribute('data-page');
            navigateTo(page);
        });
    });
    
    // Back button
    document.getElementById('back-button').addEventListener('click', goBack);
    
    // Profile button
    document.getElementById('profileButton').addEventListener('click', showUserMenu);
    
    // Close user menu
    document.getElementById('userMenuModal').addEventListener('click', (e) => {
        if (e.target.id === 'userMenuModal') closeUserMenu();
    });
    
    // Logout button
    document.getElementById('logoutButton').addEventListener('click', () => {
        closeUserMenu();
        handleLogout();
    });
    
    // Dark mode toggle
    document.getElementById('darkModeToggle').addEventListener('change', toggleDarkMode);
    
    // Admin button
    const adminButton = document.getElementById('adminButton');
    if (adminButton) {
        adminButton.addEventListener('click', showAdminPanel);
    }
}

// ==================== SERVICE WORKER ====================
function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('service-worker.js')
            .then(reg => console.log('[SW] Registrado:', reg.scope))
            .catch(err => console.error('[SW] Erro ao registrar:', err));
    }
}

// ==================== INICIALIZAÇÃO ====================
document.addEventListener('DOMContentLoaded', () => {
    console.log('[APP] DOM carregado, inicializando...');
    initializeApp();
});

// Expor funções globais necessárias
window.navigateTo = navigateTo;
window.goBack = goBack;
window.showUserMenu = showUserMenu;
window.closeUserMenu = closeUserMenu;
window.toggleDarkMode = toggleDarkMode;
window.handleLogin = handleLogin;
window.handleRegister = handleRegister;
window.handleLogout = handleLogout;
window.showAdminPanel = showAdminPanel;
window.saveProfileCompletion = saveProfileCompletion;
window.showToast = showToast;
window.showLoading = showLoading;
window.hideLoading = hideLoading;
window.isAdmin = isAdmin;
window.currentUser = () => currentUser;
window.userProfile = () => userProfile;
window.db = () => db;
window.storage = () => storage;

