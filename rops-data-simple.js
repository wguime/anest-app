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
                        explanation: "A ROP 1.1 visa estabelecer responsabilidades claras e compartilhadas pela qualidade e segurança do paciente em toda a organização, criando uma cultura de responsabilização."
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
                            "Apenas eventos que causam dano ao paciente",
                            "Qualquer evento que pode causar ou causou dano ao paciente",
                            "Somente erros médicos graves",
                            "Apenas eventos com consequências financeiras"
                        ],
                        correctAnswer: 1,
                        explanation: "Incidente de segurança do paciente é qualquer evento que pode causar ou causou dano desnecessário ao paciente, incluindo eventos adversos, quase eventos e eventos sentinela."
                    }
                ]
            },
            "rop-1-3": {
                title: "ROP 1.3 – Relatórios Trimestrais sobre a Segurança dos Pacientes",
                audioFile: null,
                questions: [
                    {
                        question: "Qual a frequência dos relatórios de segurança do paciente?",
                        options: [
                            "Anual",
                            "Trimestral",
                            "Mensal",
                            "Semestral"
                        ],
                        correctAnswer: 1,
                        explanation: "Os relatórios de segurança do paciente devem ser elaborados trimestralmente, conforme estabelecido na ROP 1.3."
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
                            "Ocultar informações do paciente",
                            "Comunicar abertamente com o paciente sobre incidentes",
                            "Documentar apenas internamente",
                            "Notificar apenas a direção"
                        ],
                        correctAnswer: 1,
                        explanation: "Disclosure é a comunicação aberta e honesta com o paciente e sua família sobre incidentes de segurança, incluindo o que aconteceu, por que aconteceu e o que será feito para prevenir recorrência."
                    }
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
                        question: "Qual é o objetivo da identificação do cliente?",
                        options: [
                            "Apenas controle administrativo",
                            "Prevenir erros de identidade e garantir segurança",
                            "Facilitar cobrança",
                            "Organizar prontuários"
                        ],
                        correctAnswer: 1,
                        explanation: "A identificação correta do cliente é fundamental para prevenir erros de identidade que podem levar a procedimentos incorretos, medicações erradas e outros eventos adversos."
                    }
                ]
            },
            "rop-2-2": {
                title: "ROP 2.2 – Lista de Abreviações Perigosas",
                audioFile: null,
                questions: [
                    {
                        question: "Por que abreviações perigosas devem ser evitadas?",
                        options: [
                            "Apenas por questões estéticas",
                            "Podem causar erros de interpretação e medicação",
                            "São difíceis de ler",
                            "Não são profissionais"
                        ],
                        correctAnswer: 1,
                        explanation: "Abreviações perigosas podem ser interpretadas de forma incorreta, levando a erros de medicação, procedimentos e diagnósticos, comprometendo a segurança do paciente."
                    }
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
                            "Usar sempre os mais caros",
                            "Prescrever apenas quando necessário, com dose e duração adequadas",
                            "Usar sempre os mais baratos",
                            "Prescrever preventivamente"
                        ],
                        correctAnswer: 1,
                        explanation: "Uso racional de antimicrobianos significa prescrever apenas quando há indicação clínica, com dose e duração adequadas, considerando resistência microbiana e custo-efetividade."
                    }
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

