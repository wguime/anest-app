# 🚀 Guia de Deploy - ANEST

Este guia cobre diferentes opções de deploy para a aplicação ANEST.

## 📋 Índice

- [Opção 1: Firebase Hosting (Recomendado)](#opção-1-firebase-hosting)
- [Opção 2: GitHub Pages](#opção-2-github-pages)
- [Opção 3: Netlify](#opção-3-netlify)
- [Opção 4: Vercel](#opção-4-vercel)
- [Configurações Pós-Deploy](#configurações-pós-deploy)

---

## Opção 1: Firebase Hosting (Recomendado)

✅ **Vantagens:**
- Integração nativa com Firebase
- SSL gratuito
- CDN global
- Rollback fácil
- Domínio customizado gratuito

### Passo 1: Instalar Firebase CLI

```bash
# Instalar globalmente
npm install -g firebase-tools

# Verificar instalação
firebase --version
```

### Passo 2: Fazer Login

```bash
firebase login
```

### Passo 3: Inicializar Projeto

```bash
# Navegar até o diretório do projeto
cd /Users/guilherme/Documents/Qmentum

# Inicializar Firebase
firebase init hosting
```

**Configurações:**
- Select a default Firebase project: **desafio-rops-app**
- Public directory: **App**
- Configure as SPA: **Yes**
- Set up automatic builds: **No**
- Overwrite index.html: **No**

### Passo 4: Deploy

```bash
# Deploy
firebase deploy --only hosting

# Aguarde o processo...
# ✔ Deploy complete!
```

### Passo 5: Acessar

URL fornecida será algo como:
```
https://desafio-rops-app.web.app
https://desafio-rops-app.firebaseapp.com
```

### Domínio Customizado (Opcional)

1. No Firebase Console:
   - Hosting → Add custom domain
2. Digite seu domínio (ex: `anest.seudominio.com.br`)
3. Adicione os registros DNS fornecidos no seu provedor
4. Aguarde verificação (pode levar até 24h)

---

## Opção 2: GitHub Pages

✅ **Vantagens:**
- Gratuito
- Integração com Git
- Simples de configurar

### Passo 1: Criar Repositório

1. Acesse [GitHub](https://github.com)
2. Crie novo repositório: `anest-app`
3. Mantenha como público

### Passo 2: Subir Código

```bash
cd /Users/guilherme/Documents/Qmentum

# Inicializar Git
git init

# Adicionar arquivos
git add .

# Primeiro commit
git commit -m "Initial commit - ANEST App"

# Adicionar remote
git remote add origin https://github.com/SEU-USUARIO/anest-app.git

# Push
git branch -M main
git push -u origin main
```

### Passo 3: Configurar GitHub Pages

1. No repositório: Settings → Pages
2. Source: **Deploy from a branch**
3. Branch: **main**
4. Folder: **/ (root)** ou **/App** (se App estiver na raiz)
5. Save

### Passo 4: Ajustar Caminhos (se necessário)

Se escolheu `/App` como pasta, a URL será:
```
https://SEU-USUARIO.github.io/anest-app/
```

Se os arquivos estiverem na raiz, será:
```
https://SEU-USUARIO.github.io/anest-app/
```

### Passo 5: Configurar Domínio Customizado (Opcional)

1. Settings → Pages → Custom domain
2. Digite: `anest.seudominio.com.br`
3. No seu provedor DNS, adicione:
   ```
   Type: CNAME
   Name: anest
   Value: SEU-USUARIO.github.io
   ```

---

## Opção 3: Netlify

✅ **Vantagens:**
- Deploy automático via Git
- SSL gratuito
- Formulários e funções serverless
- CDN global

### Passo 1: Criar Conta

1. Acesse [Netlify](https://netlify.com)
2. Crie conta (pode usar GitHub)

### Passo 2: Deploy

**Método A - Drag and Drop:**
1. Acesse: https://app.netlify.com/drop
2. Arraste pasta `App` para a área
3. Aguarde upload
4. ✅ Site publicado!

**Método B - Git Integration:**
1. New site from Git
2. Conecte GitHub
3. Selecione repositório
4. Build settings:
   - Base directory: `App` (se aplicável)
   - Build command: (deixe vazio)
   - Publish directory: `.` ou `App`
5. Deploy site

### Passo 3: Configurar Domínio

1. Domain settings
2. Add custom domain
3. Siga instruções DNS

### Redirects (importante para SPA)

Crie arquivo `App/_redirects`:
```
/*    /index.html   200
```

---

## Opção 4: Vercel

✅ **Vantagens:**
- Deploy instantâneo
- Preview deployments
- Analytics integrado
- Edge Functions

### Passo 1: Instalar Vercel CLI

```bash
npm install -g vercel
```

### Passo 2: Deploy

```bash
cd /Users/guilherme/Documents/Qmentum/App

# Login
vercel login

# Deploy
vercel

# Produção
vercel --prod
```

Siga prompts interativos.

### Passo 3: Configurar via Dashboard

1. Acesse [Vercel Dashboard](https://vercel.com/dashboard)
2. Import Git Repository
3. Selecione repositório
4. Configure:
   - Framework Preset: Other
   - Root Directory: `App` (se aplicável)
5. Deploy

---

## Configurações Pós-Deploy

### 1. Atualizar Configurações do Firebase

⚠️ **Importante**: Adicione o domínio de produção aos domínios autorizados:

1. Firebase Console → Authentication → Settings
2. Authorized domains → Add domain
3. Adicione:
   - `desafio-rops-app.web.app`
   - `seu-dominio-customizado.com.br`
   - etc.

### 2. Configurar CORS (se necessário)

Se usar APIs externas, configure CORS no Firebase:

```javascript
// firebase.json
{
  "hosting": {
    "headers": [
      {
        "source": "**",
        "headers": [
          {
            "key": "Access-Control-Allow-Origin",
            "value": "*"
          }
        ]
      }
    ]
  }
}
```

### 3. Otimizações de Performance

#### Minificar CSS/JS (Opcional)

```bash
# Instalar uglify
npm install -g uglify-js clean-css-cli

# Minificar JS
uglifyjs app.js -o app.min.js -c -m

# Minificar CSS
cleancss -o styles.min.css styles.css
```

Atualizar referências no HTML.

#### Habilitar Cache

**Firebase Hosting** (`firebase.json`):
```json
{
  "hosting": {
    "headers": [
      {
        "source": "**/*.@(jpg|jpeg|gif|png|webp)",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "max-age=31536000"
          }
        ]
      },
      {
        "source": "**/*.@(js|css)",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "max-age=604800"
          }
        ]
      }
    ]
  }
}
```

### 4. Monitoramento

#### Google Analytics (Opcional)

Adicione antes do `</head>` em `index.html`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

#### Firebase Performance Monitoring

```html
<!-- Before </body> -->
<script src="https://www.gstatic.com/firebasejs/10.7.1/firebase-performance-compat.js"></script>
<script>
  const perf = firebase.performance();
</script>
```

### 5. SEO e Meta Tags

Já incluídas no HTML, mas verifique:

```html
<head>
  <meta name="description" content="Sistema de Gestão e Treinamento ANEST">
  <meta name="keywords" content="anestesiologia, rops, qmentum, treinamento">
  <meta name="author" content="ANEST">
  
  <!-- Open Graph -->
  <meta property="og:title" content="ANEST - Sistema de Gestão">
  <meta property="og:description" content="Plataforma de treinamento e gestão">
  <meta property="og:image" content="https://seu-dominio.com/logo.png">
  <meta property="og:url" content="https://seu-dominio.com">
  
  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="ANEST">
  <meta name="twitter:description" content="Sistema de Gestão e Treinamento">
</head>
```

---

## 🔄 Workflow de Atualização

### Desenvolvimento → Produção

```bash
# 1. Fazer alterações locais
# 2. Testar localmente
python3 -m http.server 8000

# 3. Commit
git add .
git commit -m "Descrição das mudanças"

# 4. Push
git push origin main

# 5. Deploy (Firebase)
firebase deploy --only hosting

# Ou se usa GitHub Pages/Netlify/Vercel
# Deploy automático ao fazer push
```

### Rollback (Firebase)

```bash
# Ver releases anteriores
firebase hosting:releases

# Fazer rollback
firebase hosting:rollback
```

---

## ✅ Checklist de Deploy

### Antes do Deploy
- [ ] Testar localmente todas funcionalidades
- [ ] Verificar console do navegador (sem erros)
- [ ] Testar em diferentes navegadores
- [ ] Testar responsividade (mobile/tablet)
- [ ] Verificar credenciais do Firebase (não expor secrets)
- [ ] Atualizar README com URL de produção

### Após o Deploy
- [ ] Verificar site está acessível
- [ ] Testar login/registro
- [ ] Testar funcionalidades principais
- [ ] Verificar Analytics funcionando
- [ ] Configurar backup/monitoramento
- [ ] Documentar URL para equipe

### Segurança
- [ ] SSL/HTTPS ativo
- [ ] Domínios autorizados no Firebase
- [ ] Regras do Firestore configuradas
- [ ] Não expor API keys sensíveis
- [ ] Configurar CORS apropriadamente

---

## 🆘 Troubleshooting

### Erro 404 em rotas

**GitHub Pages/Netlify:**
Crie arquivo `404.html` idêntico ao `index.html` (SPA routing)

### Firebase Authentication não funciona

Verifique domínios autorizados no Firebase Console.

### Assets não carregam

Verifique caminhos relativos/absolutos nos arquivos.

### Slow First Load

Considere implementar:
- Service Worker (PWA)
- Lazy loading de imagens
- Code splitting

---

## 📊 Métricas de Sucesso

Após deploy, monitore:

- **Uptime**: Deve ser >99.9%
- **Load Time**: <3 segundos
- **Mobile Score**: >90 (Lighthouse)
- **Errors**: <1% de erro rate
- **Users**: Acompanhe analytics

---

## 🎉 Parabéns!

Sua aplicação ANEST está no ar! 🚀

**URLs de exemplo após deploy:**
- Firebase: `https://desafio-rops-app.web.app`
- GitHub Pages: `https://seu-usuario.github.io/anest-app`
- Netlify: `https://seu-projeto.netlify.app`
- Vercel: `https://seu-projeto.vercel.app`

**Próximos passos:**
1. Compartilhe URL com equipe
2. Colete feedback
3. Monitore uso e performance
4. Implemente melhorias contínuas

---

**Precisa de ajuda?** Consulte README.md ou abra uma issue no GitHub.

