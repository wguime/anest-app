// ROPs - Práticas Organizacionais Obrigatórias
// Versão simplificada para carregamento rápido

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
                        explanation: "A ROP 1.1 visa estabelecer responsabilidades claras e compartilhadas pela qualidade e segurança do paciente em toda a organização, criando uma cultura de responsabilização."}
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
                        explanation: "Incidente de segurança é qualquer evento ou circunstância que poderia ter resultado, ou resultou, em dano desnecessário ao paciente."}
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
                        explanation: "Relatórios trimestrais visam monitorar indicadores, comunicar resultados e promover ações de melhoria contínua da segurança do paciente."}
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
                        explanation: "Disclosure é a comunicação aberta, oportuna e honesta com pacientes e familiares sobre incidentes que os afetaram."}
                ]
            }
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
                        explanation: "Devem ser utilizados pelo menos dois identificadores (nome completo e data de nascimento ou prontuário) antes de qualquer procedimento, medicação ou coleta de exames."}
                ]
            },
            "rop-2-2": {
                title: "ROP 2.2 – Lista de Abreviações Perigosas",
                audioFile: null,
                questions: [
                    // 30 questions about dangerous abbreviations...
                ]}
                ]
            }
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
                        explanation: "Uso racional significa prescrever o antimicrobiano correto, na dose certa, pelo tempo adequado e no momento apropriado, baseado em evidências clínicas."}
                ]
            }
        }
    },

    // ==================== MACRO ÁREA 4 - VIDA PROFISSIONAL ====================
    "vida-profissional": {
        title: "Vida Profissional / Força de Trabalho",
        icon: "fas fa-user-friends",
        color: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
        subdivisoes: {
            "rop-4-1": {
                title: "ROP 4.1 – Programa de Manutenção Preventiva",
                audioFile: null,
                questions: [
                    {
                        question: "Qual o objetivo do programa de manutenção preventiva?",
                        options: [
                            "Reduzir custos",
                            "Garantir funcionamento adequado de equipamentos e prevenir falhas",
                            "Aumentar produtividade",
                            "Satisfazer regulamentações"
                        ],
                        correctAnswer: 1,
                        explanation: "O programa de manutenção preventiva visa garantir que equipamentos médicos funcionem adequadamente, prevenindo falhas que podem comprometer a segurança do paciente."
                    }
                ]
            }
        }
    },

    // ==================== MACRO ÁREA 5 - PREVENÇÃO DE INFECÇÕES ====================
    "prevencao-infeccoes": {
        title: "Prevenção de Infecções",
        icon: "fas fa-hand-sparkles",
        color: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
        subdivisoes: {
            "rop-5-1": {
                title: "ROP 5.1 – Aderência às Práticas de Higiene das Mãos",
                audioFile: null,
                questions: [
                    {
                        question: "Qual é a medida mais eficaz para prevenir infecções?",
                        options: [
                            "Uso de antibióticos",
                            "Higiene das mãos",
                            "Isolamento de pacientes",
                            "Limpeza do ambiente"
                        ],
                        correctAnswer: 1,
                        explanation: "A higiene das mãos é considerada a medida mais eficaz e de menor custo para prevenir infecções relacionadas à assistência à saúde."
                    }
                ]
            }
        }
    },

    // ==================== MACRO ÁREA 6 - AVALIAÇÃO DE RISCOS ====================
    "avaliacao-riscos": {
        title: "Avaliação de Riscos",
        icon: "fas fa-exclamation-triangle",
        color: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
        subdivisoes: {
            "rop-6-1": {
                title: "ROP 6.1 – Prevenção de Quedas e Redução de Lesões (Internação)",
                audioFile: null,
                questions: [
                    {
                        question: "Qual é o principal objetivo da prevenção de quedas?",
                        options: [
                            "Reduzir custos hospitalares",
                            "Prevenir lesões e melhorar segurança do paciente",
                            "Aumentar eficiência",
                            "Satisfazer regulamentações"
                        ],
                        correctAnswer: 1,
                        explanation: "A prevenção de quedas visa principalmente prevenir lesões e melhorar a segurança do paciente, especialmente em ambiente hospitalar onde o risco é maior."
                    }
                ]
            }
        }
    }
};

console.log('✅ ROPs carregadas (versão simplificada):', Object.keys(ropsData));
