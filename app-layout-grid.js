// ==================== LAYOUT GRID - CONFORME IMAGENS ====================
// Versão 8.2.0 - Layout Grid Completo

// ==================== PÁGINA INICIAL (Imagem 2) ====================
function renderPaginaInicial() {
    const userName = userProfile.firstName || 'Usuário';
    
    return `
        <div class="greeting">Olá, ${userName}</div>
        
        <div class="home-grid">
            <!-- Card 1: ROPs - Desafio -->
            <div class="grid-card" onclick="navigateTo('rops_macro')">
                <div class="grid-card-icon" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
                    <i class="fas fa-trophy"></i>
                </div>
                <div class="grid-card-title">ROPs - Desafio</div>
                <div class="grid-card-subtitle">Quiz, podcasts e ranking</div>
            </div>
            
            <!-- Card 2: Documentos -->
            <div class="grid-card" onclick="navigateTo('biblioteca_documentos')">
                <div class="grid-card-icon" style="background: linear-gradient(135deg, #5f8d4e 0%, #4a7c3f 100%);">
                    <i class="fas fa-folder-open"></i>
                </div>
                <div class="grid-card-title">Documentos</div>
                <div class="grid-card-subtitle">Protocolos, políticas e mais</div>
            </div>
            
            <!-- Card 3: Notificações -->
            <div class="grid-card" onclick="navigateTo('notificacoes')">
                <div class="grid-card-icon" style="background: linear-gradient(135deg, #f77062 0%, #fe5196 100%);">
                    <i class="fas fa-bell"></i>
                </div>
                <div class="grid-card-title">Notificações</div>
                <div class="grid-card-subtitle">Avisos e comunicados</div>
            </div>
            
            <!-- Card 4: Residência Médica -->
            <div class="grid-card" onclick="navigateTo('residencia_menu')">
                <div class="grid-card-icon" style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);">
                    <i class="fas fa-user-graduate"></i>
                </div>
                <div class="grid-card-title">Residência Médica</div>
                <div class="grid-card-subtitle">Aulas, artigos e escalas</div>
            </div>
            
            <!-- Card 5: Admin (apenas para admins) -->
            ${isAdmin() ? `
            <div class="grid-card" onclick="navigateTo('admin_panel')">
                <div class="grid-card-icon" style="background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);">
                    <i class="fas fa-user-shield"></i>
                </div>
                <div class="grid-card-title">Admin</div>
                <div class="grid-card-subtitle">Gerenciar permissões</div>
            </div>
            ` : ''}
        </div>
    `;
}

// ==================== BIBLIOTECA DE DOCUMENTOS (Imagem 3) ====================
function renderBibliotecaDocumentos() {
    return `
        <div class="page-header">
            <p>Acesse todos os documentos técnicos e institucionais</p>
        </div>
        
        <div class="docs-grid">
            <!-- Protocolos -->
            <div class="grid-card" onclick="navigateTo('docs_protocolos')">
                <div class="grid-card-icon" style="background: #8bc34a;">
                    <i class="fas fa-file-medical"></i>
                </div>
                <div class="grid-card-title">Protocolos</div>
                <div class="grid-card-subtitle">Protocolos assistenciais</div>
            </div>
            
            <!-- Políticas -->
            <div class="grid-card" onclick="navigateTo('docs_politicas')">
                <div class="grid-card-icon" style="background: #66bb6a;">
                    <i class="fas fa-shield-alt"></i>
                </div>
                <div class="grid-card-title">Políticas</div>
                <div class="grid-card-subtitle">Políticas institucionais</div>
            </div>
            
            <!-- Formulários -->
            <div class="grid-card" onclick="navigateTo('docs_formularios')">
                <div class="grid-card-icon" style="background: #81c784;">
                    <i class="fas fa-file-alt"></i>
                </div>
                <div class="grid-card-title">Formulários</div>
                <div class="grid-card-subtitle">Documentos e formulários</div>
            </div>
            
            <!-- Manuais -->
            <div class="grid-card" onclick="navigateTo('docs_manuais')">
                <div class="grid-card-icon" style="background: #4caf50;">
                    <i class="fas fa-book"></i>
                </div>
                <div class="grid-card-title">Manuais</div>
                <div class="grid-card-subtitle">Manuais técnicos</div>
            </div>
            
            <!-- Relatórios -->
            <div class="grid-card" onclick="navigateTo('docs_relatorios')">
                <div class="grid-card-icon" style="background: #aed581;">
                    <i class="fas fa-chart-line"></i>
                </div>
                <div class="grid-card-title">Relatórios</div>
                <div class="grid-card-subtitle">Segurança do paciente</div>
            </div>
            
            <!-- Processos -->
            <div class="grid-card" onclick="navigateTo('docs_processos')">
                <div class="grid-card-icon" style="background: #9ccc65;">
                    <i class="fas fa-project-diagram"></i>
                </div>
                <div class="grid-card-title">Processos</div>
                <div class="grid-card-subtitle">Mapeamento de processos</div>
            </div>
            
            <!-- Riscos -->
            <div class="grid-card" onclick="navigateTo('docs_riscos')">
                <div class="grid-card-icon" style="background: #8bc34a;">
                    <i class="fas fa-exclamation-triangle"></i>
                </div>
                <div class="grid-card-title">Riscos</div>
                <div class="grid-card-subtitle">Mapeamento de riscos</div>
            </div>
            
            <!-- Termos -->
            <div class="grid-card" onclick="navigateTo('docs_termos')">
                <div class="grid-card-icon" style="background: #c5e1a5;">
                    <i class="fas fa-file-signature"></i>
                </div>
                <div class="grid-card-title">Termos</div>
                <div class="grid-card-subtitle">Termos e documentos</div>
            </div>
        </div>
    `;
}

// ==================== RESIDÊNCIA MÉDICA (Imagem 4) ====================
function renderResidenciaMenu() {
    return `
        <div class="docs-grid">
            <!-- Aulas -->
            <div class="grid-card" onclick="navigateTo('residencia_aulas')">
                <div class="grid-card-icon" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
                    <i class="fas fa-chalkboard-teacher"></i>
                </div>
                <div class="grid-card-title">Aulas</div>
                <div class="grid-card-subtitle">Material didático e apresentações</div>
            </div>
            
            <!-- Artigos -->
            <div class="grid-card" onclick="navigateTo('residencia_artigos')">
                <div class="grid-card-icon" style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);">
                    <i class="fas fa-newspaper"></i>
                </div>
                <div class="grid-card-title">Artigos</div>
                <div class="grid-card-subtitle">Artigos científicos relevantes</div>
            </div>
            
            <!-- Escalas -->
            <div class="grid-card" onclick="navigateTo('residencia_escalas')">
                <div class="grid-card-icon" style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);">
                    <i class="fas fa-calendar-alt"></i>
                </div>
                <div class="grid-card-title">Escalas</div>
                <div class="grid-card-subtitle">Escalas de plantão e atividades</div>
            </div>
            
            <!-- Estágios -->
            <div class="grid-card" onclick="navigateTo('residencia_estagios')">
                <div class="grid-card-icon" style="background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);">
                    <i class="fas fa-hospital"></i>
                </div>
                <div class="grid-card-title">Estágios</div>
                <div class="grid-card-subtitle">Informações sobre estágios</div>
            </div>
            
            <!-- Férias -->
            <div class="grid-card" onclick="navigateTo('residencia_ferias')">
                <div class="grid-card-icon" style="background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);">
                    <i class="fas fa-umbrella-beach"></i>
                </div>
                <div class="grid-card-title">Férias</div>
                <div class="grid-card-subtitle">Programação de férias</div>
            </div>
        </div>
    `;
}

// ==================== ROPs DESAFIO (Imagem 5) ====================
function renderROPsMacro() {
    return `
        <div class="rops-grid">
            <!-- Macro área 1 -->
            <div class="grid-card" onclick="navigateTo('rops_area_1')">
                <div class="grid-card-icon" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
                    <i class="fas fa-shield-alt"></i>
                </div>
                <div class="grid-card-title">Macro área 1 – Cultura de Segurança</div>
                <div class="grid-card-subtitle">4 subdivisões</div>
            </div>
            
            <!-- Macro área 2 -->
            <div class="grid-card" onclick="navigateTo('rops_area_2')">
                <div class="grid-card-icon" style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);">
                    <i class="fas fa-comments"></i>
                </div>
                <div class="grid-card-title">Macro área 2 – Comunicação</div>
                <div class="grid-card-subtitle">9 subdivisões</div>
            </div>
            
            <!-- Macro área 3 -->
            <div class="grid-card" onclick="navigateTo('rops_area_3')">
                <div class="grid-card-icon" style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);">
                    <i class="fas fa-pills"></i>
                </div>
                <div class="grid-card-title">Macro área 3 – Uso de Medicamentos</div>
                <div class="grid-card-subtitle">5 subdivisões</div>
            </div>
            
            <!-- Macro área 4 -->
            <div class="grid-card" onclick="navigateTo('rops_area_4')">
                <div class="grid-card-icon" style="background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);">
                    <i class="fas fa-users"></i>
                </div>
                <div class="grid-card-title">Macro área 4 – Vida Profissional e Força de Trabalho</div>
                <div class="grid-card-subtitle">5 subdivisões</div>
            </div>
            
            <!-- Macro área 5 -->
            <div class="grid-card" onclick="navigateTo('rops_area_5')">
                <div class="grid-card-icon" style="background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);">
                    <i class="fas fa-hand-sparkles"></i>
                </div>
                <div class="grid-card-title">Macro área 5 – Prevenção de Infecções</div>
                <div class="grid-card-subtitle">5 subdivisões</div>
            </div>
            
            <!-- Macro área 6 -->
            <div class="grid-card" onclick="navigateTo('rops_area_6')">
                <div class="grid-card-icon" style="background: linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%);">
                    <i class="fas fa-exclamation-circle"></i>
                </div>
                <div class="grid-card-title">Macro área 6 – Avaliação de Risco</div>
                <div class="grid-card-subtitle">4 subdivisões</div>
            </div>
            
            <!-- Simulado Geral -->
            <div class="grid-card" onclick="navigateTo('rops_simulado')">
                <div class="grid-card-icon" style="background: linear-gradient(135deg, #fbc2eb 0%, #a18cd1 100%);">
                    <i class="fas fa-graduation-cap"></i>
                </div>
                <div class="grid-card-title">Simulado Geral</div>
                <div class="grid-card-subtitle">Quiz com todas as questões</div>
            </div>
            
            <!-- Ranking -->
            <div class="grid-card" onclick="showRanking()">
                <div class="grid-card-icon" style="background: linear-gradient(135deg, #f6d365 0%, #fda085 100%);">
                    <i class="fas fa-trophy"></i>
                </div>
                <div class="grid-card-title">Ranking</div>
                <div class="grid-card-subtitle">Classificação dos usuários</div>
            </div>
        </div>
    `;
}

// ==================== NOTIFICAÇÕES ====================
function renderNotificacoes() {
    return `
        <div class="page-header">
            <h1>Notificações</h1>
            <p>Últimos comunicados e avisos</p>
        </div>
        
        <div id="notificacoes-lista">
            <p style="color: rgba(255,255,255,0.7); text-align: center; padding: 20px;">
                <i class="fas fa-spinner fa-spin"></i> Carregando notificações...
            </p>
        </div>
    `;
}

// Exportar funções
window.renderPaginaInicial = renderPaginaInicial;
window.renderBibliotecaDocumentos = renderBibliotecaDocumentos;
window.renderResidenciaMenu = renderResidenciaMenu;
window.renderROPsMacro = renderROPsMacro;
window.renderNotificacoes = renderNotificacoes;

