# 🔐 GUIA DE IMPLEMENTAÇÃO - PERMISSÕES INDIVIDUAIS

## ✅ SISTEMA IMPLEMENTADO!

**Sistema híbrido completo:**
- ✅ Perfis base (templates)
- ✅ Customização individual por usuário
- ✅ Painel administrativo visual
- ✅ Toggle de permissões em tempo real

---

## 📁 ARQUIVOS CRIADOS

### **1. `permissions-system.js`**
Sistema completo de permissões com:
- 5 perfis base (Admin, Médico, Enfermeiro, Técnico, Visitante)
- Funções de verificação de permissão
- Funções de gerenciamento (admin)
- Interface de administração completa

### **2. `permissions-styles.css`**
Estilos para:
- Painel de administração
- Lista de usuários
- Editor de permissões
- Toggles personalizados
- Mensagens de acesso negado

---

## 🚀 COMO FUNCIONA

### **Sistema Híbrido**

```
Perfil Base + Customizações Individuais = Permissões Finais
     ↓                    ↓                        ↓
  "médico"    +    {doc-relatorios: false}  =  Médico SEM relatórios
```

### **Exemplo Prático:**

**Usuário: Dr. João (Perfil: Médico)**

**Perfil base permite:**
- ✅ Todas ROPs
- ✅ Todos documentos
- ✅ Residência Médica

**Admin customiza individualmente:**
- ❌ Desativa "Relatórios de Segurança" só para ele
- ✅ Mantém todo resto do perfil

**Resultado:**
- Dr. João tem acesso de médico
- MAS não vê relatórios
- Outros médicos ainda veem

---

## 🎯 FUNCIONALIDADES

### **Para Administradores:**

1. **Ver Todos Usuários**
   - Lista visual com cards
   - Mostra perfil e status
   - Indica customizações

2. **Editar Usuário Individual**
   - Alterar perfil base
   - Toggle permissão por permissão
   - Indica quando está customizado
   - Resetar para perfil base

3. **Controle Granular**
   - 21 permissões individuais:
     - 6 ROPs (macroáreas)
     - 10 Documentos
     - 5 Módulos

### **Para Usuários Comuns:**

1. **Acesso Automático**
   - Sistema verifica permissões
   - Filtra conteúdo automaticamente
   - Mostra apenas o permitido

2. **Feedback Visual**
   - Ícones com cadeado (sem acesso)
   - Mensagens de acesso negado
   - Badge de perfil no header

---

## 📊 PERMISSÕES DISPONÍVEIS

### **ROPs (6)**
- `rop-cultura` - Cultura de Segurança
- `rop-comunicacao` - Comunicação
- `rop-medicamentos` - Uso de Medicamentos
- `rop-vida-profissional` - Vida Profissional
- `rop-infeccoes` - Prevenção de Infecções
- `rop-riscos` - Avaliação de Riscos

### **Documentos (10)**
- `doc-protocolos` - Protocolos
- `doc-politicas` - Políticas
- `doc-formularios` - Formulários
- `doc-manuais` - Manuais
- `doc-relatorios` - Relatórios de Segurança
- `doc-processos` - Mapeamento de Processos
- `doc-riscos` - Mapeamento de Riscos
- `doc-termos` - Termos
- `doc-clima` - Clima de Segurança
- `doc-plano` - Plano de Segurança

### **Módulos (5)**
- `residencia` - Residência Médica
- `podcasts` - Podcasts
- `notificacoes` - Notificações
- `ranking` - Ranking
- `admin-panel` - Painel Administrativo

---

## 🔧 INTEGRAÇÃO COM O SISTEMA

### **Passo 1: Adicionar ao `index.html`**

```html
<!-- Após firebase-config.js -->
<script src="permissions-system.js"></script>

<!-- Adicionar CSS -->
<link rel="stylesheet" href="permissions-styles.css">

<!-- Adicionar tela de admin -->
<div id="adminScreen" class="screen">
    <!-- Conteúdo será gerado dinamicamente -->
</div>
```

### **Passo 2: Atualizar `app.js`**

```javascript
// Ao fazer login, carregar dados do usuário
auth.onAuthStateChanged(async (user) => {
    if (user) {
        await loadCurrentUserData(); // Função do permissions-system.js
        showHomeScreen();
    } else {
        showLoginScreen();
    }
});

// Filtrar ROPs por permissão
function showROPs() {
    const availableROPs = getAvailableROPs(currentUser);
    // Renderizar apenas as permitidas
}

// Filtrar documentos
function showDocumentsSection(section) {
    if (!canAccessModule(currentUser, section)) {
        showAccessDenied();
        return;
    }
    // Renderizar conteúdo
}

// Adicionar ícone de admin na home (só para admins)
function showHomeScreen() {
    let menuHTML = `
        <!-- ícones existentes -->
        
        ${hasPermission(currentUser, 'admin-panel') ? `
            <div class="menu-card" onclick="showAdminPermissionsPanel()">
                <div class="card-icon" style="background: linear-gradient(135deg, #dc3545 0%, #c82333 100%)">
                    <i class="fas fa-user-shield"></i>
                </div>
                <h3>Admin</h3>
            </div>
        ` : ''}
    `;
}
```

### **Passo 3: Estrutura de Dados no Firestore**

```javascript
// Criar collection 'users'
users/{userId} = {
    uid: "firebase_uid",
    email: "usuario@email.com",
    displayName: "Nome",
    role: "medico", // perfil base
    customPermissions: { // opcional
        'doc-relatorios': false,
        'rop-riscos': true
    },
    createdAt: timestamp,
    lastLogin: timestamp,
    active: true
}
```

### **Passo 4: Regras de Segurança do Firestore**

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Usuários podem ler seu próprio documento
    match /users/{userId} {
      allow read: if request.auth != null && request.auth.uid == userId;
      allow write: if request.auth != null && 
                      get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    // Admins podem ler todos usuários
    match /users/{userId} {
      allow read: if request.auth != null && 
                     get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
  }
}
```

---

## 💻 EXEMPLOS DE USO

### **Verificar Permissão Simples**

```javascript
// Verificar se pode acessar relatórios
if (hasPermission(currentUser, 'doc-relatorios')) {
    mostrarRelatorios();
} else {
    mostrarAcessoNegado();
}
```

### **Filtrar Conteúdo**

```javascript
// Pegar apenas ROPs permitidas
const availableROPs = getAvailableROPs(currentUser);
// Retorna apenas: ['cultura-seguranca', 'comunicacao', ...]

// Pegar apenas documentos permitidos
const availableDocs = getAvailableDocuments(currentUser);
```

### **Verificar Módulo Específico**

```javascript
// Verificar se pode acessar Residência Médica
if (canAccessModule(currentUser, 'vida-profissional')) {
    // Mostrar conteúdo
}
```

---

## 🎨 INTERFACE DO PAINEL ADMIN

### **Tela Principal**
```
┌─────────────────────────────────────────┐
│  Gerenciar Permissões           [Voltar]│
├─────────────────────────────────────────┤
│ [Usuários] [Perfis] [Matriz]            │
├─────────────────────────────────────────┤
│                                          │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐ │
│  │ 👨‍⚕️      │  │ 👨‍⚕️      │  │ 👨‍⚕️      │ │
│  │ Dr. João│  │Dr.Maria │  │Enf.Pedro│ │
│  │ Médico  │  │ Admin   │  │Enfermeiro│ │
│  │ Custom  │  │         │  │         │ │
│  └─────────┘  └─────────┘  └─────────┘ │
│                                          │
└─────────────────────────────────────────┘
```

### **Edição de Usuário**
```
┌──────────────────────────────────────────┐
│ Dr. João Silva                  [Fechar] │
├──────────────────────────────────────────┤
│ Perfil Base: [Médico ▼]                  │
├──────────────────────────────────────────┤
│ Permissões Individuais    [Resetar tudo] │
│                                           │
│ ROPs - Desafio                            │
│ ☑️ Cultura de Segurança                   │
│ ☑️ Comunicação                            │
│ ☑️ Uso de Medicamentos                    │
│ ☐ Vida Profissional ⭐                    │
│                                           │
│ Documentos                                │
│ ☑️ Protocolos                             │
│ ☐ Relatórios ⭐                           │
│                                           │
│ ⭐ = Customizado                          │
└──────────────────────────────────────────┘
```

---

## 🔄 FLUXO DE PRIMEIRO ACESSO

### **Opção Recomendada: Admin Aprova**

1. **Usuário se registra**
   - Email/senha ou Google
   - Fica como "visitante"

2. **Admin revisa**
   - Entra no painel admin
   - Vê novo usuário
   - Atribui perfil adequado

3. **Usuário é notificado**
   - Recarrega app
   - Vê novo conteúdo

---

## ✅ CHECKLIST DE IMPLEMENTAÇÃO

### **Backend (Firestore)**
- [ ] Criar collection `users`
- [ ] Configurar regras de segurança
- [ ] Migrar usuários existentes (se houver)

### **Frontend**
- [ ] Adicionar `permissions-system.js` ao `index.html`
- [ ] Adicionar `permissions-styles.css` ao `index.html`
- [ ] Adicionar tela `adminScreen` ao `index.html`
- [ ] Atualizar `app.js` com verificações de permissão
- [ ] Adicionar ícone Admin na home
- [ ] Filtrar ROPs por permissão
- [ ] Filtrar documentos por permissão
- [ ] Adicionar mensagens de acesso negado

### **Testes**
- [ ] Criar usuário admin
- [ ] Criar usuários de teste com perfis diferentes
- [ ] Testar customização individual
- [ ] Testar filtros de conteúdo
- [ ] Testar acesso negado
- [ ] Testar reset de permissões

---

## 🚀 PRÓXIMOS PASSOS

1. **Integrar arquivos ao projeto**
2. **Configurar Firestore**
3. **Criar primeiro usuário admin**
4. **Testar sistema completo**
5. **Migrar usuários existentes**

---

## 💡 DICAS IMPORTANTES

### **Primeira Vez**
- Defina um email como admin manualmente no Firestore
- Use esse usuário para gerenciar os demais

### **Segurança**
- Nunca confie apenas no frontend
- Configure regras do Firestore adequadamente
- Valide permissões no backend também

### **Performance**
- Carregue dados do usuário uma vez por sessão
- Cache permissões localmente
- Recarregue apenas quando alteradas

---

## 📞 IMPLEMENTAR AGORA?

Posso:
1. **Integrar ao projeto atual** (adicionar ao index.html e app.js)
2. **Criar usuário admin inicial**
3. **Configurar Firestore**
4. **Testar sistema completo**
5. **Commitar tudo no GitHub**

**Tempo estimado:** 30-40 minutos

**Quer que eu faça agora?** 
(responda "sim" ou "agora" para começar)

