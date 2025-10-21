#!/usr/bin/env python3
# Script para adicionar todas as páginas do sitemap ao objeto pages

# Definir todas as páginas do sitemap
sitemap_pages = {
    # ==================== PAINEL ====================
    "painel": {"title": "Anest-App", "render": "renderPainel"},
    "comunicados_lista": {"title": "Últimos Comunicados", "render": "renderComunicadosLista"},
    "minhas_pendencias": {"title": "Minhas Pendências", "render": "renderMinhasPendencias"},
    "kpis_menu": {"title": "Indicadores de Qualidade", "render": "renderKPIsMenu"},
    "rops_desafio": {"title": "ROPs Desafio", "render": "renderROPsDesafio"},
    "residencia_medica": {"title": "Residência Médica", "render": "renderResidenciaMedica"},
    
    # KPIs individuais
    "kpi_higiene_maos": {"title": "Adesão à Higiene das Mãos", "render": "renderKPIGenerico"},
    "kpi_notificacao_incidentes": {"title": "Taxa de Notificação de Incidentes", "render": "renderKPIGenerico"},
    "kpi_nvpo": {"title": "Incidência de NVPO", "render": "renderKPIGenerico"},
    "kpi_controle_dor": {"title": "Controle da Dor Pós-operatória", "render": "renderKPIGenerico"},
    "kpi_satisfacao": {"title": "Satisfação do Paciente", "render": "renderKPIGenerico"},
    
    # ==================== QUALIDADE ====================
    "qualidade": {"title": "Qualidade e Segurança", "render": "renderQualidade"},
    "gestao_incidentes": {"title": "Gestão de Incidentes", "render": "renderGestaoIncidentes"},
    "auditorias_menu": {"title": "Auditorias e Conformidade", "render": "renderAuditoriasMenu"},
    "relatorios_menu": {"title": "Relatórios de Segurança", "render": "renderRelatoriosMenu"},
    
    # Auditorias
    "auditoria_higiene_maos": {"title": "Auditoria - Higiene das Mãos", "render": "renderDocumentoGenerico"},
    "auditoria_medicamentos": {"title": "Auditoria - Medicamentos", "render": "renderDocumentoGenerico"},
    "auditoria_abreviaturas": {"title": "Auditoria - Abreviaturas", "render": "renderDocumentoGenerico"},
    
    # Relatórios
    "relatorio_trimestral": {"title": "Relatório Trimestral", "render": "renderDocumentoGenerico"},
    "relatorio_incidentes": {"title": "Consolidado de Incidentes", "render": "renderDocumentoGenerico"},
    "relatorio_auditorias": {"title": "Relatório de Auditorias", "render": "renderDocumentoGenerico"},
    
    # ==================== PROTOCOLOS ====================
    "protocolos": {"title": "Protocolos", "render": "renderProtocolos"},
    "biblioteca_documentos": {"title": "Biblioteca de Documentos", "render": "renderBibliotecaDocumentos"},
    "seguranca_medicamentos": {"title": "Segurança de Medicamentos", "render": "renderSegurancaMedicamentos"},
    "controle_infeccao": {"title": "Controle de Infecção", "render": "renderControleInfeccao"},
    
    # Documentos por categoria
    "docs_protocolos": {"title": "Protocolos", "render": "renderDocumentos"},
    "docs_politicas": {"title": "Políticas", "render": "renderDocumentos"},
    "docs_formularios": {"title": "Formulários", "render": "renderDocumentos"},
    "docs_manuais": {"title": "Manuais", "render": "renderDocumentos"},
    "docs_relatorios": {"title": "Relatórios", "render": "renderDocumentos"},
    "docs_processos": {"title": "Processos", "render": "renderDocumentos"},
    "docs_riscos": {"title": "Riscos", "render": "renderDocumentos"},
    "docs_termos": {"title": "Termos", "render": "renderDocumentos"},
    
    # Segurança de Medicamentos
    "meds_alta_vigilancia": {"title": "MAVs", "render": "renderDocumentoGenerico"},
    "meds_eletrolitos": {"title": "Eletrólitos Concentrados", "render": "renderDocumentoGenerico"},
    "meds_heparina": {"title": "Heparina", "render": "renderDocumentoGenerico"},
    "meds_narcoticos": {"title": "Narcóticos", "render": "renderDocumentoGenerico"},
    "meds_abreviaturas": {"title": "Abreviaturas Perigosas", "render": "renderDocumentoGenerico"},
    
    # Controle de Infecção
    "protocolo_higiene_maos": {"title": "Protocolo de Higiene das Mãos", "render": "renderDocumentoGenerico"},
    
    # ==================== FERRAMENTAS ====================
    "ferramentas": {"title": "Ferramentas", "render": "renderFerramentas"},
    "checklist_cirurgia": {"title": "Checklist de Cirurgia Segura", "render": "renderChecklistCirurgia"},
    "conciliacao_menu": {"title": "Conciliação Medicamentosa", "render": "renderConciliacaoMenu"},
    "avaliacao_riscos": {"title": "Avaliação de Riscos", "render": "renderAvaliacaoRiscos"},
    "calculadoras_menu": {"title": "Calculadoras Anestésicas", "render": "renderCalculadorasMenu"},
    
    # Conciliação
    "conciliacao_admissao": {"title": "Conciliação - Admissão", "render": "renderDocumentoGenerico"},
    "conciliacao_transferencia": {"title": "Conciliação - Transferência", "render": "renderDocumentoGenerico"},
    "conciliacao_alta": {"title": "Conciliação - Alta", "render": "renderDocumentoGenerico"},
    
    # Avaliação de Riscos
    "risco_quedas_menu": {"title": "Risco de Quedas", "render": "renderRiscoQuedasMenu"},
    "risco_ulceras_menu": {"title": "Úlceras de Pressão", "render": "renderRiscoUlcerasMenu"},
    "risco_tev_menu": {"title": "Risco de TEV", "render": "renderRiscoTEVMenu"},
    
    # Protocolos de risco
    "protocolo_quedas": {"title": "Protocolo de Prevenção de Quedas", "render": "renderDocumentoGenerico"},
    "protocolo_ulceras": {"title": "Protocolo de Prevenção de Úlceras", "render": "renderDocumentoGenerico"},
    "protocolo_tev": {"title": "Protocolo de Profilaxia de TEV", "render": "renderDocumentoGenerico"},
    
    # Calculadoras
    "calc_anestesiologia": {"title": "Calculadoras - Anestesiologia", "render": "renderCalcAnestesiologia"},
    "calc_dose_drogas": {"title": "Calculadoras - Dose de Drogas", "render": "renderCalcDoseDrogas"},
    "calc_pediatria": {"title": "Calculadoras - Pediatria", "render": "renderCalcPediatria"},
    "calc_indices": {"title": "Calculadoras - Índices", "render": "renderCalcIndices"},
    "calc_regional": {"title": "Calculadoras - Anestesia Regional", "render": "renderCalcRegional"},
    "calc_fluidos": {"title": "Calculadoras - Fluidos", "render": "renderCalcFluidos"},
}

# Gerar o código JavaScript
js_code = "const pages = {\n"

for page_id, page_data in sitemap_pages.items():
    js_code += f"    {page_id}: {{\n"
    js_code += f"        title: \"{page_data['title']}\",\n"
    js_code += f"        type: 'custom',\n"
    js_code += f"        render: {page_data['render']}\n"
    js_code += f"    }},\n"

js_code += "};\n"

# Salvar em arquivo
with open('sitemap-pages-generated.js', 'w', encoding='utf-8') as f:
    f.write(js_code)

print(f"✅ {len(sitemap_pages)} páginas geradas em sitemap-pages-generated.js")

