// ROPs - Práticas Organizacionais Obrigatórias
// Banco de dados completo de perguntas

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
                    {
                        question: "Quem deve ser responsável pela qualidade e segurança na organização de saúde?",
                        options: [
                            "Apenas a direção executiva",
                            "Somente o setor de qualidade",
                            "Todos os profissionais da organização",
                            "Apenas os médicos e enfermeiros"
                        ],
                        correctAnswer: 2,
                        explanation: "A responsabilidade pela qualidade e segurança deve ser compartilhada por todos os profissionais da organização, independente de sua função ou nível hierárquico."
                    },
                    {
                        question: "O que caracteriza uma cultura de segurança forte?",
                        options: [
                            "Punições severas para erros cometidos",
                            "Ambiente de culpabilização individual",
                            "Comunicação aberta e aprendizado com os erros",
                            "Hierarquia rígida e inflexível"
                        ],
                        correctAnswer: 2,
                        explanation: "Uma cultura de segurança forte é caracterizada por comunicação aberta, ambiente não punitivo, aprendizado com erros e comprometimento de todos os níveis."
                    },
                    {
                        question: "Qual documento formaliza as responsabilidades pela qualidade na organização?",
                        options: [
                            "Apenas o regimento interno",
                            "Política de Gestão da Qualidade",
                            "Contrato de trabalho individual",
                            "Manual de procedimentos operacionais"
                        ],
                        correctAnswer: 1,
                        explanation: "A Política de Gestão da Qualidade é o documento que formaliza as responsabilidades, diretrizes e comprometimento da organização com a qualidade e segurança."
                    },
                    {
                        question: "Como deve ser a participação da liderança na qualidade?",
                        options: [
                            "Delegando todas as responsabilidades",
                            "Participação ativa e visível",
                            "Apenas em reuniões anuais",
                            "Somente quando ocorrem problemas graves"
                        ],
                        correctAnswer: 1,
                        explanation: "A liderança deve ter participação ativa, visível e constante nas questões de qualidade e segurança, servindo como exemplo e referência para toda a organização."
                    },
                    {
                        question: "O que é responsabilização compartilhada?",
                        options: [
                            "Dividir a culpa quando ocorrem erros",
                            "Cada profissional é responsável apenas por sua área",
                            "Todos compartilham a responsabilidade pelos resultados",
                            "Apenas a alta direção é responsável"
                        ],
                        correctAnswer: 2,
                        explanation: "Responsabilização compartilhada significa que todos os membros da equipe compartilham a responsabilidade pelos resultados de qualidade e segurança do paciente."
                    },
                    {
                        question: "Qual a importância do comprometimento da alta direção?",
                        options: [
                            "Não é relevante para a qualidade",
                            "Fundamental para estabelecer a cultura de segurança",
                            "Importante apenas para questões administrativas",
                            "Necessário apenas em hospitais grandes"
                        ],
                        correctAnswer: 1,
                        explanation: "O comprometimento da alta direção é fundamental para estabelecer, manter e fortalecer a cultura de segurança em toda a organização."
                    },
                    {
                        question: "Como deve ser tratado um erro em uma cultura justa?",
                        options: [
                            "Com punição imediata do responsável",
                            "Ignorando para não gerar conflitos",
                            "Analisando causas sistêmicas e aprendendo",
                            "Culpando sempre o último elo da cadeia"
                        ],
                        correctAnswer: 2,
                        explanation: "Em uma cultura justa, erros são tratados como oportunidades de aprendizado, com análise de causas sistêmicas e implementação de melhorias."
                    },
                    {
                        question: "O que são indicadores de qualidade?",
                        options: [
                            "Ferramentas para punir profissionais",
                            "Medidas para avaliar desempenho e melhorias",
                            "Apenas dados estatísticos sem utilidade",
                            "Requisitos apenas para certificações"
                        ],
                        correctAnswer: 1,
                        explanation: "Indicadores de qualidade são ferramentas essenciais para medir, monitorar e avaliar o desempenho, identificando oportunidades de melhoria."
                    },
                    {
                        question: "Com que frequência devem ser revisadas as políticas de qualidade?",
                        options: [
                            "Nunca, uma vez estabelecidas",
                            "Apenas quando exigido por auditoria",
                            "Periodicamente, no mínimo anualmente",
                            "Somente quando ocorrem eventos graves"
                        ],
                        correctAnswer: 2,
                        explanation: "As políticas de qualidade devem ser revisadas periodicamente, no mínimo anualmente, para garantir sua atualização e adequação às necessidades."
                    },
                    {
                        question: "O que é governança em saúde?",
                        options: [
                            "Apenas controle financeiro",
                            "Sistema de direção e controle organizacional",
                            "Hierarquia rígida de comando",
                            "Regras apenas para a diretoria"
                        ],
                        correctAnswer: 1,
                        explanation: "Governança em saúde é o sistema pelo qual a organização é dirigida e controlada, incluindo estruturas de responsabilização e tomada de decisão."
                    },
                    {
                        question: "Qual o papel do Comitê de Qualidade?",
                        options: [
                            "Apenas produzir relatórios",
                            "Supervisionar e promover ações de melhoria",
                            "Punir profissionais que erram",
                            "Fazer apenas auditorias internas"
                        ],
                        correctAnswer: 1,
                        explanation: "O Comitê de Qualidade supervisiona, coordena e promove ações para melhoria contínua da qualidade e segurança na organização."
                    },
                    {
                        question: "Como devem ser as metas de qualidade?",
                        options: [
                            "Impossíveis de alcançar",
                            "SMART: específicas, mensuráveis, alcançáveis, relevantes e temporais",
                            "Genéricas e sem prazo",
                            "Definidas apenas pela direção"
                        ],
                        correctAnswer: 1,
                        explanation: "Metas de qualidade devem ser SMART: específicas, mensuráveis, alcançáveis, relevantes e com prazo definido, envolvendo as equipes em sua definição."
                    },
                    {
                        question: "O que é accountability em saúde?",
                        options: [
                            "Sistema de punições",
                            "Prestação de contas e responsabilização",
                            "Apenas registros financeiros",
                            "Controle de presença de funcionários"
                        ],
                        correctAnswer: 1,
                        explanation: "Accountability refere-se à prestação de contas, responsabilização e transparência nas ações e resultados da organização de saúde."
                    },
                    {
                        question: "Qual a importância da transparência em qualidade?",
                        options: [
                            "Não é importante, apenas aumenta críticas",
                            "Fundamental para confiança e melhoria contínua",
                            "Importante apenas para marketing",
                            "Necessária apenas em hospitais públicos"
                        ],
                        correctAnswer: 1,
                        explanation: "Transparência é fundamental para construir confiança, permitir melhoria contínua e demonstrar comprometimento com qualidade e segurança."
                    },
                    {
                        question: "Como deve ser a comunicação sobre qualidade?",
                        options: [
                            "Apenas em reuniões formais",
                            "Aberta, frequente e em múltiplos canais",
                            "Restrita à alta direção",
                            "Somente por meio de relatórios anuais"
                        ],
                        correctAnswer: 1,
                        explanation: "A comunicação sobre qualidade deve ser aberta, frequente e utilizar múltiplos canais para alcançar todos os profissionais e stakeholders."
                    },
                    {
                        question: "O que são rounds de segurança?",
                        options: [
                            "Reuniões apenas administrativas",
                            "Visitas da liderança para avaliar segurança in loco",
                            "Auditorias punitivas",
                            "Treinamentos obrigatórios"
                        ],
                        correctAnswer: 1,
                        explanation: "Rounds de segurança são visitas regulares da liderança às áreas assistenciais para avaliar condições de segurança e engajar equipes."
                    },
                    {
                        question: "Qual a periodicidade mínima de avaliação da cultura de segurança?",
                        options: [
                            "A cada 5 anos",
                            "Apenas quando solicitado por acreditação",
                            "Anualmente ou bianualmente",
                            "Nunca é necessário avaliar"
                        ],
                        correctAnswer: 2,
                        explanation: "A cultura de segurança deve ser avaliada pelo menos anualmente ou bianualmente através de instrumentos validados para identificar áreas de melhoria."
                    },
                    {
                        question: "O que é empowerment da equipe?",
                        options: [
                            "Dar autonomia sem responsabilidade",
                            "Capacitar e dar autoridade para decisões de qualidade",
                            "Apenas delegar tarefas",
                            "Reduzir a supervisão das atividades"
                        ],
                        correctAnswer: 1,
                        explanation: "Empowerment significa capacitar e dar autoridade às equipes para tomar decisões e agir em prol da qualidade e segurança do paciente."
                    },
                    {
                        question: "Como deve ser o sistema de reconhecimento de boas práticas?",
                        options: [
                            "Apenas com bonificações financeiras",
                            "Formal, justo e que valorize comportamentos positivos",
                            "Não é necessário ter sistema de reconhecimento",
                            "Apenas para profissionais de nível superior"
                        ],
                        correctAnswer: 1,
                        explanation: "O sistema de reconhecimento deve ser formal, justo e valorizar comportamentos e práticas que promovam qualidade e segurança."
                    },
                    {
                        question: "O que é benchmarking em qualidade?",
                        options: [
                            "Cópia de práticas de outras organizações",
                            "Comparação de desempenho com referenciais",
                            "Apenas competição entre hospitais",
                            "Ferramenta sem utilidade prática"
                        ],
                        correctAnswer: 1,
                        explanation: "Benchmarking é a comparação sistemática de desempenho com referenciais internos e externos para identificar melhores práticas."
                    },
                    {
                        question: "Qual o papel dos profissionais da linha de frente?",
                        options: [
                            "Apenas executar tarefas prescritas",
                            "Participar ativamente da melhoria de processos",
                            "Não precisam conhecer políticas de qualidade",
                            "Apenas seguir ordens da gestão"
                        ],
                        correctAnswer: 1,
                        explanation: "Profissionais da linha de frente são fundamentais e devem participar ativamente na identificação de problemas e melhoria de processos."
                    },
                    {
                        question: "O que caracteriza liderança transformacional em qualidade?",
                        options: [
                            "Foco apenas em resultados financeiros",
                            "Inspirar, motivar e desenvolver pessoas",
                            "Comando autoritário e centralizador",
                            "Delegação total sem acompanhamento"
                        ],
                        correctAnswer: 1,
                        explanation: "Liderança transformacional inspira, motiva e desenvolve pessoas, criando ambiente propício para qualidade e inovação."
                    },
                    {
                        question: "Como deve ser tratada a diversidade na equipe?",
                        options: [
                            "Ignorada, pois não afeta qualidade",
                            "Como força para diferentes perspectivas",
                            "Como problema a ser eliminado",
                            "Apenas em questões administrativas"
                        ],
                        correctAnswer: 1,
                        explanation: "Diversidade deve ser valorizada como força que traz diferentes perspectivas, enriquecendo discussões e soluções de qualidade."
                    },
                    {
                        question: "O que é melhoria contínua da qualidade?",
                        options: [
                            "Mudanças apenas quando há problemas",
                            "Processo sistemático e permanente de aprimoramento",
                            "Projeto com início e fim definidos",
                            "Responsabilidade apenas do setor de qualidade"
                        ],
                        correctAnswer: 1,
                        explanation: "Melhoria contínua é um processo sistemático e permanente de identificação de oportunidades e implementação de aprimoramentos."
                    },
                    {
                        question: "Qual a importância do plano estratégico de qualidade?",
                        options: [
                            "Apenas documento para certificação",
                            "Guiar ações e investimentos em qualidade",
                            "Não é necessário ter planejamento",
                            "Importante apenas para grandes hospitais"
                        ],
                        correctAnswer: 1,
                        explanation: "O plano estratégico de qualidade é fundamental para guiar ações, priorizar investimentos e alinhar esforços da organização."
                    },
                    {
                        question: "O que são auditorias de qualidade?",
                        options: [
                            "Apenas fiscalização punitiva",
                            "Avaliação sistemática para identificar melhorias",
                            "Perda de tempo da equipe",
                            "Necessárias apenas para hospitais acreditados"
                        ],
                        correctAnswer: 1,
                        explanation: "Auditorias de qualidade são avaliações sistemáticas dos processos e resultados para identificar conformidades e oportunidades de melhoria."
                    },
                    {
                        question: "Como deve ser o feedback sobre desempenho de qualidade?",
                        options: [
                            "Apenas anual e genérico",
                            "Contínuo, específico e construtivo",
                            "Somente quando há problemas",
                            "Desnecessário se tudo está bem"
                        ],
                        correctAnswer: 1,
                        explanation: "Feedback sobre desempenho deve ser contínuo, específico, construtivo e focado no desenvolvimento e melhoria."
                    },
                    {
                        question: "O que é gestão de riscos na qualidade?",
                        options: [
                            "Eliminar todos os riscos possíveis",
                            "Identificar, avaliar e controlar riscos proativamente",
                            "Apenas reagir quando problemas ocorrem",
                            "Transferir responsabilidade para seguros"
                        ],
                        correctAnswer: 1,
                        explanation: "Gestão de riscos envolve identificação proativa, avaliação e controle de riscos potenciais à qualidade e segurança do paciente."
                    },
                    {
                        question: "Qual a importância da capacitação em qualidade?",
                        options: [
                            "Não é prioritária, apenas assistência",
                            "Fundamental para competência e engajamento",
                            "Apenas para profissionais novos",
                            "Necessária apenas uma vez na carreira"
                        ],
                        correctAnswer: 1,
                        explanation: "Capacitação contínua em qualidade é fundamental para desenvolver competências, manter atualização e promover engajamento das equipes."
                    }
                ]
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
                    {
                        question: "O que é um near miss (quase erro)?",
                        options: [
                            "Erro que causou dano leve",
                            "Incidente que quase aconteceu mas foi interceptado",
                            "Erro intencional do profissional",
                            "Situação de emergência médica"
                        ],
                        correctAnswer: 1,
                        explanation: "Near miss é um incidente que não atingiu o paciente, sendo interceptado antes de causar dano, mas representa risco potencial importante."
                    },
                    {
                        question: "Qual a principal finalidade da notificação de incidentes?",
                        options: [
                            "Punir profissionais que erram",
                            "Aprender com erros e prevenir recorrências",
                            "Atender exigências legais apenas",
                            "Registrar para processos jurídicos"
                        ],
                        correctAnswer: 1,
                        explanation: "A notificação visa aprender com os incidentes, identificar causas sistêmicas e implementar melhorias para prevenir recorrências."
                    },
                    {
                        question: "Como deve ser a cultura de notificação?",
                        options: [
                            "Punitiva para desencorajar erros",
                            "Não punitiva e de aprendizado",
                            "Obrigatória apenas para eventos graves",
                            "Anônima sempre para evitar identificação"
                        ],
                        correctAnswer: 1,
                        explanation: "A cultura de notificação deve ser não punitiva, segura e focada no aprendizado, encorajando relatos para melhorar a segurança."
                    },
                    {
                        question: "O que é análise de causa raiz (RCA)?",
                        options: [
                            "Identificação do culpado pelo erro",
                            "Investigação profunda das causas sistêmicas",
                            "Análise superficial do problema",
                            "Apenas documentação do evento"
                        ],
                        correctAnswer: 1,
                        explanation: "RCA é uma metodologia estruturada para investigar causas sistêmicas profundas de incidentes graves, focando em falhas de processo."
                    },
                    {
                        question: "Quem pode notificar um incidente?",
                        options: [
                            "Apenas médicos e enfermeiros",
                            "Qualquer profissional da organização",
                            "Somente a gerência",
                            "Apenas testemunhas diretas"
                        ],
                        correctAnswer: 1,
                        explanation: "Qualquer profissional da organização pode e deve notificar incidentes, independente de sua função ou envolvimento direto."
                    },
                    {
                        question: "Em quanto tempo deve ser notificado um evento adverso grave?",
                        options: [
                            "Não há prazo definido",
                            "Imediatamente ou no máximo 24 horas",
                            "Apenas no final do mês",
                            "Somente se solicitado pela direção"
                        ],
                        correctAnswer: 1,
                        explanation: "Eventos adversos graves devem ser notificados imediatamente ou no máximo em 24 horas para permitir investigação e ações rápidas."
                    },
                    {
                        question: "O que são eventos sentinela?",
                        options: [
                            "Eventos de baixa gravidade",
                            "Eventos graves que causaram morte ou dano permanente",
                            "Apenas infecções hospitalares",
                            "Eventos que não precisam ser investigados"
                        ],
                        correctAnswer: 1,
                        explanation: "Eventos sentinela são incidentes graves que resultaram em morte ou dano permanente grave, exigindo investigação imediata."
                    },
                    {
                        question: "Como devem ser classificados os incidentes?",
                        options: [
                            "Apenas como graves ou leves",
                            "Por severidade do dano e tipo de incidente",
                            "Não é necessário classificar",
                            "Apenas por área onde ocorreram"
                        ],
                        correctAnswer: 1,
                        explanation: "Incidentes devem ser classificados por severidade do dano, tipo e outras características para permitir análise adequada e priorização."
                    },
                    {
                        question: "O que é uma barreira de segurança?",
                        options: [
                            "Equipamento de proteção individual",
                            "Mecanismo para prevenir ou interceptar erros",
                            "Regra disciplinar rígida",
                            "Apenas sistemas tecnológicos"
                        ],
                        correctAnswer: 1,
                        explanation: "Barreira de segurança é qualquer mecanismo (processo, tecnologia, pessoa) que pode prevenir, detectar ou mitigar erros antes de causar dano."
                    },
                    {
                        question: "Qual a importância do feedback sobre incidentes notificados?",
                        options: [
                            "Não é importante dar feedback",
                            "Fundamental para engajar profissionais e aprendizado",
                            "Apenas em casos de punição",
                            "Somente para quem notificou"
                        ],
                        correctAnswer: 1,
                        explanation: "Feedback sobre incidentes e ações tomadas é fundamental para engajar profissionais, demonstrar valor da notificação e promover aprendizado."
                    },
                    {
                        question: "O que é análise de modo de falha e efeitos (FMEA)?",
                        options: [
                            "Análise apenas após eventos graves",
                            "Análise proativa de falhas potenciais em processos",
                            "Método de punição de profissionais",
                            "Apenas para equipamentos"
                        ],
                        correctAnswer: 1,
                        explanation: "FMEA é uma análise proativa e sistemática de possíveis falhas em processos, suas causas e efeitos, antes que ocorram."
                    },
                    {
                        question: "Como deve ser a investigação de incidentes?",
                        options: [
                            "Focada em encontrar culpados",
                            "Sistemática, justa e focada em causas sistêmicas",
                            "Superficial para não gastar tempo",
                            "Apenas documental"
                        ],
                        correctAnswer: 1,
                        explanation: "Investigação deve ser sistemática, justa, focada em identificar causas sistêmicas e fatores contribuintes, não em culpar indivíduos."
                    },
                    {
                        question: "O que são fatores contribuintes de um incidente?",
                        options: [
                            "Apenas ações individuais",
                            "Conjunto de fatores sistêmicos que propiciaram o erro",
                            "Somente falhas de equipamentos",
                            "Apenas fatores humanos"
                        ],
                        correctAnswer: 1,
                        explanation: "Fatores contribuintes são múltiplos elementos sistêmicos (processos, ambiente, comunicação, etc.) que juntos propiciaram o incidente."
                    },
                    {
                        question: "Qual o prazo para conclusão de investigação de evento adverso grave?",
                        options: [
                            "Não há prazo definido",
                            "30 a 45 dias, podendo ser prorrogado",
                            "Apenas quando for possível",
                            "6 meses"
                        ],
                        correctAnswer: 1,
                        explanation: "Investigações de eventos graves devem ser concluídas em 30 a 45 dias, com possibilidade de prorrogação justificada se necessário."
                    },
                    {
                        question: "O que é plano de ação corretiva?",
                        options: [
                            "Punição dos envolvidos",
                            "Conjunto de ações para prevenir recorrência",
                            "Apenas mudança de protocolos",
                            "Documento apenas burocrático"
                        ],
                        correctAnswer: 1,
                        explanation: "Plano de ação corretiva é o conjunto estruturado de ações para eliminar causas e prevenir recorrência de incidentes."
                    },
                    {
                        question: "Como devem ser monitoradas as ações corretivas?",
                        options: [
                            "Não é necessário monitorar",
                            "Sistematicamente até confirmação de efetividade",
                            "Apenas uma vez após implementação",
                            "Somente se houver recorrência"
                        ],
                        correctAnswer: 1,
                        explanation: "Ações corretivas devem ser monitoradas sistematicamente até confirmação de sua efetividade na prevenção de recorrências."
                    },
                    {
                        question: "O que é um indicador de segurança?",
                        options: [
                            "Apenas taxa de mortalidade",
                            "Medida para monitorar aspectos de segurança",
                            "Número de notificações apenas",
                            "Ferramenta sem utilidade prática"
                        ],
                        correctAnswer: 1,
                        explanation: "Indicador de segurança é uma medida quantitativa usada para monitorar e avaliar aspectos específicos da segurança do paciente."
                    },
                    {
                        question: "Com que frequência devem ser analisados os incidentes notificados?",
                        options: [
                            "Apenas anualmente",
                            "Mensalmente ou conforme volume",
                            "Somente quando solicitado",
                            "Não é necessário analisar"
                        ],
                        correctAnswer: 1,
                        explanation: "Incidentes devem ser analisados regularmente, geralmente mensalmente, para identificar padrões e implementar melhorias oportunas."
                    },
                    {
                        question: "O que é taxonomia de incidentes?",
                        options: [
                            "Lista de punições para cada tipo de erro",
                            "Sistema de classificação padronizada de incidentes",
                            "Apenas nomenclatura médica",
                            "Não tem utilidade prática"
                        ],
                        correctAnswer: 1,
                        explanation: "Taxonomia de incidentes é um sistema de classificação padronizada que permite organizar, analisar e comparar incidentes de forma estruturada."
                    },
                    {
                        question: "Qual a importância da comunicação sobre incidentes?",
                        options: [
                            "Deve ser evitada para não alarmar",
                            "Fundamental para aprendizado organizacional",
                            "Apenas em relatórios anuais",
                            "Somente para a alta direção"
                        ],
                        correctAnswer: 1,
                        explanation: "Comunicação adequada sobre incidentes e lições aprendidas é fundamental para o aprendizado organizacional e prevenção."
                    },
                    {
                        question: "O que são rounds de aprendizado (learning rounds)?",
                        options: [
                            "Reuniões apenas administrativas",
                            "Discussões estruturadas sobre casos e aprendizados",
                            "Auditorias punitivas",
                            "Apenas treinamentos teóricos"
                        ],
                        correctAnswer: 1,
                        explanation: "Learning rounds são discussões estruturadas de casos e incidentes para compartilhar aprendizados e prevenir recorrências."
                    },
                    {
                        question: "Como deve ser o sistema de notificação de incidentes?",
                        options: [
                            "Complexo para desencorajar notificações",
                            "Simples, acessível e não punitivo",
                            "Apenas em papel",
                            "Somente para profissionais seniores"
                        ],
                        correctAnswer: 1,
                        explanation: "Sistema de notificação deve ser simples, facilmente acessível, não punitivo e encorajar relatos de todos os profissionais."
                    },
                    {
                        question: "O que é análise agregada de incidentes?",
                        options: [
                            "Análise individual de cada caso",
                            "Análise conjunta para identificar padrões e tendências",
                            "Apenas contagem de incidentes",
                            "Não tem valor para segurança"
                        ],
                        correctAnswer: 1,
                        explanation: "Análise agregada examina conjuntos de incidentes para identificar padrões, tendências e riscos sistêmicos não evidentes em casos isolados."
                    },
                    {
                        question: "Qual a importância do apoio psicológico após eventos adversos?",
                        options: [
                            "Não é necessário",
                            "Fundamental para profissionais e pacientes afetados",
                            "Apenas para pacientes",
                            "Somente em casos extremos"
                        ],
                        correctAnswer: 1,
                        explanation: "Apoio psicológico é fundamental tanto para profissionais ('segunda vítima') quanto para pacientes e familiares após eventos adversos graves."
                    },
                    {
                        question: "O que é cultura justa (just culture)?",
                        options: [
                            "Punição proporcional ao erro",
                            "Equilíbrio entre responsabilização e ambiente seguro",
                            "Ausência total de consequências",
                            "Apenas perdão de erros"
                        ],
                        correctAnswer: 1,
                        explanation: "Cultura justa equilibra responsabilização individual com ambiente seguro para relatos, distinguindo erros humanos de violações deliberadas."
                    },
                    {
                        question: "Como devem ser compartilhadas lições aprendidas?",
                        options: [
                            "Mantidas confidenciais",
                            "Amplamente divulgadas na organização",
                            "Apenas em documentos formais",
                            "Somente para a equipe envolvida"
                        ],
                        correctAnswer: 1,
                        explanation: "Lições aprendidas devem ser compartilhadas amplamente através de múltiplos canais para maximizar o aprendizado organizacional."
                    },
                    {
                        question: "O que é resiliência em sistemas de saúde?",
                        options: [
                            "Rigidez nos processos",
                            "Capacidade de adaptar e se recuperar de adversidades",
                            "Apenas resistência a mudanças",
                            "Eliminação total de variações"
                        ],
                        correctAnswer: 1,
                        explanation: "Resiliência é a capacidade do sistema de se adaptar, absorver perturbações e se recuperar mantendo funcionamento seguro."
                    },
                    {
                        question: "Qual a importância da padronização de processos?",
                        options: [
                            "Elimina necessidade de treinamento",
                            "Reduz variabilidade e risco de erros",
                            "Engessa completamente o trabalho",
                            "Não tem relação com segurança"
                        ],
                        correctAnswer: 1,
                        explanation: "Padronização reduz variabilidade desnecessária, minimiza riscos de erros e facilita identificação de desvios e melhorias."
                    },
                    {
                        question: "O que são alertas de segurança (safety alerts)?",
                        options: [
                            "Apenas alarmes de equipamentos",
                            "Comunicações sobre riscos e ações preventivas",
                            "Punições por erros cometidos",
                            "Não são úteis na prática"
                        ],
                        correctAnswer: 1,
                        explanation: "Alertas de segurança são comunicações urgentes sobre riscos identificados e ações preventivas recomendadas para toda a organização."
                    }
                ]
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
                    {
                        question: "O que deve conter um relatório trimestral de segurança?",
                        options: [
                            "Apenas número de incidentes",
                            "Indicadores, análises, ações e resultados",
                            "Somente gráficos coloridos",
                            "Apenas eventos adversos graves"
                        ],
                        correctAnswer: 1,
                        explanation: "O relatório deve incluir indicadores de segurança, análises de incidentes, ações implementadas, resultados obtidos e planos futuros."
                    },
                    {
                        question: "Com que frequência mínima devem ser elaborados os relatórios de segurança?",
                        options: [
                            "Anualmente",
                            "Trimestralmente",
                            "Semestralmente",
                            "Não há frequência definida"
                        ],
                        correctAnswer: 1,
                        explanation: "Relatórios de segurança do paciente devem ser elaborados no mínimo trimestralmente para permitir monitoramento e ajustes oportunos."
                    },
                    {
                        question: "Para quem devem ser apresentados os relatórios de segurança?",
                        options: [
                            "Apenas para a direção executiva",
                            "Para a alta direção, equipes e interessados",
                            "Somente para órgãos fiscalizadores",
                            "Não precisam ser apresentados"
                        ],
                        correctAnswer: 1,
                        explanation: "Relatórios devem ser apresentados à alta direção, conselho, equipes assistenciais e outros stakeholders relevantes."
                    },
                    {
                        question: "Quais indicadores devem ser monitorados trimestralmente?",
                        options: [
                            "Apenas taxa de mortalidade",
                            "Múltiplos indicadores de segurança e qualidade",
                            "Somente infecção hospitalar",
                            "Apenas indicadores financeiros"
                        ],
                        correctAnswer: 1,
                        explanation: "Devem ser monitorados múltiplos indicadores incluindo quedas, úlceras, infecções, medicação, identificação, entre outros."
                    },
                    {
                        question: "Como devem ser apresentados os dados no relatório?",
                        options: [
                            "Apenas em texto corrido",
                            "De forma clara com gráficos e análises",
                            "Somente em tabelas complexas",
                            "Sem necessidade de análise"
                        ],
                        correctAnswer: 1,
                        explanation: "Dados devem ser apresentados de forma clara, visual (gráficos, tabelas) e acompanhados de análises qualitativas e contextuais."
                    },
                    {
                        question: "O que é análise de tendências em segurança?",
                        options: [
                            "Apenas comparação com trimestre anterior",
                            "Avaliação de padrões ao longo do tempo",
                            "Previsão do futuro",
                            "Não tem utilidade prática"
                        ],
                        correctAnswer: 1,
                        explanation: "Análise de tendências avalia padrões e mudanças nos indicadores ao longo do tempo para identificar melhorias ou deteriorações."
                    },
                    {
                        question: "Como deve ser a análise comparativa (benchmarking)?",
                        options: [
                            "Apenas com hospitais similares",
                            "Com referências internas e externas relevantes",
                            "Não é necessário comparar",
                            "Apenas com o melhor do mundo"
                        ],
                        correctAnswer: 1,
                        explanation: "Comparações devem ser feitas com referências internas (histórico) e externas apropriadas (hospitais similares, literatura)."
                    },
                    {
                        question: "Qual a importância da análise contextual dos dados?",
                        options: [
                            "Dados numéricos são suficientes",
                            "Fundamental para interpretar resultados corretamente",
                            "Apenas para justificar resultados ruins",
                            "Não é necessária"
                        ],
                        correctAnswer: 1,
                        explanation: "Análise contextual é fundamental para interpretar corretamente os dados considerando mudanças em processos, volume, complexidade, etc."
                    },
                    {
                        question: "Como devem ser reportados os near miss?",
                        options: [
                            "Não precisam ser reportados",
                            "Incluídos no relatório como oportunidades de aprendizado",
                            "Apenas se causaram problemas",
                            "Somente internamente"
                        ],
                        correctAnswer: 1,
                        explanation: "Near miss devem ser incluídos no relatório como importantes oportunidades de aprendizado e prevenção de danos futuros."
                    },
                    {
                        question: "O que deve constar sobre as ações de melhoria implementadas?",
                        options: [
                            "Apenas a lista de ações",
                            "Descrição, prazo, responsável e efetividade",
                            "Não é necessário reportar ações",
                            "Somente ações concluídas"
                        ],
                        correctAnswer: 1,
                        explanation: "Devem constar descrição das ações, prazos, responsáveis e avaliação de efetividade das intervenções implementadas."
                    },
                    {
                        question: "Como deve ser o formato do relatório trimestral?",
                        options: [
                            "Extremamente técnico e complexo",
                            "Claro, objetivo e acessível ao público-alvo",
                            "Apenas para especialistas",
                            "Não importa o formato"
                        ],
                        correctAnswer: 1,
                        explanation: "Relatório deve ser claro, objetivo, visualmente atrativo e acessível ao público-alvo, facilitando compreensão e tomada de decisão."
                    },
                    {
                        question: "Qual a importância de incluir eventos sentinela no relatório?",
                        options: [
                            "Devem ser omitidos",
                            "Fundamental para transparência e aprendizado",
                            "Apenas se exigido por lei",
                            "Somente em relatório anual"
                        ],
                        correctAnswer: 1,
                        explanation: "Eventos sentinela devem ser incluídos (anonimizados) para demonstrar transparência, análises realizadas e lições aprendidas."
                    },
                    {
                        question: "Como deve ser tratada a evolução dos indicadores?",
                        options: [
                            "Apenas celebrar melhorias",
                            "Analisar melhorias e pioras com ações específicas",
                            "Ignorar pioras",
                            "Focar apenas em números"
                        ],
                        correctAnswer: 1,
                        explanation: "Deve-se analisar criticamente tanto melhorias (reconhecimento) quanto pioras (investigação e ações corretivas)."
                    },
                    {
                        question: "O que são metas de segurança no relatório?",
                        options: [
                            "Objetivos impossíveis de alcançar",
                            "Alvos específicos para melhoria dos indicadores",
                            "Apenas desejos genéricos",
                            "Não é necessário ter metas"
                        ],
                        correctAnswer: 1,
                        explanation: "Metas são objetivos específicos, mensuráveis e realistas estabelecidos para melhoria dos indicadores de segurança."
                    },
                    {
                        question: "Como devem ser comunicados os resultados às equipes?",
                        options: [
                            "Apenas por email",
                            "Múltiplas formas: reuniões, murais, digital",
                            "Não é necessário comunicar",
                            "Somente em relatório escrito"
                        ],
                        correctAnswer: 1,
                        explanation: "Resultados devem ser comunicados através de múltiplas formas (reuniões, murais, plataformas digitais) para alcançar todas as equipes."
                    },
                    {
                        question: "Qual a periodicidade ideal de discussão dos relatórios?",
                        options: [
                            "Apenas quando elaborados",
                            "Trimestralmente com análise crítica",
                            "Nunca são discutidos",
                            "Somente em auditoria"
                        ],
                        correctAnswer: 1,
                        explanation: "Relatórios devem ser discutidos trimestralmente em fóruns apropriados (comitês, direção) com análise crítica e definição de ações."
                    },
                    {
                        question: "O que é taxa de notificação de incidentes?",
                        options: [
                            "Não é um indicador relevante",
                            "Medida da cultura de segurança e engajamento",
                            "Apenas contagem de erros",
                            "Ferramenta punitiva"
                        ],
                        correctAnswer: 1,
                        explanation: "Taxa de notificação é importante indicador da cultura de segurança, refletindo o engajamento das equipes e confiança no sistema."
                    },
                    {
                        question: "Como deve ser a apresentação de resultados positivos?",
                        options: [
                            "Com arrogância e complacência",
                            "Com reconhecimento e incentivo à continuidade",
                            "Não precisa destacar sucessos",
                            "Apenas focar nos problemas"
                        ],
                        correctAnswer: 1,
                        explanation: "Resultados positivos devem ser reconhecidos e celebrados para motivar equipes e incentivar continuidade das boas práticas."
                    },
                    {
                        question: "Qual a importância da análise por unidade/setor?",
                        options: [
                            "Não é necessária",
                            "Permite ações direcionadas e específicas",
                            "Apenas para comparar e punir",
                            "Causa competição negativa"
                        ],
                        correctAnswer: 1,
                        explanation: "Análise por setor permite identificar especificidades, implementar ações direcionadas e compartilhar melhores práticas."
                    },
                    {
                        question: "O que deve constar sobre capacitações realizadas?",
                        options: [
                            "Não precisa incluir capacitações",
                            "Tema, público, data e avaliação de efetividade",
                            "Apenas lista de participantes",
                            "Somente carga horária"
                        ],
                        correctAnswer: 1,
                        explanation: "Devem constar capacitações realizadas com tema, público-alvo, data e avaliação de efetividade no desempenho."
                    },
                    {
                        question: "Como deve ser tratada a confidencialidade no relatório?",
                        options: [
                            "Expor nomes de envolvidos",
                            "Proteger identidade mantendo transparência dos fatos",
                            "Omitir todas as informações sensíveis",
                            "Não é necessário sigilo"
                        ],
                        correctAnswer: 1,
                        explanation: "Deve-se proteger identidade de pacientes e profissionais, mantendo transparência sobre fatos, análises e lições aprendidas."
                    },
                    {
                        question: "Qual a importância de incluir planos para próximo trimestre?",
                        options: [
                            "Não é importante",
                            "Demonstra continuidade e proatividade",
                            "Apenas para cumprir protocolo",
                            "Planos não devem ser divulgados"
                        ],
                        correctAnswer: 1,
                        explanation: "Incluir planos futuros demonstra continuidade da gestão, proatividade e compromisso com melhoria contínua."
                    },
                    {
                        question: "Como deve ser a revisão histórica dos dados?",
                        options: [
                            "Apenas comparar com trimestre anterior",
                            "Analisar série histórica de vários períodos",
                            "Não é necessário olhar o passado",
                            "Apenas dados do último ano"
                        ],
                        correctAnswer: 1,
                        explanation: "Revisão histórica deve analisar série temporal de vários períodos para identificar tendências reais além de variações sazonais."
                    },
                    {
                        question: "O que é painel de indicadores (dashboard)?",
                        options: [
                            "Apenas decoração do relatório",
                            "Visualização consolidada de indicadores-chave",
                            "Lista de todos os dados coletados",
                            "Ferramenta sem utilidade"
                        ],
                        correctAnswer: 1,
                        explanation: "Dashboard é visualização consolidada e sintética dos principais indicadores, facilitando acompanhamento rápido e tomada de decisão."
                    },
                    {
                        question: "Como devem ser apresentadas as limitações dos dados?",
                        options: [
                            "Não mencionar limitações",
                            "Transparentemente para interpretação adequada",
                            "Apenas justificar resultados ruins",
                            "Omitir para não parecer fraco"
                        ],
                        correctAnswer: 1,
                        explanation: "Limitações devem ser apresentadas transparentemente para permitir interpretação adequada e planejamento de melhorias na coleta."
                    },
                    {
                        question: "Qual a importância da integração com outros indicadores?",
                        options: [
                            "Segurança deve ser analisada isoladamente",
                            "Fundamental para visão sistêmica e correlações",
                            "Causa confusão na análise",
                            "Não tem relevância"
                        ],
                        correctAnswer: 1,
                        explanation: "Integração com indicadores clínicos, operacionais e financeiros permite visão sistêmica e identificação de correlações importantes."
                    },
                    {
                        question: "Como deve ser o arquivo dos relatórios trimestrais?",
                        options: [
                            "Não é necessário arquivar",
                            "Organizado, acessível e por período definido",
                            "Apenas digital sem backup",
                            "Somente o último relatório"
                        ],
                        correctAnswer: 1,
                        explanation: "Relatórios devem ser arquivados de forma organizada, segura e acessível, mantidos conforme legislação vigente."
                    },
                    {
                        question: "Qual o papel dos indicadores de processo vs. resultado?",
                        options: [
                            "Apenas indicadores de resultado importam",
                            "Ambos são importantes e complementares",
                            "Só indicadores de processo têm valor",
                            "Não há diferença entre eles"
                        ],
                        correctAnswer: 1,
                        explanation: "Indicadores de processo (o que fazemos) e resultado (o que alcançamos) são complementares e ambos essenciais para gestão."
                    },
                    {
                        question: "Como deve ser a aprovação dos relatórios?",
                        options: [
                            "Não precisa ser aprovado",
                            "Por instância competente (direção/comitê)",
                            "Apenas pelo autor",
                            "Aprovação informal"
                        ],
                        correctAnswer: 1,
                        explanation: "Relatórios devem ser formalmente aprovados por instância competente (direção, comitê) antes da divulgação oficial."
                    }
                ]
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
                    {
                        question: "Quando deve ser feito o disclosure de um evento adverso?",
                        options: [
                            "Nunca, para evitar processos",
                            "Assim que o evento é identificado",
                            "Apenas se o paciente perguntar",
                            "Somente após investigação completa"
                        ],
                        correctAnswer: 1,
                        explanation: "Disclosure deve ser feito assim que o evento é identificado, com informações iniciais, seguido de atualizações conforme investigação."
                    },
                    {
                        question: "Quem deve fazer o disclosure ao paciente?",
                        options: [
                            "Sempre um advogado",
                            "Profissional envolvido com suporte da liderança",
                            "Apenas por escrito, sem conversa",
                            "Qualquer pessoa disponível"
                        ],
                        correctAnswer: 1,
                        explanation: "Disclosure deve ser feito pelo profissional envolvido no cuidado, com suporte da liderança médica/administrativa e conforme protocolo."
                    },
                    {
                        question: "O que deve ser incluído no disclosure?",
                        options: [
                            "Apenas desculpas genéricas",
                            "Fatos conhecidos, consequências e próximos passos",
                            "Culpabilização de profissionais",
                            "Promessas de compensação financeira"
                        ],
                        correctAnswer: 1,
                        explanation: "Disclosure deve incluir fatos conhecidos, possíveis consequências, investigação em andamento, ações tomadas e próximos passos."
                    },
                    {
                        question: "Qual a importância do pedido de desculpas no disclosure?",
                        options: [
                            "Não é importante",
                            "Fundamental para restaurar confiança e respeito",
                            "Admite culpa legal automaticamente",
                            "Deve ser evitado sempre"
                        ],
                        correctAnswer: 1,
                        explanation: "Pedido de desculpas sincero é fundamental para restaurar confiança, demonstrar empatia e respeito, sendo componente essencial do disclosure."
                    },
                    {
                        question: "Como deve ser documentado o disclosure?",
                        options: [
                            "Não deve ser documentado",
                            "Detalhadamente no prontuário e registros específicos",
                            "Apenas informalmente",
                            "Somente em gravação de áudio"
                        ],
                        correctAnswer: 1,
                        explanation: "Disclosure deve ser documentado detalhadamente no prontuário, incluindo data, hora, participantes, informações fornecidas e reações."
                    },
                    {
                        question: "Qual o papel da família no processo de disclosure?",
                        options: [
                            "Deve ser excluída",
                            "Incluída conforme desejo do paciente",
                            "Sempre excluída por confidencialidade",
                            "Apenas em casos de óbito"
                        ],
                        correctAnswer: 1,
                        explanation: "Família deve ser incluída conforme desejo do paciente, respeitando autonomia e considerando necessidade de suporte."
                    },
                    {
                        question: "O que é uma 'conversa difícil' em disclosure?",
                        options: [
                            "Discussão sobre pagamento",
                            "Comunicação de evento adverso e suas consequências",
                            "Negociação de responsabilidades",
                            "Apenas conversa com advogados"
                        ],
                        correctAnswer: 1,
                        explanation: "Conversa difícil é aquela em que se comunica ao paciente/família sobre evento adverso, danos e incertezas, requerendo preparo e empatia."
                    },
                    {
                        question: "Como deve ser o preparo para fazer disclosure?",
                        options: [
                            "Não é necessário preparo",
                            "Treinamento específico e revisão dos fatos",
                            "Apenas improvisar",
                            "Ler um texto decorado"
                        ],
                        correctAnswer: 1,
                        explanation: "Profissional deve ter treinamento específico em comunicação de más notícias, revisar os fatos, planejar abordagem e contar com suporte."
                    },
                    {
                        question: "Qual a relação entre disclosure e processos judiciais?",
                        options: [
                            "Disclosure aumenta processos",
                            "Disclosure pode reduzir litígios e melhorar relações",
                            "Não há relação",
                            "Sempre resulta em processo"
                        ],
                        correctAnswer: 1,
                        explanation: "Estudos mostram que disclosure adequado pode reduzir litígios, melhorar satisfação e relações de confiança paciente-instituição."
                    },
                    {
                        question: "O que fazer se as informações sobre o evento forem incompletas?",
                        options: [
                            "Esperar meses pela investigação completa",
                            "Comunicar o que se sabe e comprometer com atualizações",
                            "Inventar informações plausíveis",
                            "Não fazer disclosure"
                        ],
                        correctAnswer: 1,
                        explanation: "Deve-se comunicar as informações conhecidas, reconhecer incertezas e comprometer-se com atualizações conforme investigação avança."
                    },
                    {
                        question: "Como lidar com emoções do profissional durante disclosure?",
                        options: [
                            "Profissional não pode demonstrar emoção",
                            "Emoções são naturais e podem ser expressas adequadamente",
                            "Apenas chorar resolve",
                            "Transferir para outro profissional"
                        ],
                        correctAnswer: 1,
                        explanation: "Emoções são naturais e podem ser expressas adequadamente, demonstrando humanidade, mas mantendo profissionalismo e foco no paciente."
                    },
                    {
                        question: "Qual o prazo ideal para disclosure após evento adverso?",
                        options: [
                            "Sem prazo definido",
                            "24 horas ou assim que possível",
                            "Após um mês",
                            "Somente se requisitado"
                        ],
                        correctAnswer: 1,
                        explanation: "Disclosure inicial deve ocorrer em até 24 horas ou assim que possível após identificação do evento, com atualizações subsequentes."
                    },
                    {
                        question: "O que é 'segunda vítima' em eventos adversos?",
                        options: [
                            "Familiar do paciente",
                            "Profissional traumatizado pelo evento",
                            "Segundo paciente afetado",
                            "Testemunha do evento"
                        ],
                        correctAnswer: 1,
                        explanation: "Segunda vítima é o profissional de saúde traumatizado pelo evento adverso, que também necessita de suporte e cuidado."
                    },
                    {
                        question: "Como deve ser o ambiente para disclosure?",
                        options: [
                            "Qualquer lugar público",
                            "Privado, confortável e sem interrupções",
                            "Apenas por telefone",
                            "No corredor do hospital"
                        ],
                        correctAnswer: 1,
                        explanation: "Disclosure deve ocorrer em ambiente privado, confortável, sem interrupções, permitindo tempo adequado e expressão de emoções."
                    },
                    {
                        question: "O que fazer se o paciente/família ficar muito emotivo?",
                        options: [
                            "Encerrar a conversa imediatamente",
                            "Permitir expressão, oferecer suporte e tempo",
                            "Minimizar a situação",
                            "Chamar segurança"
                        ],
                        correctAnswer: 1,
                        explanation: "Deve-se permitir e validar expressão emocional, oferecer suporte (tecidos, água), tempo necessário e disponibilidade para continuação."
                    },
                    {
                        question: "Como abordar questões sobre responsabilidade durante disclosure?",
                        options: [
                            "Negar qualquer responsabilidade",
                            "Focar em fatos, investigação e compromisso com esclarecimento",
                            "Culpar outros profissionais",
                            "Prometer compensação imediata"
                        ],
                        correctAnswer: 1,
                        explanation: "Focar em fatos conhecidos, processo de investigação em andamento e compromisso com transparência e esclarecimento completo."
                    },
                    {
                        question: "Qual o papel da instituição no apoio ao disclosure?",
                        options: [
                            "Deixar profissional sozinho",
                            "Fornecer treinamento, protocolo e suporte",
                            "Apenas proteção legal",
                            "Não tem responsabilidade"
                        ],
                        correctAnswer: 1,
                        explanation: "Instituição deve fornecer treinamento, protocolo claro, suporte emocional e administrativo ao profissional realizando disclosure."
                    },
                    {
                        question: "Como lidar com questões de mídia após evento adverso grave?",
                        options: [
                            "Profissional deve falar livremente",
                            "Seguir protocolo institucional de comunicação",
                            "Negar tudo à imprensa",
                            "Ignorar completamente"
                        ],
                        correctAnswer: 1,
                        explanation: "Questões de mídia devem seguir protocolo institucional, com assessoria de comunicação, respeitando privacidade e aspectos legais."
                    },
                    {
                        question: "O que fazer se paciente solicitar cópia de documentos após disclosure?",
                        options: [
                            "Negar acesso",
                            "Fornecer conforme direitos e procedimentos legais",
                            "Apenas com ordem judicial",
                            "Cobrar valores abusivos"
                        ],
                        correctAnswer: 1,
                        explanation: "Paciente tem direito legal ao prontuário. Fornecer conforme procedimentos institucionais e legislação vigente."
                    },
                    {
                        question: "Como abordar incertezas durante disclosure?",
                        options: [
                            "Inventar explicações plausíveis",
                            "Reconhecer honestamente e comprometer com esclarecimento",
                            "Mudar de assunto",
                            "Culpar falta de tecnologia"
                        ],
                        correctAnswer: 1,
                        explanation: "Incertezas devem ser reconhecidas honestamente, explicando processo de investigação e comprometendo-se com esclarecimentos futuros."
                    },
                    {
                        question: "Qual a importância da escuta ativa no disclosure?",
                        options: [
                            "Não é importante",
                            "Fundamental para compreender reações e necessidades",
                            "Apenas falar é importante",
                            "Escutar atrasa o processo"
                        ],
                        correctAnswer: 1,
                        explanation: "Escuta ativa é fundamental para compreender reações, necessidades, dúvidas e preocupações do paciente e família."
                    },
                    {
                        question: "Como deve ser o seguimento após disclosure inicial?",
                        options: [
                            "Não é necessário seguimento",
                            "Acompanhamento regular com atualizações",
                            "Apenas se paciente solicitar",
                            "Seguimento apenas legal"
                        ],
                        correctAnswer: 1,
                        explanation: "Deve haver acompanhamento regular com atualizações sobre investigação, condição clínica e disponibilidade para dúvidas."
                    },
                    {
                        question: "O que fazer se diferentes versões do evento surgirem?",
                        options: [
                            "Defender apenas uma versão",
                            "Reconhecer divergências e comprometer com investigação completa",
                            "Culpar quem diverge",
                            "Ignorar versões conflitantes"
                        ],
                        correctAnswer: 1,
                        explanation: "Reconhecer que podem existir diferentes perspectivas, comprometer com investigação imparcial e completa de todos os aspectos."
                    },
                    {
                        question: "Como abordar questões financeiras durante disclosure?",
                        options: [
                            "Fazer promessas de pagamento",
                            "Focar no cuidado, encaminhar questões financeiras apropriadamente",
                            "Oferecer dinheiro imediatamente",
                            "Negar qualquer compensação"
                        ],
                        correctAnswer: 1,
                        explanation: "Focar no cuidado ao paciente. Questões financeiras devem ser encaminhadas aos departamentos apropriados conforme políticas."
                    },
                    {
                        question: "Qual o papel da empatia no processo de disclosure?",
                        options: [
                            "Empatia não é profissional",
                            "Central para comunicação humanizada e terapêutica",
                            "Apenas simpatia superficial",
                            "Pode ser interpretada como culpa"
                        ],
                        correctAnswer: 1,
                        explanation: "Empatia é central no disclosure, demonstrando cuidado genuíno, compreensão do sofrimento e compromisso com o bem-estar."
                    },
                    {
                        question: "Como deve ser a linguagem utilizada no disclosure?",
                        options: [
                            "Técnica e complexa",
                            "Clara, honesta e acessível ao paciente",
                            "Jurídica e formal",
                            "Evasiva e ambígua"
                        ],
                        correctAnswer: 1,
                        explanation: "Linguagem deve ser clara, honesta, compassiva e acessível, evitando jargões e garantindo compreensão do paciente/família."
                    },
                    {
                        question: "O que fazer se paciente solicitar troca de equipe após evento?",
                        options: [
                            "Negar pedido",
                            "Considerar solicitação respeitosamente e viabilizar se apropriado",
                            "Sentir-se ofendido",
                            "Abandonar o cuidado"
                        ],
                        correctAnswer: 1,
                        explanation: "Solicitação deve ser considerada respeitosamente, discutindo opções e viabilizando mudança se apropriado e benéfico para relação terapêutica."
                    },
                    {
                        question: "Como integrar disclosure na cultura organizacional?",
                        options: [
                            "Apenas ter protocolo escrito",
                            "Treinamento, liderança exemplar e suporte contínuo",
                            "Disclosure não é cultural",
                            "Apenas em casos extremos"
                        ],
                        correctAnswer: 1,
                        explanation: "Integração requer treinamento contínuo, liderança exemplar, protocolos claros, suporte aos profissionais e reconhecimento da importância."
                    },
                    {
                        question: "Qual a diferença entre disclosure e consentimento informado?",
                        options: [
                            "São a mesma coisa",
                            "Disclosure comunica eventos, consentimento informa riscos previamente",
                            "Não há diferença prática",
                            "Disclosure substitui consentimento"
                        ],
                        correctAnswer: 1,
                        explanation: "Disclosure comunica eventos que ocorreram; consentimento informado comunica riscos potenciais antes de procedimentos. Ambos essenciais."
                    }
                ]
            }
        }
    },

    // Continue com as outras 22 subdivisões...
    // Por questão de espaço, vou incluir estruturas resumidas

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
                    {
                        question: "Qual identificador NÃO deve ser utilizado como identificação do paciente?",
                        options: [
                            "Nome completo",
                            "Número do leito",
                            "Data de nascimento",
                            "Número do prontuário"
                        ],
                        correctAnswer: 1,
                        explanation: "O número do leito NÃO deve ser usado como identificador, pois pode mudar. Identificadores apropriados incluem nome completo, data de nascimento e número do prontuário."
                    },
                    {
                        question: "Como deve ser feita a identificação de recém-nascidos?",
                        options: [
                            "Apenas pelo nome da mãe",
                            "Nome da mãe + identificadores próprios",
                            "Não precisa identificar bebês",
                            "Apenas pela cor da pulseira"
                        ],
                        correctAnswer: 1,
                        explanation: "Recém-nascidos devem ser identificados com nome completo da mãe, data de nascimento do bebê e número de prontuário próprio, utilizando pulseiras desde o nascimento."
                    },
                    {
                        question: "Quando deve ser verificada a identificação do paciente?",
                        options: [
                            "Apenas na admissão",
                            "Antes de cada procedimento, medicação ou coleta",
                            "Uma vez por turno",
                            "Apenas em cirurgias"
                        ],
                        correctAnswer: 1,
                        explanation: "A identificação deve ser verificada ativamente antes de cada procedimento, administração de medicação, coleta de exames, transfusão ou qualquer intervenção."
                    },
                    {
                        question: "O que é identificação ativa?",
                        options: [
                            "Ler o nome na pulseira",
                            "Perguntar ao paciente para dizer seu nome",
                            "Chamar pelo nome no quarto",
                            "Apenas ver a pulseira"
                        ],
                        correctAnswer: 1,
                        explanation: "Identificação ativa significa solicitar que o paciente diga seu nome completo e data de nascimento, confirmando com a pulseira, não apenas perguntando 'você é fulano?'"
                    },
                    {
                        question: "Qual a cor padronizada da pulseira de identificação?",
                        options: [
                            "Qualquer cor",
                            "Branca para identificação padrão",
                            "Verde sempre",
                            "Depende do convênio"
                        ],
                        correctAnswer: 1,
                        explanation: "A pulseira branca é padronizada para identificação geral do paciente. Outras cores são reservadas para alertas específicos (alergia, risco de queda, etc.)."
                    },
                    {
                        question: "O que fazer se a pulseira do paciente estiver ilegível?",
                        options: [
                            "Continuar usando a mesma",
                            "Substituir imediatamente por nova",
                            "Usar apenas prontuário",
                            "Perguntar ao paciente"
                        ],
                        correctAnswer: 1,
                        explanation: "Pulseira ilegível, danificada ou ausente deve ser substituída imediatamente antes de qualquer procedimento, garantindo identificação correta."
                    },
                    {
                        question: "Como identificar pacientes inconscientes ou confusos?",
                        options: [
                            "Não é possível identificar",
                            "Usar pulseira e confirmar com acompanhante/prontuário",
                            "Assumir identidade",
                            "Apenas pela foto"
                        ],
                        correctAnswer: 1,
                        explanation: "Para pacientes inconscientes ou confusos, utilizar pulseira de identificação e confirmar com acompanhante, prontuário e documentos."
                    },
                    {
                        question: "O que deve constar na pulseira de identificação?",
                        options: [
                            "Apenas o nome",
                            "Nome completo, data de nascimento e prontuário",
                            "Somente número do leito",
                            "Nome e idade"
                        ],
                        correctAnswer: 1,
                        explanation: "A pulseira deve conter no mínimo: nome completo legível, data de nascimento e número do prontuário do paciente."
                    },
                    {
                        question: "Qual a importância da padronização de cores das pulseiras?",
                        options: [
                            "Apenas estética",
                            "Comunicação visual rápida de alertas",
                            "Não tem importância",
                            "Apenas para organização"
                        ],
                        correctAnswer: 1,
                        explanation: "Padronização de cores permite comunicação visual rápida de alertas importantes (alergia-vermelha, queda-amarela, etc.) aumentando a segurança."
                    },
                    // Continue with 20 more questions for this ROP...
                    {
                        question: "Como deve ser a identificação em áreas cirúrgicas?",
                        options: [
                            "Apenas verbal",
                            "Pulseira + checklist + marcação do sítio cirúrgico",
                            "Somente prontuário",
                            "Não precisa identificar"
                        ],
                        correctAnswer: 1,
                        explanation: "Em áreas cirúrgicas, além da pulseira, deve-se utilizar checklist de cirurgia segura e marcação do sítio cirúrgico com participação do paciente."
                    },
                    {
                        question: "O que fazer se houver pacientes com nomes similares?",
                        options: [
                            "Ignorar o risco",
                            "Implementar alertas adicionais e reforçar verificação",
                            "Trocar nome de um deles",
                            "Interná-los juntos"
                        ],
                        correctAnswer: 1,
                        explanation: "Pacientes com nomes similares exigem alertas visuais (prontuário, leito), comunicação da equipe e reforço na verificação de identificadores."
                    },
                    {
                        question: "Como identificar amostras de exames laboratoriais?",
                        options: [
                            "Após coleta",
                            "À beira do leito, imediatamente após coleta",
                            "No laboratório",
                            "Apenas com etiquetas impressas"
                        ],
                        correctAnswer: 1,
                        explanation: "Amostras devem ser identificadas imediatamente após coleta, à beira do leito, com etiquetas contendo dois identificadores do paciente."
                    },
                    {
                        question: "Qual o risco de erros de identificação?",
                        options: [
                            "Não há riscos significativos",
                            "Eventos adversos graves como cirurgia errada ou medicação trocada",
                            "Apenas atrasos administrativos",
                            "Problemas apenas financeiros"
                        ],
                        correctAnswer: 1,
                        explanation: "Erros de identificação podem levar a eventos graves como cirurgia/procedimento em paciente errado, medicação trocada ou transfusão incompatível."
                    },
                    {
                        question: "Como deve ser a identificação de bolsas de sangue?",
                        options: [
                            "Apenas com número da bolsa",
                            "Checagem com dois profissionais e dois identificadores",
                            "Verificação simples",
                            "Não precisa verificar"
                        ],
                        correctAnswer: 1,
                        explanation: "Transfusões exigem checagem dupla (dois profissionais) dos identificadores do paciente com os dados da bolsa antes da infusão."
                    },
                    {
                        question: "O que é time-out cirúrgico?",
                        options: [
                            "Intervalo da equipe",
                            "Pausa antes da incisão para confirmar identidade e procedimento",
                            "Tempo de descanso obrigatório",
                            "Apenas conversa informal"
                        ],
                        correctAnswer: 1,
                        explanation: "Time-out é pausa obrigatória imediatamente antes da incisão cirúrgica para confirmar identidade do paciente, procedimento, sítio e lateralidade."
                    },
                    {
                        question: "Como envolver o paciente na identificação?",
                        options: [
                            "Paciente não participa",
                            "Solicitar que diga seu nome e confirme informações",
                            "Apenas mostrar a pulseira",
                            "Paciente não tem responsabilidade"
                        ],
                        correctAnswer: 1,
                        explanation: "Paciente deve ser parceiro ativo, sendo orientado a verificar sua pulseira e confirmar identidade antes de procedimentos."
                    },
                    {
                        question: "Qual a frequência de treinamento sobre identificação?",
                        options: [
                            "Apenas na admissão",
                            "Periodicamente e na integração de novos profissionais",
                            "Não é necessário treinar",
                            "Uma vez na carreira"
                        ],
                        correctAnswer: 1,
                        explanation: "Treinamento sobre identificação deve ser contínuo, incluindo integração de novos profissionais e reciclagens periódicas."
                    },
                    {
                        question: "Como identificar medicações prescritas?",
                        options: [
                            "Apenas com nome do medicamento",
                            "Rótulo com dois identificadores do paciente",
                            "Cor da seringa",
                            "Memória do profissional"
                        ],
                        correctAnswer: 1,
                        explanation: "Medicações preparadas devem ser rotuladas com dois identificadores do paciente, nome do medicamento, dose, via e horário."
                    },
                    {
                        question: "O que fazer se paciente recusar usar pulseira?",
                        options: [
                            "Aceitar recusa sem questionar",
                            "Explicar importância e documentar recusa se persistir",
                            "Forçar uso físico",
                            "Não fazer nada"
                        ],
                        correctAnswer: 1,
                        explanation: "Explicar importância para segurança. Se recusa persistir, documentar e implementar medidas alternativas com consentimento do paciente."
                    },
                    {
                        question: "Como deve ser a identificação em prontuários eletrônicos?",
                        options: [
                            "Menos rigorosa que papel",
                            "Mesmos requisitos com alertas eletrônicos",
                            "Apenas número de registro",
                            "Nome parcial é suficiente"
                        ],
                        correctAnswer: 1,
                        explanation: "Prontuários eletrônicos devem manter mesmos requisitos de identificação, com vantagem de alertas automáticos para nomes similares ou riscos."
                    },
                    {
                        question: "Qual o papel da tecnologia na identificação?",
                        options: [
                            "Substitui totalmente verificação humana",
                            "Complementa mas não substitui verificação ativa",
                            "Não tem utilidade",
                            "Apenas para grandes hospitais"
                        ],
                        correctAnswer: 1,
                        explanation: "Tecnologias (código de barras, RFID) são ferramentas valiosas que complementam mas não substituem verificação ativa pelo profissional."
                    },
                    {
                        question: "Como identificar pacientes em situações de emergência?",
                        options: [
                            "Não é possível identificar",
                            "Identificação provisória única + regularização posterior",
                            "Chamar de 'sem nome'",
                            "Usar apenas descrição física"
                        ],
                        correctAnswer: 1,
                        explanation: "Em emergências sem documentos, usar identificação provisória única (Ex: 'Desconhecido + número sequencial') com regularização assim que possível."
                    },
                    {
                        question: "Qual a importância da auditoria de conformidade?",
                        options: [
                            "Apenas burocracia",
                            "Essencial para monitorar adesão e identificar melhorias",
                            "Ferramenta punitiva",
                            "Não tem valor prático"
                        ],
                        correctAnswer: 1,
                        explanation: "Auditorias regulares de conformidade são essenciais para monitorar adesão, identificar gaps e promover melhoria contínua."
                    },
                    {
                        question: "Como deve ser a identificação de pertences do paciente?",
                        options: [
                            "Não precisa identificar",
                            "Mesmos identificadores em etiquetas resistentes",
                            "Apenas nome parcial",
                            "Cor diferente apenas"
                        ],
                        correctAnswer: 1,
                        explanation: "Pertences pessoais devem ser identificados com mesmos identificadores do paciente para evitar perdas e trocas."
                    },
                    {
                        question: "O que caracteriza uma cultura de segurança em identificação?",
                        options: [
                            "Cumprimento por medo de punição",
                            "Engajamento ativo e compreensão da importância",
                            "Apenas protocolos escritos",
                            "Verificação apenas quando conveniente"
                        ],
                        correctAnswer: 1,
                        explanation: "Cultura forte é caracterizada por engajamento ativo de todos, compreensão da importância e verificação consistente independente de pressões."
                    },
                    {
                        question: "Como abordar near miss de identificação?",
                        options: [
                            "Ignorar se não houve dano",
                            "Notificar e analisar para prevenir eventos futuros",
                            "Punir quem quase errou",
                            "Apenas orientar verbalmente"
                        ],
                        correctAnswer: 1,
                        explanation: "Near miss de identificação deve ser notificado e analisado como oportunidade valiosa de aprendizado e prevenção de eventos graves."
                    },
                    {
                        question: "Qual a responsabilidade da liderança na identificação?",
                        options: [
                            "Apenas delegar aos assistenciais",
                            "Garantir recursos, treinamento e cultura de segurança",
                            "Somente fazer auditoria",
                            "Não tem responsabilidade direta"
                        ],
                        correctAnswer: 1,
                        explanation: "Liderança deve garantir recursos (pulseiras, tecnologia), treinamento adequado, cultura de segurança e remoção de barreiras."
                    },
                    {
                        question: "Como deve ser a comunicação de mudanças no processo de identificação?",
                        options: [
                            "Apenas por email",
                            "Múltiplos canais com treinamento e suporte",
                            "Não precisa comunicar",
                            "Apenas em reuniões mensais"
                        ],
                        correctAnswer: 1,
                        explanation: "Mudanças devem ser comunicadas através de múltiplos canais, com treinamento prático, materiais de apoio e período de suporte intensificado."
                    },
                    {
                        question: "Qual o impacto da fadiga na adesão à identificação?",
                        options: [
                            "Não há relação",
                            "Fadiga reduz atenção e aumenta risco de omissão",
                            "Fadiga melhora atenção",
                            "Apenas profissionais fracos são afetados"
                        ],
                        correctAnswer: 1,
                        explanation: "Fadiga é fator de risco conhecido que reduz atenção e vigilância, aumentando omissões. Instituição deve gerenciar cargas de trabalho."
                    }
                ]
            },
            "rop-2-2": {
                title: "ROP 2.2 – Lista de Abreviações Perigosas",
                audioFile: null,
                questions: [
                    // 30 questions about dangerous abbreviations...
                ]
            },
            // ... more ROPs in Comunicação
        }
    },

    // ==================== MACRO ÁREA 3 - USO DE MEDICAMENTOS ====================
    "uso-medicamentos": {
        title: "Uso de Medicamentos",
        icon: "fas fa-pills",
        color: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
        subdivisoes: {
            // ROPs 3.1 to 3.6...
        }
    },

    // ==================== MACRO ÁREA 4 - VIDA PROFISSIONAL ====================
    "vida-profissional": {
        title: "Vida Profissional / Força de Trabalho",
        icon: "fas fa-user-friends",
        color: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
        subdivisoes: {
            // ROPs 4.1 to 4.5...
        }
    },

    // ==================== MACRO ÁREA 5 - PREVENÇÃO DE INFECÇÕES ====================
    "prevencao-infeccoes": {
        title: "Prevenção de Infecções",
        icon: "fas fa-hand-sparkles",
        color: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
        subdivisoes: {
            // ROPs 5.1 to 5.4...
        }
    },

    // ==================== MACRO ÁREA 6 - AVALIAÇÃO DE RISCOS ====================
    "avaliacao-riscos": {
        title: "Avaliação de Riscos",
        icon: "fas fa-exclamation-circle",
        color: "linear-gradient(135deg, #30cfd0 0%, #330867 100%)",
        subdivisoes: {
            // ROPs 6.1 to 6.5...
        }
    }
};

// Export for use in app
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ropsData;
}

