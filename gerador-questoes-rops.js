// ==================== GERADOR DE QUESTÕES ROPs ====================
// Script para gerar 630 questões baseadas nos manuais ROPs

const fs = require('fs');

// Template de questões por ROP
const templates = {
    "2.3": { // Conciliação Medicamentosa como Prioridade Estratégica
        titulo: "Conciliação Medicamentosa como Prioridade Estratégica",
        temas: [
            "definição e conceitos de conciliação",
            "momentos de transição de cuidado",
            "discrepâncias intencionais e não intencionais",
            "responsabilidades profissionais",
            "história medicamentosa completa",
            "medicamentos de alto risco",
            "polifarmácia",
            "registro e documentação",
            "orientação ao paciente",
            "continuidade do cuidado"
        ]
    },
    "2.4": { // Conciliação em Serviços de Assistência Aguda
        titulo: "Conciliação em Serviços de Assistência Aguda/Internação",
        temas: [
            "conciliação na admissão hospitalar",
            "medicamentos de uso contínuo",
            "medicamentos trazidos de casa",
            "revisão diária de prescrições",
            "deprescribing",
            "transferência entre unidades",
            "jejum pré-operatório",
            "alergias medicamentosas",
            "pacientes críticos",
            "alta hospitalar"
        ]
    }
    // Continua para todas as ROPs...
};

console.log("✅ Template criado! Pronto para gerar questões.");
