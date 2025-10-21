const pages = {
    painel: {
        title: "Anest-App",
        type: 'custom',
        render: renderPainel
    },
    comunicados_lista: {
        title: "Últimos Comunicados",
        type: 'custom',
        render: renderComunicadosLista
    },
    minhas_pendencias: {
        title: "Minhas Pendências",
        type: 'custom',
        render: renderMinhasPendencias
    },
    kpis_menu: {
        title: "Indicadores de Qualidade",
        type: 'custom',
        render: renderKPIsMenu
    },
    rops_desafio: {
        title: "ROPs Desafio",
        type: 'custom',
        render: renderROPsDesafio
    },
    residencia_medica: {
        title: "Residência Médica",
        type: 'custom',
        render: renderResidenciaMedica
    },
    kpi_higiene_maos: {
        title: "Adesão à Higiene das Mãos",
        type: 'custom',
        render: renderKPIGenerico
    },
    kpi_notificacao_incidentes: {
        title: "Taxa de Notificação de Incidentes",
        type: 'custom',
        render: renderKPIGenerico
    },
    kpi_nvpo: {
        title: "Incidência de NVPO",
        type: 'custom',
        render: renderKPIGenerico
    },
    kpi_controle_dor: {
        title: "Controle da Dor Pós-operatória",
        type: 'custom',
        render: renderKPIGenerico
    },
    kpi_satisfacao: {
        title: "Satisfação do Paciente",
        type: 'custom',
        render: renderKPIGenerico
    },
    qualidade: {
        title: "Qualidade e Segurança",
        type: 'custom',
        render: renderQualidade
    },
    gestao_incidentes: {
        title: "Gestão de Incidentes",
        type: 'custom',
        render: renderGestaoIncidentes
    },
    auditorias_menu: {
        title: "Auditorias e Conformidade",
        type: 'custom',
        render: renderAuditoriasMenu
    },
    relatorios_menu: {
        title: "Relatórios de Segurança",
        type: 'custom',
        render: renderRelatoriosMenu
    },
    auditoria_higiene_maos: {
        title: "Auditoria - Higiene das Mãos",
        type: 'custom',
        render: renderDocumentoGenerico
    },
    auditoria_medicamentos: {
        title: "Auditoria - Medicamentos",
        type: 'custom',
        render: renderDocumentoGenerico
    },
    auditoria_abreviaturas: {
        title: "Auditoria - Abreviaturas",
        type: 'custom',
        render: renderDocumentoGenerico
    },
    relatorio_trimestral: {
        title: "Relatório Trimestral",
        type: 'custom',
        render: renderDocumentoGenerico
    },
    relatorio_incidentes: {
        title: "Consolidado de Incidentes",
        type: 'custom',
        render: renderDocumentoGenerico
    },
    relatorio_auditorias: {
        title: "Relatório de Auditorias",
        type: 'custom',
        render: renderDocumentoGenerico
    },
    protocolos: {
        title: "Protocolos",
        type: 'custom',
        render: renderProtocolos
    },
    biblioteca_documentos: {
        title: "Biblioteca de Documentos",
        type: 'custom',
        render: renderBibliotecaDocumentos
    },
    seguranca_medicamentos: {
        title: "Segurança de Medicamentos",
        type: 'custom',
        render: renderSegurancaMedicamentos
    },
    controle_infeccao: {
        title: "Controle de Infecção",
        type: 'custom',
        render: renderControleInfeccao
    },
    docs_protocolos: {
        title: "Protocolos",
        type: 'custom',
        render: renderDocumentos
    },
    docs_politicas: {
        title: "Políticas",
        type: 'custom',
        render: renderDocumentos
    },
    docs_formularios: {
        title: "Formulários",
        type: 'custom',
        render: renderDocumentos
    },
    docs_manuais: {
        title: "Manuais",
        type: 'custom',
        render: renderDocumentos
    },
    docs_relatorios: {
        title: "Relatórios",
        type: 'custom',
        render: renderDocumentos
    },
    docs_processos: {
        title: "Processos",
        type: 'custom',
        render: renderDocumentos
    },
    docs_riscos: {
        title: "Riscos",
        type: 'custom',
        render: renderDocumentos
    },
    docs_termos: {
        title: "Termos",
        type: 'custom',
        render: renderDocumentos
    },
    meds_alta_vigilancia: {
        title: "MAVs",
        type: 'custom',
        render: renderDocumentoGenerico
    },
    meds_eletrolitos: {
        title: "Eletrólitos Concentrados",
        type: 'custom',
        render: renderDocumentoGenerico
    },
    meds_heparina: {
        title: "Heparina",
        type: 'custom',
        render: renderDocumentoGenerico
    },
    meds_narcoticos: {
        title: "Narcóticos",
        type: 'custom',
        render: renderDocumentoGenerico
    },
    meds_abreviaturas: {
        title: "Abreviaturas Perigosas",
        type: 'custom',
        render: renderDocumentoGenerico
    },
    protocolo_higiene_maos: {
        title: "Protocolo de Higiene das Mãos",
        type: 'custom',
        render: renderDocumentoGenerico
    },
    ferramentas: {
        title: "Ferramentas",
        type: 'custom',
        render: renderFerramentas
    },
    checklist_cirurgia: {
        title: "Checklist de Cirurgia Segura",
        type: 'custom',
        render: renderChecklistCirurgia
    },
    conciliacao_menu: {
        title: "Conciliação Medicamentosa",
        type: 'custom',
        render: renderConciliacaoMenu
    },
    avaliacao_riscos: {
        title: "Avaliação de Riscos",
        type: 'custom',
        render: renderAvaliacaoRiscos
    },
    calculadoras_menu: {
        title: "Calculadoras Anestésicas",
        type: 'custom',
        render: renderCalculadorasMenu
    },
    conciliacao_admissao: {
        title: "Conciliação - Admissão",
        type: 'custom',
        render: renderDocumentoGenerico
    },
    conciliacao_transferencia: {
        title: "Conciliação - Transferência",
        type: 'custom',
        render: renderDocumentoGenerico
    },
    conciliacao_alta: {
        title: "Conciliação - Alta",
        type: 'custom',
        render: renderDocumentoGenerico
    },
    risco_quedas_menu: {
        title: "Risco de Quedas",
        type: 'custom',
        render: renderRiscoQuedasMenu
    },
    risco_ulceras_menu: {
        title: "Úlceras de Pressão",
        type: 'custom',
        render: renderRiscoUlcerasMenu
    },
    risco_tev_menu: {
        title: "Risco de TEV",
        type: 'custom',
        render: renderRiscoTEVMenu
    },
    protocolo_quedas: {
        title: "Protocolo de Prevenção de Quedas",
        type: 'custom',
        render: renderDocumentoGenerico
    },
    protocolo_ulceras: {
        title: "Protocolo de Prevenção de Úlceras",
        type: 'custom',
        render: renderDocumentoGenerico
    },
    protocolo_tev: {
        title: "Protocolo de Profilaxia de TEV",
        type: 'custom',
        render: renderDocumentoGenerico
    },
    calc_anestesiologia: {
        title: "Calculadoras - Anestesiologia",
        type: 'custom',
        render: renderCalcAnestesiologia
    },
    calc_dose_drogas: {
        title: "Calculadoras - Dose de Drogas",
        type: 'custom',
        render: renderCalcDoseDrogas
    },
    calc_pediatria: {
        title: "Calculadoras - Pediatria",
        type: 'custom',
        render: renderCalcPediatria
    },
    calc_indices: {
        title: "Calculadoras - Índices",
        type: 'custom',
        render: renderCalcIndices
    },
    calc_regional: {
        title: "Calculadoras - Anestesia Regional",
        type: 'custom',
        render: renderCalcRegional
    },
    calc_fluidos: {
        title: "Calculadoras - Fluidos",
        type: 'custom',
        render: renderCalcFluidos
    },
};
