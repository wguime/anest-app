// ==================== PAINEL PRINCIPAL CORRIGIDO ====================
// Versão 8.1.0 - 4 Cards Funcionais

// Mapeamento de ROPs por Macro-Área para Progress Bars
const ROPS_POR_AREA = {
    'cultura_seguranca': ['1.1', '1.2', '1.3', '1.4'],
    'comunicacao': ['2.1', '2.2', '2.3', '2.4', '2.5', '2.6', '2.7', '2.8'],
    'uso_medicamentos': ['3.1', '3.2', '3.3', '3.4', '3.5'],
    'vida_profissional': ['4.1', '4.2', '4.3', '4.4', '4.5'],
    'prevencao_infeccoes': ['5.1', '5.2', '5.3', '5.4'],
    'avaliacao_riscos': ['6.1', '6.2', '6.3', '6.4', '6.5']
};

// Podcasts por área
const PODCASTS_POR_AREA = {
    'cultura_seguranca': [
        { nome: 'ROP 1.1 – Responsabilização pela Qualidade', arquivo: 'Podcasts/Cultura de Segurança/ROP 1.1 Cultura de Segurança – Responsabilização pela Qualidade.m4a' },
        { nome: 'ROP 1.2 – Gestão de Incidentes', arquivo: 'Podcasts/Cultura de Segurança/ROP 1.2 Cultura de Segurança – Gestão de Incidentes sobre a Segurança dos Pacientes.m4a' },
        { nome: 'ROP 1.3 – Relatórios Trimestrais', arquivo: 'Podcasts/Cultura de Segurança/ROP 1.3 Cultura de Segurança – Relatórios Trimestrais sobre a Segurança dos Pacientes.m4a' },
        { nome: 'ROP 1.4 – Divulgação de Incidentes', arquivo: 'Podcasts/Cultura de Segurança/ROP 1.4 Cultura de Segurança – Divulgação de Incidentes (Disclosure).m4a' }
    ],
    'comunicacao': [
        { nome: '2.1 – Identificação do Cliente', arquivo: 'Podcasts/Comunicação/2.1 Comunicação - Idenficação cliente.m4a' },
        { nome: '2.2 – Abreviações Perigosas', arquivo: 'Podcasts/Comunicação/2.2 Comunicação - Abreviações perigosas.m4a' },
        { nome: '2.3 – Conciliação Estratégica', arquivo: 'Podcasts/Comunicação/2.3 Comunicação - Conciliação medicamentosa Estratégica.m4a' },
        { nome: '2.4 – Conciliação Internado', arquivo: 'Podcasts/Comunicação/2.4 Comunicação - Conciliação medicamentosa Internado.m4a' },
        { nome: '2.5 – Conciliação Ambulatorial', arquivo: 'Podcasts/Comunicação/2.5 Comunicação - Conciliação medicamentosa ambulatorial.m4a' },
        { nome: '2.6 – Conciliação Emergência', arquivo: 'Podcasts/Comunicação/2.6 Comunicação - Conciliação medicamentosa Emergencia.m4a' },
        { nome: '2.7 – Cirurgia Segura', arquivo: 'Podcasts/Comunicação/2.7 Comunicação - Cirurgia segura.m4a' },
        { nome: '2.8 – Transição de Cuidado', arquivo: 'Podcasts/Comunicação/2.8 Comunicação - Transição Cuidado.m4a' }
    ],
    'uso_medicamentos': [
        { nome: '3.1 – Uso de Medicamentos', arquivo: 'Podcasts/Uso de Medicamentos/3.1 Uso de Medicamentos.m4a' }
    ],
    'vida_profissional': [
        { nome: '4.1 – Vida Profissional', arquivo: 'Podcasts/Vida Profissional/4.1 Vida Profissional.m4a' }
    ],
    'prevencao_infeccoes': [
        { nome: '5.1 – Prevenção de Infecções', arquivo: 'Podcasts/Prevenção de infecções/5.1 Prevenção de infecções.m4a' }
    ],
    'avaliacao_riscos': [
        { nome: '6.1 – Avaliação de Riscos', arquivo: 'Podcasts/Avaliação de Riscos/6.1 Avaliação de Riscos.m4a' }
    ]
};

// Renderiza o Painel Principal Completo
function renderPainelPrincipal() {
    return `
        <h1 class="page-title">Painel Principal</h1>
        
        <!-- Card 1: Últimos Comunicados -->
        <div class="content-section">
            <h3><i class="fas fa-bullhorn"></i> Últimos Comunicados</h3>
            <div id="comunicados-preview">
                <p style="color: var(--cor-texto-claro); font-style: italic; text-align: center;">
                    <i class="fas fa-spinner fa-spin"></i> Carregando comunicados...
                </p>
            </div>
        </div>
        
        <!-- Card 2: Minhas Pendências -->
        <div class="content-section">
            <h3><i class="fas fa-tasks"></i> Minhas Pendências</h3>
            <div id="pendencias-preview">
                <p style="color: var(--cor-texto-claro); font-style: italic; text-align: center;">
                    <i class="fas fa-spinner fa-spin"></i> Carregando pendências...
                </p>
            </div>
        </div>
        
        <!-- Card 3: Indicadores de Qualidade -->
        <div class="content-section">
            <h3><i class="fas fa-chart-line"></i> Indicadores de Qualidade</h3>
            <div id="indicadores-preview">
                <p style="color: var(--cor-texto-claro); font-style: italic; text-align: center;">
                    <i class="fas fa-spinner fa-spin"></i> Carregando indicadores...
                </p>
            </div>
        </div>
        
        <!-- Card 4: ROPs Desafio (Gamificação) -->
        <div class="content-section">
            <h3><i class="fas fa-trophy"></i> ROPs Desafio</h3>
            <div id="rops-desafio-preview">
                <p style="color: var(--cor-texto-claro); font-style: italic; text-align: center;">
                    <i class="fas fa-spinner fa-spin"></i> Carregando progresso...
                </p>
            </div>
        </div>
    `;
}

// Carrega conteúdo dinâmico dos cards após renderização
async function loadPainelDashboard() {
    await loadComunicadosPreview();
    await loadPendenciasPreview();
    await loadIndicadoresPreview();
    await loadROPsDesafioPreview();
}

// Card 1: Comunicados
async function loadComunicadosPreview() {
    const container = document.getElementById('comunicados-preview');
    if (!container) return;
    
    try {
        const snapshot = await db.collection('comunicados')
            .orderBy('dataPublicacao', 'desc')
            .limit(3)
            .get();
        
        if (snapshot.empty) {
            container.innerHTML = `
                <p style="color: var(--cor-texto-claro); text-align: center;">
                    <i class="fas fa-info-circle"></i> Nenhum comunicado recente
                </p>
            `;
            return;
        }
        
        let html = '';
        snapshot.forEach(doc => {
            const data = doc.data();
            const date = data.dataPublicacao?.toDate().toLocaleDateString('pt-BR') || 'Data não disponível';
            const prioridade = data.prioridade || 'normal';
            
            const corPrioridade = {
                'baixa': '#6c757d',
                'media': '#ffc107',
                'alta': '#fd7e14',
                'urgente': '#dc3545'
            };
            
            html += `
                <div style="padding: 12px; margin-bottom: 10px; border-left: 4px solid ${corPrioridade[prioridade]}; background: var(--cor-fundo); border-radius: 4px;">
                    <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 5px;">
                        <strong style="font-size: 0.95rem;">${data.titulo}</strong>
                        <span style="font-size: 0.75rem; color: var(--cor-texto-claro);">${date}</span>
                    </div>
                    <p style="margin: 0; font-size: 0.85rem; color: var(--cor-texto-claro); line-height: 1.4;">
                        ${data.conteudo.substring(0, 100)}${data.conteudo.length > 100 ? '...' : ''}
                    </p>
                </div>
            `;
        });
        
        html += `
            <button class="submit-button" onclick="navigateTo('comunicados_lista')" style="margin-top: 10px; padding: 8px 16px;">
                <i class="fas fa-list"></i> Ver Todos
            </button>
        `;
        
        container.innerHTML = html;
    } catch (error) {
        console.error('[PAINEL] Erro ao carregar comunicados:', error);
        container.innerHTML = `
            <p style="color: var(--cor-perigo); text-align: center;">
                <i class="fas fa-exclamation-triangle"></i> Erro ao carregar comunicados
            </p>
        `;
    }
}

// Card 2: Pendências
async function loadPendenciasPreview() {
    const container = document.getElementById('pendencias-preview');
    if (!container) return;
    
    try {
        const completedROPs = userProfile.completedROPs || [];
        const totalROPs = 32;
        const pendingROPs = totalROPs - completedROPs.length;
        
        let html = `
            <div style="padding: 12px; background: var(--cor-fundo); border-radius: 8px; margin-bottom: 10px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                    <span style="font-size: 0.9rem;">
                        <i class="fas fa-award" style="color: var(--cor-aviso);"></i> ROPs Pendentes
                    </span>
                    <strong style="font-size: 1.1rem; color: var(--cor-aviso);">${pendingROPs}</strong>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span style="font-size: 0.9rem;">
                        <i class="fas fa-check-circle" style="color: var(--cor-sucesso);"></i> ROPs Completas
                    </span>
                    <strong style="font-size: 1.1rem; color: var(--cor-sucesso);">${completedROPs.length}</strong>
                </div>
            </div>
            <button class="submit-button" onclick="navigateTo('rops')" style="padding: 8px 16px;">
                <i class="fas fa-play"></i> Continuar Desafio
            </button>
        `;
        
        container.innerHTML = html;
    } catch (error) {
        console.error('[PAINEL] Erro ao carregar pendências:', error);
        container.innerHTML = `
            <p style="color: var(--cor-perigo); text-align: center;">
                <i class="fas fa-exclamation-triangle"></i> Erro ao carregar pendências
            </p>
        `;
    }
}

// Card 3: Indicadores
async function loadIndicadoresPreview() {
    const container = document.getElementById('indicadores-preview');
    if (!container) return;
    
    try {
        const snapshot = await db.collection('indicadores').limit(5).get();
        
        if (snapshot.empty) {
            // Criar indicadores padrão se não existirem
            if (isAdmin()) {
                container.innerHTML = `
                    <p style="color: var(--cor-texto-claro); text-align: center; margin-bottom: 10px;">
                        <i class="fas fa-info-circle"></i> Nenhum indicador configurado
                    </p>
                    <button class="submit-button" onclick="navigateTo('admin_indicadores')" style="padding: 8px 16px;">
                        <i class="fas fa-cog"></i> Configurar Indicadores
                    </button>
                `;
            } else {
                container.innerHTML = `
                    <p style="color: var(--cor-texto-claro); text-align: center;">
                        <i class="fas fa-info-circle"></i> Indicadores em configuração
                    </p>
                `;
            }
            return;
        }
        
        let html = '';
        snapshot.forEach(doc => {
            const data = doc.data();
            const progresso = (data.valorAtual / data.meta) * 100;
            const cor = progresso >= 90 ? 'var(--cor-sucesso)' : progresso >= 70 ? 'var(--cor-aviso)' : 'var(--cor-perigo)';
            
            html += `
                <div style="margin-bottom: 15px;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                        <span style="font-size: 0.85rem; font-weight: 500;">${data.nome}</span>
                        <span style="font-size: 0.85rem; color: var(--cor-texto-claro);">
                            ${data.valorAtual}% / ${data.meta}%
                        </span>
                    </div>
                    <div style="width: 100%; height: 8px; background: var(--cor-borda); border-radius: 4px; overflow: hidden;">
                        <div style="width: ${Math.min(progresso, 100)}%; height: 100%; background: ${cor}; transition: width 0.3s;"></div>
                    </div>
                </div>
            `;
        });
        
        html += `
            <button class="submit-button" onclick="navigateTo('kpis_detalhes')" style="margin-top: 10px; padding: 8px 16px;">
                <i class="fas fa-chart-bar"></i> Ver Detalhes
            </button>
        `;
        
        container.innerHTML = html;
    } catch (error) {
        console.error('[PAINEL] Erro ao carregar indicadores:', error);
        container.innerHTML = `
            <p style="color: var(--cor-perigo); text-align: center;">
                <i class="fas fa-exclamation-triangle"></i> Erro ao carregar indicadores
            </p>
        `;
    }
}

// Card 4: ROPs Desafio com Gamificação
async function loadROPsDesafioPreview() {
    const container = document.getElementById('rops-desafio-preview');
    if (!container) return;
    
    try {
        const completedROPs = userProfile.completedROPs || [];
        const totalROPs = 32;
        const progressoGeral = Math.round((completedROPs.length / totalROPs) * 100);
        
        let html = `
            <div style="text-align: center; margin-bottom: 15px;">
                <div style="font-size: 2rem; font-weight: bold; color: var(--cor-primaria);">
                    ${completedROPs.length} / ${totalROPs}
                </div>
                <div style="font-size: 0.9rem; color: var(--cor-texto-claro);">
                    ROPs Completadas
                </div>
                <div style="width: 100%; height: 12px; background: var(--cor-borda); border-radius: 6px; overflow: hidden; margin-top: 10px;">
                    <div style="width: ${progressoGeral}%; height: 100%; background: linear-gradient(90deg, var(--cor-primaria), var(--cor-secundaria)); transition: width 0.3s;"></div>
                </div>
            </div>
            
            <h4 style="font-size: 0.95rem; margin: 15px 0 10px 0; color: var(--cor-primaria);">
                <i class="fas fa-chart-bar"></i> Progresso por Área
            </h4>
        `;
        
        // Progress por área
        const areas = [
            { id: 'cultura_seguranca', nome: 'Cultura de Segurança', icon: '🛡️' },
            { id: 'comunicacao', nome: 'Comunicação', icon: '💬' },
            { id: 'uso_medicamentos', nome: 'Uso de Medicamentos', icon: '💊' },
            { id: 'vida_profissional', nome: 'Vida Profissional', icon: '👥' },
            { id: 'prevencao_infeccoes', nome: 'Controle de Infecção', icon: '🦠' },
            { id: 'avaliacao_riscos', nome: 'Avaliação de Riscos', icon: '⚠️' }
        ];
        
        areas.forEach(area => {
            const ropsArea = ROPS_POR_AREA[area.id];
            const completasArea = ropsArea.filter(rop => completedROPs.includes(rop)).length;
            const progressoArea = Math.round((completasArea / ropsArea.length) * 100);
            const podcasts = PODCASTS_POR_AREA[area.id] || [];
            
            html += `
                <div style="margin-bottom: 12px; padding: 10px; background: var(--cor-fundo); border-radius: 8px;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                        <span style="font-size: 0.85rem;">
                            ${area.icon} <strong>${area.nome}</strong>
                        </span>
                        <div style="display: flex; gap: 8px; align-items: center;">
                            <span style="font-size: 0.75rem; color: var(--cor-texto-claro);">
                                ${completasArea}/${ropsArea.length}
                            </span>
                            ${podcasts.length > 0 ? `
                                <button onclick="showPodcastsArea('${area.id}')" 
                                        style="background: none; border: none; color: var(--cor-secundaria); cursor: pointer; font-size: 1.1rem; padding: 2px 6px;"
                                        title="Podcasts Educativos">
                                    <i class="fas fa-podcast"></i>
                                </button>
                            ` : ''}
                        </div>
                    </div>
                    <div style="width: 100%; height: 6px; background: var(--cor-borda); border-radius: 3px; overflow: hidden;">
                        <div style="width: ${progressoArea}%; height: 100%; background: var(--cor-primaria); transition: width 0.3s;"></div>
                    </div>
                </div>
            `;
        });
        
        html += `
            <div style="display: flex; gap: 10px; margin-top: 15px;">
                <button class="submit-button" onclick="navigateTo('rops')" style="flex: 1; padding: 10px;">
                    <i class="fas fa-play"></i> Iniciar Desafio
                </button>
                <button class="submit-button" onclick="showRanking()" style="flex: 1; padding: 10px; background: var(--cor-aviso);">
                    <i class="fas fa-trophy"></i> Ver Ranking
                </button>
            </div>
        `;
        
        container.innerHTML = html;
    } catch (error) {
        console.error('[PAINEL] Erro ao carregar ROPs desafio:', error);
        container.innerHTML = `
            <p style="color: var(--cor-perigo); text-align: center;">
                <i class="fas fa-exclamation-triangle"></i> Erro ao carregar progresso
            </p>
        `;
    }
}

// Mostra podcasts de uma área específica
function showPodcastsArea(areaId) {
    const podcasts = PODCASTS_POR_AREA[areaId];
    if (!podcasts || podcasts.length === 0) {
        showToast('Nenhum podcast disponível para esta área', 'info');
        return;
    }
    
    const areas = {
        'cultura_seguranca': '🛡️ Cultura de Segurança',
        'comunicacao': '💬 Comunicação',
        'uso_medicamentos': '💊 Uso de Medicamentos',
        'vida_profissional': '👥 Vida Profissional',
        'prevencao_infeccoes': '🦠 Controle de Infecção',
        'avaliacao_riscos': '⚠️ Avaliação de Riscos'
    };
    
    let html = `
        <h1 class="page-title">${areas[areaId]}</h1>
        <h3 style="margin-bottom: 15px;">
            <i class="fas fa-podcast"></i> Podcasts Educativos
        </h3>
    `;
    
    podcasts.forEach((podcast, index) => {
        html += `
            <div class="content-section" style="margin-bottom: 15px;">
                <h4 style="margin: 0 0 10px 0; font-size: 0.95rem;">
                    <i class="fas fa-microphone"></i> ${podcast.nome}
                </h4>
                <audio controls style="width: 100%;">
                    <source src="${podcast.arquivo}" type="audio/mp4">
                    Seu navegador não suporta o elemento de áudio.
                </audio>
            </div>
        `;
    });
    
    const pageContent = document.getElementById('page-content');
    const headerTitle = document.getElementById('header-title');
    
    pageContent.innerHTML = html;
    headerTitle.textContent = areas[areaId];
    pageContent.scrollTop = 0;
    
    // Atualizar navegação
    navigationStack.push(`podcasts_${areaId}`);
    document.getElementById('back-button').style.display = 'block';
}

// Exportar funções globais
window.renderPainelPrincipal = renderPainelPrincipal;
window.loadPainelDashboard = loadPainelDashboard;
window.showPodcastsArea = showPodcastsArea;
window.PODCASTS_POR_AREA = PODCASTS_POR_AREA;
window.ROPS_POR_AREA = ROPS_POR_AREA;

