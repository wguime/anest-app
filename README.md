# 🏥 ANEST - Sistema de Gestão e Treinamento

<div align="center">

![ANEST](https://img.shields.io/badge/ANEST-Sistema%20de%20Gest%C3%A3o-blue?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Produ%C3%A7%C3%A3o-success?style=for-the-badge)
![Versão](https://img.shields.io/badge/Vers%C3%A3o-1.0-orange?style=for-the-badge)

**Sistema completo de gestão de qualidade, treinamento gamificado e documentação para serviços de anestesiologia**

[🚀 Demo](#) • [📖 Documentação](#documentação) • [🎮 Features](#features) • [🔧 Instalação](#instalação)

</div>

---

## 📱 Sobre o Projeto

O **ANEST** é uma aplicação web moderna e completa desenvolvida para gestão de qualidade e treinamento em anestesiologia. Integra documentação técnica, quiz gamificado baseado em ROPs (Práticas Organizacionais Obrigatórias) do Qmentum, e ferramentas de gestão para residência médica.

### 🎯 Objetivos

- ✅ Centralizar protocolos, políticas e documentos técnicos
- ✅ Treinar equipes através de gamificação
- ✅ Estimular competição saudável e aprendizado contínuo
- ✅ Avaliar conhecimento em ROPs do Qmentum
- ✅ Gerenciar residência médica e escalas
- ✅ Fornecer áudio aulas educativas

---

## ✨ Features

### 🔐 Autenticação
- Login com email e senha
- Login com Google (OAuth)
- Registro de novos usuários
- Recuperação de senha
- Persistência de sessão

### 🎮 ROPs - Quiz Gamificado

<details>
<summary><b>6 Macro Áreas com 26 Subdivisões (ROPs)</b></summary>

#### 🛡️ Macro Área 1 – Cultura de Segurança
- ROP 1.1 – Responsabilização pela Qualidade (30 questões) ✅
- ROP 1.2 – Gestão de Incidentes (30 questões) ✅
- ROP 1.3 – Relatórios Trimestrais (30 questões) ✅
- ROP 1.4 – Divulgação de Incidentes (30 questões) ✅

#### 💬 Macro Área 2 – Comunicação
- ROP 2.1 – Identificação do Cliente (30 questões) ✅
- ROP 2.2 – Lista de Abreviações Perigosas
- ROP 2.3 – Conciliação Medicamentosa
- ROP 2.4 – Conciliação em Internação
- ROP 2.5 – Conciliação Ambulatorial
- ROP 2.6 – Conciliação em Emergência
- ROP 2.7 – Lista de Verificação Cirúrgica
- ROP 2.8 – Transferência de Informações (Handoff)

#### 💊 Macro Área 3 – Uso de Medicamentos
- ROP 3.1 – Uso Racional de Antimicrobianos
- ROP 3.2 – Eletrólitos Concentrados
- ROP 3.3 – Segurança no Uso da Heparina
- ROP 3.4 – Medicamentos de Alta Vigilância (MAV)
- ROP 3.5 – Segurança das Bombas de Infusão
- ROP 3.6 – Segurança no Uso de Narcóticos

#### 👥 Macro Área 4 – Vida Profissional
- ROP 4.1 – Programa de Manutenção Preventiva
- ROP 4.2 – Capacitação e Treinamento
- ROP 4.3 – Prevenção de Violência no Trabalho
- ROP 4.4 – Fluxo de Clientes
- ROP 4.5 – Plano de Segurança do Paciente

#### 🦠 Macro Área 5 – Prevenção de Infecções
- ROP 5.1 – Aderência à Higiene das Mãos
- ROP 5.2 – Higiene das Mãos: Treinamento
- ROP 5.3 – Taxas de Infecção
- ROP 5.4 – Reprocessamento

#### ⚠️ Macro Área 6 – Avaliação de Riscos
- ROP 6.1 – Prevenção de Quedas
- ROP 6.2 – Prevenção de Úlceras por Pressão
- ROP 6.3 – Prevenção de Suicídio
- ROP 6.4 – Profilaxia para TEV
- ROP 6.5 – Tratamento da Pele e Feridas

</details>

**Recursos do Quiz:**
- 🎯 Quiz individual por ROP
- 🔀 Quiz completo de macro área (todas ROPs embaralhadas)
- 📝 Simulado geral (50+ questões de todos os temas)
- 🏆 Sistema de pontuação e ranking
- 📊 Gráficos de desempenho
- 💡 Explicações detalhadas para cada questão
- 🎖️ Badges e conquistas

### 📚 Gestão de Documentos

- **Protocolos Assistenciais** (15+ documentos)
- **Políticas Institucionais**
- **Formulários Técnicos**
- **Manuais Operacionais**
- **Relatórios de Segurança**
- **Mapeamento de Processos**
- **Mapeamento de Riscos**
- **Plano de Segurança do Paciente**

### 🎙️ Podcasts ROPs

Áudio aulas educativas organizadas por macro área:
- 🛡️ Cultura de Segurança (4 áudios disponíveis)
- 💬 Comunicação (em breve)
- 💊 Uso de Medicamentos (em breve)
- 👥 Vida Profissional (em breve)
- 🦠 Prevenção de Infecções (em breve)
- ⚠️ Avaliação de Riscos (em breve)

### 🏥 Residência Médica

- 📖 Aulas
- 📄 Artigos Científicos
- 📅 Escalas e Plantões
- 🏨 Estágios
- 🏖️ Controle de Férias

---

## 🛠️ Tecnologias

### Frontend
- **HTML5** - Estrutura semântica
- **CSS3** - Design moderno com Grid, Flexbox e Animations
- **JavaScript ES6+** - Lógica da aplicação
- **Font Awesome 6** - Iconografia
- **Chart.js** - Gráficos e visualizações

### Backend/Serviços
- **Firebase Authentication** - Sistema de login
- **Firebase Firestore** - Banco de dados NoSQL em tempo real
- **GitHub Pages** - Hospedagem estática

### Arquitetura
```
┌─────────────────────────────────────┐
│         Interface (HTML/CSS)        │
└──────────────┬──────────────────────┘
               │
       ┌───────┴────────┐
       │                │
┌──────▼──────┐  ┌──────▼──────────┐
│  Estilos    │  │     Lógica      │
│  (CSS)      │  │  (JavaScript)   │
└─────────────┘  └─────┬───────────┘
                       │
          ┌────────────┼────────────┐
          │            │            │
    ┌─────▼────┐ ┌─────▼────┐ ┌────▼─────┐
    │  Dados   │ │Documentos│ │ Firebase │
    │  ROPs    │ │  Data    │ │  Config  │
    └──────────┘ └──────────┘ └────┬─────┘
                                    │
                             ┌──────▼──────┐
                             │   Firebase   │
                             │  (Cloud)     │
                             └─────────────┘
```

---

## 🚀 Instalação

### Pré-requisitos

- Conta no [GitHub](https://github.com)
- Conta no [Firebase](https://firebase.google.com)
- Git instalado
- Navegador moderno (Chrome, Firefox, Safari, Edge)

### 📦 Clonar o Repositório

```bash
# Clone o repositório
git clone https://github.com/SEU-USUARIO/anest-app.git

# Entre na pasta
cd anest-app/App
```

### 🌐 Teste Local

```bash
# Opção 1: Python (mais simples)
python3 -m http.server 8000

# Opção 2: Node.js
npx serve

# Opção 3: PHP
php -S localhost:8000

# Abra o navegador em: http://localhost:8000
```

### ☁️ Deploy no GitHub Pages

1. **Fazer fork ou criar repositório próprio**
2. **Fazer push do código**
```bash
git add .
git commit -m "Initial commit"
git push origin main
```
3. **Ativar GitHub Pages**
   - Settings → Pages
   - Source: Deploy from branch
   - Branch: `main`
   - Folder: `/App`
   - Save

4. **Aguardar deploy** (1-5 minutos)
5. **Acessar:** `https://SEU-USUARIO.github.io/anest-app/`

### 🔥 Configurar Firebase

1. Acesse [Firebase Console](https://console.firebase.google.com)
2. Crie/selecione projeto
3. Ative **Authentication** (Email e Google)
4. Ative **Firestore Database**
5. Em **Authentication → Settings → Authorized domains**, adicione:
   - `localhost`
   - `SEU-USUARIO.github.io`
6. Copie as credenciais e atualize `firebase-config.js`

```javascript
const firebaseConfig = {
    apiKey: "SUA_API_KEY",
    authDomain: "SEU-PROJETO.firebaseapp.com",
    projectId: "SEU-PROJETO-ID",
    storageBucket: "SEU-PROJETO.appspot.com",
    messagingSenderId: "SEU-ID",
    appId: "SEU-APP-ID"
};
```

---

## 📖 Documentação

- 📘 **[GUIA_DEPLOY_GITHUB.md](GUIA_DEPLOY_GITHUB.md)** - Deploy completo passo a passo
- 📗 **[STATUS_APLICATIVO.md](STATUS_APLICATIVO.md)** - Status e funcionalidades
- 📙 **[COMO_ADICIONAR_QUESTOES.md](COMO_ADICIONAR_QUESTOES.md)** - Adicionar questões
- 📕 **[PROJETO_COMPLETO.md](PROJETO_COMPLETO.md)** - Visão geral técnica

---

## 📊 Estatísticas do Projeto

```
📁 Arquivos:               6
📝 Linhas de Código:   4,646
❓ Questões:             150+
📄 Documentos:           15+
🎙️ Áudio Aulas:           4
```

### Distribuição de Código
```
app.js:           1,187 linhas  (Lógica principal)
rops-data.js:     1,761 linhas  (Banco de questões)
styles.css:       1,047 linhas  (Design)
index.html:         320 linhas  (Interface)
documents-data:     306 linhas  (Dados documentos)
firebase-config:     25 linhas  (Configuração)
```

---

## 🎮 Como Usar

### 1️⃣ Primeiro Acesso

1. Acesse a URL do aplicativo
2. Clique em **"Criar nova conta"**
3. Preencha: Nome, Email e Senha
4. Ou use **"Entrar com Google"**

### 2️⃣ Navegar no Menu

Após login, você verá 13 módulos:
- 🎓 **Residência Médica** - Gestão acadêmica
- 🎮 **ROPs - Desafio** - Quiz gamificado
- 🎙️ **Podcasts ROPs** - Áudio aulas
- 📋 **Protocolos** - 15+ PDFs
- 🛡️ **Políticas** - Documentos institucionais
- 📝 **Formulários** - Templates
- 📚 **Manuais** - Guias técnicos
- 📊 **Relatórios** - Segurança do paciente
- 🔄 **Processos** - Mapeamentos
- ⚠️ **Riscos** - Análises
- 📄 **Termos** - Documentos legais
- 🌡️ **Clima** - Pesquisas
- 📋 **Plano** - Segurança do paciente

### 3️⃣ Jogar Quiz ROPs

1. Clique em **"ROPs - Desafio"**
2. Escolha uma **Macro Área**
3. Escolha uma **ROP específica** ou **"Jogar com todas"**
4. Responda as questões
5. Veja explicações ao errar
6. Confira seu score final
7. Compare no **Ranking**

### 4️⃣ Ouvir Podcasts

1. Clique em **"Podcasts ROPs"**
2. Escolha uma **Macro Área**
3. Clique em um áudio
4. Use os controles do player

### 5️⃣ Acessar Documentos

1. Clique no módulo desejado (Protocolos, Políticas, etc.)
2. Navegue pela lista
3. Use **filtros** por categoria
4. Clique para **abrir o PDF**

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Para contribuir:

1. Fork o projeto
2. Crie uma branch: `git checkout -b feature/NovaFeature`
3. Commit suas mudanças: `git commit -m 'Adiciona nova feature'`
4. Push para a branch: `git push origin feature/NovaFeature`
5. Abra um Pull Request

### 💡 Ideias para Contribuição

- Adicionar questões para ROPs pendentes (630 questões)
- Adicionar mais áudio aulas (24 áudios)
- Traduzir para outros idiomas
- Melhorar acessibilidade
- Adicionar testes automatizados
- Otimizar performance
- Criar modo dark
- Adicionar PWA features

---

## 📝 Roadmap

### ✅ Versão 1.0 (Atual)
- [x] Sistema de login completo
- [x] 150+ questões de ROPs
- [x] 15+ documentos integrados
- [x] 4 áudio aulas
- [x] Ranking e gamificação
- [x] Interface moderna
- [x] Deploy GitHub Pages

### 🔜 Versão 1.1 (Próxima)
- [ ] Completar 780 questões (todas as ROPs)
- [ ] Adicionar 24 áudio aulas restantes
- [ ] Preencher módulo Residência Médica
- [ ] Adicionar modo escuro
- [ ] Implementar busca global
- [ ] Sistema de notificações

### 🚀 Versão 2.0 (Futuro)
- [ ] PWA (Progressive Web App)
- [ ] Modo offline
- [ ] App nativo (React Native)
- [ ] Sistema de conquistas avançado
- [ ] Multiplayer quiz em tempo real
- [ ] Integração com calendário
- [ ] Relatórios de desempenho por equipe

---

## 🐛 Problemas Conhecidos

- [ ] Áudios M4A podem não funcionar no Firefox (usar Chrome)
- [ ] PDFs grandes podem demorar para carregar
- [ ] Ranking pode ter delay de 1-2s na atualização
- [ ] Algumas animações podem travar em dispositivos antigos

Para reportar bugs, abra uma [Issue](https://github.com/SEU-USUARIO/anest-app/issues).

---

## 📄 Licença

Este projeto é de uso interno da **ANEST**. Todos os direitos reservados.

Baseado em diretrizes do **Qmentum** (Accreditation Canada).

---

## 👥 Equipe

**Desenvolvido para ANEST**

- 📧 Email: contato@anest.com.br
- 🌐 Site: https://anest.com.br
- 📱 WhatsApp: (XX) XXXXX-XXXX

---

## 🙏 Agradecimentos

- **Qmentum/Accreditation Canada** - Pela base de ROPs
- **Firebase** - Pela infraestrutura cloud gratuita
- **GitHub** - Pelo hosting gratuito via Pages
- **Font Awesome** - Pelos ícones
- **Chart.js** - Pelos gráficos

---

## 📚 Recursos Úteis

- [Documentação Firebase](https://firebase.google.com/docs)
- [GitHub Pages Guide](https://pages.github.com)
- [MDN Web Docs](https://developer.mozilla.org)
- [JavaScript.info](https://javascript.info)
- [CSS Tricks](https://css-tricks.com)

---

## ⭐ Suporte

Se este projeto foi útil para você, considere:

- ⭐ Dar uma estrela no GitHub
- 📢 Compartilhar com colegas
- 🐛 Reportar bugs
- 💡 Sugerir melhorias
- 🤝 Contribuir com código

---

<div align="center">

**Desenvolvido com ❤️ para ANEST**

![Made with Love](https://img.shields.io/badge/Made%20with-❤️-red?style=for-the-badge)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)
![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-222222?style=for-the-badge&logo=github&logoColor=white)

**[⬆ Voltar ao topo](#-anest---sistema-de-gestão-e-treinamento)**

</div>
