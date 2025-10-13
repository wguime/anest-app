# 🌐 DOMÍNIO PERSONALIZADO - MASCARAR GITHUB

## 🎯 OBJETIVO
Ao invés de: `https://wguime.github.io/anest-app/`  
Usar: `https://app.anest.com.br` (ou qualquer domínio que você escolher)

---

## 💰 OPÇÕES

### **OPÇÃO 1: Domínio Próprio** ⭐ RECOMENDADO

**O que você precisa:**
- Domínio registrado (ex: anest.com.br)
- Custo: R$ 40-60/ano

**Vantagens:**
- ✅ URL profissional
- ✅ Seu próprio domínio
- ✅ Zero custos de hospedagem (GitHub Pages continua grátis)
- ✅ Fácil de lembrar

**Passos:**

#### **1. Registrar Domínio**
Escolha um registrador:
- **Registro.br** (domínios .br) - R$ 40/ano
- **Hostinger** - R$ 45/ano
- **GoDaddy** - ~R$ 60/ano

Sugestões de domínio:
- `anest.com.br`
- `app-anest.com.br`
- `sistema-anest.com.br`
- `anesthesia.com.br`

#### **2. Configurar DNS**

No painel do seu registrador, adicione estes registros DNS:

```
Tipo: CNAME
Nome: app (ou www, ou deixe vazio para raiz)
Valor: wguime.github.io
TTL: 3600
```

**OU** para domínio raiz (sem www):

```
Tipo: A
Nome: @
Valor: 185.199.108.153
TTL: 3600

Tipo: A
Nome: @
Valor: 185.199.109.153
TTL: 3600

Tipo: A
Nome: @
Valor: 185.199.110.153
TTL: 3600

Tipo: A
Nome: @
Valor: 185.199.111.153
TTL: 3600
```

#### **3. Configurar GitHub**

No repositório `wguime/anest-app`:
1. Settings → Pages
2. Campo "Custom domain"
3. Digite seu domínio: `app.anest.com.br`
4. Save
5. ✅ Aguarde propagação DNS (5min-24h)
6. Ative "Enforce HTTPS"

#### **4. Criar arquivo CNAME**

No repositório, criar arquivo `CNAME` com:
```
app.anest.com.br
```

**Pronto!** Seu app estará em `https://app.anest.com.br`

---

### **OPÇÃO 2: Subdomínio Gratuito**

Usar serviços que oferecem domínios gratuitos:

#### **A) Freenom (Grátis)**
- Domínios: .tk, .ml, .ga, .cf, .gq
- Exemplo: `anest.tk`
- Custo: R$ 0
- Limite: Renovação anual manual
- Site: https://www.freenom.com/

**Passos:**
1. Registrar domínio grátis
2. Configurar DNS (mesmos IPs do GitHub)
3. Configurar no GitHub Pages

#### **B) InfinityFree + Subdomain**
- Domínio: Seu subdomínio em domínio deles
- Exemplo: `anest.infinityfreeapp.com`
- Custo: R$ 0
- Site: https://infinityfree.net/

---

### **OPÇÃO 3: Redirect/Mascaramento Simples**

Usar serviços de encurtamento com redirect:

#### **A) Bitly (Limitado)**
```
https://bit.ly/app-anest → redireciona para GitHub
```
❌ Mas ainda mostra bit.ly na URL

#### **B) TinyURL**
```
https://tinyurl.com/anest-app → redireciona
```
❌ Mesma limitação

**Não recomendado:** URL encurtada não passa profissionalismo

---

### **OPÇÃO 4: Cloudflare (Profissional + Grátis)**

**Vantagens:**
- ✅ CDN grátis (mais rápido)
- ✅ HTTPS automático
- ✅ Proteção DDoS
- ✅ Analytics

**Requisitos:**
- Domínio registrado (qualquer registrador)
- Conta Cloudflare (grátis)

**Passos:**
1. Registrar domínio (R$ 40/ano)
2. Criar conta Cloudflare (grátis)
3. Adicionar site no Cloudflare
4. Mudar nameservers no registrador para Cloudflare
5. Configurar DNS no Cloudflare:
   ```
   CNAME  app  wguime.github.io
   ```
6. Ativar proxy (nuvem laranja)
7. ✅ Pronto! Mais rápido e protegido

---

## 🎯 RECOMENDAÇÃO FINAL

### **Para Uso Profissional:**

**Melhor opção: Domínio próprio + GitHub Pages**
- Custo: R$ 40-60/ano (só o domínio)
- Hospedagem: R$ 0 (GitHub Pages grátis)
- URL: `https://app.anest.com.br`
- Profissional ✅
- Fácil de lembrar ✅
- Sem limites ✅

**Passos Resumidos:**
1. Comprar domínio `anest.com.br` (R$ 40/ano)
2. Configurar DNS: CNAME para GitHub
3. Adicionar no GitHub Pages Settings
4. ✅ Pronto em 24h!

---

## 📋 CHECKLIST

- [ ] Escolher domínio
- [ ] Registrar domínio (Registro.br recomendado)
- [ ] Configurar DNS (CNAME ou A records)
- [ ] Adicionar Custom Domain no GitHub
- [ ] Criar arquivo CNAME no repositório
- [ ] Aguardar propagação DNS (até 24h)
- [ ] Ativar "Enforce HTTPS"
- [ ] Testar domínio
- [ ] ✅ Compartilhar novo link com equipe!

---

## 💡 DICA

**Domínio + Cloudflare = Melhor Combinação**
- R$ 40/ano (só domínio)
- CDN grátis (site mais rápido)
- HTTPS automático
- Analytics grátis
- Proteção contra ataques

---

## ❓ PRECISA DE AJUDA?

Me avise qual opção você escolher e te ajudo a configurar passo a passo!

**Sugestão:** Comece com **anest.com.br** no Registro.br (R$ 40/ano)

