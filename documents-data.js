// ==================== DOCUMENTOS E ARQUIVOS DA ANEST ====================

const documentsData = {
    protocolos: [
        {
            title: "Avaliação Pré-Anestésica",
            file: "./Documentos/1 - Protocolos/PRO.ANEST.0001-00 avaliação pré anestesica.pdf",
            codigo: "PRO.ANEST.0001-00",
            categoria: "Anestesia"
        },
        {
            title: "Manejo da Cefaléia Pós Punção Dural",
            file: "./Documentos/1 - Protocolos/PRO.ANEST.0002-00 Manejo da cefaleira pós punção dural.pdf",
            codigo: "PRO.ANEST.0002-00",
            categoria: "Anestesia"
        },
        {
            title: "Manutenção da Normotermia",
            file: "./Documentos/1 - Protocolos/PRO.CCG.0011-01 Manutenção da normotermia.pdf",
            codigo: "PRO.CCG.0011-01",
            categoria: "Cuidados Gerais"
        },
        {
            title: "Profilaxia, Tratamento e Resgate de Dor Aguda Pós-Operatória na SRPA",
            file: "./Documentos/1 - Protocolos/PRO.CCG.0018-00 Profilaxia tratamento e resgate de dor aguda pós operatoria na SRPA..pdf",
            codigo: "PRO.CCG.0018-00",
            categoria: "Cuidados Gerais"
        },
        {
            title: "Prevenção e Manejo de Intoxicação por Anestésicos Locais",
            file: "./Documentos/1 - Protocolos/PRO.CCG.0020-00 Prevenção e manejo de intoxicação por anestésicos locais.pdf",
            codigo: "PRO.CCG.0020-00",
            categoria: "Cuidados Gerais"
        },
        {
            title: "Protocolo de Prevenção da Broncoaspiração",
            file: "./Documentos/1 - Protocolos/PRO.INSH.0007-16 Protocolo de prevenção da broncoaspiração..pdf",
            codigo: "PRO.INSH.0007-16",
            categoria: "Segurança Hospitalar"
        },
        {
            title: "Prevenção de Deterioração Clínica no Adulto - MEWS",
            file: "./Documentos/1 - Protocolos/PRO.INSH.0008-12 Prevenção de Deterioração Clínica no Adulto - MEWS.pdf",
            codigo: "PRO.INSH.0008-12",
            categoria: "Segurança Hospitalar"
        },
        {
            title: "Prevenção de Alergia ao Látex",
            file: "./Documentos/1 - Protocolos/PRO.INSH.0009-04 Prevenção de Alergia ao látex(AG. Anest 15.02.24).pdf",
            codigo: "PRO.INSH.0009-04",
            categoria: "Segurança Hospitalar"
        },
        {
            title: "Prevenção de TEV (Tromboembolismo Venoso)",
            file: "./Documentos/1 - Protocolos/PRO.INSH.0053-05 Prevenção de TEV (AG. ANALICE 22.04) (2).docx.pdf",
            codigo: "PRO.INSH.0053-05",
            categoria: "Segurança Hospitalar"
        },
        {
            title: "Gestão de Medicamentos de Alta Vigilância",
            file: "./Documentos/1 - Protocolos/PRO.INSH.0080-13 Gestão de Medicamentos de Alta Vigilância (AG. Iara 30.04.24).docx.pdf",
            codigo: "PRO.INSH.0080-13",
            categoria: "Segurança Hospitalar"
        },
        {
            title: "Manejo da Glicemia",
            file: "./Documentos/1 - Protocolos/PRO.INSH.0094_00 Manejo glicemia.pdf",
            codigo: "PRO.INSH.0094-00",
            categoria: "Segurança Hospitalar"
        },
        {
            title: "Abreviação de Jejum Prolongado",
            file: "./Documentos/1 - Protocolos/PRO.NUT.0002-19 Abreviação de jejum prolongado(AG. Anest 15.02.24).pdf",
            codigo: "PRO.NUT.0002-19",
            categoria: "Nutrição"
        },
        {
            title: "Recuperação Pós-Anestésica",
            file: "./Documentos/1 - Protocolos/PRO.RPA.0003-00 Recuperação pós anestésica.pdf",
            codigo: "PRO.RPA.0003-00",
            categoria: "RPA"
        },
        {
            title: "Prevenção de Náusea e Vômito no Pós-Operatório",
            file: "./Documentos/1 - Protocolos/PRO.RPA.0004-00 Prevenção de náusea e vômito no pós-operatório.pdf",
            codigo: "PRO.RPA.0004-00",
            categoria: "RPA"
        },
        {
            title: "Antibioticoprofilaxia Cirúrgica",
            file: "./Documentos/1 - Protocolos/PRO.SCI.0007-14 Antibioticoprofilaxia cirúrgica.pdf",
            codigo: "PRO.SCI.0007-14",
            categoria: "Cirurgia"
        },
        {
            title: "Identificação do Cliente",
            file: "./Documentos/1 - Protocolos/PT 02 Identificação do cliente.pdf",
            codigo: "PT 02",
            categoria: "Segurança"
        },
        {
            title: "Higiene de Mãos",
            file: "./Documentos/1 - Protocolos/PT 03 Higiene de Mãos.pdf",
            codigo: "PT 03",
            categoria: "Segurança"
        }
    ],

    politicas: [
        {
            title: "Política de Gestão da Qualidade",
            file: "./Documentos/2 - Politicas/PLI.ANEST.0001-00 Politica de gestão da qualidade.pdf",
            codigo: "PLI.ANEST.0001-00",
            categoria: "Gestão"
        }
    ],

    formularios: [
        {
            title: "Análise Crítica de Eventos com Danos e Óbitos",
            file: "./Documentos/3 - Formulários/FOR.ANEST 0001-00 Análise critica de eventos com danos e óbitos..odt",
            codigo: "FOR.ANEST.0001-00",
            tipo: "ODT"
        },
        {
            title: "Score de Eberhart - Risco de NVPO em Crianças",
            file: "./Documentos/3 - Formulários/FOR.RPA.0001 Score de Eberhart   - Risco de náuseas e vômitos pós-operatórios para crianças.docx",
            codigo: "FOR.RPA.0001",
            tipo: "DOCX"
        },
        {
            title: "Score de Apfel - Risco de NVPO em Adultos",
            file: "./Documentos/3 - Formulários/FOR.RPA.00012 Score de Apfel  - Risco de náuseas e vômitos pós-operatórios (NVPO) - ADULTOS.docx",
            codigo: "FOR.RPA.00012",
            tipo: "DOCX"
        },
        {
            title: "Avaliação Pré-Anestésica - Internado",
            file: "./Documentos/3 - Formulários/FOR.RPA.0010-00 Avaliação pré anestésica - Internado.docx",
            codigo: "FOR.RPA.0010-00",
            tipo: "DOCX"
        },
        {
            title: "Evolução Anestesista - Intraoperatório",
            file: "./Documentos/3 - Formulários/FOR.RPA.0011-00 Evolução anestesista - Intraoperatório.odt",
            codigo: "FOR.RPA.0011-00",
            tipo: "ODT"
        },
        {
            title: "Evolução - Intervenções ou Intercorrências",
            file: "./Documentos/3 - Formulários/FOR.RPA.00012  EVOLUÇÃO ANEST - INTERVENÇÕES OU INTERCORRENCIAS.docx",
            codigo: "FOR.RPA.00012",
            tipo: "DOCX"
        },
        {
            title: "Evolução Alta da Recuperação Anestésica",
            file: "./Documentos/3 - Formulários/FOR.RPA.0013-00 Evolução alta da recuperação anestésica.docx",
            codigo: "FOR.RPA.0013-00",
            tipo: "DOCX"
        },
        {
            title: "Evolução de Admissão na Recuperação Anestésica",
            file: "./Documentos/3 - Formulários/FOR.RPA.0014-00 Evolução de admissão na recuperação anestésica.docx",
            codigo: "FOR.RPA.0014-00",
            tipo: "DOCX"
        },
        {
            title: "Evolução ANEST - Avaliação Pré - Internado",
            file: "./Documentos/3 - Formulários/XXX.NQS.0037-00 EVOLUÇÃO ANEST - AVALIAÇÃO PRÉ - INTERNADO (AG DR.GUILHERME).docx",
            codigo: "XXX.NQS.0037-00",
            tipo: "DOCX"
        },
        {
            title: "Evolução ANEST - Intraoperatório",
            file: "./Documentos/3 - Formulários/XXX.NQS.0037-00 EVOLUCAO ANEST - INT RAOPERATORIO (AG. DR.GUILHERME).docx",
            codigo: "XXX.NQS.0037-00",
            tipo: "DOCX"
        },
        {
            title: "Evolução ANEST - Intervenções ou Intercorrências",
            file: "./Documentos/3 - Formulários/XXX.NQS.0037-00 EVOLUÇÃO ANEST - INTERVENÇÕES OU INTERCORRENCIAS (AG DR.GUILHERME).docx",
            codigo: "XXX.NQS.0037-00",
            tipo: "DOCX"
        },
        {
            title: "Evolução ANEST - Sala de Recuperação - Admissão",
            file: "./Documentos/3 - Formulários/XXX.NQS.0037-00 EVOLUÇÃO ANEST - SALA DE RECUPERAÇÃO - ADMISSÃO (AG.DR.GUILHERME).docx",
            codigo: "XXX.NQS.0037-00",
            tipo: "DOCX"
        },
        {
            title: "Evolução ANEST - Sala de Recuperação - Alta",
            file: "./Documentos/3 - Formulários/XXX.NQS.0037-00 EVOLUCAO ANEST - SALA DE  RECUPERACAO - ALTA (AG DR.GUILHERME).docx",
            codigo: "XXX.NQS.0037-00",
            tipo: "DOCX"
        }
    ],

    manuais: [
        {
            title: "Manual de Gestão Documental",
            file: "./Documentos/4 - Manuais/MAN.NQS.0001.00 Manual de gestão documental^.pdf",
            codigo: "MAN.NQS.0001.00",
            categoria: "Gestão"
        },
        {
            title: "Manual Qmentum - Novas ROPs",
            file: "./Documentos/4 - Manuais/2023 - Manual Qmentum - NOVAS ROPs 2.pdf",
            ano: "2023",
            categoria: "Qmentum"
        },
        {
            title: "Manual Qmentum - Serviços de Anestesia",
            file: "./Documentos/4 - Manuais/2023 - Manual Qmentum - SERVIÇOS DE ANESTESIA.pdf",
            ano: "2023",
            categoria: "Qmentum"
        }
    ],

    relatorios: [
        {
            title: "Relatório de Segurança - 3º Trimestre 2024",
            file: "./Documentos/4 - Relatórios de Segurança/RELATÓRIO DE SEGURANÇA 3° TRIMESTRE 2024.pdf",
            periodo: "3º Trimestre 2024",
            tipo: "Trimestral"
        },
        {
            title: "Segurança do Paciente - Serviço de Anestesia ANEST Chapecó",
            file: "./Documentos/4 - Relatórios de Segurança/Seguranca-do-Paciente-Servico-de-Anestesia-ANEST-Chapeco.pdf",
            tipo: "Anual"
        },
        {
            title: "Divisão de Indicadores",
            file: "./Documentos/4 - Relatórios de Segurança/DIVISÃO INDICADORES.pdf",
            tipo: "Indicadores"
        }
    ],

    processos: [
        {
            title: "Mapa de Processos - Serviço de Anestesia (SIPOC)",
            file: "./Documentos/5 - Mapeamento de Processos/MAP.ANEST 0001-00 Mapa de processos serviço anestesia (SIPOC).pdf",
            codigo: "MAP.ANEST.0001-00",
            tipo: "SIPOC"
        }
    ],

    riscos: [
        {
            title: "Mapeamento de Riscos",
            file: "./Documentos/8 - Mapeamento dos Riscos/Mapeamento de Riscos.pdf",
            ano: "2024"
        }
    ],

    planoSeguranca: [
        {
            title: "Plano de Segurança do Paciente",
            file: "./Documentos/9 - Plano de Segurança do Paciente/PLA.ANEST.0001-00 Plano de segurança do paciente.pdf",
            codigo: "PLA.ANEST.0001-00",
            ano: "2024"
        }
    ]
};

// ==================== PODCASTS E ÁUDIO AULAS ====================

const podcastsData = {
    "cultura-seguranca": {
        title: "Cultura de Segurança",
        icon: "fas fa-shield-alt",
        color: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        audios: [
            {
                title: "ROP 1.1 - Responsabilização pela Qualidade",
                file: "./Podcasts/Cultura de Segurança/ROP 1.1 Cultura de Segurança – Responsabilização pela Qualidade.m4a",
                duracao: null, // Será detectado pelo player
                descricao: "Áudio aula sobre responsabilização pela qualidade e segurança do paciente"
            },
            {
                title: "ROP 1.2 - Gestão de Incidentes",
                file: "./Podcasts/Cultura de Segurança/ROP 1.2 Cultura de Segurança – Gestão de Incidentes sobre a Segurança dos Pacientes.m4a",
                duracao: null,
                descricao: "Áudio aula sobre gestão e notificação de incidentes de segurança"
            },
            {
                title: "ROP 1.3 - Relatórios Trimestrais",
                file: "./Podcasts/Cultura de Segurança/ROP 1.3 Cultura de Segurança – Relatórios Trimestrais sobre a Segurança dos Pacientes.m4a",
                duracao: null,
                descricao: "Áudio aula sobre elaboração e análise de relatórios trimestrais"
            },
            {
                title: "ROP 1.4 - Divulgação de Incidentes (Disclosure)",
                file: "./Podcasts/Cultura de Segurança/ROP 1.4 Cultura de Segurança – Divulgação de Incidentes (Disclosure).m4a",
                duracao: null,
                descricao: "Áudio aula sobre disclosure de incidentes para pacientes e familiares"
            }
        ]
    },
    "comunicacao": {
        title: "Comunicação",
        icon: "fas fa-comments",
        color: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
        audios: [
            {
                title: "ROP 2.1 - Identificação do Cliente",
                file: "./Podcasts/Comunicação/2.1 Comunicação - Idenfica�ão cliente.m4a",
                duracao: null,
                descricao: "Áudio aula sobre identificação segura do paciente"
            },
            {
                title: "ROP 2.2 - Abreviações Perigosas",
                file: "./Podcasts/Comunicação/2.2 Comunicação - Abreviações perigosas.m4a",
                duracao: null,
                descricao: "Áudio aula sobre lista de abreviações que não devem ser utilizadas"
            },
            {
                title: "ROP 2.3 - Conciliação Medicamentosa Estratégica",
                file: "./Podcasts/Comunicação/2.3 Comunicação - Conciliação medicamentosa Estratégica.m4a",
                duracao: null,
                descricao: "Áudio aula sobre conciliação medicamentosa como prioridade estratégica"
            },
            {
                title: "ROP 2.4 - Conciliação em Internação",
                file: "./Podcasts/Comunicação/2.4 Comunicação - Conciliação medicamentosa Internado.m4a",
                duracao: null,
                descricao: "Áudio aula sobre conciliação medicamentosa em serviços de assistência aguda"
            },
            {
                title: "ROP 2.5 - Conciliação Ambulatorial",
                file: "./Podcasts/Comunicação/2.5 Comunicação - Conciliação medicamentosa ambulatorial.m4a",
                duracao: null,
                descricao: "Áudio aula sobre conciliação medicamentosa em atendimento ambulatorial"
            },
            {
                title: "ROP 2.6 - Conciliação na Emergência",
                file: "./Podcasts/Comunicação/2.6 Comunicação - Conciliação medicamentosa Emergencia.m4a",
                duracao: null,
                descricao: "Áudio aula sobre conciliação medicamentosa no serviço de emergência"
            },
            {
                title: "ROP 2.7 - Cirurgia Segura",
                file: "./Podcasts/Comunicação/2.7 Comunicação - Cirurgia segura.m4a",
                duracao: null,
                descricao: "Áudio aula sobre lista de verificação para cirurgia segura"
            },
            {
                title: "ROP 2.8 - Transição de Cuidado",
                file: "./Podcasts/Comunicação/2.8 Comunicação - Transição Cuidado.m4a",
                duracao: null,
                descricao: "Áudio aula sobre transferência de informações nas transições (Handoff)"
            }
        ]
    },
    "uso-medicamentos": {
        title: "Uso de Medicamentos",
        icon: "fas fa-pills",
        color: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
        audios: [
            // Preparado para futuros áudios
        ]
    },
    "vida-profissional": {
        title: "Vida Profissional",
        icon: "fas fa-user-friends",
        color: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
        audios: [
            // Preparado para futuros áudios
        ]
    },
    "prevencao-infeccoes": {
        title: "Prevenção de Infecções",
        icon: "fas fa-hand-sparkles",
        color: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
        audios: [
            // Preparado para futuros áudios
        ]
    },
    "avaliacao-riscos": {
        title: "Avaliação de Riscos",
        icon: "fas fa-exclamation-circle",
        color: "linear-gradient(135deg, #30cfd0 0%, #330867 100%)",
        audios: [
            // Preparado para futuros áudios
        ]
    }
};

// Export for use in app
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { documentsData, podcastsData };
}

