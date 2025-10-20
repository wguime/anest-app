// Sistema de Calculadoras Clínicas
// Funções para exibir e calcular as calculadoras

function showCalculadoras() {
    console.log('📊 Abrindo Calculadoras...');
    
    const screen = document.getElementById('calculadorasScreen');
    if (!screen) {
        console.error('❌ calculadorasScreen não encontrado');
        return;
    }
    
    screen.innerHTML = `
        <button class="back-btn" onclick="goHome()">
            <i class="fas fa-arrow-left"></i> Voltar
        </button>
        <h2 class="screen-title">
            <i class="fas fa-calculator"></i> Calculadoras Clínicas
        </h2>
        <p style="text-align: center; color: #666; margin-bottom: 30px;">
            Ferramentas para Anestesiologia e Segurança do Paciente
        </p>
        <div class="menu-grid">
            ${Object.entries(calculadorasData).map(([key, grupo]) => `
                <div class="menu-card" onclick="showGrupoCalculadoras('${key}')">
                    <div class="card-icon" style="background: ${grupo.color}">
                        <i class="${grupo.icon}"></i>
                    </div>
                    <h3>${grupo.title}</h3>
                    <p>${Object.keys(grupo.calculadoras).length} calculadoras</p>
                </div>
            `).join('')}
        </div>
    `;
    
    showScreen('calculadorasScreen');
}

function showGrupoCalculadoras(grupoKey) {
    console.log('📊 Abrindo grupo:', grupoKey);
    
    const grupo = calculadorasData[grupoKey];
    if (!grupo) return;
    
    const screen = document.getElementById('calculadorasScreen');
    
    screen.innerHTML = `
        <button class="back-btn" onclick="showCalculadoras()">
            <i class="fas fa-arrow-left"></i> Voltar
        </button>
        <h2 class="screen-title">
            <i class="${grupo.icon}"></i> ${grupo.title}
        </h2>
        <div class="menu-grid">
            ${Object.entries(grupo.calculadoras).map(([key, calc]) => `
                <div class="menu-card" onclick="abrirCalculadora('${grupoKey}', '${key}')">
                    <div class="card-icon" style="background: ${grupo.color}">
                        <i class="fas fa-calculator"></i>
                    </div>
                    <h3>${calc.title}</h3>
                    <p>${calc.description}</p>
                </div>
            `).join('')}
        </div>
    `;
    
    showScreen('calculadorasScreen');
}

function abrirCalculadora(grupoKey, calcKey) {
    console.log('📊 Abrindo calculadora:', grupoKey, calcKey);
    
    const grupo = calculadorasData[grupoKey];
    const calc = grupo.calculadoras[calcKey];
    
    if (!calc) return;
    
    const screen = document.getElementById('calculadorasScreen');
    
    let camposHTML = '';
    calc.campos.forEach(campo => {
        if (campo.tipo === 'select') {
            camposHTML += `
                <div class="calc-campo">
                    <label>${campo.label}</label>
                    ${campo.descricao ? `<small>${campo.descricao}</small>` : ''}
                    <select id="campo_${campo.nome}" class="calc-input">
                        ${campo.opcoes.map(op => `
                            <option value="${op.valor}">${op.texto}</option>
                        `).join('')}
                    </select>
                </div>
            `;
        } else if (campo.tipo === 'checkbox') {
            camposHTML += `
                <div class="calc-campo checkbox">
                    <label>
                        <input type="checkbox" id="campo_${campo.nome}" value="${campo.valor}">
                        ${campo.label}
                    </label>
                </div>
            `;
        } else if (campo.tipo === 'number') {
            camposHTML += `
                <div class="calc-campo">
                    <label>${campo.label}</label>
                    ${campo.descricao ? `<small>${campo.descricao}</small>` : ''}
                    <input type="number" id="campo_${campo.nome}" class="calc-input" 
                           min="${campo.min || 0}" max="${campo.max || 999}" value="${campo.min || 0}">
                </div>
            `;
        }
    });
    
    screen.innerHTML = `
        <button class="back-btn" onclick="showGrupoCalculadoras('${grupoKey}')">
            <i class="fas fa-arrow-left"></i> Voltar
        </button>
        <div class="calc-container">
            <h2 class="calc-title">
                <i class="fas fa-calculator"></i> ${calc.title}
            </h2>
            <p class="calc-description">${calc.description}</p>
            
            <div class="calc-form">
                ${camposHTML}
                
                <button class="calc-btn" onclick="calcularResultado('${grupoKey}', '${calcKey}')">
                    <i class="fas fa-calculator"></i> Calcular
                </button>
            </div>
            
            <div id="calc-resultado" class="calc-resultado" style="display: none;"></div>
        </div>
    `;
    
    showScreen('calculadorasScreen');
}

function calcularResultado(grupoKey, calcKey) {
    const grupo = calculadorasData[grupoKey];
    const calc = grupo.calculadoras[calcKey];
    
    if (!calc) return;
    
    // Coletar valores
    const valores = {};
    calc.campos.forEach(campo => {
        const elemento = document.getElementById(`campo_${campo.nome}`);
        if (!elemento) return;
        
        if (campo.tipo === 'checkbox') {
            valores[campo.nome] = elemento.checked ? parseInt(elemento.value) : 0;
        } else if (campo.tipo === 'number') {
            valores[campo.nome] = parseFloat(elemento.value) || 0;
        } else if (campo.tipo === 'select') {
            const valor = elemento.value;
            // Verifica se é número ou string
            valores[campo.nome] = isNaN(valor) ? valor : parseFloat(valor);
        }
    });
    
    // Calcular resultado
    const resultado = calc.calcular(valores);
    
    // Exibir resultado
    const resultadoDiv = document.getElementById('calc-resultado');
    resultadoDiv.style.display = 'block';
    resultadoDiv.innerHTML = `
        <div class="calc-resultado-card" style="border-left-color: ${resultado.cor}">
            <div class="calc-resultado-score" style="color: ${resultado.cor}">
                ${resultado.escore}
            </div>
            <div class="calc-resultado-text">
                <h3 style="color: ${resultado.cor}">${resultado.resultado}</h3>
                <p>${resultado.detalhes}</p>
            </div>
        </div>
        
        <button class="calc-btn-secondary" onclick="limparCalculadora('${grupoKey}', '${calcKey}')">
            <i class="fas fa-redo"></i> Novo Cálculo
        </button>
    `;
    
    // Scroll suave para o resultado
    resultadoDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function limparCalculadora(grupoKey, calcKey) {
    abrirCalculadora(grupoKey, calcKey);
}

