// ==================== RESIDÊNCIA MÉDICA - APLICATIVO ====================
// Funcionalidades: Aulas, Artigos, Escalas, Estágios, Férias

// ==================== MAIN SCREEN ====================

function showResidencia() {
    const screen = document.getElementById('residenciaScreen');
    screen.innerHTML = `
        <button class="back-btn" onclick="goHome()">
            <i class="fas fa-arrow-left"></i> Voltar
        </button>
        <h2 class="screen-title">
            <i class="fas fa-user-graduate"></i> Residência Médica
        </h2>
        <p style="text-align: center; color: white; opacity: 0.9; margin-bottom: 30px;">
            Gestão completa da residência médica
        </p>
        
        <div class="menu-grid">
            <!-- Aulas -->
            <div class="menu-card" onclick="showAulas()">
                <div class="card-icon" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%)">
                    <i class="fas fa-chalkboard-teacher"></i>
                </div>
                <h3>Aulas</h3>
                <p>Cronograma e materiais</p>
            </div>
            
            <!-- Artigos -->
            <div class="menu-card" onclick="showArtigos()">
                <div class="card-icon" style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%)">
                    <i class="fas fa-file-medical-alt"></i>
                </div>
                <h3>Artigos</h3>
                <p>Biblioteca científica</p>
            </div>
            
            <!-- Plantões -->
            <div class="menu-card" onclick="showPlantoes()">
                <div class="card-icon" style="background: linear-gradient(135deg, #8e44ad 0%, #9b59b6 100%)">
                    <i class="fas fa-hospital"></i>
                </div>
                <h3>Plantões</h3>
                <p>Escala de plantões</p>
            </div>
            
            <!-- Escalas -->
            <div class="menu-card" onclick="showEscalas()">
                <div class="card-icon" style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)">
                    <i class="fas fa-calendar-alt"></i>
                </div>
                <h3>Escalas</h3>
                <p>Plantões e atividades</p>
            </div>
            
            <!-- Estágios -->
            <div class="menu-card" onclick="showEstagios()">
                <div class="card-icon" style="background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)">
                    <i class="fas fa-hospital-user"></i>
                </div>
                <h3>Estágios</h3>
                <p>Agenda de rodízios</p>
            </div>
            
            <!-- Férias -->
            <div class="menu-card" onclick="showFerias()">
                <div class="card-icon" style="background: linear-gradient(135deg, #fa709a 0%, #fee140 100%)">
                    <i class="fas fa-umbrella-beach"></i>
                </div>
                <h3>Férias</h3>
                <p>Solicitação e agenda</p>
            </div>
            
            <!-- Meu Perfil Residência -->
            <div class="menu-card" onclick="showPerfilResidencia()">
                <div class="card-icon" style="background: linear-gradient(135deg, #30cfd0 0%, #330867 100%)">
                    <i class="fas fa-id-badge"></i>
                </div>
                <h3>Meu Perfil</h3>
                <p>Dados e configurações</p>
            </div>
        </div>
    `;
    showScreen('residencia');
}

// ==================== AULAS ====================

async function showAulas() {
    const screen = document.getElementById('residenciaScreen');
    
    screen.innerHTML = `
        <button class="back-btn" onclick="showResidencia()">
            <i class="fas fa-arrow-left"></i> Voltar
        </button>
        <h2 class="screen-title">
            <i class="fas fa-chalkboard-teacher"></i> Aulas
        </h2>
        
        <div style="text-align: center; margin-bottom: 30px;">
            <button class="btn-primary" onclick="showNovaAulaForm()" style="margin: 0 auto;">
                <i class="fas fa-plus"></i> Adicionar Aula
            </button>
        </div>
        
        <div id="aulasContainer" style="max-width: 1000px; margin: 0 auto;">
            <div class="loading-spinner" style="margin: 40px auto; text-align: center;">
                <i class="fas fa-spinner fa-spin" style="font-size: 48px; color: white;"></i>
                <p style="color: white; margin-top: 20px;">Carregando aulas...</p>
            </div>
        </div>
    `;
    
    // Carrega aulas
    await loadAulas();
}

async function loadAulas() {
    try {
        const aulas = await supabaseSelect('aulas', {});
        
        const container = document.getElementById('aulasContainer');
        
        if (!aulas || aulas.length === 0) {
            container.innerHTML = `
                <div style="background: white; border-radius: 20px; padding: 40px; text-align: center;">
                    <i class="fas fa-chalkboard" style="font-size: 64px; color: var(--text-light); margin-bottom: 20px;"></i>
                    <h3 style="color: var(--text-dark); margin-bottom: 10px;">Nenhuma aula cadastrada</h3>
                    <p style="color: var(--text-light);">
                        Clique em "Adicionar Aula" para criar a primeira aula.
                    </p>
                </div>
            `;
            return;
        }
        
        // Agrupa por mês
        const aulasPorMes = {};
        aulas.forEach(aula => {
            const data = new Date(aula.data);
            const mesAno = data.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
            if (!aulasPorMes[mesAno]) {
                aulasPorMes[mesAno] = [];
            }
            aulasPorMes[mesAno].push(aula);
        });
        
        let html = '';
        Object.entries(aulasPorMes).forEach(([mesAno, aulasDoMes]) => {
            html += `
                <div style="margin-bottom: 40px;">
                    <h3 style="color: white; text-transform: capitalize; margin-bottom: 20px; padding-left: 10px; border-left: 4px solid var(--secondary-color);">
                        ${mesAno}
                    </h3>
                    <div class="aulas-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px;">
                        ${aulasDoMes.map(aula => createAulaCard(aula)).join('')}
                    </div>
                </div>
            `;
        });
        
        container.innerHTML = html;
    } catch (error) {
        console.error('Erro ao carregar aulas:', error);
        showToast('Erro ao carregar aulas', 'error');
    }
}

function createAulaCard(aula) {
    const data = new Date(aula.data);
    const dataFormatada = data.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
    const horaFormatada = aula.horario || '00:00';
    
    return `
        <div class="aula-card" style="background: white; border-radius: 15px; padding: 20px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); transition: transform 0.3s ease; cursor: pointer;" 
             onclick="viewAula('${aula.id}')">
            <div style="display: flex; align-items: start; gap: 15px; margin-bottom: 15px;">
                <div style="flex-shrink: 0; width: 60px; height: 60px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 12px; display: flex; flex-direction: column; align-items: center; justify-content: center; color: white;">
                    <div style="font-size: 24px; font-weight: bold; line-height: 1;">${data.getDate()}</div>
                    <div style="font-size: 11px; text-transform: uppercase; opacity: 0.9;">${data.toLocaleDateString('pt-BR', { month: 'short' })}</div>
                </div>
                <div style="flex: 1;">
                    <h4 style="color: var(--text-dark); margin: 0 0 8px 0; font-size: 18px; font-weight: 600;">
                        ${aula.titulo}
                    </h4>
                    <div style="display: flex; align-items: center; gap: 15px; flex-wrap: wrap;">
                        <span style="color: var(--text-light); font-size: 14px;">
                            <i class="fas fa-clock"></i> ${horaFormatada}
                        </span>
                        ${aula.professor ? `
                        <span style="color: var(--text-light); font-size: 14px;">
                            <i class="fas fa-user"></i> ${aula.professor}
                        </span>
                        ` : ''}
                    </div>
                </div>
            </div>
            ${aula.descricao ? `
            <p style="color: var(--text-light); font-size: 14px; margin-bottom: 12px; line-height: 1.5;">
                ${aula.descricao.substring(0, 100)}${aula.descricao.length > 100 ? '...' : ''}
            </p>
            ` : ''}
            <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                ${aula.tipo ? `<span class="badge" style="background: var(--primary-color); color: white; padding: 4px 10px; border-radius: 12px; font-size: 12px;">${aula.tipo}</span>` : ''}
                ${aula.local ? `<span class="badge" style="background: var(--secondary-color); color: white; padding: 4px 10px; border-radius: 12px; font-size: 12px;"><i class="fas fa-map-marker-alt"></i> ${aula.local}</span>` : ''}
            </div>
        </div>
    `;
}

function showNovaAulaForm() {
    const screen = document.getElementById('residenciaScreen');
    
    screen.innerHTML = `
        <button class="back-btn" onclick="showAulas()">
            <i class="fas fa-arrow-left"></i> Voltar
        </button>
        <h2 class="screen-title">
            <i class="fas fa-plus"></i> Nova Aula
        </h2>
        
        <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 20px; padding: 40px;">
            <form id="formNovaAula" onsubmit="submitNovaAula(event)">
                <div class="form-group" style="margin-bottom: 20px;">
                    <label style="display: block; color: var(--text-dark); margin-bottom: 8px; font-weight: 600;">
                        <i class="fas fa-heading"></i> Título da Aula *
                    </label>
                    <input type="text" name="titulo" required 
                           style="width: 100%; padding: 12px; border: 2px solid var(--border-color); border-radius: 10px; font-size: 16px;"
                           placeholder="Ex: Anatomia Cardiovascular">
                </div>
                
                <div class="form-group" style="margin-bottom: 20px;">
                    <label style="display: block; color: var(--text-dark); margin-bottom: 8px; font-weight: 600;">
                        <i class="fas fa-align-left"></i> Descrição
                    </label>
                    <textarea name="descricao" rows="4" 
                           style="width: 100%; padding: 12px; border: 2px solid var(--border-color); border-radius: 10px; font-size: 16px;"
                           placeholder="Descrição da aula"></textarea>
                </div>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 20px;">
                    <div class="form-group">
                        <label style="display: block; color: var(--text-dark); margin-bottom: 8px; font-weight: 600;">
                            <i class="fas fa-calendar"></i> Data *
                        </label>
                        <input type="date" name="data" required 
                               style="width: 100%; padding: 12px; border: 2px solid var(--border-color); border-radius: 10px; font-size: 16px;">
                    </div>
                    
                    <div class="form-group">
                        <label style="display: block; color: var(--text-dark); margin-bottom: 8px; font-weight: 600;">
                            <i class="fas fa-clock"></i> Horário
                        </label>
                        <input type="time" name="horario" 
                               style="width: 100%; padding: 12px; border: 2px solid var(--border-color); border-radius: 10px; font-size: 16px;">
                    </div>
                </div>
                
                <div class="form-group" style="margin-bottom: 20px;">
                    <label style="display: block; color: var(--text-dark); margin-bottom: 8px; font-weight: 600;">
                        <i class="fas fa-user"></i> Professor
                    </label>
                    <input type="text" name="professor" 
                           style="width: 100%; padding: 12px; border: 2px solid var(--border-color); border-radius: 10px; font-size: 16px;"
                           placeholder="Nome do professor">
                </div>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 20px;">
                    <div class="form-group">
                        <label style="display: block; color: var(--text-dark); margin-bottom: 8px; font-weight: 600;">
                            <i class="fas fa-tag"></i> Tipo
                        </label>
                        <select name="tipo" 
                                style="width: 100%; padding: 12px; border: 2px solid var(--border-color); border-radius: 10px; font-size: 16px;">
                            <option value="">Selecione...</option>
                            <option value="Teórica">Teórica</option>
                            <option value="Prática">Prática</option>
                            <option value="Seminário">Seminário</option>
                            <option value="Workshop">Workshop</option>
                            <option value="Palestra">Palestra</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label style="display: block; color: var(--text-dark); margin-bottom: 8px; font-weight: 600;">
                            <i class="fas fa-map-marker-alt"></i> Local
                        </label>
                        <input type="text" name="local" 
                               style="width: 100%; padding: 12px; border: 2px solid var(--border-color); border-radius: 10px; font-size: 16px;"
                               placeholder="Ex: Sala 201">
                    </div>
                </div>
                
                <div class="form-group" style="margin-bottom: 30px;">
                    <label style="display: block; color: var(--text-dark); margin-bottom: 8px; font-weight: 600;">
                        <i class="fas fa-link"></i> Link de Materiais / Videoconferência
                    </label>
                    <input type="url" name="link" 
                           style="width: 100%; padding: 12px; border: 2px solid var(--border-color); border-radius: 10px; font-size: 16px;"
                           placeholder="https://...">
                </div>
                
                <div style="display: flex; gap: 10px; justify-content: flex-end;">
                    <button type="button" onclick="showAulas()" 
                            style="padding: 12px 24px; background: var(--text-light); color: white; border: none; border-radius: 10px; cursor: pointer; font-size: 16px;">
                        Cancelar
                    </button>
                    <button type="submit" 
                            style="padding: 12px 24px; background: var(--primary-color); color: white; border: none; border-radius: 10px; cursor: pointer; font-size: 16px; font-weight: 600;">
                        <i class="fas fa-save"></i> Salvar Aula
                    </button>
                </div>
            </form>
        </div>
    `;
}

async function submitNovaAula(event) {
    event.preventDefault();
    
    try {
        const form = event.target;
        const formData = new FormData(form);
        
        const aulaData = {
            titulo: formData.get('titulo'),
            descricao: formData.get('descricao'),
            data: formData.get('data'),
            horario: formData.get('horario'),
            professor: formData.get('professor'),
            tipo: formData.get('tipo'),
            local: formData.get('local'),
            link: formData.get('link'),
            criadoPor: currentUser.uid,
            criadoEm: new Date().toISOString()
        };
        
        // Salva no Supabase/Firebase
        await supabaseInsert('aulas', aulaData);
        
        showToast('Aula adicionada com sucesso!', 'success');
        
        // Aciona automação N8N
        await triggerN8NWorkflow('novaAula', aulaData);
        
        // Envia notificação WhatsApp (se configurado)
        await sendWhatsAppNotification(currentUser.uid, 'nova_aula', {
            title: aulaData.titulo,
            description: aulaData.descricao,
            date: new Date(aulaData.data).toLocaleDateString('pt-BR')
        });
        
        // Volta para lista
        showAulas();
    } catch (error) {
        console.error('Erro ao adicionar aula:', error);
        showToast('Erro ao adicionar aula', 'error');
    }
}

function viewAula(aulaId) {
    showToast('Visualização de aula em desenvolvimento', 'info');
    // TODO: Implementar visualização detalhada
}

// ==================== ARTIGOS ====================

async function showArtigos() {
    const screen = document.getElementById('residenciaScreen');
    
    screen.innerHTML = `
        <button class="back-btn" onclick="showResidencia()">
            <i class="fas fa-arrow-left"></i> Voltar
        </button>
        <h2 class="screen-title">
            <i class="fas fa-file-medical-alt"></i> Artigos Científicos
        </h2>
        
        <div style="text-align: center; margin-bottom: 30px;">
            <button class="btn-primary" onclick="showNovoArtigoForm()" style="margin: 0 auto;">
                <i class="fas fa-plus"></i> Adicionar Artigo
            </button>
        </div>
        
        <div id="artigosContainer" style="max-width: 1000px; margin: 0 auto;">
            <div class="loading-spinner" style="margin: 40px auto; text-align: center;">
                <i class="fas fa-spinner fa-spin" style="font-size: 48px; color: white;"></i>
                <p style="color: white; margin-top: 20px;">Carregando artigos...</p>
            </div>
        </div>
    `;
    
    await loadArtigos();
}

async function loadArtigos() {
    try {
        const artigos = await supabaseSelect('artigos', {});
        
        const container = document.getElementById('artigosContainer');
        
        if (!artigos || artigos.length === 0) {
            container.innerHTML = `
                <div style="background: white; border-radius: 20px; padding: 40px; text-align: center;">
                    <i class="fas fa-book-medical" style="font-size: 64px; color: var(--text-light); margin-bottom: 20px;"></i>
                    <h3 style="color: var(--text-dark); margin-bottom: 10px;">Nenhum artigo cadastrado</h3>
                    <p style="color: var(--text-light);">
                        Clique em "Adicionar Artigo" para criar o primeiro artigo.
                    </p>
                </div>
            `;
            return;
        }
        
        let html = '<div class="artigos-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(350px, 1fr)); gap: 20px;">';
        
        artigos.forEach(artigo => {
            html += createArtigoCard(artigo);
        });
        
        html += '</div>';
        container.innerHTML = html;
    } catch (error) {
        console.error('Erro ao carregar artigos:', error);
        showToast('Erro ao carregar artigos', 'error');
    }
}

function createArtigoCard(artigo) {
    const dataPublicacao = artigo.dataPublicacao ? new Date(artigo.dataPublicacao).toLocaleDateString('pt-BR') : 'Data não informada';
    
    return `
        <div class="artigo-card" style="background: white; border-radius: 15px; padding: 25px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); transition: transform 0.3s ease; cursor: pointer;"
             onclick="viewArtigo('${artigo.id}')">
            <div style="margin-bottom: 15px;">
                <span style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; padding: 6px 12px; border-radius: 20px; font-size: 12px; font-weight: 600;">
                    ${artigo.categoria || 'Artigo'}
                </span>
            </div>
            
            <h4 style="color: var(--text-dark); margin: 0 0 12px 0; font-size: 18px; font-weight: 600; line-height: 1.4;">
                ${artigo.titulo}
            </h4>
            
            ${artigo.autores ? `
            <p style="color: var(--text-light); font-size: 14px; margin-bottom: 8px;">
                <i class="fas fa-user-md"></i> ${artigo.autores}
            </p>
            ` : ''}
            
            ${artigo.revista ? `
            <p style="color: var(--text-light); font-size: 14px; margin-bottom: 8px; font-style: italic;">
                ${artigo.revista}
            </p>
            ` : ''}
            
            <p style="color: var(--text-light); font-size: 13px; margin-bottom: 12px;">
                <i class="fas fa-calendar"></i> ${dataPublicacao}
            </p>
            
            ${artigo.resumo ? `
            <p style="color: var(--text-light); font-size: 14px; line-height: 1.5; margin-bottom: 12px;">
                ${artigo.resumo.substring(0, 150)}${artigo.resumo.length > 150 ? '...' : ''}
            </p>
            ` : ''}
            
            ${artigo.link ? `
            <a href="${artigo.link}" target="_blank" onclick="event.stopPropagation()" 
               style="display: inline-flex; align-items: center; gap: 8px; color: var(--primary-color); text-decoration: none; font-weight: 600; font-size: 14px;">
                <i class="fas fa-external-link-alt"></i> Ver artigo completo
            </a>
            ` : ''}
        </div>
    `;
}

function showNovoArtigoForm() {
    showToast('Formulário de artigo em desenvolvimento', 'info');
    // TODO: Implementar formulário
}

function viewArtigo(artigoId) {
    showToast('Visualização de artigo em desenvolvimento', 'info');
    // TODO: Implementar visualização detalhada
}

// ==================== ESCALAS ====================

async function showEscalas() {
    const screen = document.getElementById('residenciaScreen');
    
    screen.innerHTML = `
        <button class="back-btn" onclick="showResidencia()">
            <i class="fas fa-arrow-left"></i> Voltar
        </button>
        <h2 class="screen-title">
            <i class="fas fa-calendar-alt"></i> Escalas de Plantão
        </h2>
        
        <div style="text-align: center; margin-bottom: 30px;">
            <button class="btn-primary" onclick="showNovaEscalaForm()" style="margin: 0 auto;">
                <i class="fas fa-plus"></i> Nova Escala
            </button>
        </div>
        
        <div id="escalasContainer" style="max-width: 1200px; margin: 0 auto;">
            <div style="background: white; border-radius: 20px; padding: 40px; text-align: center;">
                <i class="fas fa-calendar-check" style="font-size: 64px; color: var(--text-light); margin-bottom: 20px;"></i>
                <h3 style="color: var(--text-dark); margin-bottom: 10px;">Funcionalidade em Desenvolvimento</h3>
                <p style="color: var(--text-light);">
                    Em breve você poderá gerenciar todas as escalas de plantão aqui.
                </p>
            </div>
        </div>
    `;
}

function showNovaEscalaForm() {
    showToast('Formulário de escala em desenvolvimento', 'info');
}

// ==================== ESTÁGIOS ====================

async function showEstagios() {
    const screen = document.getElementById('residenciaScreen');
    
    screen.innerHTML = `
        <button class="back-btn" onclick="showResidencia()">
            <i class="fas fa-arrow-left"></i> Voltar
        </button>
        <h2 class="screen-title">
            <i class="fas fa-hospital-user"></i> Estágios e Rodízios
        </h2>
        
        <div style="max-width: 1000px; margin: 0 auto; background: white; border-radius: 20px; padding: 40px; text-align: center;">
            <i class="fas fa-stethoscope" style="font-size: 64px; color: var(--text-light); margin-bottom: 20px;"></i>
            <h3 style="color: var(--text-dark); margin-bottom: 10px;">Funcionalidade em Desenvolvimento</h3>
            <p style="color: var(--text-light);">
                Em breve você poderá visualizar e gerenciar seus estágios e rodízios aqui.
            </p>
        </div>
    `;
}

// ==================== FÉRIAS ====================

async function showFerias() {
    const screen = document.getElementById('residenciaScreen');
    
    screen.innerHTML = `
        <button class="back-btn" onclick="showResidencia()">
            <i class="fas fa-arrow-left"></i> Voltar
        </button>
        <h2 class="screen-title">
            <i class="fas fa-umbrella-beach"></i> Férias
        </h2>
        
        <div style="text-align: center; margin-bottom: 30px;">
            <button class="btn-primary" onclick="showSolicitarFeriasForm()" style="margin: 0 auto;">
                <i class="fas fa-plus"></i> Solicitar Férias
            </button>
        </div>
        
        <div id="feriasContainer" style="max-width: 1000px; margin: 0 auto;">
            <div style="background: white; border-radius: 20px; padding: 40px; text-align: center;">
                <i class="fas fa-umbrella-beach" style="font-size: 64px; color: var(--text-light); margin-bottom: 20px;"></i>
                <h3 style="color: var(--text-dark); margin-bottom: 10px;">Funcionalidade em Desenvolvimento</h3>
                <p style="color: var(--text-light);">
                    Em breve você poderá solicitar e gerenciar suas férias aqui.
                </p>
            </div>
        </div>
    `;
}

function showSolicitarFeriasForm() {
    showToast('Solicitação de férias em desenvolvimento', 'info');
}

// ==================== PERFIL RESIDÊNCIA ====================

async function showPerfilResidencia() {
    const screen = document.getElementById('residenciaScreen');
    
    screen.innerHTML = `
        <button class="back-btn" onclick="showResidencia()">
            <i class="fas fa-arrow-left"></i> Voltar
        </button>
        <h2 class="screen-title">
            <i class="fas fa-id-badge"></i> Meu Perfil - Residência
        </h2>
        
        <div style="max-width: 800px; margin: 0 auto; background: white; border-radius: 20px; padding: 40px;">
            <div style="text-align: center; margin-bottom: 30px;">
                <div style="width: 100px; height: 100px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; color: white; font-size: 48px;">
                    <i class="fas fa-user-md"></i>
                </div>
                <h3 style="color: var(--text-dark); margin-bottom: 5px; font-size: 24px;">
                    ${currentUser?.displayName || 'Residente'}
                </h3>
                <p style="color: var(--text-light);">${currentUser?.email || ''}</p>
            </div>
            
            <form id="formPerfilResidencia" onsubmit="salvarPerfilResidencia(event)">
                <div class="form-group" style="margin-bottom: 20px;">
                    <label style="display: block; color: var(--text-dark); margin-bottom: 8px; font-weight: 600;">
                        <i class="fas fa-phone"></i> Telefone / WhatsApp
                    </label>
                    <input type="tel" name="phone" 
                           style="width: 100%; padding: 12px; border: 2px solid var(--border-color); border-radius: 10px; font-size: 16px;"
                           placeholder="(00) 00000-0000">
                </div>
                
                <div class="form-group" style="margin-bottom: 20px;">
                    <label style="display: block; color: var(--text-dark); margin-bottom: 8px; font-weight: 600;">
                        <i class="fas fa-graduation-cap"></i> Ano da Residência
                    </label>
                    <select name="anoResidencia" 
                            style="width: 100%; padding: 12px; border: 2px solid var(--border-color); border-radius: 10px; font-size: 16px;">
                        <option value="">Selecione...</option>
                        <option value="R1">R1</option>
                        <option value="R2">R2</option>
                        <option value="R3">R3</option>
                        <option value="R4">R4</option>
                        <option value="R5">R5</option>
                    </select>
                </div>
                
                <div class="form-group" style="margin-bottom: 20px;">
                    <label style="display: block; color: var(--text-dark); margin-bottom: 8px; font-weight: 600;">
                        <i class="fas fa-hospital"></i> Instituição
                    </label>
                    <input type="text" name="instituicao" 
                           style="width: 100%; padding: 12px; border: 2px solid var(--border-color); border-radius: 10px; font-size: 16px;"
                           placeholder="Nome da instituição">
                </div>
                
                <div class="form-group" style="margin-bottom: 30px;">
                    <label style="display: flex; align-items: center; gap: 10px; color: var(--text-dark); cursor: pointer;">
                        <input type="checkbox" name="notificacoesWhatsApp" style="width: 20px; height: 20px;">
                        <span><i class="fab fa-whatsapp"></i> Receber notificações via WhatsApp</span>
                    </label>
                </div>
                
                <button type="submit" 
                        style="width: 100%; padding: 15px; background: var(--primary-color); color: white; border: none; border-radius: 10px; cursor: pointer; font-size: 16px; font-weight: 600;">
                    <i class="fas fa-save"></i> Salvar Perfil
                </button>
            </form>
        </div>
    `;
    
    // Carrega dados do perfil se existirem
    await loadPerfilResidencia();
}

async function loadPerfilResidencia() {
    try {
        const userDoc = await db.collection('users').doc(currentUser.uid).get();
        if (userDoc.exists) {
            const data = userDoc.data();
            const form = document.getElementById('formPerfilResidencia');
            
            if (form && data.residenciaProfile) {
                if (data.phone) form.phone.value = data.phone;
                if (data.residenciaProfile.anoResidencia) form.anoResidencia.value = data.residenciaProfile.anoResidencia;
                if (data.residenciaProfile.instituicao) form.instituicao.value = data.residenciaProfile.instituicao;
                if (data.residenciaProfile.notificacoesWhatsApp) form.notificacoesWhatsApp.checked = data.residenciaProfile.notificacoesWhatsApp;
            }
        }
    } catch (error) {
        console.error('Erro ao carregar perfil:', error);
    }
}

async function salvarPerfilResidencia(event) {
    event.preventDefault();
    
    try {
        const form = event.target;
        const formData = new FormData(form);
        
        const profileData = {
            phone: formData.get('phone'),
            residenciaProfile: {
                anoResidencia: formData.get('anoResidencia'),
                instituicao: formData.get('instituicao'),
                notificacoesWhatsApp: formData.get('notificacoesWhatsApp') === 'on'
            },
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        };
        
        await db.collection('users').doc(currentUser.uid).update(profileData);
        
        showToast('Perfil atualizado com sucesso!', 'success');
    } catch (error) {
        console.error('Erro ao salvar perfil:', error);
        showToast('Erro ao salvar perfil', 'error');
    }
}

console.log('📱 Residência Médica - App carregado!');

