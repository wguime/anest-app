// ==================== SISTEMA DE PERMISSÕES INDIVIDUAIS ====================
// Sistema híbrido: Perfis base + customização individual por usuário

// ==================== PERFIS BASE (TEMPLATES) ====================
const ROLES_TEMPLATES = {
    'admin': {
        name: 'Administrador',
        color: '#dc3545',
        icon: 'fa-user-shield',
        permissions: {
            // ROPs
            'rop-cultura': true,
            'rop-comunicacao': true,
            'rop-medicamentos': true,
            'rop-vida-profissional': true,
            'rop-infeccoes': true,
            'rop-riscos': true,
            
            // Documentos
            'doc-protocolos': true,
            'doc-politicas': true,
            'doc-formularios': true,
            'doc-manuais': true,
            'doc-relatorios': true,
            'doc-processos': true,
            'doc-riscos': true,
            'doc-termos': true,
            'doc-clima': true,
            'doc-plano': true,
            
            // Módulos
            'residencia': true,
            'podcasts': true,
            'notificacoes': true,
            'ranking': true,
            'admin-panel': true
        }
    },
    
    'medico': {
        name: 'Médico',
        color: '#007bff',
        icon: 'fa-user-md',
        permissions: {
            'rop-cultura': true,
            'rop-comunicacao': true,
            'rop-medicamentos': true,
            'rop-vida-profissional': true,
            'rop-infeccoes': true,
            'rop-riscos': true,
            'doc-protocolos': true,
            'doc-politicas': true,
            'doc-formularios': true,
            'doc-manuais': true,
            'doc-relatorios': true,
            'doc-processos': true,
            'doc-riscos': true,
            'doc-termos': true,
            'doc-clima': true,
            'doc-plano': true,
            'residencia': true,
            'podcasts': true,
            'notificacoes': true,
            'ranking': true,
            'admin-panel': false
        }
    },
    
    'enfermeiro': {
        name: 'Enfermeiro',
        color: '#28a745',
        icon: 'fa-user-nurse',
        permissions: {
            'rop-cultura': true,
            'rop-comunicacao': true,
            'rop-medicamentos': true,
            'rop-vida-profissional': false,
            'rop-infeccoes': true,
            'rop-riscos': false,
            'doc-protocolos': true,
            'doc-politicas': false,
            'doc-formularios': true,
            'doc-manuais': true,
            'doc-relatorios': false,
            'doc-processos': false,
            'doc-riscos': false,
            'doc-termos': false,
            'doc-clima': false,
            'doc-plano': false,
            'residencia': false,
            'podcasts': true,
            'notificacoes': false,
            'ranking': true,
            'admin-panel': false
        }
    },
    
    'tecnico': {
        name: 'Técnico/Auxiliar',
        color: '#ffc107',
        icon: 'fa-user',
        permissions: {
            'rop-cultura': true,
            'rop-comunicacao': true,
            'rop-medicamentos': false,
            'rop-vida-profissional': false,
            'rop-infeccoes': true,
            'rop-riscos': false,
            'doc-protocolos': true,
            'doc-politicas': false,
            'doc-formularios': false,
            'doc-manuais': false,
            'doc-relatorios': false,
            'doc-processos': false,
            'doc-riscos': false,
            'doc-termos': false,
            'doc-clima': false,
            'doc-plano': false,
            'residencia': false,
            'podcasts': true,
            'notificacoes': false,
            'ranking': true,
            'admin-panel': false
        }
    },
    
    'visitante': {
        name: 'Visitante',
        color: '#6c757d',
        icon: 'fa-user-circle',
        permissions: {
            'rop-cultura': false,
            'rop-comunicacao': false,
            'rop-medicamentos': false,
            'rop-vida-profissional': false,
            'rop-infeccoes': false,
            'rop-riscos': false,
            'doc-protocolos': false,
            'doc-politicas': false,
            'doc-formularios': false,
            'doc-manuais': false,
            'doc-relatorios': false,
            'doc-processos': false,
            'doc-riscos': false,
            'doc-termos': false,
            'doc-clima': false,
            'doc-plano': false,
            'residencia': false,
            'podcasts': true,
            'notificacoes': false,
            'ranking': false,
            'admin-panel': false
        }
    }
};

// ==================== MAPEAMENTO: MÓDULOS → PERMISSÕES ====================
const MODULE_PERMISSIONS_MAP = {
    // ROPs Macroáreas
    'cultura-seguranca': 'rop-cultura',
    'comunicacao': 'rop-comunicacao',
    'uso-medicamentos': 'rop-medicamentos',
    'vida-profissional': 'rop-vida-profissional',
    'prevencao-infeccoes': 'rop-infeccoes',
    'avaliacao-riscos': 'rop-riscos',
    
    // Documentos
    'protocolos': 'doc-protocolos',
    'politicas': 'doc-politicas',
    'formularios': 'doc-formularios',
    'manuais': 'doc-manuais',
    'relatorios': 'doc-relatorios',
    'processos': 'doc-processos',
    'riscos': 'doc-riscos',
    'termos': 'doc-termos',
    'clima': 'doc-clima',
    'plano': 'doc-plano'
};

// ==================== ESTRUTURA DE USUÁRIO NO FIRESTORE ====================
/*
users/{userId} = {
    uid: "firebase_uid",
    email: "usuario@email.com",
    displayName: "Nome do Usuário",
    role: "medico", // perfil base
    customPermissions: { // OVERRIDE individual
        'rop-medicamentos': false, // desativa algo do perfil
        'doc-relatorios': true // ativa algo não permitido no perfil
    },
    createdAt: timestamp,
    lastLogin: timestamp,
    active: true,
    createdBy: "admin_uid", // quem criou/aprovou
    notes: "Médico staff - acesso temporário a relatórios"
}
*/

// ==================== FUNÇÕES DE PERMISSÃO ====================

// Obter permissões finais do usuário (perfil + customizações)
function getUserPermissions(user) {
    if (!user || !user.role) {
        return ROLES_TEMPLATES['visitante'].permissions;
    }
    
    // Começa com permissões do perfil base
    const basePermissions = {...ROLES_TEMPLATES[user.role].permissions};
    
    // Aplica customizações individuais (override)
    if (user.customPermissions) {
        Object.assign(basePermissions, user.customPermissions);
    }
    
    return basePermissions;
}

// Verificar se usuário tem permissão específica
function hasPermission(user, permissionKey) {
    const permissions = getUserPermissions(user);
    return permissions[permissionKey] === true;
}

// Verificar se usuário pode acessar um módulo (macroárea ou documento)
function canAccessModule(user, moduleKey) {
    const permissionKey = MODULE_PERMISSIONS_MAP[moduleKey];
    if (!permissionKey) return false;
    return hasPermission(user, permissionKey);
}

// Filtrar ROPs baseado em permissões
function getAvailableROPs(user) {
    const allROPs = Object.keys(ropsData);
    return allROPs.filter(ropKey => canAccessModule(user, ropKey));
}

// Filtrar documentos baseado em permissões
function getAvailableDocuments(user) {
    const allDocs = Object.keys(documentsData);
    return allDocs.filter(docKey => canAccessModule(user, docKey));
}

// ==================== ADMIN: GERENCIAR PERMISSÕES ====================

// Listar todos usuários (admin)
async function listAllUsers() {
    if (!hasPermission(currentUser, 'admin-panel')) {
        throw new Error('Acesso negado');
    }
    
    const usersSnapshot = await db.collection('users').get();
    return usersSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));
}

// Atualizar perfil base de um usuário
async function updateUserRole(userId, newRole) {
    if (!hasPermission(currentUser, 'admin-panel')) {
        throw new Error('Acesso negado');
    }
    
    await db.collection('users').doc(userId).update({
        role: newRole,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
        updatedBy: currentUser.uid
    });
}

// Atualizar permissão individual de um usuário
async function updateUserCustomPermission(userId, permissionKey, value) {
    if (!hasPermission(currentUser, 'admin-panel')) {
        throw new Error('Acesso negado');
    }
    
    const updateData = {};
    updateData[`customPermissions.${permissionKey}`] = value;
    updateData.updatedAt = firebase.firestore.FieldValue.serverTimestamp();
    updateData.updatedBy = currentUser.uid;
    
    await db.collection('users').doc(userId).update(updateData);
}

// Resetar customizações (voltar ao perfil base)
async function resetUserCustomPermissions(userId) {
    if (!hasPermission(currentUser, 'admin-panel')) {
        throw new Error('Acesso negado');
    }
    
    await db.collection('users').doc(userId).update({
        customPermissions: firebase.firestore.FieldValue.delete(),
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
        updatedBy: currentUser.uid
    });
}

// ==================== UI: PAINEL DE GERENCIAMENTO ====================

function showAdminPermissionsPanel() {
    if (!hasPermission(currentUser, 'admin-panel')) {
        showToast('Acesso negado', 'error');
        return;
    }
    
    const screen = document.getElementById('adminScreen');
    screen.innerHTML = `
        <button class="back-btn" onclick="goHome()">
            <i class="fas fa-arrow-left"></i> Voltar
        </button>
        <h2 class="screen-title">
            <i class="fas fa-user-shield"></i> Gerenciar Permissões
        </h2>
        
        <div class="admin-tabs">
            <button class="tab-btn active" onclick="showUsersList()">
                <i class="fas fa-users"></i> Usuários
            </button>
            <button class="tab-btn" onclick="showRolesTemplates()">
                <i class="fas fa-id-card"></i> Perfis
            </button>
            <button class="tab-btn" onclick="showPermissionsMatrix()">
                <i class="fas fa-table"></i> Matriz
            </button>
        </div>
        
        <div id="adminContent" class="admin-content">
            <div class="loading">
                <i class="fas fa-spinner fa-spin"></i> Carregando...
            </div>
        </div>
    `;
    
    showScreen('admin');
    showUsersList();
}

// Listar usuários
async function showUsersList() {
    const content = document.getElementById('adminContent');
    content.innerHTML = '<div class="loading"><i class="fas fa-spinner fa-spin"></i> Carregando usuários...</div>';
    
    try {
        const users = await listAllUsers();
        
        content.innerHTML = `
            <div class="users-grid">
                ${users.map(user => `
                    <div class="user-card" onclick="editUserPermissions('${user.id}')">
                        <div class="user-header">
                            <div class="user-icon" style="background: ${ROLES_TEMPLATES[user.role]?.color || '#999'}">
                                <i class="fas ${ROLES_TEMPLATES[user.role]?.icon || 'fa-user'}"></i>
                            </div>
                            <div class="user-info">
                                <h3>${user.displayName || 'Sem nome'}</h3>
                                <p>${user.email}</p>
                            </div>
                        </div>
                        
                        <div class="user-role">
                            <span class="role-badge" style="background: ${ROLES_TEMPLATES[user.role]?.color || '#999'}">
                                ${ROLES_TEMPLATES[user.role]?.name || user.role}
                            </span>
                            ${user.customPermissions ? '<span class="custom-badge">Customizado</span>' : ''}
                        </div>
                        
                        <div class="user-meta">
                            <small>
                                <i class="fas fa-clock"></i>
                                Último acesso: ${user.lastLogin ? formatDate(user.lastLogin) : 'Nunca'}
                            </small>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    } catch (error) {
        content.innerHTML = `
            <div class="error-message">
                <i class="fas fa-exclamation-triangle"></i>
                <p>Erro ao carregar usuários: ${error.message}</p>
            </div>
        `;
    }
}

// Editar permissões de um usuário específico
async function editUserPermissions(userId) {
    const content = document.getElementById('adminContent');
    content.innerHTML = '<div class="loading"><i class="fas fa-spinner fa-spin"></i> Carregando...</div>';
    
    try {
        const userDoc = await db.collection('users').doc(userId).get();
        const user = {id: userDoc.id, ...userDoc.data()};
        const finalPermissions = getUserPermissions(user);
        
        content.innerHTML = `
            <div class="user-edit-panel">
                <div class="user-edit-header">
                    <h3>
                        <i class="fas fa-user-edit"></i>
                        ${user.displayName || user.email}
                    </h3>
                    <button class="btn-secondary" onclick="showUsersList()">
                        <i class="fas fa-times"></i> Fechar
                    </button>
                </div>
                
                <div class="user-edit-section">
                    <h4>Perfil Base</h4>
                    <select id="userRoleSelect" class="form-input" onchange="updateUserRoleNow('${userId}', this.value)">
                        ${Object.keys(ROLES_TEMPLATES).map(roleKey => `
                            <option value="${roleKey}" ${user.role === roleKey ? 'selected' : ''}>
                                ${ROLES_TEMPLATES[roleKey].name}
                            </option>
                        `).join('')}
                    </select>
                </div>
                
                <div class="user-edit-section">
                    <div class="section-header">
                        <h4>Permissões Individuais</h4>
                        ${user.customPermissions ? `
                            <button class="btn-warning btn-sm" onclick="resetPermissionsNow('${userId}')">
                                <i class="fas fa-undo"></i> Resetar para perfil base
                            </button>
                        ` : ''}
                    </div>
                    
                    <div class="permissions-grid">
                        <div class="permission-category">
                            <h5><i class="fas fa-question-circle"></i> ROPs - Desafio</h5>
                            ${renderPermissionToggles(userId, user, finalPermissions, [
                                'rop-cultura',
                                'rop-comunicacao',
                                'rop-medicamentos',
                                'rop-vida-profissional',
                                'rop-infeccoes',
                                'rop-riscos'
                            ])}
                        </div>
                        
                        <div class="permission-category">
                            <h5><i class="fas fa-file-alt"></i> Documentos</h5>
                            ${renderPermissionToggles(userId, user, finalPermissions, [
                                'doc-protocolos',
                                'doc-politicas',
                                'doc-formularios',
                                'doc-manuais',
                                'doc-relatorios',
                                'doc-processos',
                                'doc-riscos',
                                'doc-termos',
                                'doc-clima',
                                'doc-plano'
                            ])}
                        </div>
                        
                        <div class="permission-category">
                            <h5><i class="fas fa-cog"></i> Módulos</h5>
                            ${renderPermissionToggles(userId, user, finalPermissions, [
                                'residencia',
                                'podcasts',
                                'notificacoes',
                                'ranking',
                                'admin-panel'
                            ])}
                        </div>
                    </div>
                </div>
                
                ${user.notes ? `
                    <div class="user-notes">
                        <strong>Notas:</strong> ${user.notes}
                    </div>
                ` : ''}
            </div>
        `;
    } catch (error) {
        showToast('Erro ao carregar usuário: ' + error.message, 'error');
    }
}

// Renderizar toggles de permissão
function renderPermissionToggles(userId, user, finalPermissions, permissionKeys) {
    return permissionKeys.map(key => {
        const baseValue = ROLES_TEMPLATES[user.role]?.permissions[key];
        const customValue = user.customPermissions?.[key];
        const isCustom = customValue !== undefined;
        const currentValue = finalPermissions[key];
        
        const label = key
            .replace('rop-', 'ROPs: ')
            .replace('doc-', '')
            .replace(/-/g, ' ')
            .split(' ')
            .map(w => w.charAt(0).toUpperCase() + w.slice(1))
            .join(' ');
        
        return `
            <div class="permission-toggle ${isCustom ? 'customized' : ''}">
                <label class="toggle-label">
                    <input 
                        type="checkbox" 
                        ${currentValue ? 'checked' : ''}
                        onchange="toggleUserPermission('${userId}', '${key}', this.checked, ${baseValue})"
                    >
                    <span class="toggle-slider"></span>
                    <span class="toggle-text">
                        ${label}
                        ${isCustom ? '<i class="fas fa-star" title="Customizado"></i>' : ''}
                    </span>
                </label>
            </div>
        `;
    }).join('');
}

// Toggle permissão individual
async function toggleUserPermission(userId, permissionKey, newValue, baseValue) {
    try {
        // Se o valor é igual ao do perfil base, remove a customização
        if (newValue === baseValue) {
            const userRef = db.collection('users').doc(userId);
            const updateData = {};
            updateData[`customPermissions.${permissionKey}`] = firebase.firestore.FieldValue.delete();
            await userRef.update(updateData);
            showToast('Permissão restaurada ao perfil base', 'success');
        } else {
            // Caso contrário, cria/atualiza a customização
            await updateUserCustomPermission(userId, permissionKey, newValue);
            showToast('Permissão customizada atualizada', 'success');
        }
        
        // Recarrega se for o próprio usuário
        if (userId === currentUser.uid) {
            await loadCurrentUserData();
        }
    } catch (error) {
        showToast('Erro ao atualizar permissão: ' + error.message, 'error');
    }
}

// Atualizar perfil base
async function updateUserRoleNow(userId, newRole) {
    try {
        await updateUserRole(userId, newRole);
        showToast('Perfil atualizado com sucesso', 'success');
        editUserPermissions(userId); // Recarrega
        
        if (userId === currentUser.uid) {
            await loadCurrentUserData();
        }
    } catch (error) {
        showToast('Erro ao atualizar perfil: ' + error.message, 'error');
    }
}

// Resetar customizações
async function resetPermissionsNow(userId) {
    if (!confirm('Resetar todas customizações? O usuário voltará ao perfil base.')) {
        return;
    }
    
    try {
        await resetUserCustomPermissions(userId);
        showToast('Permissões resetadas para o perfil base', 'success');
        editUserPermissions(userId);
        
        if (userId === currentUser.uid) {
            await loadCurrentUserData();
        }
    } catch (error) {
        showToast('Erro ao resetar permissões: ' + error.message, 'error');
    }
}

// ==================== INTEGRAÇÃO COM APP.JS ====================

// Atualizar currentUser ao fazer login
async function loadCurrentUserData() {
    const userDoc = await db.collection('users').doc(auth.currentUser.uid).get();
    if (userDoc.exists) {
        currentUser = {
            uid: userDoc.id,
            ...userDoc.data()
        };
    } else {
        // Criar perfil padrão se não existir
        currentUser = {
            uid: auth.currentUser.uid,
            email: auth.currentUser.email,
            displayName: auth.currentUser.displayName,
            role: 'visitante',
            customPermissions: {},
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            active: true
        };
        await db.collection('users').doc(auth.currentUser.uid).set(currentUser);
    }
}

// Formatador de data
function formatDate(timestamp) {
    if (!timestamp) return 'Nunca';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('pt-BR') + ' ' + date.toLocaleTimeString('pt-BR');
}

// ==================== EXPORTAR ====================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        ROLES_TEMPLATES,
        getUserPermissions,
        hasPermission,
        canAccessModule,
        getAvailableROPs,
        getAvailableDocuments
    };
}

