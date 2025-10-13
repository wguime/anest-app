// MACRO ÁREA 6 - AVALIAÇÃO DE RISCOS
// Arquivo: rops-avaliacao_riscos.js

ropsData['avaliacao-riscos'] = {
        title: "Avaliação de Riscos",
        icon: "fas fa-exclamation-circle",
        color: "linear-gradient(135deg, #30cfd0 0%, #330867 100%)",
        subdivisoes: {
            // ROPs 6.1 to 6.5...,
            
                    ...Array(30).fill().map((_, i) => Q(
    `Questão ${i+1
};

console.log('✅ MACRO ÁREA 6 - AVALIAÇÃO DE RISCOS carregada');
