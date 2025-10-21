// ==================== ANEST-APP QMENTUM - PÁGINAS E ESTRUTURA ====================
// Versão 8.0.0 - Módulo de Páginas
// Define toda a estrutura de navegação conforme Blueprint Mestre v3

// ==================== ESTRUTURA DE PÁGINAS ====================
const APP_PAGES = {
    // NÍVEL 1: NAVEGAÇÃO PRINCIPAL (4 BOTÕES)
    painel: {
        title: "Painel Principal",
        render: renderPainelPrincipal
    },
    qualidade: {
        title: "Qualidade e Segurança",
        render: renderQualidadeSeguranca
    },
    protocolos: {
        title: "Protocolos",
        render: renderProtocolos
    },
    ferramentas: {
        title: "Ferramentas",
        render: renderFerramentas
    },
    
    // ADMIN
    admin_panel: {
        title: "Painel de Administração",
        render: renderAdminPanel
    }
};

// ==================== PAINEL PRINCIPAL ====================
function renderPainelPrincipal() {
    return `
        <h1 class="page-title">Painel Principal</h1>
        
        <!-- Últimos Comunicados -->
        <div class="content-section">
            <h3><i class="fas fa-bullhorn"></i> Últimos Comunicados</h3>
            <div id="comunicados-list">
                <p style="color: var(--cor-texto-claro); font-style: italic;">Carregando comunicados...</p>
            </div>
        </div>
        
        <!-- Minhas Pendências -->
        <div class="content-section">
            <h3><i class="fas fa-tasks"></i> Minhas Pendências</h3>
            <div class="list-section" style="margin-top: 10px;">
                <div class="list-item" onclick="navigateTo('rops')">
                    <span class="icon" style="background-color: #ffa500;"><i class="fas fa-award"></i></span>
                    <div class="text-content">
                        <div class="title">ROPs - Desafio Semanal</div>
                        <div class="subtitle">Continue seu progresso</div>
                    </div>
                    <i class="chevron fas fa-chevron-right"></i>
                </div>
            </div>
        </div>
        
        <!-- Indicadores de Qualidade -->
        <div class="content-section">
            <h3><i class="fas fa-chart-line"></i> Indicadores de Qualidade</h3>
            <div id="indicadores-dashboard">
                <p style="color: var(--cor-texto-claro); font-style: italic;">Carregando indicadores...</p>
            </div>
        </div>
        
        <!-- ROPs Desafio (Gamificação) -->
        <div class="content-section">
            <h3><i class="fas fa-trophy"></i> ROPs - Desafio</h3>
            <div id="rops-progress">
                <p style="color: var(--cor-texto-claro); font-style: italic;">Carregando progresso...</p>
            </div>
            <button class="submit-button" onclick="navigateTo('rops')" style="margin-top: 15px;">
                <i class="fas fa-play"></i> Iniciar Desafio
            </button>
        </div>
        
        <!-- Residência Médica -->
        <ul class="list-section">
            <li class="list-item" onclick="navigateTo('residencia_calendario')">
                <span class="icon" style="background-color: #38f9d7;"><i class="fas fa-calendar-alt"></i></span>
                <div class="text-content">
                    <div class="title">Residência Médica</div>
                    <div class="subtitle">Escalas, plantões e cronogramas</div>
                </div>
                <i class="chevron fas fa-chevron-right"></i>
            </li>
            <li class="list-item" onclick="navigateTo('podcasts')">
                <span class="icon" style="background-color: #9b59b6;"><i class="fas fa-podcast"></i></span>
                <div class="text-content">
                    <div class="title">Podcasts Educativos</div>
                    <div class="subtitle">Cultura de segurança e qualidade</div>
                </div>
                <i class="chevron fas fa-chevron-right"></i>
            </li>
        </ul>
    `;
}

// ==================== QUALIDADE E SEGURANÇA ====================
function renderQualidadeSeguranca() {
    return `
        <h1 class="page-title">Qualidade e Segurança</h1>
        
        <ul class="list-section">
            <li class="list-item" onclick="navigateTo('incidentes')">
                <span class="icon" style="background-color: var(--cor-perigo);"><i class="fas fa-exclamation-triangle"></i></span>
                <div class="text-content">
                    <div class="title">Gestão de Incidentes</div>
                    <div class="subtitle">Notificar eventos adversos</div>
                </div>
                <i class="chevron fas fa-chevron-right"></i>
            </li>
            
            <li class="list-item" onclick="navigateTo('auditorias')">
                <span class="icon" style="background-color: var(--cor-info);"><i class="fas fa-clipboard-check"></i></span>
                <div class="text-content">
                    <div class="title">Auditorias e Conformidade</div>
                    <div class="subtitle">Higiene das mãos, medicamentos, abreviações</div>
                </div>
                <i class="chevron fas fa-chevron-right"></i>
            </li>
            
            <li class="list-item" onclick="navigateTo('relatorios_seguranca')">
                <span class="icon" style="background-color: var(--cor-texto-claro);"><i class="fas fa-file-alt"></i></span>
                <div class="text-content">
                    <div class="title">Relatórios de Segurança</div>
                    <div class="subtitle">Relatórios trimestrais e consolidados</div>
                </div>
                <i class="chevron fas fa-chevron-right"></i>
            </li>
        </ul>
    `;
}

// ==================== PROTOCOLOS ====================
function renderProtocolos() {
    return `
        <h1 class="page-title">Protocolos</h1>
        
        <ul class="list-section">
            <li class="list-item" onclick="navigateTo('documentos')">
                <span class="icon" style="background-color: var(--cor-primaria);"><i class="fas fa-folder-open"></i></span>
                <div class="text-content">
                    <div class="title">Biblioteca de Documentos</div>
                    <div class="subtitle">Todos os POPs, políticas e protocolos</div>
                </div>
                <i class="chevron fas fa-chevron-right"></i>
            </li>
            
            <li class="list-item" onclick="navigateTo('seguranca_medicamentos')">
                <span class="icon" style="background-color: var(--cor-perigo);"><i class="fas fa-pills"></i></span>
                <div class="text-content">
                    <div class="title">Segurança de Medicamentos</div>
                    <div class="subtitle">MAVs, eletrólitos, heparina, narcóticos</div>
                </div>
                <i class="chevron fas fa-chevron-right"></i>
            </li>
            
            <li class="list-item" onclick="navigateTo('controle_infeccao')">
                <span class="icon" style="background-color: var(--cor-aviso);"><i class="fas fa-virus-slash"></i></span>
                <div class="text-content">
                    <div class="title">Controle de Infecção</div>
                    <div class="subtitle">Protocolo de higiene das mãos</div>
                </div>
                <i class="chevron fas fa-chevron-right"></i>
            </li>
        </ul>
    `;
}

// ==================== FERRAMENTAS ====================
function renderFerramentas() {
    return `
        <h1 class="page-title">Ferramentas</h1>
        
        <ul class="list-section">
            <li class="list-item" onclick="navigateTo('checklist_oms')">
                <span class="icon" style="background-color: var(--cor-sucesso);"><i class="fas fa-check-double"></i></span>
                <div class="text-content">
                    <div class="title">Checklist de Cirurgia Segura (OMS)</div>
                    <div class="subtitle">Ferramenta interativa</div>
                </div>
                <i class="chevron fas fa-chevron-right"></i>
            </li>
            
            <li class="list-item" onclick="navigateTo('conciliacao_medicamentosa')">
                <span class="icon" style="background-color: var(--cor-info);"><i class="fas fa-exchange-alt"></i></span>
                <div class="text-content">
                    <div class="title">Conciliação Medicamentosa</div>
                    <div class="subtitle">Admissão, transferência, alta</div>
                </div>
                <i class="chevron fas fa-chevron-right"></i>
            </li>
            
            <li class="list-item" onclick="navigateTo('avaliacao_riscos')">
                <span class="icon" style="background-color: var(--cor-secundaria);"><i class="fas fa-user-shield"></i></span>
                <div class="text-content">
                    <div class="title">Avaliação de Riscos</div>
                    <div class="subtitle">Quedas, úlceras de pressão, TEV</div>
                </div>
                <i class="chevron fas fa-chevron-right"></i>
            </li>
            
            <li class="list-item" onclick="navigateTo('calculadoras')">
                <span class="icon" style="background-color: #6f42c1;"><i class="fas fa-calculator"></i></span>
                <div class="text-content">
                    <div class="title">Calculadoras Anestésicas</div>
                    <div class="subtitle">Doses, índices, anestesia regional, fluidos</div>
                </div>
                <i class="chevron fas fa-chevron-right"></i>
            </li>
        </ul>
    `;
}

// ==================== AUDITORIAS ====================
APP_PAGES.auditorias = {
    title: "Auditorias e Conformidade",
    render: () => `
        <h1 class="page-title">Auditorias e Conformidade</h1>
        
        <ul class="list-section">
            <li class="list-item" onclick="showToast('Auditoria de higiene das mãos em desenvolvimento', 'info')">
                <span class="icon" style="background-color: var(--cor-info);"><i class="fas fa-hands-bubbles"></i></span>
                <div class="text-content">
                    <div class="title">Higiene das Mãos</div>
                    <div class="subtitle">Auditoria por observação direta</div>
                </div>
                <i class="chevron fas fa-chevron-right"></i>
            </li>
            
            <li class="list-item" onclick="showToast('Auditoria de medicamentos em desenvolvimento', 'info')">
                <span class="icon" style="background-color: var(--cor-info);"><i class="fas fa-eye"></i></span>
                <div class="text-content">
                    <div class="title">Uso de Medicamentos</div>
                    <div class="subtitle">Auditoria de armazenamento e rotulagem</div>
                </div>
                <i class="chevron fas fa-chevron-right"></i>
            </li>
            
            <li class="list-item" onclick="showToast('Auditoria de abreviações em desenvolvimento', 'info')">
                <span class="icon" style="background-color: var(--cor-info);"><i class="fas fa-times-circle"></i></span>
                <div class="text-content">
                    <div class="title">Abreviações Perigosas</div>
                    <div class="subtitle">Auditoria de prontuários</div>
                </div>
                <i class="chevron fas fa-chevron-right"></i>
            </li>
        </ul>
    `
};

// ==================== RELATÓRIOS DE SEGURANÇA ====================
APP_PAGES.relatorios_seguranca = {
    title: "Relatórios de Segurança",
    render: () => `
        <h1 class="page-title">Relatórios de Segurança</h1>
        
        <ul class="list-section">
            <li class="list-item" onclick="window.open('Documentos/4 - Relatórios de Segurança/RELATÓRIO DE SEGURANÇA 3° TRIMESTRE 2024.pdf', '_blank')">
                <span class="icon" style="background-color: var(--cor-primaria);"><i class="fas fa-calendar-check"></i></span>
                <div class="text-content">
                    <div class="title">Relatório Trimestral 3T 2024</div>
                    <div class="subtitle">Relatório completo do terceiro trimestre</div>
                </div>
                <i class="chevron fas fa-chevron-right"></i>
            </li>
            
            <li class="list-item" onclick="window.open('Documentos/4 - Relatórios de Segurança/Seguranca-do-Paciente-Servico-de-Anestesia-ANEST-Chapeco.pdf', '_blank')">
                <span class="icon" style="background-color: var(--cor-perigo);"><i class="fas fa-triangle-exclamation"></i></span>
                <div class="text-content">
                    <div class="title">Segurança do Paciente - ANEST Chapecó</div>
                    <div class="subtitle">Relatório do serviço de anestesia</div>
                </div>
                <i class="chevron fas fa-chevron-right"></i>
            </li>
        </ul>
    `
};

// ==================== SEGURANÇA DE MEDICAMENTOS ====================
APP_PAGES.seguranca_medicamentos = {
    title: "Segurança de Medicamentos",
    render: () => `
        <h1 class="page-title">Segurança de Medicamentos</h1>
        
        <div class="content-section">
            <p><i class="fas fa-info-circle"></i> Protocolos para medicamentos de alta vigilância e segurança no uso.</p>
        </div>
        
        <ul class="list-section">
            <li class="list-item" onclick="window.open('Documentos/1 - Protocolos/PRO.INSH.0080-13 Gestão de Medicamentos de Alta Vigilância (AG. Iara 30.04.24).docx.pdf', '_blank')">
                <span class="icon" style="background-color: var(--cor-perigo);"><i class="fas fa-exclamation-circle"></i></span>
                <div class="text-content">
                    <div class="title">Medicamentos de Alta Vigilância (MAV)</div>
                </div>
                <i class="chevron fas fa-chevron-right"></i>
            </li>
            
            <li class="list-item" onclick="showToast('Documento de eletrólitos concentrados disponível em Biblioteca de Documentos', 'info')">
                <span class="icon" style="background-color: var(--cor-perigo);"><i class="fas fa-vial-circle-check"></i></span>
                <div class="text-content">
                    <div class="title">Eletrólitos Concentrados</div>
                </div>
                <i class="chevron fas fa-chevron-right"></i>
            </li>
            
            <li class="list-item" onclick="window.open('Documentos/1 - Protocolos/PRO.INSH.0053-05 Prevenção de TEV (AG. ANALICE 22.04) (2).docx.pdf', '_blank')">
                <span class="icon" style="background-color: var(--cor-perigo);"><i class="fas fa-syringe"></i></span>
                <div class="text-content">
                    <div class="title">Segurança no Uso da Heparina</div>
                </div>
                <i class="chevron fas fa-chevron-right"></i>
            </li>
            
            <li class="list-item" onclick="showToast('Protocolo de narcóticos em desenvolvimento', 'info')">
                <span class="icon" style="background-color: var(--cor-perigo);"><i class="fas fa-pills"></i></span>
                <div class="text-content">
                    <div class="title">Segurança dos Narcóticos</div>
                </div>
                <i class="chevron fas fa-chevron-right"></i>
            </li>
            
            <li class="list-item" onclick="showToast('Lista de abreviações perigosas disponível na seção de Protocolos', 'info')">
                <span class="icon" style="background-color: var(--cor-aviso);"><i class="fas fa-file-excel"></i></span>
                <div class="text-content">
                    <div class="title">Abreviações Perigosas</div>
                </div>
                <i class="chevron fas fa-chevron-right"></i>
            </li>
        </ul>
    `
};

// ==================== CONTROLE DE INFECÇÃO ====================
APP_PAGES.controle_infeccao = {
    title: "Controle de Infecção",
    render: () => `
        <h1 class="page-title">Controle de Infecção</h1>
        
        <ul class="list-section">
            <li class="list-item" onclick="window.open('Documentos/1 - Protocolos/PT 03 Higiene de Mãos.pdf', '_blank')">
                <span class="icon" style="background-color: var(--cor-aviso);"><i class="fas fa-hands-bubbles"></i></span>
                <div class="text-content">
                    <div class="title">Protocolo de Higiene das Mãos</div>
                    <div class="subtitle">PT 03 - Técnica e 5 momentos</div>
                </div>
                <i class="chevron fas fa-chevron-right"></i>
            </li>
        </ul>
    `
};

// ==================== CONCILIAÇÃO MEDICAMENTOSA ====================
APP_PAGES.conciliacao_medicamentosa = {
    title: "Conciliação Medicamentosa",
    render: () => `
        <h1 class="page-title">Conciliação Medicamentosa</h1>
        
        <div class="content-section">
            <p><i class="fas fa-info-circle"></i> Protocolos para garantir a segurança nas transições de cuidado.</p>
        </div>
        
        <ul class="list-section">
            <li class="list-item" onclick="showToast('Protocolo de admissão em desenvolvimento', 'info')">
                <span class="icon" style="background-color: var(--cor-info);"><i class="fas fa-file-import"></i></span>
                <div class="text-content">
                    <div class="title">Protocolo de Admissão</div>
                    <div class="subtitle">Reconciliação na entrada</div>
                </div>
                <i class="chevron fas fa-chevron-right"></i>
            </li>
            
            <li class="list-item" onclick="showToast('Protocolo de transferência em desenvolvimento', 'info')">
                <span class="icon" style="background-color: var(--cor-info);"><i class="fas fa-right-left"></i></span>
                <div class="text-content">
                    <div class="title">Protocolo de Transferência</div>
                    <div class="subtitle">Reconciliação entre setores</div>
                </div>
                <i class="chevron fas fa-chevron-right"></i>
            </li>
            
            <li class="list-item" onclick="showToast('Protocolo de alta em desenvolvimento', 'info')">
                <span class="icon" style="background-color: var(--cor-info);"><i class="fas fa-file-export"></i></span>
                <div class="text-content">
                    <div class="title">Protocolo de Alta</div>
                    <div class="subtitle">Reconciliação na saída</div>
                </div>
                <i class="chevron fas fa-chevron-right"></i>
            </li>
        </ul>
    `
};

// ==================== AVALIAÇÃO DE RISCOS ====================
APP_PAGES.avaliacao_riscos = {
    title: "Avaliação de Riscos",
    render: () => `
        <h1 class="page-title">Avaliação de Riscos</h1>
        
        <ul class="list-section">
            <li class="list-item" onclick="navigateTo('risco_quedas')">
                <span class="icon" style="background-color: var(--cor-secundaria);"><i class="fas fa-user-injured"></i></span>
                <div class="text-content">
                    <div class="title">Risco de Quedas</div>
                    <div class="subtitle">Escala de Morse + Protocolo</div>
                </div>
                <i class="chevron fas fa-chevron-right"></i>
            </li>
            
            <li class="list-item" onclick="navigateTo('risco_ulceras')">
                <span class="icon" style="background-color: var(--cor-secundaria);"><i class="fas fa-bed"></i></span>
                <div class="text-content">
                    <div class="title">Úlceras de Pressão</div>
                    <div class="subtitle">Escala de Braden + Protocolo</div>
                </div>
                <i class="chevron fas fa-chevron-right"></i>
            </li>
            
            <li class="list-item" onclick="navigateTo('risco_tev')">
                <span class="icon" style="background-color: var(--cor-secundaria);"><i class="fas fa-person-dots-from-line"></i></span>
                <div class="text-content">
                    <div class="title">Risco de TEV</div>
                    <div class="subtitle">Caprini/Padua + Protocolo</div>
                </div>
                <i class="chevron fas fa-chevron-right"></i>
            </li>
        </ul>
    `
};

// ==================== CALCULADORAS ====================
APP_PAGES.calculadoras = {
    title: "Calculadoras Anestésicas",
    render: () => `
        <h1 class="page-title">Calculadoras Anestésicas</h1>
        
        <ul class="list-section">
            <li class="list-item" onclick="navigateTo('calc_anestesiologia')">
                <span class="icon" style="background-color: #003B73;"><i class="fas fa-kit-medical"></i></span>
                <div class="text-content">
                    <div class="title">Anestesiologia (Geral)</div>
                    <div class="subtitle">RCRI, ARISCAT, Apfel, STOP-Bang</div>
                </div>
                <i class="chevron fas fa-chevron-right"></i>
            </li>
            
            <li class="list-item" onclick="navigateTo('calc_doses')">
                <span class="icon" style="background-color: #6f42c1;"><i class="fas fa-droplet"></i></span>
                <div class="text-content">
                    <div class="title">Dose de Drogas</div>
                    <div class="subtitle">Inclui doses pediátricas automáticas</div>
                </div>
                <i class="chevron fas fa-chevron-right"></i>
            </li>
            
            <li class="list-item" onclick="navigateTo('calc_indices')">
                <span class="icon" style="background-color: #6f42c1;"><i class="fas fa-heart-pulse"></i></span>
                <div class="text-content">
                    <div class="title">Índices (Comorbidades)</div>
                    <div class="subtitle">RCRI, ARISCAT, ASA</div>
                </div>
                <i class="chevron fas fa-chevron-right"></i>
            </li>
            
            <li class="list-item" onclick="navigateTo('calc_regional')">
                <span class="icon" style="background-color: #6f42c1;"><i class="fas fa-draw-polygon"></i></span>
                <div class="text-content">
                    <div class="title">Anestesia Regional</div>
                    <div class="subtitle">Doses máximas e volumes</div>
                </div>
                <i class="chevron fas fa-chevron-right"></i>
            </li>
            
            <li class="list-item" onclick="navigateTo('calc_fluidos')">
                <span class="icon" style="background-color: #6f42c1;"><i class="fas fa-tint"></i></span>
                <div class="text-content">
                    <div class="title">Fluidos e Reposição</div>
                    <div class="subtitle">Holliday-Segar, perdas, manutenção</div>
                </div>
                <i class="chevron fas fa-chevron-right"></i>
            </li>
        </ul>
    `
};

// ==================== FUNÇÃO PRINCIPAL DE RENDERIZAÇÃO ====================
window.renderPage_Modules = function(pageId) {
    if (APP_PAGES[pageId]) {
        if (typeof APP_PAGES[pageId].render === 'function') {
            return APP_PAGES[pageId].render();
        }
    }
    return null;
};

// Expor estrutura de páginas
window.APP_PAGES = APP_PAGES;

