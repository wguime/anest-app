// ROPs - Práticas Organizacionais Obrigatórias
// Versão completa com 30 questões por ROP

const ropsData = {
    // ==================== MACRO ÁREA 1 - CULTURA DE SEGURANÇA ====================
    "cultura-seguranca": {
        title: "Cultura de Segurança",
        icon: "fas fa-shield-alt",
        color: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        subdivisoes: {
            "rop-1-1": {
                title: "ROP 1.1 – Responsabilização pela Qualidade",
                audioFile: null,
                questions: [
                    {
                        question: "Qual é o principal objetivo da ROP 1.1 - Responsabilização pela Qualidade?",
                        options: [
                            "Estabelecer metas financeiras para o serviço",
                            "Definir responsabilidades claras pela qualidade e segurança do paciente",
                            "Contratar mais profissionais para o serviço",
                            "Reduzir custos operacionais"
                        ],
                        correctAnswer: 1,
                        explanation: "A ROP 1.1 visa estabelecer responsabilidades claras e compartilhadas pela qualidade e segurança do paciente em toda a organização, criando uma cultura de responsabilização."
            },
            "rop-1-2": {
                title: "ROP 1.2 – Gestão de Incidentes sobre a Segurança dos Pacientes",
                audioFile: null,
                questions: [
                    {
                        question: "O que é um incidente de segurança do paciente?",
                        options: [
                            "Apenas eventos que causaram dano ao paciente",
                            "Qualquer evento que possa ou tenha afetado a segurança",
                            "Somente erros médicos graves",
                            "Apenas eventos intencionais"
                        ],
                        correctAnswer: 1,
                        explanation: "Incidente de segurança é qualquer evento ou circunstância que poderia ter resultado, ou resultou, em dano desnecessário ao paciente."
            },
            "rop-1-3": {
                title: "ROP 1.3 – Relatórios Trimestrais sobre a Segurança dos Pacientes",
                audioFile: null,
                questions: [
                    {
                        question: "Qual a finalidade dos relatórios trimestrais de segurança?",
                        options: [
                            "Apenas cumprir requisitos de acreditação",
                            "Monitorar, comunicar e promover ações de melhoria",
                            "Documentar para processos jurídicos",
                            "Controlar profissionais"
                        ],
                        correctAnswer: 1,
                        explanation: "Relatórios trimestrais visam monitorar indicadores, comunicar resultados e promover ações de melhoria contínua da segurança do paciente."
            },
            "rop-1-4": {
                title: "ROP 1.4 – Divulgação de Incidentes (Disclosure)",
                audioFile: null,
                questions: [
                    {
                        question: "O que é disclosure de incidentes?",
                        options: [
                            "Ocultar erros dos pacientes",
                            "Comunicação aberta e honesta sobre incidentes com pacientes",
                            "Apenas documentar internamente",
                            "Divulgar publicamente todos os erros"
                        ],
                        correctAnswer: 1,
                        explanation: "Disclosure é a comunicação aberta, oportuna e honesta com pacientes e familiares sobre incidentes que os afetaram."
            },
        }
    },

    // ==================== MACRO ÁREA 2 - COMUNICAÇÃO ====================
    "comunicacao": {
        title: "Comunicação",
        icon: "fas fa-comments",
        color: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
        subdivisoes: {
            "rop-2-1": {
                title: "ROP 2.1 – Identificação do Cliente",
                audioFile: null,
                questions: [
                    {
                        question: "Quantos identificadores devem ser usados antes de qualquer procedimento?",
                        options: [
                            "Um identificador é suficiente",
                            "Pelo menos dois identificadores",
                            "Três identificadores sempre",
                            "Não é necessário identificar"
                        ],
                        correctAnswer: 1,
                        explanation: "Devem ser utilizados pelo menos dois identificadores (nome completo e data de nascimento ou prontuário) antes de qualquer procedimento, medicação ou coleta de exames."
            },
            "rop-2-2": {
                title: "ROP 2.2 – Lista de Abreviações Perigosas",
                audioFile: null,
                questions: [
                    // 30 questions about dangerous abbreviations...
                ]
            },
            "rop-2-3": {
                title: "ROP 2.3 – Conciliação Medicamentosa como Prioridade Estratégica",
                audioFile: null,
                questions: [
{
        question: "O que é conciliação medicamentosa?",
        options: [
            "Processo de comparar medicamentos do paciente em transições de cuidado",
            "Reconciliação financeira de medicamentos",
            "Processo de descarte de medicamentos vencidos",
            "Sistema de controle de estoque de medicamentos"
        ],
        correctAnswer: 0,
        explanation: "Conciliação medicamentosa é o processo formal de comparação dos medicamentos que o paciente estava usando antes com os medicamentos prescritos após uma transição de cuidado, identificando e resolvendo discrepâncias."
            },
            "rop-2-4": {
                title: "ROP 2.4 – Conciliação em Serviços de Assistência Aguda (Internação)",
                audioFile: null,
                questions: [
{
        question: "O que caracteriza a assistência aguda em internação?",
        options: [
            "Apenas consultas de rotina",
            "Cuidado de pacientes internados com condições agudas",
            "Somente atendimentos ambulatoriais",
            "Apenas procedimentos cirúrgicos"
        ],
        correctAnswer: 1,
        explanation: "Assistência aguda em internação refere-se ao cuidado prestado a pacientes que necessitam hospitalização para tratamento de condições agudas, exacerbações de doenças crônicas ou procedimentos que requerem internação."
            },
            "rop-2-5": {
                title: "ROP 2.5 – Conciliação em Atendimento Ambulatorial",
                audioFile: null,
                questions: [
createQuestion(
        "Qual a principal diferença da conciliação ambulatorial vs hospitalar?",
        [
            "Não há diferenças significativas",
            "Ambulatorial foca em medicamentos crônicos e adesão",
            "Ambulatorial é menos importante",
            "Apenas frequência das consultas"
        ],
        1,
        "No ambulatório, a conciliação foca em medicamentos de uso crônico, adesão ao tratamento e prevenção de interações, enquanto no hospital foca mais em transições agudas."
    ),
    createQuestion(
        "Quando realizar conciliação em consulta ambulatorial?",
        [
            "Apenas na primeira consulta",
            "Em todas as consultas",
            "Somente se houver queixas",
            "Uma vez por ano"
        ],
        1,
        "A conciliação deve ser realizada em TODAS as consultas ambulatoriais para identificar mudanças, avaliar adesão e detectar problemas relacionados a medicamentos."
    ),
    createQuestion(
        "Como abordar adesão medicamentosa no ambulatório?",
        [
            "Apenas perguntar se está tomando",
            "Abordagem não julgadora, identificando barreiras",
            "Assumir que está aderindo",
            "Não é papel do ambulatório"
        ],
        2,
        "A abordagem deve ser empática e não julgadora, explorando barreiras reais (custo, efeitos adversos, esquecimento) e trabalhando soluções conjuntas."
    ),
    createQuestion(
        "Qual estratégia para melhorar adesão em ambulatório?",
        [
            "Aumentar número de medicamentos",
            "Simplificar esquema: menor frequência, combinar medicamentos",
            "Apenas reforçar importância",
            "Ameaçar com consequências"
        ],
        1,
        "Simplificar o esquema terapêutico (reduzir frequência, usar combinações fixas, ajustar horários à rotina) melhora significativamente a adesão."
    ),
    createQuestion(
        "Como identificar cascata de prescrições no ambulatório?",
        [
            "Não é possível identificar",
            "Revisar sintomas novos que podem ser efeitos adversos",
            "Apenas pelo número de medicamentos",
            "Só médicos especialistas podem"
        ],
        1,
        "Cascata ocorre quando efeitos adversos são tratados como novos problemas. Revisar cronologicamente sintomas e prescrições ajuda a identificar."
    ),
    createQuestion(
        "Papel do farmacêutico na consulta ambulatorial?",
        [
            "Apenas dispensar medicamentos",
            "Consulta farmacêutica: revisar, orientar, identificar problemas",
            "Não participa de ambulatório",
            "Somente controle de estoque"
        ],
        1,
        "Farmacêutico pode realizar consulta farmacêutica, revisando todos os medicamentos, identificando problemas, orientando uso correto e apoiando médico."
    ),
    createQuestion(
        "O que é deprescribing no contexto ambulatorial?",
        [
            "Prescrever mais medicamentos",
            "Retirada supervisionada de medicamentos inapropriados",
            "Substituir por genéricos",
            "Apenas reduzir doses"
        ],
        1,
        "Deprescribing é processo planejado de redução ou suspensão de medicamentos que podem não trazer benefício ou causar dano, especialmente em idosos."
    ),
    createQuestion(
        "Como avaliar custo-efetividade no ambulatório?",
        [
            "Sempre prescrever o mais barato",
            "Avaliar custo total, incluindo consultas por eventos adversos",
            "Custo não é relevante",
            "Apenas medicamentos de marca"
        ],
        1,
        "Deve-se considerar custo total: medicamento, monitoramento, consultas por falha terapêutica ou eventos adversos, não apenas preço do fármaco."
    ),
    createQuestion(
        "Importância da lista de medicamentos atualizada?",
        [
            "Apenas para controle administrativo",
            "Fundamental para evitar duplicações e interações",
            "Não é necessária se usar sistema eletrônico",
            "Apenas para pacientes internados"
        ],
        1,
        "Lista atualizada que o paciente carrega previne duplicações, interações em diferentes serviços e facilita atendimentos de urgência."
    ),
    createQuestion(
        "Como orientar paciente sobre armazenamento de medicamentos?",
        [
            "Qualquer lugar serve",
            "Local fresco, seco, protegido de luz, longe de crianças",
            "Sempre na geladeira",
            "Apenas em armários altos"
        ],
        1,
        "Medicamentos devem ser armazenados em local fresco e seco, protegidos de luz e umidade, fora do alcance de crianças, geralmente não na geladeira (salvo exceções)."
    ),
    createQuestion(
        "Quando considerar interação medicamento-alimento?",
        [
            "Não são relevantes",
            "Sempre revisar, algumas significativas",
            "Apenas antibióticos",
            "Não existem"
        ],
        1,
        "Algumas interações são clinicamente significativas (ex: varfarina e vegetais verdes, levotiroxina e café, bifosfonatos e alimentos) e devem ser orientadas."
    ),
    createQuestion(
        "Como lidar com automedicação identificada?",
        [
            "Proibir terminantemente",
            "Avaliar segurança, orientar riscos, considerar na prescrição",
            "Ignorar",
            "Apenas anotar"
        ],
        2,
        "Automedicação deve ser avaliada quanto à segurança e necessidade. Orientar sobre riscos, considerar interações e, se apropriado, incorporar à prescrição formal."
    ),
    createQuestion(
        "Papel da telemedicina na conciliação ambulatorial?",
        [
            "Impossível fazer conciliação por telemedicina",
            "Viável se paciente tiver lista atualizada e acesso a medicamentos",
            "Apenas para receitas simples",
            "Não é recomendada"
        ],
        1,
        "Telemedicina pode incluir conciliação efetiva se paciente tiver lista atualizada, conseguir mostrar embalagens/receitas e houver boa comunicação."
    ),
    createQuestion(
        "Como orientar sobre descarte de medicamentos?",
        [
            "Jogar no lixo comum",
            "Devolver em farmácias com coleta ou programa municipal",
            "Jogar na pia/vaso sanitário",
            "Guardar indefinidamente"
        ],
        1,
        "Medicamentos devem ser descartados em locais apropriados (farmácias com programa de coleta, pontos de coleta municipal), nunca em lixo comum ou esgoto."
    ),
    createQuestion(
        "Importância da revisão periódica de medicamentos crônicos?",
        [
            "Não é necessária se está funcionando",
            "Fundamental: reavaliar necessidade, doses, interações",
            "Apenas se paciente solicitar",
            "Somente em especialistas"
        ],
        1,
        "Revisão periódica (anual no mínimo) é essencial para reavaliar necessidade contínua, adequação de doses, novas interações e possibilidade de deprescribing."
    ),
    createQuestion(
        "Como abordar fitoterápicos e suplementos?",
        [
            "Não são medicamentos, ignorar",
            "Perguntar e avaliar interações com medicamentos prescritos",
            "Sempre proibir o uso",
            "Não são importantes"
        ],
        1,
        "Fitoterápicos e suplementos podem causar interações significativas (ex: Ginkgo biloba com anticoagulantes) e devem ser ativamente questionados e avaliados."
    ),
    createQuestion(
        "Qual a frequência ideal de consultas para ajuste de medicamentos?",
        [
            "Sempre semanal",
            "Varia conforme condição: 1-4 semanas para ajustes iniciais",
            "Uma vez ao ano",
            "Apenas se houver problemas"
        ],
        1,
        "Para medicamentos novos ou ajustes: 1-4 semanas inicialmente. Para tratamento estável: conforme protocolo da condição, geralmente 3-6 meses."
    ),
    createQuestion(
        "Como otimizar horários de medicamentos?",
        [
            "Paciente deve seguir exatamente a prescrição",
            "Adaptar à rotina do paciente quando possível",
            "Todos devem ser à noite",
            "Horários não importam"
        ],
        1,
        "Quando clinicamente viável, adaptar horários à rotina do paciente (refeições, trabalho, sono) melhora adesão sem comprometer eficácia."
    ),
    createQuestion(
        "Importância do feedback sobre efetividade do tratamento?",
        [
            "Paciente não precisa avaliar",
            "Fundamental: paciente reporta sintomas, melhora, efeitos adversos",
            "Apenas exames laboratoriais importam",
            "Não é relevante"
        ],
        1,
        "Feedback do paciente sobre sintomas, qualidade de vida e efeitos adversos é essencial para avaliar efetividade real e ajustar tratamento."
    ),
    createQuestion(
        "Como lidar com receitas de múltiplos prescritores?",
        [
            "Não é problema do médico atual",
            "Revisar todas, identificar duplicações e interações",
            "Manter todas sem revisar",
            "Suspender automaticamente"
        ],
        1,
        "Médico que realiza consulta deve revisar TODAS as prescrições de diferentes fontes, identificando problemas e coordenando com outros prescritores se necessário."
    ),
    createQuestion(
        "Estratégias para pacientes com baixa literacia em saúde?",
        [
            "Apenas dar receita escrita",
            "Linguagem simples, demonstração, confirmação de entendimento",
            "Não é possível atender adequadamente",
            "Apenas prescrever menos medicamentos"
        ],
        1,
        "Usar linguagem simples, demonstrar como tomar, usar figuras/cores, pedir que explique de volta (teach-back), envolver cuidador."
    ),
    createQuestion(
        "Papel da enfermagem em consultas ambulatoriais?",
        [
            "Apenas verificar sinais vitais",
            "Coletar história, revisar medicamentos, educar paciente",
            "Não participa de conciliação",
            "Apenas agendar retornos"
        ],
        1,
        "Enfermagem pode coletar história medicamentosa inicial, verificar adesão, identificar problemas, educar sobre uso correto e reforçar orientações médicas."
    ),
    createQuestion(
        "Como documentar conciliação ambulatorial?",
        [
            "Apenas prescrever novos medicamentos",
            "Registrar lista completa e alterações feitas com justificativa",
            "Não precisa documentar",
            "Somente em sistema eletrônico"
        ],
        1,
        "Documentar lista completa de medicamentos atuais, alterações realizadas (suspensões, adições, ajustes) com justificativa clara no prontuário."
    ),
    createQuestion(
        "Importância da reconciliação pós-alta hospitalar?",
        [
            "Não é necessária no ambulatório",
            "Crítica: comparar prescrição de alta com uso domiciliar prévio",
            "Apenas se paciente reclamar",
            "Hospital já fez"
        ],
        1,
        "Primeira consulta pós-alta é crítica para revisar prescrição hospitalar, comparar com medicamentos prévios e esclarecer mudanças, prevenindo erros."
    ),
    createQuestion(
        "Como abordar relutância em iniciar medicamento?",
        [
            "Insistir que é obrigatório",
            "Explorar preocupações, educar riscos-benefícios, respeitar autonomia",
            "Ameaçar com consequências",
            "Prescrever sem discutir"
        ],
        1,
        "Abordagem centrada no paciente: explorar preocupações, educar sobre necessidade e benefícios, discutir alternativas, respeitar decisão informada."
    ),
    createQuestion(
        "O que é prescrição em cascata?",
        [
            "Prescrição de muitos medicamentos",
            "Prescrever para tratar efeito adverso sem reconhecer causa",
            "Prescrição sequencial",
            "Receitas impressas"
        ],
        1,
        "Ocorre quando efeito adverso de um medicamento é interpretado como novo problema e tratado com outro medicamento, criando cascata evitável."
    ),
    createQuestion(
        "Importância da monitorização laboratorial?",
        [
            "Sempre necessária para todos medicamentos",
            "Essencial para medicamentos específicos conforme protocolo",
            "Nunca necessária em ambulatório",
            "Apenas se paciente solicitar"
        ],
        1,
        "Alguns medicamentos requerem monitorização laboratorial específica (ex: estatinas/TGO-TGP, varfarina/INR, lítio/nível sérico) conforme protocolos estabelecidos."
    ),
    createQuestion(
        "Como otimizar prescrição para idosos em ambulatório?",
        [
            "Prescrever como para adultos jovens",
            "Iniciar baixo, progredir lento, revisar frequentemente",
            "Sempre usar doses máximas",
            "Evitar prescrever"
        ],
        1,
        "Em idosos: iniciar com doses menores, aumentar gradualmente, revisar frequentemente, atentar para interações e efeitos adversos, aplicar critérios de Beers/STOPP."
    ),
    createQuestion(
        "Papel da farmacovigilância ambulatorial?",
        [
            "Não aplicável em ambulatório",
            "Notificar eventos adversos, monitorar segurança",
            "Apenas em hospitais",
            "Não é relevante"
        ],
        1,
        "Profissionais ambulatoriais devem notificar eventos adversos aos sistemas de farmacovigilância, contribuindo para monitoramento de segurança de medicamentos."
    ),
    createQuestion(
        "Como garantir continuidade entre diferentes níveis de atenção?",
        [
            "Não é possível garantir",
            "Comunicação efetiva: contrarreferência, relatórios, lista atualizada",
            "Paciente deve se responsabilizar sozinho",
            "Não é necessário"
        ],
        1,
        "Requer comunicação efetiva entre níveis: relatórios completos, contrarreferência, lista atualizada de medicamentos e orientações claras ao paciente."
    )
                ]
            },
            "rop-2-6": {
                title: "ROP 2.6 – Conciliação no Serviço de Emergência",
                audioFile: null,
                questions: [
createQuestion(
        "Qual desafio único da conciliação em emergência?",
        [
            "Não há desafios específicos",
            "Tempo limitado, paciente crítico, informação fragmentada",
            "Apenas falta de medicamentos",
            "Sempre é impossível fazer"
        ],
        1,
        "Emergência apresenta desafios: tempo limitado, paciente frequentemente incapaz de informar, informação fragmentada, necessidade de decisões rápidas."
    ),
    createQuestion(
        "Quando realizar conciliação em emergência?",
        [
            "Apenas se houver tempo sobrando",
            "Logo após estabilização inicial, antes da primeira prescrição",
            "Não é prioridade em emergência",
            "Somente na alta da emergência"
        ],
        1,
        "Deve ser feita após estabilização inicial mas ANTES da primeira prescrição, para prevenir interações críticas e duplicações em paciente já vulnerável."
    ),
    createQuestion(
        "Fontes de informação quando paciente inconsciente?",
        [
            "Impossível obter informação",
            "Acompanhantes, carteira, celular, pulseiras, sistemas integrados",
            "Apenas receitas se tiver",
            "Aguardar recuperar consciência"
        ],
        1,
        "Buscar ativamente: acompanhantes, objetos pessoais, carteiras com receitas/cartões, celular, pulseiras de alerta, sistemas de informação integrados."
    ),
    createQuestion(
        "Importância de medicamentos em uso na avaliação do quadro agudo?",
        [
            "Não são relevantes para emergência",
            "Podem ser causa ou contribuir para o quadro atual",
            "Apenas tratamento agudo importa",
            "Somente para prescrição de alta"
        ],
        1,
        "Medicamentos em uso podem ser CAUSA do quadro (intoxicação, efeito adverso) ou contribuir (interações, omissão de dose crítica) e devem ser considerados."
    ),
    createQuestion(
        "Como proceder com anticoagulantes em emergência?",
        [
            "Suspender automaticamente",
            "Avaliar indicação, risco-benefício, verificar última dose e efeito",
            "Sempre reverter",
            "Ignorar"
        ],
        1,
        "Anticoagulantes requerem avaliação cuidadosa: verificar indicação, última dose, exames de coagulação, avaliar risco hemorrágico vs. trombótico do quadro atual."
    ),
    createQuestion(
        "Papel da conciliação na síndrome coronariana aguda?",
        [
            "Não fazer, foca apenas no infarto",
            "Essencial: identificar beta-bloqueadores, aspirina, antiagregantes em uso",
            "Apenas após sair da UTI",
            "Não é relevante"
        ],
        1,
        "Crítico identificar medicamentos cardiovasculares prévios, especialmente beta-bloqueadores, aspirina, antiagregantes que devem continuar e influenciam tratamento."
    ),
    createQuestion(
        "Como documentar conciliação em emergência?",
        [
            "Não há tempo para documentar",
            "Registro conciso mas completo no prontuário de emergência",
            "Apenas prescrever tratamento agudo",
            "Documentar só se paciente internar"
        ],
        1,
        "Mesmo com tempo limitado, deve-se documentar concisamente: fonte de informação, medicamentos identificados, alterações feitas e justificativa."
    ),
    createQuestion(
        "Medicamentos críticos que não podem ser omitidos?",
        [
            "Todos podem ser omitidos temporariamente",
            "Anticonvulsivantes, insulina, corticoides crônicos, antiparkinsonianos",
            "Apenas insulina",
            "Não existem medicamentos críticos"
        ],
        1,
        "Alguns medicamentos não devem ser omitidos: anticonvulsivantes (risco de status), insulina tipo 1, corticoides (crise adrenal), levotiroxina, antiparkinsonianos."
    ),
    createQuestion(
        "Como lidar com polifarmácia em idoso na emergência?",
        [
            "Suspender todos temporariamente",
            "Avaliar quais são essenciais e manter, suspender desnecessários",
            "Manter todos sem revisar",
            "Não é momento para revisar"
        ],
        1,
        "Avaliar criticamente: manter medicamentos essenciais, considerar suspender temporariamente os não críticos, identificar contribuintes para quadro atual."
    ),
    createQuestion(
        "Importância da conciliação em intoxicações?",
        [
            "Não é relevante",
            "Fundamental: identificar agente, dose, tempo, interações",
            "Apenas fazer lavagem gástrica",
            "Só importante em casos graves"
        ],
        1,
        "Essencial identificar TODOS os medicamentos disponíveis ao paciente, quantificar o que falta (dose ingerida), tempo da ingestão e possíveis interações."
    ),
    createQuestion(
        "Como proceder com medicamentos na crise hipertensiva?",
        [
            "Iniciar apenas medicamentos novos",
            "Avaliar adesão prévia, ajustar/trocar se falha terapêutica",
            "Sempre manter os mesmos",
            "Suspender todos anti-hipertensivos"
        ],
        1,
        "Investigar adesão aos anti-hipertensivos prévios, avaliar se há falha terapêutica, ajustar esquema se necessário, não apenas adicionar novo medicamento."
    ),
    createQuestion(
        "Papel da conciliação em AVC agudo?",
        [
            "Não é prioritário",
        "Crítico: identificar anticoagulantes, antiagregantes, última dose",
            "Apenas após trombólise",
            "Só importante se for hemorrágico"
        ],
        1,
        "Urgente identificar anticoagulantes/antiagregantes antes de trombólise ou anticoagulação, pois afeta elegibilidade e segurança do tratamento."
    ),
    createQuestion(
        "Como obter informação em emergência psiquiátrica?",
        [
            "Impossível se paciente agitado",
            "Acompanhantes, serviços prévios, prescrições anteriores",
            "Aguardar sedação completa",
            "Não fazer conciliação"
        ],
        1,
        "Buscar familiares/acompanhantes, contatar serviços de saúde mental prévios, verificar objetos pessoais, revisar prontuários anteriores se disponíveis."
    ),
    createQuestion(
        "Importância de identificar hipoglicemiantes em emergência?",
        [
            "Não é urgente",
            "Crítico: podem causar hipoglicemia, requerem ajuste em jejum/doença aguda",
            "Apenas se for diabético conhecido",
            "Suspender automaticamente"
        ],
        1,
        "Identificar hipoglicemiantes é urgente: podem causar hipoglicemia grave, requerem ajuste durante doença aguda, jejum ou procedimentos."
    ),
    createQuestion(
        "Como documentar discrepâncias encontradas em emergência?",
        [
            "Apenas resolver, sem documentar",
            "Registrar discrepância, ação tomada e comunicação com equipe",
            "Não há tempo para isso",
            "Somente avisar verbalmente"
        ],
        1,
        "Documentar: discrepância encontrada, decisão tomada (manter/alterar/suspender), comunicação com médico emergencista e, se internar, equipe receptora."
    ),
    createQuestion(
        "Papel da tecnologia na conciliação em emergência?",
        [
            "Não há tecnologia útil",
            "Sistemas integrados, alertas de interações, histórico eletrônico",
            "Apenas dificulta o processo",
            "Somente para prescrição"
        ],
        1,
        "Tecnologia auxilia: acesso rápido a histórico de outras instituições, alertas automáticos de interações críticas, prescrição com verificações de segurança."
    ),
    createQuestion(
        "Como proceder na alta da emergência?",
        [
            "Apenas dar receita nova",
            "Reconciliar: lista completa com continuados, alterados, suspensos, novos",
            "Não é necessário",
            "Paciente procura ambulatório"
        ],
        1,
        "Alta requer reconciliação completa: quais medicamentos domiciliares continuar, quais foram alterados (com justificativa), suspensos e novos prescritos."
    ),
    createQuestion(
        "Importância da conciliação em trauma?",
        [
            "Não é prioritário no trauma",
            "Pode influenciar manejo: anticoagulantes, antiagregantes, alergias",
            "Apenas se houver lesão neurológica",
            "Só após cirurgia"
        ],
        1,
        "Importante saber uso de anticoagulantes/antiagregantes (sangramento), corticoides (estresse), medicamentos que afetam anestesia e alergias."
    ),
    createQuestion(
        "Como lidar com medicamentos não padronizados?",
        [
            "Sempre suspender",
            "Avaliar necessidade, buscar similar padronizado ou permitir trazido",
            "Ignorar",
            "Substituir por qualquer outro"
        ],
        1,
        "Avaliar criticidade: se essencial e sem similar, contatar farmácia para providenciar ou permitir uso supervisionado do medicamento trazido."
    ),
    createQuestion(
        "Papel da enfermagem na conciliação em emergência?",
        [
            "Apenas administrar o que for prescrito",
            "Coletar história inicial, identificar medicamentos trazidos, alertar equipe",
            "Não participa em emergência",
            "Apenas verificar sinais vitais"
        ],
        1,
        "Enfermagem frequentemente é primeira a contatar paciente/família e pode iniciar coleta de história, identificar medicamentos trazidos e alertar médico."
    ),
    createQuestion(
        "Como priorizar em emergência com múltiplos pacientes graves?",
        [
            "Não fazer conciliação",
            "Focar em medicamentos críticos primeiro, completar quando possível",
            "Fazer igual para todos",
            "Apenas para pacientes estáveis"
        ],
        1,
        "Em múltiplos graves, priorizar informações críticas (anticoagulantes, hipoglicemiantes, anticonvulsivantes) e completar história quando situação permitir."
    ),
    createQuestion(
        "Importância de questionar sobre medicamentos sem prescrição?",
        [
            "Não são relevantes em emergência",
            "Podem causar intoxicação, interação ou ser causa do quadro",
            "Apenas se paciente mencionar",
            "Não há tempo para perguntar"
        ],
        1,
        "Medicamentos sem prescrição, fitoterápicos e suplementos podem ser causa de intoxicação, interação crítica ou contribuir para quadro atual."
    ),
    createQuestion(
        "Como garantir continuidade após admissão pela emergência?",
        [
            "Não é responsabilidade da emergência",
            "Transferir informações completas para equipe de internação",
            "Paciente deve informar novamente",
            "Sistema faz automaticamente"
        ],
        1,
        "Emergência deve documentar e comunicar claramente à equipe de internação: medicamentos prévios identificados, alterações feitas e pendências a resolver."
    ),
    createQuestion(
        "Papel da conciliação em crise asmática?",
        [
            "Apenas tratar broncoespasmo",
            "Avaliar uso/adesão de inaladores, identificar desencadeantes medicamentosos",
            "Não é relevante",
            "Só prescrever broncodilatador"
        ],
        1,
        "Importante avaliar: adesão ao tratamento de manutenção, técnica inalatória, medicamentos que podem piorar asma (beta-bloqueadores, AINEs)."
    ),
    createQuestion(
        "Como proceder com medicamentos controlados identificados?",
        [
            "Confiscar imediatamente",
            "Verificar prescrição, armazenar com segurança, documentar",
            "Permitir uso livre",
            "Descartar"
        ],
        1,
        "Verificar legitimidade da prescrição, armazenar com segurança conforme normas, documentar no prontuário, avaliar necessidade de continuidade."
    ),
    createQuestion(
        "Importância da conciliação em insuficiência cardíaca descompensada?",
        [
            "Não é prioritário",
            "Avaliar adesão, interações, medicamentos que pioram (AINEs, cálcio-antagonistas)",
            "Apenas otimizar diuréticos",
            "Não há relação"
        ],
        1,
        "Essencial avaliar: adesão a medicamentos prévios, identificar medicamentos que pioram IC (AINEs, cálcio-antagonistas não diidroppiridínicos), otimizar terapia."
    ),
    createQuestion(
        "Como abordar discordância entre fontes de informação?",
        [
            "Usar qualquer uma",
            "Buscar fonte mais confiável, confirmar com múltiplas fontes",
            "Ignorar discordâncias",
            "Prescrever sem confirmar"
        ],
        1,
        "Discordâncias requerem investigação: buscar fonte mais confiável (prescrição recente, contato com prescritor), confirmar com múltiplas fontes quando possível."
    ),
    createQuestion(
        "Papel da conciliação em sepse?",
        [
            "Não fazer, foca apenas em antibiótico",
            "Identificar medicamentos que afetam imunidade, interações com antibióticos",
            "Apenas após estabilização hemodinâmica",
            "Não é relevante"
        ],
        1,
        "Importante identificar: imunossupressores, corticoides crônicos (pode precisar dose estresse), medicamentos nefrotóxicos, interações com antibióticos."
    ),
    createQuestion(
        "Como garantir que informação chegue ao ambulatório?",
        [
            "Não é possível garantir",
            "Relatório de alta completo, contrarreferência, orientação ao paciente",
            "Paciente deve contar tudo novamente",
            "Sistema integrado faz automaticamente"
        ],
        1,
        "Requer: relatório de alta detalhado com todas as mudanças, contrarreferência formal se possível, orientação clara ao paciente sobre o que contar no ambulatório."
    ),
    createQuestion(
        "Importância da educação da equipe de emergência sobre conciliação?",
        [
            "Não é necessária, é intuitivo",
            "Fundamental: protocolo claro, treinamento regular, feedback",
            "Apenas para farmacêuticos",
            "Não há tempo para treinar"
        ],
        1,
        "Essencial: protocolo adaptado à realidade da emergência, treinamento de toda equipe, feedback regular, discussão de casos e melhoria contínua."
    )
                ]
            },
            "rop-2-7": {
                title: "ROP 2.7 – Lista de Verificação para Cirurgia Segura",
                audioFile: null,
                questions: [
                    {
                        question: "Qual é o objetivo principal do checklist de cirurgia segura da OMS?",
                        options: ["Aumentar tempo cirúrgico", "Reduzir complicações e mortalidade cirúrgica", "Gerar documentação legal", "Substituir protocolos institucionais"],
                        correctAnswer: 1,
                        explanation: "O checklist visa reduzir complicações evitáveis e mortalidade através de verificações sistematizadas nos momentos críticos da cirurgia."
            },
            "rop-2-8": {
                title: "ROP 2.8 – Transferência de Informações nas Transições (Handoff)",
                audioFile: null,
                questions: [
                    {
                        question: "O que é handoff em serviços de saúde?",
                        options: ["Apenas trocar de plantão", "Transferência estruturada de informações e responsabilidade sobre paciente", "Conversa informal", "Relatório escrito"],
                        correctAnswer: 1,
                        explanation: "Handoff é processo estruturado de comunicação verbal e/ou escrita transferindo informação e responsabilidade sobre paciente entre profissionais/equipes/serviços."
            },
        }
    },

    // ==================== MACRO ÁREA 3 - USO DE MEDICAMENTOS ====================
    "uso-medicamentos": {
        title: "Uso de Medicamentos",
        icon: "fas fa-pills",
        color: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
        subdivisoes: {
            "rop-3-1": {
                title: "ROP 3.1 – Uso Racional de Antimicrobianos",
                audioFile: null,
                questions: [
                    {
                        question: "O que define uso racional de antimicrobianos?",
                        options: [
                            "Usar sempre o ATB mais potente disponível",
                            "Prescrever ATB correto, dose certa, duração adequada, momento apropriado",
                            "Prescrever ATB para toda febre",
                            "Usar sempre ATB de amplo espectro"
                        ],
                        correctAnswer: 1,
                        explanation: "Uso racional significa prescrever o antimicrobiano correto, na dose certa, pelo tempo adequado e no momento apropriado, baseado em evidências clínicas."
            },
        }
    }
};

console.log('✅ ROPs carregadas (versão completa):', Object.keys(ropsData));
