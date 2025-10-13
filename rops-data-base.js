// ROPs - Práticas Organizacionais Obrigatórias
// Arquivo base - carrega dados dinamicamente

const ropsData = {};

// Carregar dados das macro áreas
async function loadROPsData() {
    try {
        // Carregar cada macro área
        const responses = await Promise.all([
            fetch('/anest-app/rops-cultura.js').then(r => r.text()),
            fetch('/anest-app/rops-comunicacao.js').then(r => r.text()),
            fetch('/anest-app/rops-medicamentos.js').then(r => r.text()),
            fetch('/anest-app/rops-vida-profissional.js').then(r => r.text()),
            fetch('/anest-app/rops-infeccoes.js').then(r => r.text()),
            fetch('/anest-app/rops-riscos.js').then(r => r.text())
        ]);
        
        // Executar cada script
        responses.forEach(script => {
            eval(script);
        });
        
        console.log('✅ Dados ROPs carregados:', Object.keys(ropsData));
        
    } catch (error) {
        console.error('❌ Erro ao carregar dados ROPs:', error);
        // Fallback: carregar dados básicos
        loadBasicROPsData();
    }
}

// Dados básicos (fallback)
function loadBasicROPsData() {
    ropsData['cultura-seguranca'] = {
        title: "Cultura de Segurança",
        icon: "fas fa-shield-alt",
        color: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        subdivisoes: {
            "rop-1-1": {
                title: "ROP 1.1 – Responsabilização pela Qualidade",
                audioFile: null,
                questions: []
            }
        }
    };
    console.log('⚠️ Usando dados básicos ROPs');
}

// Carregar automaticamente
loadROPsData();
