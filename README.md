# ANEST - Sistema de Gestão e Treinamento

![ANEST Logo](https://via.placeholder.com/150x150.png?text=ANEST)

Sistema completo de gestão, treinamento e gamificação para o serviço de Anestesiologia com foco nas Práticas Organizacionais Obrigatórias (ROPs) do Qmentum.

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Funcionalidades](#funcionalidades)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Instalação e Configuração](#instalação-e-configuração)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Como Usar](#como-usar)
- [Sistema de Pontuação](#sistema-de-pontuação)
- [ROPs Implementadas](#rops-implementadas)
- [Contribuindo](#contribuindo)
- [Suporte](#suporte)

## 🎯 Sobre o Projeto

O ANEST é uma plataforma web moderna desenvolvida para o serviço de Anestesiologia, integrando:

- **Sistema de Quiz Gamificado**: Mais de 780 questões sobre as 26 ROPs (Práticas Organizacionais Obrigatórias)
- **Gestão de Documentos**: Acesso organizado a protocolos, políticas, formulários e manuais
- **Residência Médica**: Área específica com aulas, artigos, escalas e gestão de estágios
- **Ranking e Competição**: Sistema de pontuação e ranking entre usuários
- **Relatórios de Segurança**: Acompanhamento de indicadores de qualidade

## ✨ Funcionalidades

### 🔐 Autenticação
- Login com email e senha
- Login integrado com Google
- Recuperação de senha por email
- Registro de novos usuários

### 🎮 Sistema de Quiz ROPs
- **6 Macroáreas** de conhecimento
- **26 Subdivisões** com questões específicas
- **30+ questões** por subdivisão
- Modo "Todas Embaralhadas" por macroárea
- Simulado geral com 50+ questões
- Explicações detalhadas para cada resposta
- Sistema de pontuação e progresso individual

### 🏆 Gamificação
- Sistema de pontos (10 pontos por acerto)
- Ranking geral, mensal e semanal
- Troféus para top 3 posições
- Acompanhamento de progresso por tema
- Estatísticas detalhadas de desempenho

### 📚 Gestão de Conhecimento
- Biblioteca de protocolos
- Políticas institucionais
- Formulários e documentos
- Manuais técnicos
- Relatórios trimestrais de segurança
- Mapeamento de processos e riscos

### 👨‍⚕️ Residência Médica
- Área de aulas e material didático
- Biblioteca de artigos científicos
- Escalas de plantão
- Gestão de estágios
- Programação de férias

## 🛠️ Tecnologias Utilizadas

### Frontend
- **HTML5**: Estrutura semântica
- **CSS3**: Design moderno e responsivo com gradientes e animações
- **JavaScript (ES6+)**: Lógica da aplicação
- **Font Awesome**: Ícones vetoriais
- **Google Fonts (Inter)**: Tipografia moderna

### Backend/Database
- **Firebase Authentication**: Gerenciamento de usuários
- **Cloud Firestore**: Banco de dados NoSQL em tempo real
- **Firebase Hosting**: (Opcional) Hospedagem da aplicação

### Bibliotecas
- **Chart.js**: Gráficos de desempenho (preparado para implementação)

## 📦 Instalação e Configuração

### Pré-requisitos
- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- Conta no Firebase (gratuita)
- Editor de código (VSCode recomendado)

### Passo 1: Configuração do Firebase

1. Acesse [Firebase Console](https://console.firebase.google.com/)
2. O projeto já está configurado com as credenciais:
   - Project ID: `desafio-rops-app`
   - As configurações já estão no arquivo `firebase-config.js`

3. Ative os seguintes serviços no Firebase Console:
   - **Authentication**: Habilite Email/Password e Google
   - **Firestore Database**: Crie em modo de produção
   - **Rules do Firestore**: Use as regras abaixo

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth.uid == userId;
    }
    
    // Quiz results collection
    match /quiz_results/{resultId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null;
    }
  }
}
```

### Passo 2: Estrutura de Arquivos

```
Qmentum/
├── App/
│   ├── index.html           # Página principal
│   ├── styles.css           # Estilos da aplicação
│   ├── app.js               # Lógica principal
│   ├── firebase-config.js   # Configuração do Firebase
│   └── rops-data.js         # Banco de dados de questões
├── Documentos/              # Documentos do serviço
│   ├── 1 - Protocolos/
│   ├── 2 - Politicas/
│   ├── 3 - Formulários/
│   └── ...
├── Podcasts/                # Áudio aulas (futura implementação)
└── README.md                # Esta documentação
```

### Passo 3: Executar Localmente

1. **Opção A - Servidor Local Simples:**
```bash
# Navegue até a pasta App
cd /Users/guilherme/Documents/Qmentum/App

# Python 3
python3 -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js (npx)
npx http-server -p 8000
```

2. **Opção B - Live Server (VSCode):**
   - Instale a extensão "Live Server"
   - Clique direito em `index.html`
   - Selecione "Open with Live Server"

3. Acesse: `http://localhost:8000`

### Passo 4: Deploy (Opcional)

#### Firebase Hosting
```bash
# Instale o Firebase CLI
npm install -g firebase-tools

# Faça login
firebase login

# Inicialize o projeto
firebase init hosting

# Selecione a pasta App como public directory
# Configure como Single Page Application: Sim

# Deploy
firebase deploy
```

#### GitHub Pages
1. Crie um repositório no GitHub
2. Faça upload da pasta App
3. Nas configurações do repositório:
   - GitHub Pages > Source > Branch: main > Folder: /App
4. Acesse: `https://seu-usuario.github.io/nome-repositorio/`

## 📁 Estrutura do Projeto

### Arquivos Principais

#### `index.html`
Estrutura completa da aplicação incluindo:
- Tela de loading
- Sistema de login/registro
- Interface principal com 12 seções
- Telas de quiz, resultados e ranking
- Sistema de notificações toast

#### `styles.css`
Estilos modernos com:
- Design responsivo (mobile-first)
- Gradientes e animações
- Componentes reutilizáveis
- Tema de cores consistente
- Suporte a dark mode (preparado)

#### `firebase-config.js`
Configuração do Firebase Authentication e Firestore

#### `rops-data.js`
Banco de dados estruturado com:
- 6 macroáreas de conhecimento
- 26 subdivisões (ROPs)
- 780+ questões de múltipla escolha
- Explicações detalhadas
- Metadados (ícones, cores, áudio aulas)

#### `app.js`
Lógica completa incluindo:
- Gerenciamento de autenticação
- Sistema de navegação
- Engine do quiz
- Sistema de pontuação
- Gerenciamento de progresso
- Integração com Firestore

## 🎓 Como Usar

### Para Usuários

#### 1. Primeiro Acesso
1. Acesse a aplicação
2. Clique em "Registrar"
3. Preencha seus dados ou use "Continuar com Google"
4. Acesse a página inicial

#### 2. Navegando no Sistema
- **Página Inicial**: 12 cards com as principais seções
- **ROPs - Desafio**: Acesse o sistema de quiz gamificado
- **Outros Ícones**: Acesso a documentos e recursos

#### 3. Fazendo Quizzes
1. Clique em "ROPs - Desafio"
2. Escolha uma macroárea (ex: Cultura de Segurança)
3. Selecione uma subdivisão ou "Todas Embaralhadas"
4. Responda as questões:
   - Clique na resposta correta
   - Ganhe 10 pontos por acerto
   - Veja explicação detalhada
   - Avance para próxima questão
5. Ao final, veja seus resultados e estatísticas

#### 4. Acompanhando Progresso
- Porcentagem de conclusão em cada card
- Melhor pontuação por tema
- Ranking geral com sua posição
- Total de pontos acumulados

### Para Administradores

#### Adicionar Novas Questões
Edite o arquivo `rops-data.js`:

```javascript
{
    question: "Sua pergunta aqui?",
    options: [
        "Opção A",
        "Opção B - Correta",
        "Opção C",
        "Opção D"
    ],
    correctAnswer: 1, // Índice da resposta correta (0-3)
    explanation: "Explicação detalhada da resposta correta..."
}
```

#### Adicionar Áudio Aulas
1. Coloque arquivos .m4a na pasta `Podcasts/`
2. Atualize o campo `audioFile` em `rops-data.js`:
```javascript
audioFile: "Podcasts/rop-1-1-cultura-seguranca.m4a"
```

#### Adicionar Documentos
1. Coloque PDFs nas pastas apropriadas em `Documentos/`
2. Os arquivos estarão disponíveis automaticamente

#### Gerenciar Usuários
Acesse o Firebase Console > Authentication para:
- Ver usuários registrados
- Desabilitar/habilitar contas
- Redefinir senhas
- Visualizar estatísticas de acesso

## 🏆 Sistema de Pontuação

### Pontos
- **Acerto**: +10 pontos
- **Erro**: 0 pontos
- Pontos acumulam no perfil do usuário

### Ranking
Calculado baseado em:
1. Total de pontos acumulados
2. Número de tópicos completos (≥70% acertos)
3. Atualizado em tempo real

### Níveis de Desempenho
- **Excelente**: ≥80% de acertos
- **Bom**: 60-79% de acertos
- **Precisa Melhorar**: <60% de acertos

### Badges/Troféus
- 🥇 **1º Lugar**: Ouro
- 🥈 **2º Lugar**: Prata
- 🥉 **3º Lugar**: Bronze

## 📊 ROPs Implementadas

### Macroárea 1: Cultura de Segurança
- ✅ ROP 1.1 – Responsabilização pela Qualidade (30 questões)
- ✅ ROP 1.2 – Gestão de Incidentes (30 questões)
- ✅ ROP 1.3 – Relatórios Trimestrais (30 questões)
- ✅ ROP 1.4 – Divulgação de Incidentes (30 questões)

### Macroárea 2: Comunicação
- ✅ ROP 2.1 – Identificação do Cliente (30 questões)
- ⏳ ROP 2.2 – Lista de Abreviações Perigosas
- ⏳ ROP 2.3 – Conciliação Medicamentosa
- ⏳ ROP 2.4 – Conciliação em Internação
- ⏳ ROP 2.5 – Conciliação Ambulatorial
- ⏳ ROP 2.6 – Conciliação em Emergência
- ⏳ ROP 2.7 – Lista de Verificação Cirúrgica
- ⏳ ROP 2.8 – Transferência de Informações

### Macroárea 3: Uso de Medicamentos
- ⏳ ROP 3.1 – Uso Racional de Antimicrobianos
- ⏳ ROP 3.2 – Eletrólitos Concentrados
- ⏳ ROP 3.3 – Segurança no Uso da Heparina
- ⏳ ROP 3.4 – Medicamentos de Alta Vigilância
- ⏳ ROP 3.5 – Segurança das Bombas de Infusão
- ⏳ ROP 3.6 – Segurança no Uso de Narcóticos

### Macroárea 4: Vida Profissional
- ⏳ ROP 4.1 – Programa de Manutenção Preventiva
- ⏳ ROP 4.2 – Capacitação e Treinamento
- ⏳ ROP 4.3 – Prevenção de Violência
- ⏳ ROP 4.4 – Fluxo de Clientes
- ⏳ ROP 4.5 – Plano de Segurança do Paciente

### Macroárea 5: Prevenção de Infecções
- ⏳ ROP 5.1 – Aderência à Higiene das Mãos
- ⏳ ROP 5.2 – Higiene das Mãos: Capacitação
- ⏳ ROP 5.3 – Taxas de Infecção
- ⏳ ROP 5.4 – Reprocessamento

### Macroárea 6: Avaliação de Riscos
- ⏳ ROP 6.1 – Prevenção de Quedas
- ⏳ ROP 6.2 – Prevenção de Úlceras por Pressão
- ⏳ ROP 6.3 – Prevenção de Suicídio
- ⏳ ROP 6.4 – Profilaxia para TEV
- ⏳ ROP 6.5 – Tratamento da Pele e Feridas

**Status Atual**: 150/780 questões implementadas (19%)
**Próximas Implementações**: ROPs 2.2 a 6.5

## 🔄 Expansões Futuras

### Em Desenvolvimento
- [ ] Completar todas as 780 questões
- [ ] Implementar áudio aulas
- [ ] Adicionar gráficos de desempenho com Chart.js
- [ ] Sistema de conquistas/badges
- [ ] Modo de estudo (revisão de erros)
- [ ] Exportação de certificados
- [ ] Modo offline (PWA)
- [ ] Notificações push
- [ ] Chat entre usuários
- [ ] Fórum de discussão

### Melhorias Planejadas
- [ ] Estatísticas avançadas por tema
- [ ] Análise de tempo de resposta
- [ ] Recomendações personalizadas
- [ ] Sistema de flashcards
- [ ] Quiz em equipe/multiplayer
- [ ] Integração com Google Calendar (escalas)
- [ ] Upload de documentos pelos usuários
- [ ] Sistema de comentários em questões

## 🤝 Contribuindo

### Como Adicionar Conteúdo

#### Adicionando Questões
1. Abra `rops-data.js`
2. Localize a subdivisão desejada
3. Adicione no array `questions`:

```javascript
{
    question: "Qual a definição de X?",
    options: [
        "Opção incorreta 1",
        "Opção correta",
        "Opção incorreta 2",
        "Opção incorreta 3"
    ],
    correctAnswer: 1,
    explanation: "Explicação completa e fundamentada da resposta."
}
```

#### Padrões de Qualidade
- ✅ Questões claras e objetivas
- ✅ 4 alternativas por questão
- ✅ Apenas uma resposta correta
- ✅ Explicação fundamentada (literatura/guidelines)
- ✅ Linguagem profissional
- ✅ Português correto

### Reportando Bugs
Abra uma issue no GitHub com:
- Descrição do problema
- Passos para reproduzir
- Comportamento esperado
- Screenshots (se aplicável)
- Navegador e versão

## 📞 Suporte

### Contatos
- **Email**: [seu-email@exemplo.com]
- **Telefone**: [seu-telefone]
- **GitHub**: [seu-usuario/repositorio]

### Recursos
- [Documentação do Firebase](https://firebase.google.com/docs)
- [Guia do Qmentum](https://accreditation.ca/qmentum/)
- [Manual das ROPs](./2023%20-%20Manual%20Qmentum%20-%20NOVAS%20ROPs%202.pdf)

## 📝 Licença

Este projeto é de uso interno do serviço de Anestesiologia. Todos os direitos reservados.

**Desenvolvido com ❤️ para a equipe ANEST**

---

## 🎯 Estatísticas do Projeto

- **Linhas de Código**: ~3000+ linhas
- **Questões**: 150+ (meta: 780+)
- **Macroáreas**: 6
- **Subdivisões**: 26
- **Funcionalidades**: 12 seções principais
- **Tempo de Desenvolvimento**: [inserir]
- **Última Atualização**: Outubro 2025

## 🚀 Próximos Passos

1. **Curto Prazo** (1-2 semanas)
   - Completar questões das ROPs 2.2 a 2.8
   - Implementar gráficos de desempenho
   - Adicionar primeiras áudio aulas

2. **Médio Prazo** (1-2 meses)
   - Completar todas as 780 questões
   - Implementar sistema de conquistas
   - Adicionar modo de revisão

3. **Longo Prazo** (3-6 meses)
   - Desenvolver app mobile (React Native)
   - Sistema de certificação
   - Integração com LMS institucional

---

**Versão**: 1.0.0
**Data**: Outubro 2025
**Autor**: [Seu Nome]

