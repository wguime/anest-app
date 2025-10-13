// MACRO ÁREA 5 - PREVENÇÃO DE INFECÇÕES
// Arquivo: rops-prevencao_infeccoes.js

ropsData['prevencao-infeccoes'] = {
        title: "Prevenção de Infecções",
        icon: "fas fa-hand-sparkles",
        color: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
        subdivisoes: {
            // ROPs 5.1 to 5.4...,
            
                    ...Array(30).fill().map((_, i) => Q(
    `Questão ${i+1
};

console.log('✅ MACRO ÁREA 5 - PREVENÇÃO DE INFECÇÕES carregada');
