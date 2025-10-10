# 📝 Como Adicionar Questões ao Sistema ANEST

Este guia explica como adicionar as questões restantes ao banco de dados da aplicação.

## 📊 Status Atual

**Questões Implementadas**: 150/780 (19%)

### ✅ Completas (30 questões cada):
- ROP 1.1 – Responsabilização pela Qualidade
- ROP 1.2 – Gestão de Incidentes
- ROP 1.3 – Relatórios Trimestrais
- ROP 1.4 – Divulgação de Incidentes (Disclosure)
- ROP 2.1 – Identificação do Cliente

### ⏳ Pendentes (630 questões):
- ROPs 2.2 a 2.8 (Comunicação)
- ROPs 3.1 a 3.6 (Uso de Medicamentos)
- ROPs 4.1 a 4.5 (Vida Profissional)
- ROPs 5.1 a 5.4 (Prevenção de Infecções)
- ROPs 6.1 a 6.5 (Avaliação de Riscos)

---

## 🎯 Template de Questão

Cada questão segue este formato:

```javascript
{
    question: "Texto da pergunta?",
    options: [
        "Opção A - Incorreta",
        "Opção B - Correta",
        "Opção C - Incorreta",
        "Opção D - Incorreta"
    ],
    correctAnswer: 1, // Índice da opção correta (0-3)
    explanation: "Explicação detalhada da resposta correta, preferencialmente com referência bibliográfica ou normativa."
}
```

---

## 📖 Passo a Passo para Adicionar Questões

### 1. Localizar a ROP no Arquivo

Abra o arquivo `/Users/guilherme/Documents/Qmentum/App/rops-data.js`

Encontre a macroárea e subdivisão desejada. Exemplo para ROP 2.2:

```javascript
"comunicacao": {
    title: "Comunicação",
    // ...
    subdivisoes: {
        "rop-2-2": {
            title: "ROP 2.2 – Lista de Abreviações Perigosas",
            audioFile: null,
            questions: [
                // ADICIONAR QUESTÕES AQUI
            ]
        }
    }
}
```

### 2. Pesquisar Conteúdo Base

Consulte os documentos disponíveis:
- `2023 - Manual Qmentum - NOVAS ROPs 2.pdf`
- `2023 - Manual Qmentum - SERVIÇOS DE ANESTESIA.pdf`
- Protocolos específicos na pasta `Documentos/`
- Literatura científica e guidelines

### 3. Criar as Questões

#### Exemplo Prático - ROP 2.2 (Abreviações Perigosas)

```javascript
questions: [
    {
        question: "Por que o uso de abreviações não padronizadas é perigoso?",
        options: [
            "Apenas atrasa o processo de documentação",
            "Pode levar a interpretações erradas e erros de medicação",
            "Não há risco, é apenas questão de padronização",
            "Somente é perigoso em prescrições eletrônicas"
        ],
        correctAnswer: 1,
        explanation: "Abreviações não padronizadas podem ser interpretadas de múltiplas formas, levando a erros graves como administração de medicação errada, dose errada ou via errada. É uma das principais causas de eventos adversos evitáveis."
    },
    {
        question: "Qual abreviação NÃO deve ser utilizada para 'unidade internacional'?",
        options: [
            "UI",
            "U",
            "Unid. Int.",
            "Unidade Internacional"
        ],
        correctAnswer: 1,
        explanation: "A letra 'U' isolada pode ser confundida com '0' (zero) ou '4', levando a erros de dosagem. Sempre escrever por extenso 'unidade internacional' ou usar 'UI' quando apropriado."
    },
    // ... mais 28 questões
]
```

---

## ✍️ Diretrizes de Qualidade

### Características de Boas Questões:

#### ✅ FAZER:
- **Clara e objetiva**: Pergunta direta, sem ambiguidades
- **Relevante clinicamente**: Situações práticas do dia a dia
- **Fundamentada**: Baseada em evidências, protocolos ou guidelines
- **Uma única resposta correta**: Sem margem para debate
- **Distratores plausíveis**: Opções incorretas que fazem sentido
- **Explicação educativa**: Justifica a resposta e ensina

#### ❌ NÃO FAZER:
- Perguntas com múltiplas respostas corretas
- Pegadinhas ou "truques" desnecessários
- Questões extremamente específicas sem relevância prática
- Opções obviamente absurdas
- Linguagem ambígua ou confusa
- Explicações genéricas sem valor educativo

### Exemplo de Questão RUIM ❌

```javascript
{
    question: "Qual é melhor?",  // Vago
    options: [
        "A",  // Opções não descritivas
        "B",
        "C",
        "Todas acima"  // Múltiplas corretas
    ],
    correctAnswer: 3,
    explanation: "Porque sim."  // Explicação pobre
}
```

### Exemplo de Questão BOA ✅

```javascript
{
    question: "Qual é o número mínimo de identificadores que devem ser verificados antes de administrar uma medicação?",
    options: [
        "Um identificador é suficiente",
        "Dois identificadores devem ser verificados",
        "Três identificadores são obrigatórios",
        "Não há número mínimo definido"
    ],
    correctAnswer: 1,
    explanation: "Segundo a ROP 2.1, devem ser verificados no mínimo dois identificadores (ex: nome completo e data de nascimento) antes de qualquer administração de medicação, para garantir que é o paciente correto."
}
```

---

## 📚 Temas por Macroárea

### Macroárea 2: Comunicação (ROPs 2.2 a 2.8)

#### ROP 2.2 - Abreviações Perigosas
- Lista de abreviações proibidas
- Consequências de erros
- Padronização institucional
- Abreviações de medicamentos
- Símbolos médicos seguros

#### ROP 2.3 - Conciliação Medicamentosa
- Definição e importância
- Momento da conciliação
- Responsabilidades profissionais
- Discrepâncias medicamentosas
- Documentação adequada

#### ROP 2.4 - Conciliação em Internação
- Processo na admissão
- História medicamentosa completa
- Medicamentos de casa vs. hospitalar
- Comunicação com paciente/família

#### ROP 2.5 - Conciliação Ambulatorial
- Particularidades do ambulatório
- Seguimento pós-consulta
- Orientações ao paciente

#### ROP 2.6 - Conciliação em Emergência
- Desafios na urgência/emergência
- Fontes de informação alternativas
- Medicações críticas

#### ROP 2.7 - Checklist Cirúrgico
- Fases do checklist (sign in, time out, sign out)
- Participantes obrigatórios
- Itens essenciais
- Confirmação de identidade e procedimento
- Marcação do sítio cirúrgico

#### ROP 2.8 - Handoff (Transferência)
- Estrutura do handoff (SBAR, IPASS, etc.)
- Momentos críticos de transferência
- Elementos essenciais da comunicação
- Leitura de volta (read back)

### Macroárea 3: Uso de Medicamentos (ROPs 3.1 a 3.6)

#### ROP 3.1 - Antimicrobianos
- Uso racional
- Espectro e indicações
- Duração de terapia
- Profilaxia cirúrgica
- Resistência bacteriana

#### ROP 3.2 - Eletrólitos Concentrados
- Lista de eletrólitos de alto risco
- Armazenamento seguro
- Preparo e administração
- Dupla checagem

#### ROP 3.3 - Heparina
- Tipos de heparina
- Riscos de anticoagulação
- Protocolos de administração
- Monitoramento laboratorial
- Reversão de anticoagulação

#### ROP 3.4 - Medicamentos de Alta Vigilância
- Lista de MAV
- Estratégias de segurança
- Armazenamento diferenciado
- Dupla checagem obrigatória
- Alertas e sinalizações

#### ROP 3.5 - Bombas de Infusão
- Programação correta
- Biblioteca de medicamentos
- Alarmes e verificações
- Manutenção preventiva

#### ROP 3.6 - Narcóticos/Opioides
- Controle e rastreabilidade
- Prescrição e administração
- Prevenção de desvio
- Descarte adequado
- Manejo de dor vs. dependência

### Macroárea 4: Vida Profissional (ROPs 4.1 a 4.5)

#### ROP 4.1 - Manutenção Preventiva
- Programa de manutenção de equipamentos
- Periodicidade
- Documentação
- Testes de segurança

#### ROP 4.2 - Capacitação
- Treinamento obrigatório em segurança
- Frequência de reciclagens
- Competências essenciais
- Avaliação de efetividade

#### ROP 4.3 - Prevenção de Violência
- Tipos de violência no trabalho
- Identificação de riscos
- Protocolos de resposta
- Suporte aos profissionais

#### ROP 4.4 - Fluxo de Clientes
- Gestão de leitos e fluxo
- Critérios de admissão/alta
- Prevenção de superlotação
- Comunicação entre setores

#### ROP 4.5 - Plano de Segurança
- Componentes obrigatórios
- Revisão e atualização
- Divulgação e implementação
- Monitoramento de metas

### Macroárea 5: Prevenção de Infecções (ROPs 5.1 a 5.4)

#### ROP 5.1 - Aderência Higiene das Mãos
- 5 momentos da OMS
- Técnica correta
- Produtos apropriados
- Monitoramento de adesão

#### ROP 5.2 - Capacitação em Higiene
- Treinamento de novos profissionais
- Reciclagens periódicas
- Feedback de desempenho

#### ROP 5.3 - Taxas de Infecção
- Definições de IRAS
- Principais indicadores
- Vigilância epidemiológica
- Análise e ações

#### ROP 5.4 - Reprocessamento
- Etapas do reprocessamento
- Classificação de Spaulding
- Rastreabilidade
- Testes de eficácia

### Macroárea 6: Avaliação de Riscos (ROPs 6.1 a 6.5)

#### ROP 6.1 - Prevenção de Quedas
- Avaliação de risco
- Escalas (Morse, etc.)
- Medidas preventivas
- Ambiente seguro

#### ROP 6.2 - Úlceras por Pressão
- Escala de Braden
- Fatores de risco
- Prevenção (reposicionamento, superfícies, etc.)
- Classificação de lesões

#### ROP 6.3 - Prevenção de Suicídio
- Triagem de risco
- Ambiente seguro
- Vigilância apropriada
- Plano de cuidados

#### ROP 6.4 - Profilaxia TEV
- Avaliação de risco (Caprini, Padua, etc.)
- Indicações de profilaxia
- Métodos (farmacológicos e mecânicos)
- Contraindicações

#### ROP 6.5 - Tratamento Pele e Feridas
- Tipos de feridas
- Avaliação adequada
- Coberturas e tratamentos
- Prevenção de infecção

---

## 🔄 Workflow de Adição

1. **Pesquisar**: Leia documentos sobre a ROP
2. **Listar tópicos**: Identifique 30+ tópicos importantes
3. **Criar questões**: Use o template para cada tópico
4. **Revisar**: Verifique qualidade (use checklist acima)
5. **Adicionar ao código**: Insira no `rops-data.js`
6. **Testar**: Rode localmente e teste as questões
7. **Commit**: Salve mudanças no Git

---

## 📋 Checklist de Qualidade

Antes de adicionar questões, verifique:

- [ ] 30 questões por subdivisão
- [ ] Cada questão tem 4 opções
- [ ] Apenas uma resposta correta
- [ ] Explicação fundamentada
- [ ] Português correto
- [ ] Relevância clínica
- [ ] Distratores plausíveis
- [ ] Questão clara e objetiva
- [ ] Baseada em evidências/protocolos
- [ ] Valor educativo

---

## 💡 Dicas de Produtividade

### Trabalhe em Lotes
Foque em uma macroárea de cada vez para manter consistência.

### Use IA como Apoio
Ferramentas como ChatGPT podem ajudar a:
- Gerar rascunhos de questões
- Sugerir distratores
- Elaborar explicações
**Mas sempre revise e valide o conteúdo!**

### Revisão em Pares
Peça a colegas para revisar questões e dar feedback.

### Documente Fontes
Mantenha registro das referências usadas:
```javascript
// Fonte: Manual Qmentum 2023, pág. 45
// Referência: ANVISA RDC 36/2013
```

---

## 🎯 Meta de Conclusão

**Objetivo**: 780 questões completas

**Ritmo sugerido**:
- 10 questões/dia = 63 dias (~2 meses)
- 20 questões/dia = 32 dias (~1 mês)
- 30 questões/dia = 21 dias (~3 semanas)

**Priorização**:
1. ROPs mais relevantes para anestesia (3.x, 6.4)
2. ROPs de alta incidência (2.7, 5.1)
3. ROPs restantes

---

## 📞 Precisa de Ajuda?

- **Dúvidas sobre conteúdo**: Consulte documentos em `Documentos/`
- **Problemas técnicos**: Veja README.md
- **Revisão de questões**: Compartilhe com equipe

---

## ✅ Próximos Passos

1. Escolha uma ROP para começar (sugestão: 2.2 ou 3.1)
2. Leia material de referência
3. Crie 5 questões de teste
4. Revise com checklist
5. Se satisfeito, complete as 30
6. Teste na aplicação
7. Repita para próximas ROPs

**Boa sorte na criação do conteúdo! 📚✨**

---

**Atualização sugerida**: Atualize este documento conforme adiciona questões, marcando progresso em cada ROP.

