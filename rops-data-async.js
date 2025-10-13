// ROPs - Práticas Organizacionais Obrigatórias
// Versão ASSÍNCRONA - Carrega questões sob demanda

const ropsData = {
    // ==================== MACRO ÁREA 1 - CULTURA DE SEGURANÇA (4 ROPs) ====================
    "cultura-seguranca": {
        title: "Cultura de Segurança",
        icon: "fas fa-shield-alt",
        color: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        subdivisoes: {
            "rop-1-1": {
                title: "ROP 1.1 – Responsabilização pela Qualidade",
                audioFile: "Podcasts/Cultura de Segurança/1.1 Responsabilização pela Qualidade.m4a",
                questions: []
            },
            "rop-1-2": {
                title: "ROP 1.2 – Gestão de Incidentes sobre a Segurança dos Pacientes",
                audioFile: "Podcasts/Cultura de Segurança/1.2 Gestão de Incidentes sobre a Segurança dos Pacientes.m4a",
                questions: []
            },
            "rop-1-3": {
                title: "ROP 1.3 – Relatórios Trimestrais sobre a Segurança dos Pacientes",
                audioFile: "Podcasts/Cultura de Segurança/1.3 Relatórios Trimestrais sobre a Segurança dos Pacientes.m4a",
                questions: []
            },
            "rop-1-4": {
                title: "ROP 1.4 – Divulgação de Incidentes (Disclosure)",
                audioFile: "Podcasts/Cultura de Segurança/1.4 Divulgação de Incidentes (Disclosure).m4a",
                questions: []
            }
        }
    },

    // ==================== MACRO ÁREA 2 - COMUNICAÇÃO (8 ROPs) ====================
    "comunicacao": {
        title: "Comunicação",
        icon: "fas fa-comments",
        color: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
        subdivisoes: {
            "rop-2-1": {
                title: "ROP 2.1 – Identificação do Cliente",
                audioFile: null,
                questions: []
            },
            "rop-2-2": {
                title: "ROP 2.2 – Lista de Abreviações Perigosas",
                audioFile: null,
                questions: []
            },
            "rop-2-3": {
                title: "ROP 2.3 – Conciliação Medicamentosa como Prioridade Estratégica",
                audioFile: null,
                questions: []
            },
            "rop-2-4": {
                title: "ROP 2.4 – Conciliação em Serviços de Assistência Aguda (Internação)",
                audioFile: null,
                questions: []
            },
            "rop-2-5": {
                title: "ROP 2.5 – Conciliação em Atendimento Ambulatorial",
                audioFile: null,
                questions: []
            },
            "rop-2-6": {
                title: "ROP 2.6 – Conciliação no Serviço de Emergência",
                audioFile: null,
                questions: []
            },
            "rop-2-7": {
                title: "ROP 2.7 – Lista de Verificação para Cirurgia Segura",
                audioFile: null,
                questions: []
            },
            "rop-2-8": {
                title: "ROP 2.8 – Transferência de Informações nas Transições (Handoff)",
                audioFile: null,
                questions: []
            }
        }
    },

    // ==================== MACRO ÁREA 3 - USO DE MEDICAMENTOS (6 ROPs) ====================
    "uso-medicamentos": {
        title: "Uso de Medicamentos",
        icon: "fas fa-pills",
        color: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
        subdivisoes: {
            "rop-3-1": { title: "ROP 3.1 – Uso Racional de Antimicrobianos", audioFile: null, questions: [] },
            "rop-3-2": { title: "ROP 3.2 – Eletrólitos Concentrados", audioFile: null, questions: [] },
            "rop-3-3": { title: "ROP 3.3 – Segurança no Uso da Heparina", audioFile: null, questions: [] },
            "rop-3-4": { title: "ROP 3.4 – Medicamentos de Alta Vigilância (MAV)", audioFile: null, questions: [] },
            "rop-3-5": { title: "ROP 3.5 – Segurança das Bombas de Infusão", audioFile: null, questions: [] },
            "rop-3-6": { title: "ROP 3.6 – Segurança no Uso de Narcóticos (Opioides)", audioFile: null, questions: [] }
        }
    },

    // ==================== MACRO ÁREA 4 - VIDA PROFISSIONAL (5 ROPs) ====================
    "vida-profissional": {
        title: "Vida Profissional / Força de Trabalho",
        icon: "fas fa-user-friends",
        color: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
        subdivisoes: {
            "rop-4-1": { title: "ROP 4.1 – Programa de Manutenção Preventiva", audioFile: null, questions: [] },
            "rop-4-2": { title: "ROP 4.2 – Segurança do Paciente: Capacitação e Treinamento", audioFile: null, questions: [] },
            "rop-4-3": { title: "ROP 4.3 – Prevenção de Violência no Local de Trabalho", audioFile: null, questions: [] },
            "rop-4-4": { title: "ROP 4.4 – Fluxo de Clientes", audioFile: null, questions: [] },
            "rop-4-5": { title: "ROP 4.5 – Plano de Segurança do Paciente", audioFile: null, questions: [] }
        }
    },

    // ==================== MACRO ÁREA 5 - PREVENÇÃO DE INFECÇÕES (4 ROPs) ====================
    "prevencao-infeccoes": {
        title: "Prevenção de Infecções",
        icon: "fas fa-hand-sparkles",
        color: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
        subdivisoes: {
            "rop-5-1": { title: "ROP 5.1 – Aderência às Práticas de Higiene das Mãos", audioFile: null, questions: [] },
            "rop-5-2": { title: "ROP 5.2 – Higiene das Mãos: Capacitação e Treinamento", audioFile: null, questions: [] },
            "rop-5-3": { title: "ROP 5.3 – Taxas de Infecção", audioFile: null, questions: [] },
            "rop-5-4": { title: "ROP 5.4 – Reprocessamento", audioFile: null, questions: [] }
        }
    },

    // ==================== MACRO ÁREA 6 - AVALIAÇÃO DE RISCOS (5 ROPs) ====================
    "avaliacao-riscos": {
        title: "Avaliação de Riscos",
        icon: "fas fa-exclamation-triangle",
        color: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
        subdivisoes: {
            "rop-6-1": { title: "ROP 6.1 – Prevenção de Quedas e Redução de Lesões (Internação)", audioFile: null, questions: [] },
            "rop-6-2": { title: "ROP 6.2 – Prevenção de Úlceras por Pressão", audioFile: null, questions: [] },
            "rop-6-3": { title: "ROP 6.3 – Prevenção de Suicídio", audioFile: null, questions: [] },
            "rop-6-4": { title: "ROP 6.4 – Profilaxia para Tromboembolia Venosa (TEV)", audioFile: null, questions: [] },
            "rop-6-5": { title: "ROP 6.5 – Tratamento da Pele e Feridas", audioFile: null, questions: [] }
        }
    }
};

// Cache de questões carregadas
let questionsCache = null;

// Função para carregar questões do JSON
async function loadROPsQuestions() {
    if (questionsCache) {
        return questionsCache;
    }
    
    try {
        const response = await fetch('rops-questions.json');
        questionsCache = await response.json();
        
        // Integrar questões no ropsData
        Object.keys(ropsData).forEach(macroKey => {
            const macro = ropsData[macroKey];
            Object.keys(macro.subdivisoes).forEach(ropKey => {
                if (questionsCache[ropKey]) {
                    macro.subdivisoes[ropKey].questions = questionsCache[ropKey];
                }
            });
        });
        
        console.log('✅ Questões ROPs carregadas:', Object.keys(questionsCache).length);
        return questionsCache;
    } catch (error) {
        console.error('❌ Erro ao carregar questões:', error);
        return {};
    }
}

// Carregar questões automaticamente
loadROPsQuestions().then(() => {
    console.log('✅ ROPs carregadas (versão ASSÍNCRONA com 32 ROPs):', Object.keys(ropsData));
});

