// MACRO ÁREA 2 - COMUNICAÇÃO
// Arquivo: rops-comunicacao.js

ropsData['comunicacao'] = {
        title: "Comunicação",
        icon: "fas fa-comments",
        color: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
        subdivisoes: {
            "rop-2-1": {
                title: "ROP 2.1 – Identificação do Cliente",
                audioFile: null,
                questions: [
                    {
                        question: "Quantos identificadores devem ser usados antes de qualquer procedimento?",
                        options: [
                            "Um identificador é suficiente",
                            "Pelo menos dois identificadores",
                            "Três identificadores sempre",
                            "Não é necessário identificar"
                        ],
                        correctAnswer: 1,
                        explanation: "Devem ser utilizados pelo menos dois identificadores (nome completo e data de nascimento ou prontuário) antes de qualquer procedimento, medicação ou coleta de exames."
};

console.log('✅ MACRO ÁREA 2 - COMUNICAÇÃO carregada');
