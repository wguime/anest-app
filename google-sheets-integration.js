// ==================== INTEGRAÇÃO GOOGLE SHEETS ====================
// Planilha: https://docs.google.com/spreadsheets/d/1RvxlGeQN6xZN6vPp9zhkWHbEbFiK6o3EGJm5eh9iR6s/edit

const SPREADSHEET_ID = '1RvxlGeQN6xZN6vPp9zhkWHbEbFiK6o3EGJm5eh9iR6s';
const API_KEY = 'YOUR_GOOGLE_API_KEY_HERE'; // Configurar no console do Google Cloud

// URLs das abas (usando CSV export)
const SHEETS_URLS = {
    escalas: `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/gviz/tq?tqx=out:csv&sheet=Escalas`,
    estagios: `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/gviz/tq?tqx=out:csv&sheet=Estágios`,
    ferias: `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/gviz/tq?tqx=out:csv&sheet=Férias`,
    plantoes: `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/gviz/tq?tqx=out:csv&sheet=Plantões`
};

// Cache dos dados
let cachedData = {
    escalas: null,
    estagios: null,
    ferias: null,
    plantoes: null,
    lastUpdate: null
};

// ==================== FUNÇÕES DE CARREGAMENTO ====================

/**
 * Carregar dados de uma aba específica
 */
async function loadSheetData(sheetName) {
    try {
        const url = SHEETS_URLS[sheetName];
        if (!url) {
            throw new Error(`Aba ${sheetName} não encontrada`);
        }

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Erro ao carregar dados: ${response.status}`);
        }

        const csvText = await response.text();
        const data = parseCSV(csvText);
        
        // Cachear dados
        cachedData[sheetName] = data;
        cachedData.lastUpdate = new Date();
        
        return data;
    } catch (error) {
        console.error(`Erro ao carregar ${sheetName}:`, error);
        showToast(`Erro ao carregar ${sheetName}. Tentando usar dados em cache.`, 'error');
        return cachedData[sheetName] || [];
    }
}

/**
 * Parse CSV para array de objetos
 */
function parseCSV(csvText) {
    const lines = csvText.split('\n').filter(line => line.trim());
    if (lines.length === 0) return [];
    
    // Primeira linha = cabeçalhos
    const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''));
    
    // Demais linhas = dados
    const data = [];
    for (let i = 1; i < lines.length; i++) {
        const values = parseCSVLine(lines[i]);
        if (values.length === 0) continue;
        
        const row = {};
        headers.forEach((header, index) => {
            row[header] = values[index] || '';
        });
        data.push(row);
    }
    
    return data;
}

/**
 * Parse uma linha CSV (considerando aspas)
 */
function parseCSVLine(line) {
    const result = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        
        if (char === '"') {
            inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
            result.push(current.trim());
            current = '';
        } else {
            current += char;
        }
    }
    
    if (current) {
        result.push(current.trim());
    }
    
    return result;
}

// ==================== VISUALIZAÇÃO - ESCALAS ====================

async function showEscalas() {
    showScreen('custom');
    const contentDiv = document.getElementById('customContent');
    
    contentDiv.innerHTML = `
        <div class="screen-header">
            <button class="back-btn" onclick="showScreen('home')">
                <i class="fas fa-arrow-left"></i> Voltar
            </button>
            <h2><i class="fas fa-calendar-alt"></i> Escalas</h2>
        </div>
        <div class="loading-message">
            <i class="fas fa-spinner fa-spin"></i> Carregando escalas...
        </div>
    `;
    
    try {
        const data = await loadSheetData('escalas');
        renderEscalas(data, contentDiv);
    } catch (error) {
        contentDiv.innerHTML += `<div class="error-message">Erro ao carregar escalas: ${error.message}</div>`;
    }
}

function renderEscalas(data, container) {
    if (!data || data.length === 0) {
        container.innerHTML = `
            <div class="screen-header">
                <button class="back-btn" onclick="showScreen('home')">
                    <i class="fas fa-arrow-left"></i> Voltar
                </button>
                <h2><i class="fas fa-calendar-alt"></i> Escalas</h2>
            </div>
            <div class="empty-state">
                <i class="fas fa-calendar-times"></i>
                <p>Nenhuma escala disponível no momento</p>
            </div>
        `;
        return;
    }
    
    let html = `
        <div class="screen-header">
            <button class="back-btn" onclick="showScreen('home')">
                <i class="fas fa-arrow-left"></i> Voltar
            </button>
            <h2><i class="fas fa-calendar-alt"></i> Escalas</h2>
        </div>
        <div class="sheets-container">
    `;
    
    // Renderizar cada linha como um card
    data.forEach((row, index) => {
        html += `
            <div class="sheet-card">
                ${Object.entries(row).map(([key, value]) => `
                    <div class="sheet-field">
                        <strong>${key}:</strong> ${value || '-'}
                    </div>
                `).join('')}
            </div>
        `;
    });
    
    html += `</div>`;
    container.innerHTML = html;
}

// ==================== VISUALIZAÇÃO - ESTÁGIOS ====================

async function showEstagios() {
    showScreen('custom');
    const contentDiv = document.getElementById('customContent');
    
    contentDiv.innerHTML = `
        <div class="screen-header">
            <button class="back-btn" onclick="showScreen('home')">
                <i class="fas fa-arrow-left"></i> Voltar
            </button>
            <h2><i class="fas fa-user-graduate"></i> Estágios</h2>
        </div>
        <div class="loading-message">
            <i class="fas fa-spinner fa-spin"></i> Carregando estágios...
        </div>
    `;
    
    try {
        const data = await loadSheetData('estagios');
        renderEstagios(data, contentDiv);
    } catch (error) {
        contentDiv.innerHTML += `<div class="error-message">Erro ao carregar estágios: ${error.message}</div>`;
    }
}

function renderEstagios(data, container) {
    if (!data || data.length === 0) {
        container.innerHTML = `
            <div class="screen-header">
                <button class="back-btn" onclick="showScreen('home')">
                    <i class="fas fa-arrow-left"></i> Voltar
                </button>
                <h2><i class="fas fa-user-graduate"></i> Estágios</h2>
            </div>
            <div class="empty-state">
                <i class="fas fa-calendar-times"></i>
                <p>Nenhum estágio disponível no momento</p>
            </div>
        `;
        return;
    }
    
    let html = `
        <div class="screen-header">
            <button class="back-btn" onclick="showScreen('home')">
                <i class="fas fa-arrow-left"></i> Voltar
            </button>
            <h2><i class="fas fa-user-graduate"></i> Estágios</h2>
        </div>
        <div class="sheets-container">
    `;
    
    data.forEach((row, index) => {
        html += `
            <div class="sheet-card">
                ${Object.entries(row).map(([key, value]) => `
                    <div class="sheet-field">
                        <strong>${key}:</strong> ${value || '-'}
                    </div>
                `).join('')}
            </div>
        `;
    });
    
    html += `</div>`;
    container.innerHTML = html;
}

// ==================== VISUALIZAÇÃO - FÉRIAS ====================

async function showFerias() {
    showScreen('custom');
    const contentDiv = document.getElementById('customContent');
    
    contentDiv.innerHTML = `
        <div class="screen-header">
            <button class="back-btn" onclick="showScreen('home')">
                <i class="fas fa-arrow-left"></i> Voltar
            </button>
            <h2><i class="fas fa-umbrella-beach"></i> Férias</h2>
        </div>
        <div class="loading-message">
            <i class="fas fa-spinner fa-spin"></i> Carregando férias...
        </div>
    `;
    
    try {
        const data = await loadSheetData('ferias');
        renderFerias(data, contentDiv);
    } catch (error) {
        contentDiv.innerHTML += `<div class="error-message">Erro ao carregar férias: ${error.message}</div>`;
    }
}

function renderFerias(data, container) {
    if (!data || data.length === 0) {
        container.innerHTML = `
            <div class="screen-header">
                <button class="back-btn" onclick="showScreen('home')">
                    <i class="fas fa-arrow-left"></i> Voltar
                </button>
                <h2><i class="fas fa-umbrella-beach"></i> Férias</h2>
            </div>
            <div class="empty-state">
                <i class="fas fa-calendar-times"></i>
                <p>Nenhuma férias registrada no momento</p>
            </div>
        `;
        return;
    }
    
    let html = `
        <div class="screen-header">
            <button class="back-btn" onclick="showScreen('home')">
                <i class="fas fa-arrow-left"></i> Voltar
            </button>
            <h2><i class="fas fa-umbrella-beach"></i> Férias</h2>
        </div>
        <div class="sheets-container">
    `;
    
    data.forEach((row, index) => {
        html += `
            <div class="sheet-card">
                ${Object.entries(row).map(([key, value]) => `
                    <div class="sheet-field">
                        <strong>${key}:</strong> ${value || '-'}
                    </div>
                `).join('')}
            </div>
        `;
    });
    
    html += `</div>`;
    container.innerHTML = html;
}

// ==================== VISUALIZAÇÃO - PLANTÕES ====================

async function showPlantoes() {
    showScreen('custom');
    const contentDiv = document.getElementById('customContent');
    
    contentDiv.innerHTML = `
        <div class="screen-header">
            <button class="back-btn" onclick="showScreen('home')">
                <i class="fas fa-arrow-left"></i> Voltar
            </button>
            <h2><i class="fas fa-hospital"></i> Plantões</h2>
        </div>
        <div class="loading-message">
            <i class="fas fa-spinner fa-spin"></i> Carregando plantões...
        </div>
    `;
    
    try {
        const data = await loadSheetData('plantoes');
        renderPlantoes(data, contentDiv);
    } catch (error) {
        contentDiv.innerHTML += `<div class="error-message">Erro ao carregar plantões: ${error.message}</div>`;
    }
}

function renderPlantoes(data, container) {
    if (!data || data.length === 0) {
        container.innerHTML = `
            <div class="screen-header">
                <button class="back-btn" onclick="showScreen('home')">
                    <i class="fas fa-arrow-left"></i> Voltar
                </button>
                <h2><i class="fas fa-hospital"></i> Plantões</h2>
            </div>
            <div class="empty-state">
                <i class="fas fa-calendar-times"></i>
                <p>Nenhum plantão disponível no momento</p>
            </div>
        `;
        return;
    }
    
    let html = `
        <div class="screen-header">
            <button class="back-btn" onclick="showScreen('home')">
                <i class="fas fa-arrow-left"></i> Voltar
            </button>
            <h2><i class="fas fa-hospital"></i> Plantões</h2>
        </div>
        <div class="sheets-container">
    `;
    
    data.forEach((row, index) => {
        html += `
            <div class="sheet-card">
                ${Object.entries(row).map(([key, value]) => `
                    <div class="sheet-field">
                        <strong>${key}:</strong> ${value || '-'}
                    </div>
                `).join('')}
            </div>
        `;
    });
    
    html += `</div>`;
    container.innerHTML = html;
}

// ==================== LINK DIRETO PARA PLANILHA ====================

function openGoogleSheet() {
    const url = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/edit`;
    window.open(url, '_blank');
}

console.log('✅ Google Sheets Integration carregado');

