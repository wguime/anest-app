# 📋 PLANO DE IMPLEMENTAÇÃO COMPLETO - ANEST

## ✅ JÁ IMPLEMENTADO E NO GITHUB

### 1. **Cores da Marca ANEST** ✅
- Verde ANEST (#1a4d2e) aplicado
- Verde claro (#7fb069) para acentos
- Gradiente verde moderno

### 2. **Modo Noturno (Dark Mode)** ✅
- CSS preparado para dark mode
- Variáveis de tema configuradas
- Falta apenas: adicionar botão de toggle no HTML

---

## 🔄 PRÓXIMAS IMPLEMENTAÇÕES

Devido ao grande volume de mudanças solicitadas, vou implementar em **3 etapas**:

### **ETAPA 1: Estrutura e Navegação** (2-3 horas)

#### A) Reestruturar Menu Principal
- [  ] Reordenar ícones: ROPs em destaque
- [  ] Criar ícone "Documentos" agrupando 10 ícones
- [  ] Renomear "Clima" → "Clima de Segurança"

#### B) Reorganizar ROPs
- [  ] Mover "Podcasts ROPs" para dentro de "ROPs - Desafio"
- [  ] Criar 2 ícones por macro área: "Questões" e "Podcasts"
- [  ] Atualizar navegação entre telas

#### C) Ícone Notificações
- [  ] Criar novo ícone "Notificações"
- [  ] Implementar auto-login: https://luizeuzebio.com.br/anest/
- [  ] Login: anest@anest.com.br / Senha: 123456

---

### **ETAPA 2: Melhorias Visuais e Funcionais** (1-2 horas)

#### D) Documentos
- [  ] Aplicar layout padrão (cards como tela inicial)
- [  ] Abrir PDFs inline (viewer embutido)
- [  ] Sem necessidade de download

#### E) Dark Mode
- [  ] Adicionar botão toggle no header
- [  ] Salvar preferência no localStorage
- [  ] Aplicar tema em todas as telas

---

### **ETAPA 3: Conteúdo - Questões ROPs** (8-12 horas)

#### F) Criar 630 Questões (21 ROPs × 30 questões)

**Macroárea 2 – Comunicação** (6 ROPs = 180 questões)
- [  ] ROP 2.3 – Conciliação Medicamentosa (30q)
- [  ] ROP 2.4 – Conciliação Internação (30q)
- [  ] ROP 2.5 – Conciliação Ambulatorial (30q)
- [  ] ROP 2.6 – Conciliação Emergência (30q)
- [  ] ROP 2.7 – Checklist Cirurgia Segura (30q)
- [  ] ROP 2.8 – Handoff (30q)

**Macroárea 3 – Uso de Medicamentos** (6 ROPs = 180 questões)
- [  ] ROP 3.1 – Antimicrobianos (30q)
- [  ] ROP 3.2 – Eletrólitos Concentrados (30q)
- [  ] ROP 3.3 – Heparina (30q)
- [  ] ROP 3.4 – Medicamentos Alta Vigilância (30q)
- [  ] ROP 3.5 – Bombas de Infusão (30q)
- [  ] ROP 3.6 – Narcóticos/Opioides (30q)

**Macroárea 4 – Vida Profissional** (5 ROPs = 150 questões)
- [  ] ROP 4.1 – Manutenção Preventiva (30q)
- [  ] ROP 4.2 – Capacitação e Treinamento (30q)
- [  ] ROP 4.3 – Prevenção de Violência (30q)
- [  ] ROP 4.4 – Fluxo de Clientes (30q)
- [  ] ROP 4.5 – Plano de Segurança (30q)

**Macroárea 5 – Prevenção de Infecções** (4 ROPs = 120 questões)
- [  ] ROP 5.1 – Higiene das Mãos (30q)
- [  ] ROP 5.2 – Capacitação Higiene (30q)
- [  ] ROP 5.3 – Taxas de Infecção (30q)
- [  ] ROP 5.4 – Reprocessamento (30q)

**Macroárea 6 – Avaliação de Riscos** (5 ROPs = 150 questões)
- [  ] ROP 6.1 – Prevenção de Quedas (30q)
- [  ] ROP 6.2 – Úlceras por Pressão (30q)
- [  ] ROP 6.3 – Prevenção de Suicídio (30q)
- [  ] ROP 6.4 – TEV (30q)
- [  ] ROP 6.5 – Tratamento Pele e Feridas (30q)

---

## 📊 RESUMO DO TRABALHO

| Etapa | Tarefas | Estimativa | Status |
|-------|---------|------------|--------|
| **Cores e Dark Mode** | 2 | 1h | ✅ COMPLETO |
| **Estrutura/Navegação** | 10 | 3h | ⏳ Próximo |
| **Melhorias Visuais** | 5 | 2h | ⏳ Aguardando |
| **630 Questões** | 21 ROPs | 10h | ⏳ Grande Volume |
| **TOTAL** | **38 tarefas** | **~16h** | **5% completo** |

---

## 🎯 ESTRATÉGIA RECOMENDADA

### Opção A: Implementação Completa (recomendado)
Implemento tudo em sequência, fazendo commits incrementais. Você terá:
- ✅ Aplicativo 100% funcional
- ✅ Todas as 630 questões
- ⏱️ Tempo: 2-3 sessões de trabalho

### Opção B: Implementação Prioritária
Foco nas mudanças visuais e estruturais primeiro, questões depois:
1. **Agora:** Estrutura, navegação, notificações, PDFs
2. **Depois:** 630 questões (quando você indicar)

---

## 📝 NOTAS IMPORTANTES

### Questões ROPs
- Preciso do **Manual Qmentum ROPs** que está na sua pasta
- Vou usar: `2023 - Manual Qmentum - NOVAS ROPs 2.pdf`
- Cada questão terá: pergunta + 4 alternativas + explicação

### Notificações (Auto-login)
- Vou criar iframe ou redirect automático
- Credenciais embarcadas (considere segurança)
- Alternativa: usar POST form oculto

### PDFs Inline
- Vou usar `<iframe>` ou bibliotecas como PDF.js
- Melhor experiência sem downloads
- Compatível com mobile

---

## 🚀 PRÓXIMA AÇÃO

**O que você prefere?**

**A)** Continuo implementando TUDO agora (todas as 38 tarefas)
- Vou trabalhar de forma contínua até concluir
- Faço commits incrementais
- Você acompanha o progresso

**B)** Implemento por etapas COM SUA APROVAÇÃO
- Faço Etapa 1 → você testa → Etapa 2 → etc
- Mais controle do processo
- Pode ajustar entre etapas

**C)** Você quer priorizar algo específico?
- Me diga qual funcionalidade é mais importante
- Foco nela primeiro

---

**Me responda qual opção prefere e eu continuo! 🚀**

