# 🚀 GUIA COMPLETO: Deploy do Aplicativo ANEST no GitHub

## ✅ O QUE VOCÊ TEM AGORA

Um **aplicativo web completo e funcional** com:

### 📱 Funcionalidades Implementadas:
- ✅ **Sistema de Login Completo**
  - Login com email/senha
  - Login com Google
  - Registro de usuários
  - Recuperação de senha
  
- ✅ **ROPs - Quiz Gamificado**
  - 6 Macro Áreas com 26 subdivisões
  - 150+ questões com múltipla escolha
  - Sistema de pontuação
  - Ranking em tempo real
  - Explicações detalhadas
  - Gráficos de desempenho
  
- ✅ **Seções de Documentos**
  - Protocolos (15 documentos)
  - Políticas
  - Formulários
  - Manuais
  - Relatórios de Segurança
  - Mapeamento de Processos e Riscos
  - Plano de Segurança do Paciente
  
- ✅ **Podcasts ROPs**
  - Áudio aulas por macroárea
  - 4 áudios já integrados
  - Player HTML5 integrado
  
- ✅ **Residência Médica**
  - Estrutura para Aulas, Artigos, Escalas, Estágios, Férias
  
- ✅ **Interface Moderna**
  - Design profissional
  - Animações suaves
  - Totalmente responsivo
  - Dark mode ready

### 📂 Arquivos do Projeto:
```
/App/
  ├── index.html          (320 linhas) - Interface principal
  ├── styles.css          (1000+ linhas) - Design moderno
  ├── app.js              (1200+ linhas) - Lógica completa
  ├── firebase-config.js  (25 linhas) - Configuração Firebase
  ├── rops-data.js        (1760+ linhas) - Banco de questões
  └── documents-data.js   (300+ linhas) - Dados dos documentos

/Documentos/            - 15+ PDFs de protocolos
/Podcasts/              - 4 áudio aulas (M4A)
```

---

## 🎯 PASSO 1: Preparar o Repositório no GitHub

### 1.1 Criar Repositório
1. Acesse: https://github.com/new
2. Configure:
   ```
   Repository name: anest-app
   Description: Sistema de Gestão e Treinamento ANEST - Quiz ROPs, Protocolos e Documentos
   ☑️ Public
   ☐ Add README
   ☐ Add .gitignore
   ```
3. Clique **"Create repository"**

---

## 💻 PASSO 2: Configurar Git Local

### 2.1 Abrir Terminal
```bash
# Abra o Terminal no macOS
# Ou use o Terminal integrado do VSCode (Ctrl + `)
```

### 2.2 Navegar até a Pasta
```bash
cd /Users/guilherme/Documents/Qmentum
```

### 2.3 Verificar Status do Git
```bash
# Verificar se já tem Git
git status
```

**Se retornar erro "not a git repository":**
```bash
# Inicializar Git
git init

# Configurar (primeira vez apenas)
git config --global user.name "Seu Nome"
git config --global user.email "seu@email.com"
```

---

## 📤 PASSO 3: Fazer Upload para GitHub

### 3.1 Adicionar Todos os Arquivos
```bash
# Verificar o que será adicionado
git status

# Adicionar tudo
git add .

# Verificar novamente
git status
```

**Você deve ver em verde:**
- ✅ App/index.html
- ✅ App/styles.css
- ✅ App/app.js
- ✅ App/firebase-config.js
- ✅ App/rops-data.js
- ✅ App/documents-data.js
- ✅ Documentos/
- ✅ Podcasts/
- ✅ README.md
- ✅ .gitignore

### 3.2 Fazer o Commit
```bash
git commit -m "feat: Sistema ANEST completo com ROPs, Quiz, Documentos e Podcasts"
```

### 3.3 Conectar ao GitHub
**⚠️ SUBSTITUA `SEU-USUARIO` pelo seu username do GitHub!**

```bash
# Adicionar repositório remoto
git remote add origin https://github.com/SEU-USUARIO/anest-app.git

# Verificar conexão
git remote -v
```

### 3.4 Enviar para GitHub
```bash
# Renomear branch para main
git branch -M main

# Fazer push
git push -u origin main
```

**Se pedir autenticação:**
- Username: seu username do GitHub
- Password: use um **Personal Access Token** (veja seção 5)

---

## 🔑 PASSO 4: Criar Personal Access Token (se necessário)

Se o Git pedir senha e não aceitar sua senha normal:

1. GitHub → Foto de perfil → **Settings**
2. **Developer settings** (final da barra lateral)
3. **Personal access tokens** → **Tokens (classic)**
4. **Generate new token** → **Generate new token (classic)**
5. Configure:
   ```
   Note: ANEST App Deploy
   Expiration: 90 days
   Scopes: ☑️ repo (marcar tudo)
   ```
6. **Generate token**
7. **COPIE O TOKEN** (guardar em lugar seguro!)
8. Use esse token como senha no terminal

---

## 🌐 PASSO 5: Ativar GitHub Pages

### 5.1 Acessar Settings
1. No seu repositório: https://github.com/SEU-USUARIO/anest-app
2. Clique em **"Settings"** (engrenagem)
3. Menu lateral → **"Pages"**

### 5.2 Configurar Source
```
Source: Deploy from a branch
Branch: main
Folder: /App (⚠️ IMPORTANTE: selecionar /App, não root!)
```

3. Clique **"Save"**

### 5.3 Aguardar Deploy
- GitHub vai processar (1-5 minutos)
- Quando pronto:
  ```
  ✅ Your site is live at https://SEU-USUARIO.github.io/anest-app/
  ```

---

## 🔧 PASSO 6: Ajustar Caminhos dos Arquivos

### 6.1 Editar documents-data.js

Como o GitHub Pages vai servir do diretório `/App`, precisamos ajustar os caminhos:

**Abra:** `/Users/guilherme/Documents/Qmentum/App/documents-data.js`

**SUBSTITUIR TODOS os caminhos relativos:**

❌ **ANTES:**
```javascript
file: "../Documentos/1 - Protocolos/arquivo.pdf"
file: "../Podcasts/Cultura de Segurança/audio.m4a"
```

✅ **DEPOIS:**
```javascript
file: "./Documentos/1 - Protocolos/arquivo.pdf"
file: "./Podcasts/Cultura de Segurança/audio.m4a"
```

**OU use caminhos absolutos:**
```javascript
file: "https://SEU-USUARIO.github.io/anest-app/Documentos/1 - Protocolos/arquivo.pdf"
```

### 6.2 Mover Pastas para App/

**⚠️ IMPORTANTE:** As pastas `Documentos/` e `Podcasts/` precisam estar dentro de `App/`

```bash
# No terminal, na pasta Qmentum
mv Documentos/ App/
mv Podcasts/ App/

# Verificar estrutura
ls -la App/
```

Você deve ver:
```
App/
  ├── index.html
  ├── styles.css
  ├── app.js
  ├── firebase-config.js
  ├── rops-data.js
  ├── documents-data.js
  ├── Documentos/
  └── Podcasts/
```

### 6.3 Atualizar Caminhos no documents-data.js

Agora que as pastas estão dentro de App/, os caminhos ficam:

```javascript
// EM documents-data.js

const documentsData = {
    protocolos: [
        {
            title: "Avaliação Pré-Anestésica",
            file: "./Documentos/1 - Protocolos/PRO.ANEST.0001-00 avaliação pré anestesica.pdf",
            // ...
        },
        // ...
    ],
    // ...
};

const podcastsData = {
    culturaDeSeguranca: {
        // ...
        audios: [
            {
                title: "ROP 1.1 – Responsabilização pela Qualidade",
                file: "./Podcasts/Cultura de Segurança/ROP 1.1 Cultura de Segurança – Responsabilização pela Qualidade.m4a"
            },
            // ...
        ]
    }
};
```

### 6.4 Commit e Push das Mudanças
```bash
# Adicionar mudanças
git add .

# Commit
git commit -m "fix: Ajustar caminhos e mover pastas para App/"

# Enviar
git push
```

---

## 🔥 PASSO 7: Configurar Firebase

### 7.1 Autorizar Domínio no Firebase
1. Acesse: https://console.firebase.google.com
2. Selecione projeto: **desafio-rops-app**
3. **Authentication** → **Settings** → **Authorized domains**
4. Clique **"Add domain"**
5. Adicione: `SEU-USUARIO.github.io`
6. Salvar

### 7.2 Testar Login com Google
- Sem isso, o login com Google não funcionará
- Login com email/senha funciona normalmente

---

## ✅ PASSO 8: Testar o Aplicativo

### 8.1 Acessar URL
```
https://SEU-USUARIO.github.io/anest-app/
```

### 8.2 Checklist de Testes

#### Login
- [ ] Fazer registro com email/senha
- [ ] Fazer login com email/senha
- [ ] Fazer login com Google
- [ ] Testar esqueci senha

#### Menu Principal
- [ ] Ver todos os 13 ícones
- [ ] Clicar em cada ícone

#### ROPs
- [ ] Abrir ROPs
- [ ] Ver 6 macro áreas
- [ ] Clicar em Cultura de Segurança
- [ ] Ver 4 subdivisões (ROPs)
- [ ] Clicar em ROP 1.1
- [ ] Iniciar Quiz Individual
- [ ] Responder questões
- [ ] Ver explicação
- [ ] Finalizar e ver resultado
- [ ] Ver ranking
- [ ] Testar "Jogar com todas as ROPs"
- [ ] Testar Simulado Geral

#### Documentos
- [ ] Abrir Protocolos
- [ ] Ver lista de 15 protocolos
- [ ] Clicar em um PDF (deve abrir)
- [ ] Testar filtros por categoria
- [ ] Repetir para outras seções

#### Podcasts ROPs
- [ ] Abrir Podcasts ROPs
- [ ] Ver 6 macro áreas
- [ ] Clicar em Cultura de Segurança
- [ ] Ver 4 áudio aulas
- [ ] Tocar um áudio
- [ ] Controles funcionando (play, pause, seek)

#### Residência Médica
- [ ] Abrir Residência Médica
- [ ] Ver 5 sub-seções
- [ ] Mensagem "Em desenvolvimento"

---

## 🐛 SOLUÇÃO DE PROBLEMAS

### Problema 1: Página 404 Not Found
**Causa:** GitHub Pages não encontrou o index.html

**Solução:**
```bash
# Verificar se configurou /App corretamente
# Settings → Pages → Folder: /App
```

### Problema 2: Documentos não Abrem (404)
**Causa:** Caminhos incorretos

**Solução:**
```bash
# Verificar se moveu as pastas para App/
ls -la App/Documentos/
ls -la App/Podcasts/

# Se não moveu, mover agora:
mv Documentos/ App/
mv Podcasts/ App/

# Commit e push
git add .
git commit -m "fix: Mover pastas para App/"
git push
```

### Problema 3: Áudios não Tocam
**Causa:** Formato M4A pode ter problemas em alguns navegadores

**Solução:**
- Testar em Chrome (melhor suporte)
- Converter para MP3 se necessário
- Adicionar múltiplos formatos:
```html
<audio controls>
    <source src="audio.m4a" type="audio/mp4">
    <source src="audio.mp3" type="audio/mpeg">
    Seu navegador não suporta áudio.
</audio>
```

### Problema 4: Login com Google não Funciona
**Causa:** Domínio não autorizado no Firebase

**Solução:**
- Firebase Console → Authentication → Settings
- Authorized domains → Add domain
- Adicionar: `SEU-USUARIO.github.io`

### Problema 5: Erro CORS nos PDFs
**Causa:** GitHub Pages às vezes tem restrições CORS

**Solução A - Usar Proxy:**
```javascript
// Em app.js, na função openDocument:
const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
window.open(proxyUrl + fileUrl, '_blank');
```

**Solução B - PDF.js:**
Integrar PDF.js para visualizar PDFs na própria página

### Problema 6: Site não Atualiza
**Causa:** Cache do navegador ou CDN do GitHub

**Solução:**
```bash
# Limpar cache: Ctrl+Shift+R (Windows) ou Cmd+Shift+R (Mac)
# Ou esperar 5-10 minutos
# Ou usar modo anônimo
```

---

## 🔄 PASSO 9: Fazer Atualizações Futuras

### 9.1 Fluxo de Trabalho Normal

```bash
# 1. Fazer mudanças nos arquivos localmente

# 2. Verificar o que mudou
git status

# 3. Adicionar mudanças
git add .
# OU adicionar arquivos específicos:
git add App/rops-data.js

# 4. Commit com mensagem descritiva
git commit -m "feat: Adicionar 30 questões ROP 2.2"

# 5. Enviar para GitHub
git push

# 6. Aguardar 1-2 minutos
# 7. Atualizar navegador (Cmd+Shift+R)
```

### 9.2 Adicionar Novas Questões

**Edite:** `App/rops-data.js`

```javascript
// Adicionar questões em qualquer ROP
ropsData.macroArea2.rops[1].questions = [
    {
        id: 1,
        question: "Nova pergunta sobre ROP 2.2?",
        options: [
            "Opção A",
            "Opção B",
            "Opção C",
            "Opção D"
        ],
        correct: 1,
        explanation: "Explicação detalhada..."
    },
    // ... mais 29 questões
];
```

```bash
git add App/rops-data.js
git commit -m "feat: Adicionar 30 questões ROP 2.2 - Abreviações Perigosas"
git push
```

### 9.3 Adicionar Novos Documentos

**1. Adicionar PDF:**
```bash
# Copiar novo PDF para a pasta
cp "novo-protocolo.pdf" App/Documentos/1\ -\ Protocolos/
```

**2. Registrar em documents-data.js:**
```javascript
// Em App/documents-data.js
protocolos: [
    // ... protocolos existentes
    {
        title: "Novo Protocolo de Segurança",
        file: "./Documentos/1 - Protocolos/novo-protocolo.pdf",
        codigo: "PRO.ANEST.0016-00",
        categoria: "Segurança"
    }
]
```

**3. Commit e push:**
```bash
git add .
git commit -m "docs: Adicionar protocolo de segurança PRO.ANEST.0016-00"
git push
```

### 9.4 Adicionar Novos Áudios

**1. Copiar áudio:**
```bash
cp "nova-aula.m4a" "App/Podcasts/Cultura de Segurança/"
```

**2. Registrar em documents-data.js:**
```javascript
// Em podcastsData
culturaDeSeguranca: {
    audios: [
        // ... existentes
        {
            title: "Nova Aula - Tópico X",
            descricao: "Descrição da aula",
            file: "./Podcasts/Cultura de Segurança/nova-aula.m4a"
        }
    ]
}
```

**3. Commit e push:**
```bash
git add .
git commit -m "content: Adicionar áudio aula sobre tópico X"
git push
```

---

## 📊 PASSO 10: Monitorar Uso

### 10.1 Ver Estatísticas GitHub
- Seu repositório → **Insights** → **Traffic**
- Ver: views, clones, referrers

### 10.2 Firebase Analytics (Opcional)
Adicionar em `firebase-config.js`:
```javascript
// Adicionar depois do initializeApp
const analytics = firebase.analytics();

// Rastrear eventos personalizados
analytics.logEvent('quiz_completed', {
    rop_id: '1.1',
    score: 85
});
```

---

## 🎨 PASSO 11: Personalização Avançada (Opcional)

### 11.1 Domínio Personalizado

Se você tem um domínio (ex: `anest.seudominio.com.br`):

**No GitHub:**
1. Settings → Pages → Custom domain
2. Digite: `anest.seudominio.com.br`
3. Salvar

**No Provedor DNS:**
```
Type: CNAME
Name: anest
Value: SEU-USUARIO.github.io
TTL: 3600
```

### 11.2 Adicionar PWA (Progressive Web App)

Criar `App/manifest.json`:
```json
{
    "name": "ANEST - Sistema de Gestão",
    "short_name": "ANEST",
    "start_url": "./",
    "display": "standalone",
    "background_color": "#667eea",
    "theme_color": "#667eea",
    "icons": [
        {
            "src": "./icon-192.png",
            "sizes": "192x192",
            "type": "image/png"
        },
        {
            "src": "./icon-512.png",
            "sizes": "512x512",
            "type": "image/png"
        }
    ]
}
```

Adicionar no `<head>` do index.html:
```html
<link rel="manifest" href="manifest.json">
<meta name="theme-color" content="#667eea">
```

---

## 📱 PASSO 12: Compartilhar com a Equipe

### 12.1 URL de Acesso
```
🌐 https://SEU-USUARIO.github.io/anest-app/
```

### 12.2 Criar Usuários de Teste

**Para testar rapidamente:**
```
Email: teste@anest.com
Senha: teste123
```

### 12.3 QR Code (Opcional)

Gerar QR Code da URL:
- https://www.qr-code-generator.com/
- Imprimir e distribuir

---

## 🔒 SEGURANÇA

### Recomendações:
1. ✅ Firebase rules configuradas para autenticação
2. ✅ Não expor tokens ou senhas no código
3. ✅ HTTPS automático via GitHub Pages
4. ⚠️ Para produção real, considerar hosting dedicado

---

## 📞 COMANDOS DE REFERÊNCIA RÁPIDA

```bash
# Ver status
git status

# Adicionar tudo
git add .

# Commit
git commit -m "sua mensagem"

# Push
git push

# Ver histórico
git log --oneline

# Ver diferenças
git diff

# Desfazer commit (manter alterações)
git reset --soft HEAD~1

# Ver branches
git branch

# Atualizar do remoto
git pull
```

---

## ✅ CHECKLIST FINAL

Antes de compartilhar com a equipe:

- [ ] Repositório criado no GitHub
- [ ] Todos os arquivos enviados (git push)
- [ ] GitHub Pages ativado (branch: main, folder: /App)
- [ ] Pastas Documentos/ e Podcasts/ dentro de App/
- [ ] Caminhos ajustados em documents-data.js
- [ ] Domínio autorizado no Firebase
- [ ] URL funcionando: https://SEU-USUARIO.github.io/anest-app/
- [ ] Login testado (email e Google)
- [ ] Quiz funcionando
- [ ] Documentos abrindo
- [ ] Áudios tocando
- [ ] Ranking aparecendo
- [ ] Interface responsiva (testar no celular)

---

## 🎉 PRONTO!

Seu aplicativo ANEST está no ar! 🚀

**URL final:**
```
https://SEU-USUARIO.github.io/anest-app/
```

**Próximos passos sugeridos:**
1. ✅ Adicionar as 630 questões pendentes
2. ✅ Adicionar conteúdo Residência Médica
3. ✅ Adicionar mais áudio aulas
4. ✅ Customizar design se desejar
5. ✅ Configurar analytics
6. ✅ Treinar equipe

---

## 📚 RECURSOS ÚTEIS

- **GitHub Pages:** https://pages.github.com/
- **Firebase Docs:** https://firebase.google.com/docs
- **Git Cheatsheet:** https://education.github.com/git-cheat-sheet-education.pdf
- **Markdown Guide:** https://www.markdownguide.org/

---

**Precisa de ajuda?**
- 📧 Suporte GitHub: https://support.github.com/
- 💬 Firebase Support: https://firebase.google.com/support
- 🐛 Issues do repositório: https://github.com/SEU-USUARIO/anest-app/issues

---

**Desenvolvido com ❤️ para ANEST**
Versão 1.0 - Outubro 2025

