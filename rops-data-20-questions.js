// ROPs - Práticas Organizacionais Obrigatórias
// Versão OTIMIZADA com 20 questões por ROP

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
                    }
                ]
            },
            "rop-2-4": {
                title: "ROP 2.4 – Conciliação em Serviços de Assistência Aguda (Internação)",
                audioFile: null,
                questions: [
                    {
                        question: "Quando deve ser realizada a conciliação medicamentosa na internação?",
                        options: [
                            "Apenas na admissão",
                            "Na admissão, transferências e alta",
                            "Somente na alta",
                            "Apenas em transferências"
                        ],
                        correctAnswer: 1,
                        explanation: "Na internação, a conciliação deve ser realizada na admissão, em todas as transferências entre unidades/serviços e na alta hospitalar."
                    }
                ]
            },
            "rop-2-5": {
                title: "ROP 2.5 – Conciliação em Atendimento Ambulatorial",
                audioFile: null,
                questions: [
                    {
                        question: "Qual a principal diferença da conciliação ambulatorial vs hospitalar?",
                        options: [
                            "Não há diferenças significativas",
                            "Ambulatorial foca em medicamentos crônicos e adesão",
                            "Ambulatorial é menos importante",
                            "Apenas frequência das consultas"
                        ],
                        correctAnswer: 1,
                        explanation: "No ambulatório, a conciliação foca em medicamentos de uso crônico, adesão ao tratamento e prevenção de interações, enquanto no hospital foca mais em transições agudas."
                    }
                ]
            },
            "rop-2-6": {
                title: "ROP 2.6 – Conciliação no Serviço de Emergência",
                audioFile: null,
                questions: [
                    {
                        question: "Por que a conciliação medicamentosa é crítica no serviço de emergência?",
                        options: [
                            "Para reduzir tempo de atendimento",
                            "Pacientes chegam com múltiplas medicações e histórico complexo",
                            "Para facilitar alta rápida",
                            "Para reduzir custos"
                        ],
                        correctAnswer: 1,
                        explanation: "No serviço de emergência, pacientes frequentemente chegam com múltiplas medicações, histórico complexo e necessidade de decisões rápidas, tornando a conciliação crítica para segurança."
                    }
                ]
            },
            "rop-2-7": {
                title: "ROP 2.7 – Lista de Verificação para Cirurgia Segura",
                audioFile: null,
                questions: [
                    {
                        question: "Qual é o objetivo principal do checklist de cirurgia segura da OMS?",
                        options: [
                            "Aumentar tempo cirúrgico",
                            "Reduzir complicações e mortalidade cirúrgica",
                            "Gerar documentação legal",
                            "Substituir protocolos institucionais"
                        ],
                        correctAnswer: 1,
                        explanation: "O checklist visa reduzir complicações evitáveis e mortalidade através de verificações sistematizadas nos momentos críticos da cirurgia."
                    }
                ]
            },
            "rop-2-8": {
                title: "ROP 2.8 – Transferência de Informações nas Transições (Handoff)",
                audioFile: null,
                questions: [
                    {
                        question: "O que é handoff na assistência à saúde?",
                        options: [
                            "Transferência de responsabilidade entre equipes",
                            "Processo de transferência de informações entre profissionais",
                            "Mudança de turno de trabalho",
                            "Transferência de pacientes entre hospitais"
                        ],
                        correctAnswer: 1,
                        explanation: "Handoff é o processo estruturado de transferência de informações, responsabilidades e cuidados entre profissionais de saúde, essencial para continuidade e segurança do cuidado."
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
                title: "ROP 3.1 – Uso de Medicamentos",
                audioFile: null,
                questions: [

                ]
            },
            "rop-3-2": {
                title: "ROP 3.2 – Uso de Medicamentos",
                audioFile: null,
                questions: [

                ]
            },
            "rop-3-3": {
                title: "ROP 3.3 – Uso de Medicamentos",
                audioFile: null,
                questions: [

                ]
            },
            "rop-3-4": {
                title: "ROP 3.4 – Uso de Medicamentos",
                audioFile: null,
                questions: [

                ]
            },
            "rop-3-5": {
                title: "ROP 3.5 – Uso de Medicamentos",
                audioFile: null,
                questions: [

                ]
            },
            "rop-3-6": {
                title: "ROP 3.6 – Uso de Medicamentos",
                audioFile: null,
                questions: [

                ]
            },
        }
    },

    // ==================== MACRO ÁREA 4 - VIDA PROFISSIONAL ====================
    "vida-profissional": {
        title: "Vida Profissional / Força de Trabalho",
        icon: "fas fa-user-friends",
        color: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
        subdivisoes: {
            "rop-4-1": {
                title: "ROP 4.1 – Vida Profissional",
                audioFile: null,
                questions: [

                ]
            },
            "rop-4-2": {
                title: "ROP 4.2 – Vida Profissional",
                audioFile: null,
                questions: [

                ]
            },
            "rop-4-3": {
                title: "ROP 4.3 – Vida Profissional",
                audioFile: null,
                questions: [

                ]
            },
            "rop-4-4": {
                title: "ROP 4.4 – Vida Profissional",
                audioFile: null,
                questions: [

                ]
            },
            "rop-4-5": {
                title: "ROP 4.5 – Vida Profissional",
                audioFile: null,
                questions: [

                ]
            },
        }
    },

    // ==================== MACRO ÁREA 5 - PREVENÇÃO DE INFECÇÕES ====================
    "prevencao-infeccoes": {
        title: "Prevenção de Infecções",
        icon: "fas fa-hand-sparkles",
        color: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
        subdivisoes: {
            "rop-5-1": {
                title: "ROP 5.1 – Prevenção de Infecções",
                audioFile: null,
                questions: [

                ]
            },
            "rop-5-2": {
                title: "ROP 5.2 – Prevenção de Infecções",
                audioFile: null,
                questions: [

                ]
            },
            "rop-5-3": {
                title: "ROP 5.3 – Prevenção de Infecções",
                audioFile: null,
                questions: [

                ]
            },
            "rop-5-4": {
                title: "ROP 5.4 – Prevenção de Infecções",
                audioFile: null,
                questions: [

                ]
            },
        }
    },

    // ==================== MACRO ÁREA 6 - AVALIAÇÃO DE RISCOS ====================
    "avaliacao-riscos": {
        title: "Avaliação de Riscos",
        icon: "fas fa-exclamation-triangle",
        color: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
        subdivisoes: {
            "rop-6-1": {
                title: "ROP 6.1 – Avaliação de Riscos",
                audioFile: null,
                questions: [

                ]
            },
            "rop-6-2": {
                title: "ROP 6.2 – Avaliação de Riscos",
                audioFile: null,
                questions: [
                    {
                        question: "Questão de exemplo ROP 6.2",
                        options: ["A", "B", "C", "D"],
                        correctAnswer: 0,
                        explanation: "Explicação de exemplo"
                    }
                ]
            },
            "rop-6-3": {
                title: "ROP 6.3 – Avaliação de Riscos",
                audioFile: null,
                questions: [

                ]
            },
            "rop-6-4": {
                title: "ROP 6.4 – Avaliação de Riscos",
                audioFile: null,
                questions: [

                ]
            },
            "rop-6-5": {
                title: "ROP 6.5 – Avaliação de Riscos",
                audioFile: null,
                questions: [

                ]
            },
        }
    }
};

console.log('✅ ROPs carregadas (versão OTIMIZADA 20 questões):', Object.keys(ropsData));
