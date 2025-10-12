# 🔐 SISTEMA DE PERMISSÕES - ANEST APP

## 📋 VISÃO GERAL

Sistema completo de controle de acesso baseado em **roles (perfis)** e **permissões por módulo**.

---

## 👥 PERFIS DE USUÁRIO (ROLES)

### **1. Administrador** 🔴
- ✅ Acesso TOTAL a tudo
- ✅ Gerencia outros usuários
- ✅ Define permissões
- ✅ Visualiza relatórios completos
- ✅ Exporta dados

### **2. Médico Staff** 🔵
- ✅ ROPs - Desafio (todas)
- ✅ Documentos (todos)
- ✅ Podcasts (todos)
- ✅ Residência Médica (gerenciamento)
- ✅ Relatórios
- ❌ Administração de usuários

### **3. Médico Residente** 🟢
- ✅ ROPs - Desafio (todas)
- ✅ Documentos (selecionados)
- ✅ Podcasts (todos)
- ✅ Residência Médica (visualização)
- ❌ Relatórios administrativos
- ❌ Configurações

### **4. Enfermeiro** 🟡
- ✅ ROPs selecionadas (Cultura, Comunicação)
- ✅ Documentos básicos
- ✅ Podcasts educativos
- ❌ Residência Médica
- ❌ Documentos administrativos

### **5. Técnico/Auxiliar** 🟠
- ✅ ROPs básicas (selecionadas)
- ✅ Protocolos específicos
- ✅ Podcasts básicos
- ❌ Documentos gerenciais
- ❌ Relatórios
- ❌ Residência Médica

### **6. Visitante/Observador** ⚪
- ✅ Conteúdo público apenas
- ✅ Alguns podcasts
- ❌ Quiz completo
- ❌ Documentos
- ❌ Qualquer área restrita

---

## 🎯 MÓDULOS E PERMISSÕES

### **Matriz de Permissões**

| Módulo | Admin | Staff | Residente | Enfermeiro | Técnico | Visitante |
|--------|-------|-------|-----------|------------|---------|-----------|
| **ROPs - Todas** | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ |
| **ROPs - Cultura** | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ |
| **ROPs - Comunicação** | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ |
| **ROPs - Medicamentos** | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ |
| **ROPs - Vida Prof** | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ |
| **ROPs - Infecções** | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ |
| **ROPs - Riscos** | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ |
| **Documentos - Todos** | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| **Documentos - Protocolos** | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ |
| **Documentos - Políticas** | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ |
| **Documentos - Relatórios** | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| **Podcasts - Todos** | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ |
| **Podcasts - Básicos** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Residência Médica** | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ |
| **Ranking Completo** | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ |
| **Notificações** | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ |
| **Admin Panel** | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |

---

## 🔧 IMPLEMENTAÇÃO TÉCNICA

### **1. Estrutura de Dados (Firestore)**

```javascript
// Coleção: users
{
  uid: "firebase_user_id",
  email: "usuario@email.com",
  displayName: "Nome do Usuário",
  role: "medico-staff", // ou "admin", "residente", etc.
  permissions: {
    rops: ["all"], // ou ["cultura", "comunicacao"]
    documentos: ["protocolos", "politicas"],
    podcasts: ["all"],
    residencia: true,
    notificacoes: true,
    adminPanel: false
  },
  createdAt: timestamp,
  lastLogin: timestamp,
  active: true
}
```

### **2. Arquivo de Configuração de Roles**

```javascript
// roles-config.js
const ROLES = {
  'admin': {
    name: 'Administrador',
    color: '#dc3545',
    icon: 'fa-user-shield',
    permissions: {
      rops: ['all'],
      documentos: ['all'],
      podcasts: ['all'],
      residencia: true,
      notificacoes: true,
      adminPanel: true,
      ranking: true
    }
  },
  'medico-staff': {
    name: 'Médico Staff',
    color: '#007bff',
    icon: 'fa-user-md',
    permissions: {
      rops: ['all'],
      documentos: ['all'],
      podcasts: ['all'],
      residencia: true,
      notificacoes: true,
      adminPanel: false,
      ranking: true
    }
  },
  'residente': {
    name: 'Médico Residente',
    color: '#28a745',
    icon: 'fa-graduation-cap',
    permissions: {
      rops: ['all'],
      documentos: ['protocolos', 'politicas', 'formularios', 'manuais'],
      podcasts: ['all'],
      residencia: true,
      notificacoes: false,
      adminPanel: false,
      ranking: true
    }
  },
  'enfermeiro': {
    name: 'Enfermeiro',
    color: '#ffc107',
    icon: 'fa-user-nurse',
    permissions: {
      rops: ['cultura-seguranca', 'comunicacao', 'uso-medicamentos', 'prevencao-infeccoes'],
      documentos: ['protocolos', 'formularios'],
      podcasts: ['all'],
      residencia: false,
      notificacoes: false,
      adminPanel: false,
      ranking: true
    }
  },
  'tecnico': {
    name: 'Técnico/Auxiliar',
    color: '#fd7e14',
    icon: 'fa-user',
    permissions: {
      rops: ['cultura-seguranca', 'comunicacao', 'prevencao-infeccoes'],
      documentos: ['protocolos'],
      podcasts: ['basicos'],
      residencia: false,
      notificacoes: false,
      adminPanel: false,
      ranking: true
    }
  },
  'visitante': {
    name: 'Visitante',
    color: '#6c757d',
    icon: 'fa-user-circle',
    permissions: {
      rops: [],
      documentos: [],
      podcasts: ['basicos'],
      residencia: false,
      notificacoes: false,
      adminPanel: false,
      ranking: false
    }
  }
};
```

### **3. Funções de Verificação de Permissão**

```javascript
// Verificar se usuário tem acesso a um módulo
function hasPermission(userRole, module, item = null) {
  const roleConfig = ROLES[userRole];
  if (!roleConfig) return false;
  
  const permissions = roleConfig.permissions[module];
  
  // Se tem acesso a 'all', libera tudo
  if (permissions === true || (Array.isArray(permissions) && permissions.includes('all'))) {
    return true;
  }
  
  // Se especificou item, verifica se está na lista
  if (item && Array.isArray(permissions)) {
    return permissions.includes(item);
  }
  
  return permissions === true;
}

// Filtrar conteúdo baseado em permissões
function filterContentByPermissions(content, userRole, module) {
  if (hasPermission(userRole, module)) {
    return content; // Retorna tudo
  }
  
  const roleConfig = ROLES[userRole];
  const permissions = roleConfig.permissions[module];
  
  if (!Array.isArray(permissions)) {
    return []; // Sem acesso
  }
  
  // Filtra apenas itens permitidos
  return content.filter(item => permissions.includes(item.key || item.id));
}
```

---

## 🎨 INTERFACE DO USUÁRIO

### **1. Indicador de Perfil no Header**

```html
<div class="user-profile">
  <span class="user-role-badge" style="background: #007bff">
    <i class="fas fa-user-md"></i> Médico Staff
  </span>
  <span class="user-name">Dr. João Silva</span>
</div>
```

### **2. Ícones com Cadeado (Sem Acesso)**

```html
<div class="menu-card locked">
  <div class="card-icon disabled">
    <i class="fas fa-lock"></i>
  </div>
  <h3>Residência Médica</h3>
  <p class="locked-message">Acesso restrito</p>
</div>
```

### **3. Mensagens de Acesso Negado**

```html
<div class="access-denied">
  <i class="fas fa-ban"></i>
  <h2>Acesso Restrito</h2>
  <p>Seu perfil não tem permissão para acessar este conteúdo.</p>
  <p>Entre em contato com o administrador para solicitar acesso.</p>
</div>
```

---

## 👨‍💼 PAINEL ADMINISTRATIVO

### **Funcionalidades para Admin**

1. **Listar Usuários**
   - Ver todos usuários cadastrados
   - Perfil atual de cada um
   - Status (ativo/inativo)
   - Último acesso

2. **Editar Perfil de Usuário**
   - Alterar role
   - Customizar permissões específicas
   - Ativar/desativar conta

3. **Criar Novos Perfis Customizados**
   - Definir nome do perfil
   - Escolher permissões específicas
   - Atribuir a usuários

4. **Relatórios de Acesso**
   - Quem acessou o quê
   - Frequência de uso por perfil
   - Áreas mais/menos acessadas

---

## 🔄 FLUXO DE REGISTRO

### **Opção 1: Admin Aprova**
1. Usuário se registra
2. Fica como "pendente"
3. Admin revisa e atribui perfil
4. Usuário é notificado

### **Opção 2: Auto-Registro com Perfil Padrão**
1. Usuário se registra
2. Recebe perfil "Visitante" automaticamente
3. Pode solicitar upgrade
4. Admin aprova ou rejeita

### **Opção 3: Código de Acesso por Perfil**
1. Admin gera códigos de acesso
2. Cada código tem perfil associado
3. Usuário registra com código
4. Recebe perfil automaticamente

---

## 📱 EXEMPLOS PRÁTICOS

### **Cenário 1: Médico Staff**
```
Vê:
✅ Todos ícones da home
✅ Todas ROPs
✅ Todos documentos
✅ Residência Médica completa
✅ Ranking geral

Não vê:
❌ Painel administrativo
```

### **Cenário 2: Enfermeiro**
```
Vê:
✅ ROPs: Cultura, Comunicação, Medicamentos, Infecções
✅ Documentos: Protocolos, Formulários
✅ Podcasts todos
✅ Ranking

Não vê:
❌ ROPs: Vida Profissional, Riscos
❌ Documentos: Relatórios, Políticas, Riscos
❌ Residência Médica
❌ Notificações
```

### **Cenário 3: Visitante**
```
Vê:
✅ Podcasts básicos
✅ Alguns protocolos públicos

Não vê:
❌ Quiz/ROPs
❌ Documentos restritos
❌ Residência Médica
❌ Ranking
❌ Notificações
```

---

## 🚀 IMPLEMENTAÇÃO

Vou implementar:

1. ✅ **Arquivo de configuração de roles**
2. ✅ **Funções de verificação de permissão**
3. ✅ **Lógica de filtro de conteúdo**
4. ✅ **Interface com indicadores de perfil**
5. ✅ **Painel administrativo básico**
6. ✅ **Integração com Firestore**
7. ✅ **Mensagens de acesso negado**
8. ✅ **Sistema de solicitação de acesso**

---

## ⏱️ TEMPO ESTIMADO

- **Implementação básica:** 2-3 horas
- **Painel admin completo:** +2 horas
- **Testes e ajustes:** +1 hora
- **Total:** ~5-6 horas

---

## 💡 RECOMENDAÇÃO

**Começar com:**
1. Sistema de roles básico (3-4 perfis)
2. Permissões por módulo principal
3. Admin pode alterar perfis manualmente
4. Expandir conforme necessidade

**Depois adicionar:**
- Permissões customizadas por usuário
- Auto-registro com códigos
- Relatórios de acesso
- Auditoria completa

---

## ✅ PRONTO PARA IMPLEMENTAR?

Posso começar agora! Vai transformar seu aplicativo em um sistema multi-nível profissional.

**O que você prefere?**
- **A)** Implementação básica (3-4 perfis, permissões simples)
- **B)** Sistema completo (todos perfis, admin panel, relatórios)
- **C)** Customizado (você define perfis e permissões específicas)

