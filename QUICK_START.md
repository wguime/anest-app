# 🚀 Guia Rápido de Início - ANEST

## ⚡ Início Rápido (5 minutos)

### Passo 1: Configurar Firebase (2 minutos)

1. Acesse [Firebase Console](https://console.firebase.google.com/)
2. Selecione o projeto `desafio-rops-app` (já criado)
3. Ative **Authentication**:
   - No menu lateral: Authentication → Sign-in method
   - Habilite: **Email/Password** e **Google**
4. Ative **Firestore Database**:
   - No menu lateral: Firestore Database → Create database
   - Escolha: **Start in production mode**
   - Localização: **southamerica-east1 (São Paulo)**

### Passo 2: Configurar Regras do Firestore (1 minuto)

No Firebase Console → Firestore Database → Rules, cole:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth.uid == userId;
    }
    match /quiz_results/{resultId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null;
    }
  }
}
```

Clique em **Publicar**.

### Passo 3: Executar Localmente (2 minutos)

**Opção A - Python (mais simples):**
```bash
cd /Users/guilherme/Documents/Qmentum/App
python3 -m http.server 8000
```

**Opção B - Node.js:**
```bash
cd /Users/guilherme/Documents/Qmentum/App
npx http-server -p 8000
```

**Opção C - VSCode Live Server:**
1. Abra VSCode
2. Instale extensão "Live Server"
3. Abra `App/index.html`
4. Clique direito → "Open with Live Server"

### Passo 4: Acessar

Abra no navegador: `http://localhost:8000`

---

## ✅ Checklist de Verificação

### Firebase Configurado?
- [ ] Authentication Email/Password ativado
- [ ] Authentication Google ativado
- [ ] Firestore Database criado
- [ ] Regras de segurança configuradas

### Aplicação Funcionando?
- [ ] Página carrega sem erros no console
- [ ] Tela de login aparece
- [ ] Consegue criar conta
- [ ] Consegue fazer login
- [ ] Vê página inicial com 12 cards

### Problemas Comuns?

#### ❌ Erro: "Firebase is not defined"
**Solução**: Verifique conexão com internet. Scripts do Firebase são carregados via CDN.

#### ❌ Erro ao fazer login
**Solução**: 
1. Verifique se Authentication está ativado no Firebase Console
2. Verifique se os métodos Email/Password e Google estão habilitados

#### ❌ Erro: "Missing or insufficient permissions"
**Solução**: Verifique se as regras do Firestore foram configuradas corretamente.

#### ❌ Página em branco
**Solução**: 
1. Abra o Console do navegador (F12)
2. Verifique erros na aba Console
3. Verifique se está servindo de um servidor HTTP (não abrir arquivo diretamente)

---

## 🎮 Testando as Funcionalidades

### 1. Criar Conta
1. Acesse a aplicação
2. Clique em "Registrar"
3. Preencha: Nome, Email, Senha
4. Clique em "Criar Conta"
5. ✅ Deve redirecionar para página inicial

### 2. Fazer Quiz
1. Na página inicial, clique em "ROPs - Desafio"
2. Escolha "Cultura de Segurança"
3. Clique em "ROP 1.1"
4. Responda as questões
5. ✅ Deve ganhar pontos por acertos

### 3. Ver Ranking
1. Em ROPs, clique em "Ranking"
2. ✅ Deve ver seu nome na lista

### 4. Fazer Logout
1. Clique no ícone de usuário no topo
2. Clique em sair
3. ✅ Deve voltar para tela de login

---

## 📱 Testando em Diferentes Dispositivos

### Desktop
- ✅ Chrome, Firefox, Safari, Edge
- ✅ Resolução mínima: 1280x720

### Tablet
- ✅ iPad, Android Tablets
- ✅ Modo retrato e paisagem

### Mobile
- ✅ iPhone, Android
- ✅ Responsivo em telas pequenas

---

## 🔧 Configurações Adicionais (Opcional)

### Personalizar Logo
Substitua o ícone no arquivo `index.html` linha ~27:
```html
<i class="fas fa-heartbeat"></i>
```

### Alterar Cores
Edite variáveis CSS em `styles.css` linha ~7:
```css
:root {
    --primary-color: #667eea;  /* Cor principal */
    --secondary-color: #764ba2; /* Cor secundária */
    /* ... */
}
```

### Adicionar Mais Questões
Edite `rops-data.js` e adicione questões conforme template:
```javascript
{
    question: "Sua pergunta?",
    options: ["A", "B", "C", "D"],
    correctAnswer: 0, // índice da correta
    explanation: "Explicação..."
}
```

---

## 📞 Precisa de Ajuda?

- **Problemas técnicos**: Verifique o console do navegador (F12)
- **Dúvidas sobre Firebase**: [Documentação Firebase](https://firebase.google.com/docs)
- **Suporte**: Consulte o README.md completo

---

## ⏱️ Tempo Total: ~5 minutos

✅ **Pronto! Sua aplicação está funcionando.**

Próximos passos:
1. Explore todas as funcionalidades
2. Adicione mais questões em `rops-data.js`
3. Convide outros usuários para testar
4. Considere fazer deploy (ver DEPLOY.md)

**Bom uso! 🎉**

