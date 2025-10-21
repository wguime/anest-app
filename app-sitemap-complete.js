// ==================== SITEMAP COMPLETO - ESTRUTURA DE NAVEGAÇÃO ====================
// v8.3.0 - Sitemap Conforme Especificação Detalhada

// ==================== 1. PAINEL PRINCIPAL ====================
function renderPainel() {
    const userName = userProfile.firstName || 'Usuário';
    
    return `
        <div class="greeting">Olá, ${userName}</div>
        
        <div class="home-grid">
            <!-- Card 1: Últimos Comunicados -->
            <div class="grid-card" onclick="navigateTo('comunicados_lista')">
                <div class="grid-card-icon" style="background: linear-gradient(135deg, #f77062 0%, #fe5196 100%);">
                    <i class="fas fa-bullhorn"></i>
                </div>
                <div class="grid-card-title">Últimos Comunicados</div>
                <div class="grid-card-subtitle">Notícias e atualizações</div>
            </div>
            
            <!-- Card 2: Minhas Pendências -->
            <div class="grid-card" onclick="navigateTo('minhas_pendencias')">
                <div class="grid-card-icon" style="background: linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%);">
                    <i class="fas fa-tasks"></i>
                </div>
                <div class="grid-card-title">Minhas Pendências</div>
                <div class="grid-card-subtitle">Leituras e treinamentos</div>
            </div>
            
            <!-- Card 3: Indicadores de Qualidade -->
            <div class="grid-card" onclick="navigateTo('kpis_menu')">
                <div class="grid-card-icon" style="background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);">
                    <i class="fas fa-chart-line"></i>
                </div>
                <div class="grid-card-title">Indicadores de Qualidade</div>
                <div class="grid-card-subtitle">Métricas de desempenho</div>
            </div>
            
            <!-- Card 4: ROPs Desafio -->
            <div class="grid-card" onclick="navigateTo('rops_desafio')">
                <div class="grid-card-icon" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
                    <i class="fas fa-trophy"></i>
                </div>
                <div class="grid-card-title">ROPs Desafio</div>
                <div class="grid-card-subtitle">Gamificação e ranking</div>
            </div>
            
            <!-- Card 5: Residência Médica -->
            <div class="grid-card" onclick="navigateTo('residencia_medica')">
                <div class="grid-card-icon" style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);">
                    <i class="fas fa-user-graduate"></i>
                </div>
                <div class="grid-card-title">Residência Médica</div>
                <div class="grid-card-subtitle">Calendário e atividades</div>
            </div>
        </div>
    `;
}

// ==================== 1.1 Últimos Comunicados ====================
function renderComunicadosLista() {
    return `
        <div class="page-header">
            <h1>📢 Últimos Comunicados</h1>
            <p>Notícias e atualizações da diretoria</p>
        </div>
        
        <div id="comunicados-container" style="padding: 20px;">
            <p style="color: rgba(255,255,255,0.7); text-align: center;">
                <i class="fas fa-spinner fa-spin"></i> Carregando comunicados...
            </p>
        </div>
    `;
}

// ==================== 1.2 Minhas Pendências ====================
function renderMinhasPendencias() {
    return `
        <div class="page-header">
            <h1>📝 Minhas Pendências</h1>
            <p>Tarefas e treinamentos pendentes</p>
        </div>
        
        <div id="pendencias-container" style="padding: 20px;">
            <p style="color: rgba(255,255,255,0.7); text-align: center;">
                <i class="fas fa-spinner fa-spin"></i> Carregando pendências...
            </p>
        </div>
    `;
}

// ==================== 1.3 Indicadores de Qualidade (KPIs) ====================
function renderKPIsMenu() {
    return `
        <div class="page-header">
            <h1>📊 Indicadores de Qualidade</h1>
            <p>Métricas de desempenho e segurança</p>
        </div>
        
        <div class="docs-grid">
            <div class="grid-card" onclick="navigateTo('kpi_higiene_maos')">
                <div class="grid-card-icon" style="background: #43e97b;">
                    <i class="fas fa-hands-wash"></i>
                </div>
                <div class="grid-card-title">Adesão à Higiene das Mãos</div>
            </div>
            
            <div class="grid-card" onclick="navigateTo('kpi_notificacao_incidentes')">
                <div class="grid-card-icon" style="background: #fbc2eb;">
                    <i class="fas fa-file-medical"></i>
                </div>
                <div class="grid-card-title">Taxa de Notificação de Incidentes</div>
            </div>
            
            <div class="grid-card" onclick="navigateTo('kpi_nvpo')">
                <div class="grid-card-icon" style="background: #4facfe;">
                    <i class="fas fa-face-frown-open"></i>
                </div>
                <div class="grid-card-title">Incidência de NVPO</div>
            </div>
            
            <div class="grid-card" onclick="navigateTo('kpi_controle_dor')">
                <div class="grid-card-icon" style="background: #f77062;">
                    <i class="fas fa-plus-square"></i>
                </div>
                <div class="grid-card-title">Controle da Dor Pós-operatória</div>
            </div>
            
            <div class="grid-card" onclick="navigateTo('kpi_satisfacao')">
                <div class="grid-card-icon" style="background: #f6d365;">
                    <i class="fas fa-star"></i>
                </div>
                <div class="grid-card-title">Satisfação do Paciente</div>
            </div>
        </div>
    `;
}

// ==================== 1.4 ROPs Desafio ====================
function renderROPsDesafio() {
    return `
        <div class="page-header">
            <h1>🏆 ROPs - Desafio de Conhecimento</h1>
            <p>Gamificação com questões e podcasts</p>
        </div>
        
        <div class="rops-grid">
            <div class="grid-card" onclick="navigateTo('rops_area_1')">
                <div class="grid-card-icon" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
                    <i class="fas fa-shield-alt"></i>
                </div>
                <div class="grid-card-title">Cultura de Segurança</div>
                <div class="grid-card-subtitle">
                    <div class="progress-bar"><div class="progress-fill" style="width: 0%"></div></div>
                    0% completo
                </div>
            </div>
            
            <div class="grid-card" onclick="navigateTo('rops_area_2')">
                <div class="grid-card-icon" style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);">
                    <i class="fas fa-comments"></i>
                </div>
                <div class="grid-card-title">Comunicação</div>
                <div class="grid-card-subtitle">
                    <div class="progress-bar"><div class="progress-fill" style="width: 0%"></div></div>
                    0% completo
                </div>
            </div>
            
            <div class="grid-card" onclick="navigateTo('rops_area_3')">
                <div class="grid-card-icon" style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);">
                    <i class="fas fa-pills"></i>
                </div>
                <div class="grid-card-title">Uso de Medicamentos</div>
                <div class="grid-card-subtitle">
                    <div class="progress-bar"><div class="progress-fill" style="width: 0%"></div></div>
                    0% completo
                </div>
            </div>
            
            <div class="grid-card" onclick="navigateTo('rops_area_4')">
                <div class="grid-card-icon" style="background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);">
                    <i class="fas fa-users"></i>
                </div>
                <div class="grid-card-title">Vida Profissional/Força de Trabalho</div>
                <div class="grid-card-subtitle">
                    <div class="progress-bar"><div class="progress-fill" style="width: 0%"></div></div>
                    0% completo
                </div>
            </div>
            
            <div class="grid-card" onclick="navigateTo('rops_area_5')">
                <div class="grid-card-icon" style="background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);">
                    <i class="fas fa-hand-sparkles"></i>
                </div>
                <div class="grid-card-title">Controle de Infecção</div>
                <div class="grid-card-subtitle">
                    <div class="progress-bar"><div class="progress-fill" style="width: 0%"></div></div>
                    0% completo
                </div>
            </div>
            
            <div class="grid-card" onclick="navigateTo('rops_area_6')">
                <div class="grid-card-icon" style="background: linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%);">
                    <i class="fas fa-exclamation-circle"></i>
                </div>
                <div class="grid-card-title">Avaliação do Grau de Risco</div>
                <div class="grid-card-subtitle">
                    <div class="progress-bar"><div class="progress-fill" style="width: 0%"></div></div>
                    0% completo
                </div>
            </div>
            
            <div class="grid-card" onclick="showRanking()">
                <div class="grid-card-icon" style="background: linear-gradient(135deg, #f6d365 0%, #fda085 100%);">
                    <i class="fas fa-list-ol"></i>
                </div>
                <div class="grid-card-title">Ver Ranking Geral</div>
                <div class="grid-card-subtitle">Classificação dos usuários</div>
            </div>
        </div>
    `;
}

// ==================== 1.5 Residência Médica ====================
function renderResidenciaMedica() {
    return `
        <div class="page-header">
            <h1>👨‍⚕️ Residência Médica</h1>
            <p>Calendário interativo e informações de estágios</p>
        </div>
        
        <div style="padding: 20px;">
            <div id="calendario-interativo" class="calendario-container">
                <p style="color: rgba(255,255,255,0.7); text-align: center;">
                    <i class="fas fa-calendar-alt" style="font-size: 3rem; margin-bottom: 10px; display: block;"></i>
                    Calendário interativo será carregado aqui
                </p>
            </div>
            
            <div id="info-dia-selecionado" class="info-dia" style="margin-top: 20px; display: none;">
                <h3>📅 Informações do Dia</h3>
                <div id="plantonista-dia"></div>
                <div id="estagios-dia"></div>
            </div>
        </div>
    `;
}

// ==================== 2. QUALIDADE E SEGURANÇA ====================
function renderQualidade() {
    return `
        <div class="page-header">
            <h1>🛡️ Qualidade e Segurança</h1>
            <p>Gestão de segurança do paciente e conformidade</p>
        </div>
        
        <div class="docs-grid">
            <!-- Gestão de Incidentes -->
            <div class="grid-card" onclick="navigateTo('gestao_incidentes')">
                <div class="grid-card-icon" style="background: #f77062;">
                    <i class="fas fa-exclamation-triangle"></i>
                </div>
                <div class="grid-card-title">Gestão de Incidentes</div>
                <div class="grid-card-subtitle">Notificar eventos adversos</div>
            </div>
            
            <!-- Auditorias e Conformidade -->
            <div class="grid-card" onclick="navigateTo('auditorias_menu')">
                <div class="grid-card-icon" style="background: #4facfe;">
                    <i class="fas fa-clipboard-check"></i>
                </div>
                <div class="grid-card-title">Auditorias e Conformidade</div>
                <div class="grid-card-subtitle">Evidências de auditorias</div>
            </div>
            
            <!-- Relatórios de Segurança -->
            <div class="grid-card" onclick="navigateTo('relatorios_menu')">
                <div class="grid-card-icon" style="background: #43e97b;">
                    <i class="fas fa-file-alt"></i>
                </div>
                <div class="grid-card-title">Relatórios de Segurança</div>
                <div class="grid-card-subtitle">Relatórios trimestrais</div>
            </div>
        </div>
    `;
}

// ==================== 2.1 Gestão de Incidentes ====================
function renderGestaoIncidentes() {
    return `
        <div class="page-header">
            <h1>⚠️ Gestão de Incidentes</h1>
            <p>Formulário de notificação de eventos adversos</p>
        </div>
        
        <div id="form-incidentes-container" style="padding: 20px;">
            <p style="color: rgba(255,255,255,0.7); text-align: center;">
                Formulário de notificação será carregado aqui
            </p>
        </div>
    `;
}

// ==================== 2.2 Auditorias e Conformidade ====================
function renderAuditoriasMenu() {
    return `
        <div class="page-header">
            <h1>📋 Auditorias e Conformidade</h1>
            <p>Registro e evidências de auditorias</p>
        </div>
        
        <div class="docs-grid">
            <div class="grid-card" onclick="navigateTo('auditoria_higiene_maos')">
                <div class="grid-card-icon" style="background: #43e97b;">
                    <i class="fas fa-hands-wash"></i>
                </div>
                <div class="grid-card-title">Higiene das Mãos</div>
                <div class="grid-card-subtitle">Anexar evidências</div>
            </div>
            
            <div class="grid-card" onclick="navigateTo('auditoria_medicamentos')">
                <div class="grid-card-icon" style="background: #4facfe;">
                    <i class="fas fa-eye"></i>
                </div>
                <div class="grid-card-title">Uso de Medicamentos</div>
                <div class="grid-card-subtitle">Anexar evidências</div>
            </div>
            
            <div class="grid-card" onclick="navigateTo('auditoria_abreviaturas')">
                <div class="grid-card-icon" style="background: #f77062;">
                    <i class="fas fa-times-circle"></i>
                </div>
                <div class="grid-card-title">Abreviaturas Perigosas</div>
                <div class="grid-card-subtitle">Anexar evidências</div>
            </div>
        </div>
    `;
}

// ==================== 2.3 Relatórios de Segurança ====================
function renderRelatoriosMenu() {
    return `
        <div class="page-header">
            <h1>📄 Relatórios de Segurança</h1>
            <p>Documentos e relatórios trimestrais</p>
        </div>
        
        <div class="docs-grid">
            <div class="grid-card" onclick="navigateTo('relatorio_trimestral')">
                <div class="grid-card-icon" style="background: #43e97b;">
                    <i class="fas fa-calendar-check"></i>
                </div>
                <div class="grid-card-title">Relatório Trimestral</div>
                <div class="grid-card-subtitle">Anexar PDF</div>
            </div>
            
            <div class="grid-card" onclick="navigateTo('relatorio_incidentes')">
                <div class="grid-card-icon" style="background: #f77062;">
                    <i class="fas fa-exclamation-triangle"></i>
                </div>
                <div class="grid-card-title">Consolidado de Incidentes</div>
                <div class="grid-card-subtitle">Anexar PDF</div>
            </div>
            
            <div class="grid-card" onclick="navigateTo('relatorio_auditorias')">
                <div class="grid-card-icon" style="background: #4facfe;">
                    <i class="fas fa-search"></i>
                </div>
                <div class="grid-card-title">Relatório de Auditorias</div>
                <div class="grid-card-subtitle">Anexar PDF</div>
            </div>
        </div>
    `;
}

// Exportar funções
window.renderPainel = renderPainel;
window.renderComunicadosLista = renderComunicadosLista;
window.renderMinhasPendencias = renderMinhasPendencias;
window.renderKPIsMenu = renderKPIsMenu;
window.renderROPsDesafio = renderROPsDesafio;
window.renderResidenciaMedica = renderResidenciaMedica;
window.renderQualidade = renderQualidade;
window.renderGestaoIncidentes = renderGestaoIncidentes;
window.renderAuditoriasMenu = renderAuditoriasMenu;
window.renderRelatoriosMenu = renderRelatoriosMenu;


// ==================== 3. PROTOCOLOS ====================
function renderProtocolos() {
    return `
        <div class="page-header">
            <h1>📚 Protocolos e POPs</h1>
            <p>Biblioteca digital de procedimentos padronizados</p>
        </div>
        
        <div class="docs-grid">
            <!-- Biblioteca de Documentos -->
            <div class="grid-card" onclick="navigateTo('biblioteca_documentos')">
                <div class="grid-card-icon" style="background: #8bc34a;">
                    <i class="fas fa-search"></i>
                </div>
                <div class="grid-card-title">Biblioteca de Documentos</div>
                <div class="grid-card-subtitle">Busca geral de POPs</div>
            </div>
            
            <!-- Segurança de Medicamentos -->
            <div class="grid-card" onclick="navigateTo('seguranca_medicamentos')">
                <div class="grid-card-icon" style="background: #f77062;">
                    <i class="fas fa-pills"></i>
                </div>
                <div class="grid-card-title">Segurança de Medicamentos</div>
                <div class="grid-card-subtitle">Protocolos de alto risco</div>
            </div>
            
            <!-- Controle de Infecção -->
            <div class="grid-card" onclick="navigateTo('controle_infeccao')">
                <div class="grid-card-icon" style="background: #4facfe;">
                    <i class="fas fa-virus-slash"></i>
                </div>
                <div class="grid-card-title">Controle de Infecção</div>
                <div class="grid-card-subtitle">Prevenção de infecções</div>
            </div>
        </div>
    `;
}

// ==================== 3.1 Biblioteca de Documentos ====================
function renderBibliotecaDocumentos() {
    return `
        <div class="page-header">
            <h1>🔍 Biblioteca de Documentos</h1>
            <p>Acesse todos os documentos técnicos</p>
        </div>
        
        <div class="docs-grid">
            <div class="grid-card" onclick="navigateTo('docs_protocolos')">
                <div class="grid-card-icon" style="background: #8bc34a;">
                    <i class="fas fa-file-medical"></i>
                </div>
                <div class="grid-card-title">Protocolos</div>
            </div>
            
            <div class="grid-card" onclick="navigateTo('docs_politicas')">
                <div class="grid-card-icon" style="background: #66bb6a;">
                    <i class="fas fa-shield-alt"></i>
                </div>
                <div class="grid-card-title">Políticas</div>
            </div>
            
            <div class="grid-card" onclick="navigateTo('docs_formularios')">
                <div class="grid-card-icon" style="background: #81c784;">
                    <i class="fas fa-file-alt"></i>
                </div>
                <div class="grid-card-title">Formulários</div>
            </div>
            
            <div class="grid-card" onclick="navigateTo('docs_manuais')">
                <div class="grid-card-icon" style="background: #4caf50;">
                    <i class="fas fa-book"></i>
                </div>
                <div class="grid-card-title">Manuais</div>
            </div>
            
            <div class="grid-card" onclick="navigateTo('docs_relatorios')">
                <div class="grid-card-icon" style="background: #aed581;">
                    <i class="fas fa-chart-line"></i>
                </div>
                <div class="grid-card-title">Relatórios</div>
            </div>
            
            <div class="grid-card" onclick="navigateTo('docs_processos')">
                <div class="grid-card-icon" style="background: #9ccc65;">
                    <i class="fas fa-project-diagram"></i>
                </div>
                <div class="grid-card-title">Processos</div>
            </div>
            
            <div class="grid-card" onclick="navigateTo('docs_riscos')">
                <div class="grid-card-icon" style="background: #8bc34a;">
                    <i class="fas fa-exclamation-triangle"></i>
                </div>
                <div class="grid-card-title">Riscos</div>
            </div>
            
            <div class="grid-card" onclick="navigateTo('docs_termos')">
                <div class="grid-card-icon" style="background: #c5e1a5;">
                    <i class="fas fa-file-signature"></i>
                </div>
                <div class="grid-card-title">Termos</div>
            </div>
        </div>
    `;
}

// ==================== 3.2 Segurança de Medicamentos ====================
function renderSegurancaMedicamentos() {
    return `
        <div class="page-header">
            <h1>💊 Segurança de Medicamentos</h1>
            <p>Protocolos de medicações de alto risco</p>
        </div>
        
        <div class="docs-grid">
            <div class="grid-card" onclick="navigateTo('meds_alta_vigilancia')">
                <div class="grid-card-icon" style="background: #f77062;">
                    <i class="fas fa-exclamation-circle"></i>
                </div>
                <div class="grid-card-title">Meds de Alta Vigilância</div>
            </div>
            
            <div class="grid-card" onclick="navigateTo('meds_eletrolitos')">
                <div class="grid-card-icon" style="background: #fa709a;">
                    <i class="fas fa-vial"></i>
                </div>
                <div class="grid-card-title">Eletrólitos Concentrados</div>
            </div>
            
            <div class="grid-card" onclick="navigateTo('meds_heparina')">
                <div class="grid-card-icon" style="background: #fe5196;">
                    <i class="fas fa-syringe"></i>
                </div>
                <div class="grid-card-title">Segurança no Uso da Heparina</div>
            </div>
            
            <div class="grid-card" onclick="navigateTo('meds_narcoticos')">
                <div class="grid-card-icon" style="background: #f093fb;">
                    <i class="fas fa-pills"></i>
                </div>
                <div class="grid-card-title">Segurança dos Narcóticos</div>
            </div>
            
            <div class="grid-card" onclick="navigateTo('meds_abreviaturas')">
                <div class="grid-card-icon" style="background: #fbc2eb;">
                    <i class="fas fa-ban"></i>
                </div>
                <div class="grid-card-title">Lista de Abreviaturas Perigosas</div>
            </div>
        </div>
    `;
}

// ==================== 3.3 Controle de Infecção ====================
function renderControleInfeccao() {
    return `
        <div class="page-header">
            <h1>🦠 Controle de Infecção</h1>
            <p>Protocolos de prevenção de infecções</p>
        </div>
        
        <div class="docs-grid">
            <div class="grid-card" onclick="navigateTo('protocolo_higiene_maos')">
                <div class="grid-card-icon" style="background: #43e97b;">
                    <i class="fas fa-hands-wash"></i>
                </div>
                <div class="grid-card-title">Protocolo de Higiene das Mãos</div>
            </div>
        </div>
    `;
}

// ==================== 4. FERRAMENTAS ====================
function renderFerramentas() {
    return `
        <div class="page-header">
            <h1>🛠️ Ferramentas Clínicas</h1>
            <p>Suporte à decisão clínica e calculadoras</p>
        </div>
        
        <div class="docs-grid">
            <!-- Checklist de Cirurgia Segura -->
            <div class="grid-card" onclick="navigateTo('checklist_cirurgia')">
                <div class="grid-card-icon" style="background: #43e97b;">
                    <i class="fas fa-check-double"></i>
                </div>
                <div class="grid-card-title">Checklist de Cirurgia Segura (OMS)</div>
            </div>
            
            <!-- Conciliação Medicamentosa -->
            <div class="grid-card" onclick="navigateTo('conciliacao_menu')">
                <div class="grid-card-icon" style="background: #4facfe;">
                    <i class="fas fa-exchange-alt"></i>
                </div>
                <div class="grid-card-title">Conciliação Medicamentosa</div>
            </div>
            
            <!-- Avaliação de Riscos -->
            <div class="grid-card" onclick="navigateTo('avaliacao_riscos')">
                <div class="grid-card-icon" style="background: #667eea;">
                    <i class="fas fa-user-shield"></i>
                </div>
                <div class="grid-card-title">Avaliação de Riscos</div>
            </div>
            
            <!-- Calculadoras Anestésicas -->
            <div class="grid-card" onclick="navigateTo('calculadoras_menu')">
                <div class="grid-card-icon" style="background: #f093fb;">
                    <i class="fas fa-calculator"></i>
                </div>
                <div class="grid-card-title">Calculadoras Anestésicas</div>
            </div>
        </div>
    `;
}

// ==================== 4.1 Checklist de Cirurgia Segura ====================
function renderChecklistCirurgia() {
    return `
        <div class="page-header">
            <h1>✅ Checklist de Cirurgia Segura</h1>
            <p>Ferramenta interativa da OMS</p>
        </div>
        
        <div id="checklist-container" style="padding: 20px;">
            <p style="color: rgba(255,255,255,0.7); text-align: center;">
                Checklist interativo será carregado aqui<br>
                Sign In, Time Out, Sign Out
            </p>
        </div>
    `;
}

// ==================== 4.2 Conciliação Medicamentosa ====================
function renderConciliacaoMenu() {
    return `
        <div class="page-header">
            <h1>🔄 Conciliação Medicamentosa</h1>
            <p>Protocolos de segurança nas transições</p>
        </div>
        
        <div class="docs-grid">
            <div class="grid-card" onclick="navigateTo('conciliacao_admissao')">
                <div class="grid-card-icon" style="background: #43e97b;">
                    <i class="fas fa-sign-in-alt"></i>
                </div>
                <div class="grid-card-title">Protocolo de Admissão</div>
            </div>
            
            <div class="grid-card" onclick="navigateTo('conciliacao_transferencia')">
                <div class="grid-card-icon" style="background: #4facfe;">
                    <i class="fas fa-exchange-alt"></i>
                </div>
                <div class="grid-card-title">Protocolo de Transferência</div>
            </div>
            
            <div class="grid-card" onclick="navigateTo('conciliacao_alta')">
                <div class="grid-card-icon" style="background: #667eea;">
                    <i class="fas fa-sign-out-alt"></i>
                </div>
                <div class="grid-card-title">Protocolo de Alta</div>
            </div>
        </div>
    `;
}

// ==================== 4.3 Avaliação de Riscos ====================
function renderAvaliacaoRiscos() {
    return `
        <div class="page-header">
            <h1>🛡️ Avaliação de Riscos</h1>
            <p>Estratificação de risco do paciente</p>
        </div>
        
        <div class="docs-grid">
            <!-- Risco de Quedas -->
            <div class="grid-card" onclick="navigateTo('risco_quedas_menu')">
                <div class="grid-card-icon" style="background: #f77062;">
                    <i class="fas fa-person-falling"></i>
                </div>
                <div class="grid-card-title">Risco de Quedas</div>
                <div class="grid-card-subtitle">Morse + Protocolo</div>
            </div>
            
            <!-- Úlceras de Pressão -->
            <div class="grid-card" onclick="navigateTo('risco_ulceras_menu')">
                <div class="grid-card-icon" style="background: #fa709a;">
                    <i class="fas fa-bed"></i>
                </div>
                <div class="grid-card-title">Úlceras de Pressão</div>
                <div class="grid-card-subtitle">Braden + Protocolo</div>
            </div>
            
            <!-- Risco de TEV -->
            <div class="grid-card" onclick="navigateTo('risco_tev_menu')">
                <div class="grid-card-icon" style="background: #667eea;">
                    <i class="fas fa-heartbeat"></i>
                </div>
                <div class="grid-card-title">Risco de TEV</div>
                <div class="grid-card-subtitle">Caprini/Padua + Protocolo</div>
            </div>
        </div>
    `;
}

// ==================== 4.3.1 Risco de Quedas ====================
function renderRiscoQuedasMenu() {
    return `
        <div class="page-header">
            <h1>🚶 Risco de Quedas</h1>
        </div>
        
        <div class="docs-grid">
            <div class="grid-card" onclick="showCalculadora('morse')">
                <div class="grid-card-icon" style="background: #f77062;">
                    <i class="fas fa-calculator"></i>
                </div>
                <div class="grid-card-title">Calculadora de Risco (Morse)</div>
            </div>
            
            <div class="grid-card" onclick="navigateTo('protocolo_quedas')">
                <div class="grid-card-icon" style="background: #fa709a;">
                    <i class="fas fa-file-pdf"></i>
                </div>
                <div class="grid-card-title">Protocolo de Prevenção</div>
            </div>
        </div>
    `;
}

// ==================== 4.3.2 Úlceras de Pressão ====================
function renderRiscoUlcerasMenu() {
    return `
        <div class="page-header">
            <h1>🛏️ Úlceras de Pressão</h1>
        </div>
        
        <div class="docs-grid">
            <div class="grid-card" onclick="showCalculadora('braden')">
                <div class="grid-card-icon" style="background: #fa709a;">
                    <i class="fas fa-calculator"></i>
                </div>
                <div class="grid-card-title">Calculadora Escala de Braden</div>
            </div>
            
            <div class="grid-card" onclick="navigateTo('protocolo_ulceras')">
                <div class="grid-card-icon" style="background: #f093fb;">
                    <i class="fas fa-file-pdf"></i>
                </div>
                <div class="grid-card-title">Protocolo de Prevenção</div>
            </div>
        </div>
    `;
}

// ==================== 4.3.3 Risco de TEV ====================
function renderRiscoTEVMenu() {
    return `
        <div class="page-header">
            <h1>💉 Risco de TEV</h1>
        </div>
        
        <div class="docs-grid">
            <div class="grid-card" onclick="showCalculadora('caprini')">
                <div class="grid-card-icon" style="background: #667eea;">
                    <i class="fas fa-calculator"></i>
                </div>
                <div class="grid-card-title">Calculadora Risco Cirúrgico (Caprini)</div>
            </div>
            
            <div class="grid-card" onclick="showCalculadora('padua')">
                <div class="grid-card-icon" style="background: #764ba2;">
                    <i class="fas fa-calculator"></i>
                </div>
                <div class="grid-card-title">Calculadora Risco Clínico (Padua)</div>
            </div>
            
            <div class="grid-card" onclick="navigateTo('protocolo_tev')">
                <div class="grid-card-icon" style="background: #4facfe;">
                    <i class="fas fa-file-pdf"></i>
                </div>
                <div class="grid-card-title">Protocolo de Profilaxia</div>
            </div>
        </div>
    `;
}

// Exportar funções adicionais
window.renderProtocolos = renderProtocolos;
window.renderBibliotecaDocumentos = renderBibliotecaDocumentos;
window.renderSegurancaMedicamentos = renderSegurancaMedicamentos;
window.renderControleInfeccao = renderControleInfeccao;
window.renderFerramentas = renderFerramentas;
window.renderChecklistCirurgia = renderChecklistCirurgia;
window.renderConciliacaoMenu = renderConciliacaoMenu;
window.renderAvaliacaoRiscos = renderAvaliacaoRiscos;
window.renderRiscoQuedasMenu = renderRiscoQuedasMenu;
window.renderRiscoUlcerasMenu = renderRiscoUlcerasMenu;
window.renderRiscoTEVMenu = renderRiscoTEVMenu;

// ==================== 4.4 Calculadoras Anestésicas ====================
function renderCalculadorasMenu() {
    return `
        <div class="page-header">
            <h1>🧮 Calculadoras Anestésicas</h1>
            <p>Coleção completa de calculadoras clínicas</p>
        </div>
        
        <div class="docs-grid">
            <div class="grid-card" onclick="navigateTo('calc_anestesiologia')">
                <div class="grid-card-icon" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
                    <i class="fas fa-stethoscope"></i>
                </div>
                <div class="grid-card-title">Anestesiologia (Geral)</div>
            </div>
            
            <div class="grid-card" onclick="navigateTo('calc_dose_drogas')">
                <div class="grid-card-icon" style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);">
                    <i class="fas fa-syringe"></i>
                </div>
                <div class="grid-card-title">Dose de Drogas</div>
            </div>
            
            <div class="grid-card" onclick="navigateTo('calc_pediatria')">
                <div class="grid-card-icon" style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);">
                    <i class="fas fa-baby"></i>
                </div>
                <div class="grid-card-title">Pediatria</div>
            </div>
            
            <div class="grid-card" onclick="navigateTo('calc_indices')">
                <div class="grid-card-icon" style="background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);">
                    <i class="fas fa-chart-bar"></i>
                </div>
                <div class="grid-card-title">Índices (Comorbidades)</div>
            </div>
            
            <div class="grid-card" onclick="navigateTo('calc_regional')">
                <div class="grid-card-icon" style="background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);">
                    <i class="fas fa-location-dot"></i>
                </div>
                <div class="grid-card-title">Anestesia Regional</div>
            </div>
            
            <div class="grid-card" onclick="navigateTo('calc_fluidos')">
                <div class="grid-card-icon" style="background: linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%);">
                    <i class="fas fa-droplet"></i>
                </div>
                <div class="grid-card-title">Fluidos e Reposição</div>
            </div>
        </div>
    `;
}

// ==================== 4.4.1 Anestesiologia (Geral) ====================
function renderCalcAnestesiologia() {
    return `
        <div class="page-header">
            <h1>🩺 Anestesiologia Geral</h1>
        </div>
        
        <div class="docs-grid">
            <div class="grid-card" onclick="showCalculadora('rcri')">
                <div class="grid-card-icon" style="background: #667eea;">
                    <i class="fas fa-heart"></i>
                </div>
                <div class="grid-card-title">RCRI (Lee)</div>
            </div>
            
            <div class="grid-card" onclick="showCalculadora('goldman')">
                <div class="grid-card-icon" style="background: #764ba2;">
                    <i class="fas fa-heartbeat"></i>
                </div>
                <div class="grid-card-title">Goldman Cardiac Risk Index</div>
            </div>
            
            <div class="grid-card" onclick="showCalculadora('ariscat')">
                <div class="grid-card-icon" style="background: #4facfe;">
                    <i class="fas fa-lungs"></i>
                </div>
                <div class="grid-card-title">ARISCAT (Risco Pulmonar)</div>
            </div>
            
            <div class="grid-card" onclick="showCalculadora('apfel')">
                <div class="grid-card-icon" style="background: #43e97b;">
                    <i class="fas fa-face-frown-open"></i>
                </div>
                <div class="grid-card-title">Apfel (Risco de PONV)</div>
            </div>
            
            <div class="grid-card" onclick="showCalculadora('stopbang')">
                <div class="grid-card-icon" style="background: #fa709a;">
                    <i class="fas fa-moon"></i>
                </div>
                <div class="grid-card-title">STOP-Bang (SAHOS)</div>
            </div>
            
            <div class="grid-card" onclick="showCalculadora('ibw_bsa')">
                <div class="grid-card-icon" style="background: #fbc2eb;">
                    <i class="fas fa-weight-scale"></i>
                </div>
                <div class="grid-card-title">Peso Ideal / Sup. Corpórea</div>
            </div>
            
            <div class="grid-card" onclick="showCalculadora('aldrete')">
                <div class="grid-card-icon" style="background: #f6d365;">
                    <i class="fas fa-clipboard-check"></i>
                </div>
                <div class="grid-card-title">Índice de Aldrete e Kroulik</div>
            </div>
            
            <div class="grid-card" onclick="showCalculadora('steward')">
                <div class="grid-card-icon" style="background: #fda085;">
                    <i class="fas fa-child"></i>
                </div>
                <div class="grid-card-title">Escala de Steward (Alta Pediátrica)</div>
            </div>
            
            <div class="grid-card" onclick="showCalculadora('glasgow')">
                <div class="grid-card-icon" style="background: #667eea;">
                    <i class="fas fa-brain"></i>
                </div>
                <div class="grid-card-title">Escala de Coma de Glasgow (ECG)</div>
            </div>
        </div>
    `;
}

// ==================== 4.4.2 Dose de Drogas ====================
function renderCalcDoseDrogas() {
    return `
        <div class="page-header">
            <h1>💉 Dose de Drogas</h1>
        </div>
        
        <div class="docs-grid">
            <div class="grid-card" onclick="showCalculadora('doses_pediatricas')">
                <div class="grid-card-icon" style="background: #f093fb;">
                    <i class="fas fa-baby"></i>
                </div>
                <div class="grid-card-title">Calculadora Automática de Doses Pediátricas</div>
            </div>
            
            <div class="grid-card" onclick="showCalculadora('opioid_convert')">
                <div class="grid-card-icon" style="background: #f5576c;">
                    <i class="fas fa-pills"></i>
                </div>
                <div class="grid-card-title">Conversão de Opioides</div>
            </div>
            
            <div class="grid-card" onclick="showCalculadora('corticoide_convert')">
                <div class="grid-card-icon" style="background: #fa709a;">
                    <i class="fas fa-syringe"></i>
                </div>
                <div class="grid-card-title">Conversão de Corticoides</div>
            </div>
        </div>
    `;
}

// ==================== 4.4.3 Pediatria ====================
function renderCalcPediatria() {
    return `
        <div class="page-header">
            <h1>👶 Pediatria</h1>
        </div>
        
        <div class="docs-grid">
            <div class="grid-card" onclick="showCalculadora('holliday_segar')">
                <div class="grid-card-icon" style="background: #4facfe;">
                    <i class="fas fa-droplet"></i>
                </div>
                <div class="grid-card-title">Manutenção Pediátrica (Holliday-Segar)</div>
            </div>
            
            <div class="grid-card" onclick="showCalculadora('churp')">
                <div class="grid-card-icon" style="background: #00f2fe;">
                    <i class="fas fa-hospital-user"></i>
                </div>
                <div class="grid-card-title">CHURP Score (Alta Pediátrica)</div>
            </div>
        </div>
    `;
}

// ==================== 4.4.4 Índices (Comorbidades) ====================
function renderCalcIndices() {
    return `
        <div class="page-header">
            <h1>📊 Índices (Comorbidades)</h1>
        </div>
        
        <div class="docs-grid">
            <div class="grid-card" onclick="showCalculadora('rcri')">
                <div class="grid-card-icon" style="background: #43e97b;">
                    <i class="fas fa-heart"></i>
                </div>
                <div class="grid-card-title">RCRI (Risco Cardíaco)</div>
            </div>
            
            <div class="grid-card" onclick="showCalculadora('ariscat')">
                <div class="grid-card-icon" style="background: #38f9d7;">
                    <i class="fas fa-lungs"></i>
                </div>
                <div class="grid-card-title">ARISCAT (Risco Pulmonar)</div>
            </div>
            
            <div class="grid-card" onclick="showCalculadora('apache2')">
                <div class="grid-card-icon" style="background: #667eea;">
                    <i class="fas fa-notes-medical"></i>
                </div>
                <div class="grid-card-title">APACHE II</div>
            </div>
        </div>
    `;
}

// ==================== 4.4.5 Anestesia Regional ====================
function renderCalcRegional() {
    return `
        <div class="page-header">
            <h1>🎯 Anestesia Regional</h1>
        </div>
        
        <div class="docs-grid">
            <div class="grid-card" onclick="showCalculadora('dose_maxima_al')">
                <div class="grid-card-icon" style="background: #fa709a;">
                    <i class="fas fa-syringe"></i>
                </div>
                <div class="grid-card-title">Dose Máxima de Anestésico Local</div>
            </div>
        </div>
    `;
}

// ==================== 4.4.6 Fluidos e Reposição ====================
function renderCalcFluidos() {
    return `
        <div class="page-header">
            <h1>💧 Fluidos e Reposição</h1>
        </div>
        
        <div class="docs-grid">
            <div class="grid-card" onclick="showCalculadora('deficit_hidrico')">
                <div class="grid-card-icon" style="background: #fbc2eb;">
                    <i class="fas fa-droplet"></i>
                </div>
                <div class="grid-card-title">Cálculo de Déficit Hídrico</div>
            </div>
        </div>
    `;
}

// Exportar funções de calculadoras
window.renderCalculadorasMenu = renderCalculadorasMenu;
window.renderCalcAnestesiologia = renderCalcAnestesiologia;
window.renderCalcDoseDrogas = renderCalcDoseDrogas;
window.renderCalcPediatria = renderCalcPediatria;
window.renderCalcIndices = renderCalcIndices;
window.renderCalcRegional = renderCalcRegional;
window.renderCalcFluidos = renderCalcFluidos;

console.log('✅ Sitemap completo carregado com sucesso!');
