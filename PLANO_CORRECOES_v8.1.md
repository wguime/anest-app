# 🔧 PLANO DE CORREÇÕES v8.1.0

## ✅ JÁ CORRIGIDO (Commit 76c4723):
- ✅ Cores profissionais (verde escuro #2d8659 + branco)
- ✅ Header com gradiente profissional
- ✅ Header sticky (fica fixo no topo)

---

## 🔴 CORREÇÕES A FAZER:

### 1. PAINEL PRINCIPAL (4 CARDS FUNCIONAIS)

#### 📢 Card 1: Últimos Comunicados
**Estado Atual:** Link que mostra "em desenvolvimento"
**Correção:**
```javascript
- Criar função renderComunicadosCard()
- Buscar últimos 3 comunicados do Firestore
- Exibir em cards com:
  * Título
  * Data de publicação
  * Prioridade (badge colorido)
  * Link "Ver todos" → leva para página completa
- Se não houver comunicados: "Nenhum comunicado recente"
```

#### ✅ Card 2: Minhas Pendências
**Estado Atual:** Link que mostra "em desenvolvimento"
**Correção:**
```javascript
- Criar função renderPendenciasCard()
- Verificar:
  * ROPs não completadas (userProfile.completedROPs)
  * Protocolos não lidos (nova coleção no Firestore)
  * Treinamentos pendentes (nova coleção no Firestore)
- Exibir lista com checkboxes
- Contador: "X pendências"
```

#### 📊 Card 3: Indicadores de Qualidade
**Estado Atual:** Link que mostra "em desenvolvimento"
**Correção:**
```javascript
- Criar função renderIndicadoresCard()
- Buscar indicadores do Firestore (coleção 'indicadores')
- Exibir 5 indicadores com progress bars:
  1. Higiene das Mãos (icon: 🧼)
  2. Notificação de Incidentes (icon: 📝)
  3. Incidência de NVPO (icon: 🤢)
  4. Controle da Dor (icon: ➕)
  5. Satisfação do Paciente (icon: ⭐)
- Formato: [Nome] [Progress bar] [Valor%] vs [Meta%]
- Link "Ver detalhes" → leva para página completa
```

#### 🏆 Card 4: ROPs Desafio (Gamificação)
**Estado Atual:** Existe mas não mostra progress por área + podcasts estão separados
**Correção:**
```javascript
- REMOVER o card "Podcasts Educativos" separado
- Criar função renderROPsDesafioCard()
- Exibir:
  * Progress geral: "Você completou X de 32 ROPs"
  * 6 sub-cards com progress por área:
    1. 🛡️ Cultura de Segurança [Progress bar X%] [Link para Podcast]
    2. 💬 Comunicação [Progress bar X%] [Link para Podcast]
    3. 💊 Uso de Medicamentos [Progress bar X%] [Link para Podcast]
    4. 👥 Vida Profissional [Progress bar X%] [Link para Podcast]
    5. 🦠 Controle de Infecção [Progress bar X%] [Link para Podcast]
    6. ⚠️ Avaliação de Riscos [Progress bar X%] [Link para Podcast]
  * [Botão] "Iniciar Desafio"
  * [Botão] "Ver Ranking"
- Podcasts ficam DENTRO de cada área, não separados
```

### 2. RESIDÊNCIA MÉDICA (CALENDÁRIO INTERATIVO)

**Estado Atual:** Abre Google Sheets em iframe
**Correção:**
```javascript
- Criar função renderCalendarioResidencia()
- UI:
  * Calendário do mês atual (biblioteca: date-fns ou nativa)
  * Ao clicar em um dia:
    - Buscar dados do Google Sheets API (ou Firestore se preferir)
    - Exibir abaixo do calendário:
      * "Plantonista do dia: [Nome]"
      * "Estágios:"
        - Residente 1: [Local]
        - Residente 2: [Local]
        - etc.
  * Legendas coloridas:
    - Verde: Dia com plantonista
    - Azul: Dia com estágios
    - Laranja: Férias
- Tabs mantidas: "Plantões | Estágios | Férias"
- Cada tab filtra a visualização do calendário
```

### 3. QUALIDADE E SEGURANÇA

#### ✅ Gestão de Incidentes
**Estado:** OK (já funciona)

#### 📋 Auditorias e Conformidade
**Estado Atual:** Link que mostra "em desenvolvimento"
**Correção:**
```javascript
- Criar função renderAuditoriasPage()
- 3 sub-itens:
  1. 🧼 Higiene das Mãos
     - [Botão] "Anexar PDF de Evidência"
     - Lista de PDFs anexados com data
     - [Botão] "Ver Protocolo"
  
  2. 👁️ Uso de Medicamentos
     - [Botão] "Anexar PDF de Evidência"
     - Lista de PDFs anexados com data
     - [Botão] "Ver Protocolo"
  
  3. ❌ Abreviações Perigosas
     - [Botão] "Anexar PDF de Evidência"
     - Lista de PDFs anexados com data
     - [Botão] "Ver Lista de Abreviações"
```

#### 📄 Relatórios de Segurança
**Estado Atual:** Link que mostra "em desenvolvimento"
**Correção:**
```javascript
- Criar função renderRelatoriosPage()
- 3 sub-itens:
  1. 📅 Relatório Trimestral
     - Lista de relatórios por trimestre/ano
     - [Botão Admin] "Anexar Novo Relatório"
     - [Link] Download do PDF
  
  2. ⚠️ Consolidado de Incidentes
     - Geração automática baseada nos incidentes do Firestore
     - Gráficos: Tipo, Severidade, Setor, Tendência
     - [Botão] "Exportar PDF"
  
  3. 🔍 Relatório de Auditorias
     - Lista de auditorias realizadas
     - [Link] Download do PDF
```

### 4. PROTOCOLOS

#### 📚 Biblioteca de Documentos
**Estado Atual:** Funciona mas não está organizada como ícones
**Correção:**
```javascript
- Criar função renderBibliotecaIcones()
- Exibir categorias como ÍCONES GRANDES (não lista):
  * 📋 Protocolos
  * 📜 Políticas
  * 📝 Formulários
  * 📖 Manuais
  * 📊 Relatórios
- Ao clicar em um ícone:
  * Mostra lista de documentos daquela categoria
  * Cada documento com:
    - Nome
    - Data de upload
    - Tamanho
    - [Botão] Download
```

#### 💊 Segurança de Medicamentos
**Estado Atual:** Link que mostra "em desenvolvimento"
**Correção:**
```javascript
- Criar função renderSegurancaMedicamentos()
- 5 sub-itens com links para PDFs:
  1. MAVs → PRO.INSH.0080-13 (já existe)
  2. Eletrólitos Concentrados → (adicionar PDF)
  3. Heparina → PRO.INSH.0053-05 (já existe)
  4. Narcóticos → (adicionar PDF ou criar)
  5. Abreviações Perigosas → (lista em PDF)
```

#### 🦠 Controle de Infecção
**Estado Atual:** Link que mostra "em desenvolvimento"
**Correção:**
```javascript
- Criar função renderControleInfeccao()
- 1 sub-item:
  * Protocolo de Higiene das Mãos → PT 03 (já existe)
```

### 5. FERRAMENTAS

#### ✅ Checklist de Cirurgia Segura
**Estado:** OK? (verificar se está funcional)

#### 🔄 Conciliação Medicamentosa
**Estado:** Links para protocolos (OK se links estão corretos)

#### 🛡️ Avaliação de Riscos
**Estado:** Precisa verificar se calculadoras + protocolos estão linkados

#### 🧮 Calculadoras Anestésicas
**Estado Atual:** "Desconfiguradas e não fazem cálculos adequadamente"
**Correção:**
```javascript
- Reorganizar estrutura:
  
1. Anestesiologia (Geral)
   - RCRI (Lee) ✓
   - Goldman Cardiac Risk Index (adicionar)
   - ARISCAT ✓
   - Apfel ✓
   - STOP-Bang ✓
   - Peso Ideal / SC ✓
   - Aldrete e Kroulik (adicionar)
   - Steward (adicionar)
   - Glasgow ✓ (se já existe)

2. Dose de Drogas
   - Doses Pediátricas Automáticas ✓ (já existe)
   - Conversão de Opioides ✓
   - Conversão de Corticoides (adicionar)

3. Pediatria
   - Holliday-Segar ✓
   - CHURP Score (adicionar)

4. Índices (Comorbidades)
   - RCRI ✓
   - ARISCAT ✓
   - APACHE II (adicionar)

5. Anestesia Regional
   - Dose Máxima AL ✓ (verificar)

6. Fluidos e Reposição
   - Déficit Hídrico (adicionar)
   - Manutenção (já tem)

7. Manter outras categorias existentes
   - Jejum
   - Vias Aéreas
   - Obstetrícia
   - Dor
```

### 6. HEADER

**Correção:**
```javascript
- Verificar se há legendas duplicadas
- Garantir que logo está no topo (não abaixo)
- Botão Admin deve aparecer apenas se isAdmin() === true
- Verificar z-index para que não fique atrás de conteúdo
```

---

## 📦 PLANO DE IMPLEMENTAÇÃO:

### Fase 1: Estrutura de Dados (Firestore)
1. Criar coleções:
   - `comunicados` (título, conteúdo, data, prioridade, autor)
   - `indicadores` (nome, valorAtual, meta, periodo)
   - `pendencias` (userId, tipo, itemId, concluido)
   - `auditorias` (tipo, data, pdf, autor)
   - `relatorios` (tipo, trimestre, ano, pdf)

### Fase 2: Funções de Renderização
1. `renderPainelPrincipalNovo()` - Com 4 cards funcionais
2. `renderComunicadosCard()`
3. `renderPendenciasCard()`
4. `renderIndicadoresCard()`
5. `renderROPsDesafioCard()` - Com podcasts integrados
6. `renderCalendarioResidencia()` - Com calendário interativo
7. `renderAuditoriasPage()`
8. `renderRelatoriosPage()`
9. `renderBibliotecaIcones()`
10. Corrigir todas as calculadoras

### Fase 3: Upload de PDFs
1. Criar interface de upload para Admin
2. Salvar em Firebase Storage
3. Salvar referências no Firestore

### Fase 4: Testes e Deploy
1. Testar cada funcionalidade
2. Validar fluxos
3. Deploy com novo timestamp

---

## ⏱️ ESTIMATIVA:

- **Fase 1 (Estrutura de Dados):** 1-2 horas
- **Fase 2 (Funções de Renderização):** 4-6 horas
- **Fase 3 (Upload de PDFs):** 1-2 horas
- **Fase 4 (Testes e Deploy):** 1-2 horas

**TOTAL: 7-12 horas de trabalho**

---

## ❓ PERGUNTAS ANTES DE IMPLEMENTAR:

1. **Calendário da Residência:** Você prefere:
   - a) Integrar com Google Sheets API (mais complexo, dados atualizados em tempo real)
   - b) Admin faz upload de um JSON com os dados (mais simples, manual)

2. **Relatório de Incidentes:** Deve gerar PDF automaticamente ou apenas mostrar gráficos na tela?

3. **Calculadoras faltantes:** Você tem as fórmulas/regras para:
   - Goldman Cardiac Risk Index
   - Aldrete e Kroulik
   - Steward Score
   - CHURP Score
   - APACHE II
   - Conversão de Corticoides
   - Déficit Hídrico

4. **Podcasts:** Os 16 podcasts já estão organizados por área ou preciso categorizá-los?

---

**POR FAVOR, REVISE ESTE PLANO E ME CONFIRME:**
1. Está de acordo com suas necessidades?
2. Alguma correção/ajuste no plano?
3. Posso seguir com a implementação?
4. Respostas para as 4 perguntas acima?

Após sua aprovação, farei TUDO de uma vez e farei o deploy final!

