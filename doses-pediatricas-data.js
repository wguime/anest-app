// ==================== DOSES PEDIÁTRICAS - DADOS ====================
// Baseado no arquivo: Doses pediatria.xls - Plan1
// Hospital Regional do Oeste - Serviço de Anestesiologia

const dosesPediatricasData = {
    // PCR - Parada Cardiorrespiratória
    pcr: [
        {
            droga: "ADRENALINA",
            apresentacao: "1 mg/ml",
            dosePadrao: "0,01 mg/kg",
            diluicao: "1ml + 9 ml AD",
            calcularDose: (peso) => {
                // Concentração final: 0,1 mg/ml
                return {
                    dose: (peso * 0.01 / 0.1).toFixed(1),
                    unidade: "ml",
                    obs: "Concentração final: 0,1 mg/ml"
                };
            }
        },
        {
            droga: "ATROPINA",
            apresentacao: "0,25 mg/ml",
            dosePadrao: "0,02 mg/kg",
            diluicao: "SEM DILUIR",
            calcularDose: (peso) => {
                return {
                    dose: (peso * 0.02 / 0.25).toFixed(2),
                    unidade: "ml",
                    obs: "Dose mínima: 0,1 mg"
                };
            }
        },
        {
            droga: "PUSH SF 0,9%",
            apresentacao: "0,15 mEq/ml",
            dosePadrao: "20 ml/kg",
            diluicao: "PURO",
            calcularDose: (peso) => {
                return {
                    dose: (peso * 20).toFixed(0),
                    unidade: "ml",
                    obs: "Bolus rápido em PCR"
                };
            }
        },
        {
            droga: "BICARBONATO DE SÓDIO 8,4%",
            apresentacao: "1 mEq/ml",
            dosePadrao: "1 mEq/kg",
            diluicao: "20 ml + 20 ml AD",
            calcularDose: (peso) => {
                // Diluído 1:1
                return {
                    dose: (peso * 2).toFixed(0),
                    unidade: "ml",
                    obs: "Após diluição 1:1 com AD"
                };
            }
        },
        {
            droga: "LIDOCAÍNA 2%",
            apresentacao: "20 mg/ml",
            dosePadrao: "1 mg/kg",
            diluicao: "SEM DILUIR",
            calcularDose: (peso) => {
                return {
                    dose: (peso * 1 / 20).toFixed(1),
                    unidade: "ml",
                    obs: "Dose de ataque para arritmias"
                };
            }
        },
        {
            droga: "GLUCONATO DE CÁLCIO 10%",
            apresentacao: "100 mg/ml",
            dosePadrao: "100-200 mg/kg",
            diluicao: "10 ml + 10 ml AD",
            calcularDose: (peso) => {
                return {
                    dose: (peso * 200 / 100 * 2).toFixed(0), // Após diluição
                    unidade: "ml",
                    obs: "Dose máxima adulto: 1g"
                };
            }
        },
        {
            droga: "ADENOSINA",
            apresentacao: "3 mg/ml",
            dosePadrao: "0,1-0,3 mg/kg",
            diluicao: "SEM DILUIR",
            calcularDose: (peso) => {
                return {
                    dose: (peso * 0.1 / 3).toFixed(1),
                    unidade: "ml (inicial)",
                    obs: "Pode repetir dobrando dose até 0,3 mg/kg"
                };
            }
        },
        {
            droga: "GLICOSE 10%",
            apresentacao: "100 mg/ml",
            dosePadrao: "500 mg/kg",
            diluicao: "SEM DILUIR",
            calcularDose: (peso) => {
                return {
                    dose: (peso * 500 / 100).toFixed(0),
                    unidade: "ml",
                    obs: "Para hipoglicemia"
                };
            }
        }
    ],
    
    // Sedação, Analgesia e Bloqueio Neuromuscular
    sedacao: [
        {
            droga: "FENTANIL",
            apresentacao: "50 mcg/ml",
            dosePadrao: "2 mcg/kg",
            diluicao: "SEM DILUIR",
            calcularDose: (peso) => {
                return {
                    dose: (peso * 2 / 50).toFixed(2),
                    unidade: "ml",
                    obs: "Opioide de ação rápida"
                };
            }
        },
        {
            droga: "MIDAZOLAM",
            apresentacao: "5 mg/ml",
            dosePadrao: "0,2 mg/kg",
            diluicao: "SEM DILUIR",
            calcularDose: (peso) => {
                return {
                    dose: (peso * 0.2 / 5).toFixed(2),
                    unidade: "ml",
                    obs: "Benzodiazepínico"
                };
            }
        },
        {
            droga: "DIAZEPAM",
            apresentacao: "10 mg/2ml",
            dosePadrao: "0,5 mg/kg",
            diluicao: "SEM DILUIR",
            calcularDose: (peso) => {
                return {
                    dose: (peso * 0.5 / 5).toFixed(2),
                    unidade: "ml",
                    obs: "Anticonvulsivante e sedativo"
                };
            }
        },
        {
            droga: "MORFINA",
            apresentacao: "10 mg/ml",
            dosePadrao: "0,1 mg/kg",
            diluicao: "1 ml + 9 ml AD",
            calcularDose: (peso) => {
                // Concentração final: 1 mg/ml
                return {
                    dose: (peso * 0.1 / 1).toFixed(1),
                    unidade: "ml",
                    obs: "Após diluição para 1 mg/ml"
                };
            }
        },
        {
            droga: "QUETAMINA",
            apresentacao: "50 mg/ml",
            dosePadrao: "1 mg/kg",
            diluicao: "SEM DILUIR",
            calcularDose: (peso) => {
                return {
                    dose: (peso * 1 / 50).toFixed(2),
                    unidade: "ml",
                    obs: "Analgesia dissociativa"
                };
            }
        },
        {
            droga: "PANCURÔNIO",
            apresentacao: "2 mg/ml",
            dosePadrao: "0,1 mg/kg",
            diluicao: "SEM DILUIR",
            calcularDose: (peso) => {
                return {
                    dose: (peso * 0.1 / 2).toFixed(2),
                    unidade: "ml",
                    obs: "Bloqueador neuromuscular longa duração"
                };
            }
        },
        {
            droga: "SUCCINILCOLINA",
            apresentacao: "100 mg/frasco",
            dosePadrao: "1 mg/kg",
            diluicao: "1 frasco + 5 ml AD",
            calcularDose: (peso) => {
                // Concentração final: 20 mg/ml
                return {
                    dose: (peso * 1 / 20).toFixed(2),
                    unidade: "ml",
                    obs: "Após diluição para 20 mg/ml"
                };
            }
        },
        {
            droga: "ROCURÔNIO",
            apresentacao: "10 mg/ml",
            dosePadrao: "0,6 mg/kg",
            diluicao: "SEM DILUIR",
            calcularDose: (peso) => {
                return {
                    dose: (peso * 0.6 / 10).toFixed(2),
                    unidade: "ml",
                    obs: "Bloqueador neuromuscular ação intermediária"
                };
            }
        },
        {
            droga: "PROPOFOL",
            apresentacao: "10 mg/ml",
            dosePadrao: "2-3 mg/kg",
            diluicao: "SEM DILUIR",
            calcularDose: (peso) => {
                return {
                    dose: (peso * 2.5 / 10).toFixed(2),
                    unidade: "ml",
                    obs: "Dose indução (2,5 mg/kg média)"
                };
            }
        },
        {
            droga: "TIOPENTAL",
            apresentacao: "500 mg/frasco",
            dosePadrao: "4-6 mg/kg",
            diluicao: "1 frasco + 20 ml AD",
            calcularDose: (peso) => {
                // Concentração final: 25 mg/ml
                return {
                    dose: (peso * 5 / 25).toFixed(2),
                    unidade: "ml",
                    obs: "Após diluição para 25 mg/ml (5 mg/kg)"
                };
            }
        }
    ],
    
    // Anticonvulsivantes
    anticonvulsivantes: [
        {
            droga: "FENOBARBITAL",
            apresentacao: "100 mg/ml",
            dosePadrao: "5 mg/kg",
            diluicao: "SEM DILUIR",
            calcularDose: (peso) => {
                return {
                    dose: (peso * 5 / 100).toFixed(2),
                    unidade: "ml",
                    obs: "Infusão lenta (1 mg/kg/min)"
                };
            }
        },
        {
            droga: "FENITOÍNA",
            apresentacao: "50 mg/ml",
            dosePadrao: "15 mg/kg",
            diluicao: "SEM DILUIR",
            calcularDose: (peso) => {
                return {
                    dose: (peso * 15 / 50).toFixed(1),
                    unidade: "ml",
                    obs: "Infusão lenta, máx 50 mg/min"
                };
            }
        }
    ],
    
    // Antídotos
    antidotos: [
        {
            droga: "NALOXONE",
            apresentacao: "0,4 mg/ml",
            dosePadrao: "0,1 mg/kg",
            diluicao: "SEM DILUIR",
            calcularDose: (peso) => {
                return {
                    dose: (peso * 0.1 / 0.4).toFixed(2),
                    unidade: "ml",
                    obs: "Antagonista opioide"
                };
            }
        },
        {
            droga: "FLUMAZENIL",
            apresentacao: "0,1 mg/ml",
            dosePadrao: "0,01 mg/kg",
            diluicao: "SEM DILUIR",
            calcularDose: (peso) => {
                return {
                    dose: (peso * 0.01 / 0.1).toFixed(2),
                    unidade: "ml",
                    obs: "Antagonista benzodiazepínico"
                };
            }
        }
    ],
    
    // Infusões Contínuas
    infusoes: [
        {
            droga: "DOPAMINA",
            apresentacao: "5 mg/ml (ampola 10ml)",
            dosePadrao: "10 mcg/kg/min",
            diluicao: "Variável",
            calcularDose: (peso) => {
                // Diluição padrão para bomba: concentração de 1 mg/ml (400mg em 50ml)
                const velocidade = (peso * 10 * 60 / 1000).toFixed(1); // ml/h para 10 mcg/kg/min
                return {
                    dose: velocidade,
                    unidade: "ml/h",
                    obs: "Diluição: 400mg em 50ml SF (1mg/ml)"
                };
            }
        },
        {
            droga: "NORADRENALINA",
            apresentacao: "2 mg/ml (ampola 4ml)",
            dosePadrao: "0,1 mcg/kg/min",
            diluicao: "8 ml + 42 ml SF",
            calcularDose: (peso) => {
                // Concentração final: 0,32 mg/ml
                const velocidade = (peso * 0.1 * 60 / 320).toFixed(2); // ml/h
                return {
                    dose: velocidade,
                    unidade: "ml/h",
                    obs: "Concentração: 0,32 mg/ml após diluição"
                };
            }
        },
        {
            droga: "DOBUTAMINA",
            apresentacao: "12,5 mg/ml (ampola 20ml)",
            dosePadrao: "10 mcg/kg/min",
            diluicao: "Variável",
            calcularDose: (peso) => {
                // Diluição padrão: 250mg em 50ml (5mg/ml)
                const velocidade = (peso * 10 * 60 / 5000).toFixed(2);
                return {
                    dose: velocidade,
                    unidade: "ml/h",
                    obs: "Diluição: 250mg em 50ml SF (5mg/ml)"
                };
            }
        },
        {
            droga: "ADRENALINA (infusão)",
            apresentacao: "1 mg/ml",
            dosePadrao: "0,1 mcg/kg/min",
            diluicao: "10 ml + 40 ml SF",
            calcularDose: (peso) => {
                // Concentração final: 0,2 mg/ml (10mg em 50ml)
                const velocidade = (peso * 0.1 * 60 / 200).toFixed(2);
                return {
                    dose: velocidade,
                    unidade: "ml/h",
                    obs: "Concentração: 0,2 mg/ml (10mg em 50ml)"
                };
            }
        },
        {
            droga: "LIDOCAÍNA 2% (infusão)",
            apresentacao: "20 mg/ml",
            dosePadrao: "20 mcg/kg/min",
            diluicao: "5 ml + 45 ml SF",
            calcularDose: (peso) => {
                // Concentração final: 2 mg/ml
                const velocidade = (peso * 20 * 60 / 2000).toFixed(1);
                return {
                    dose: velocidade,
                    unidade: "ml/h",
                    obs: "Concentração: 2 mg/ml após diluição"
                };
            }
        }
    ],
    
    // Desfibrilação
    desfibrilacao: {
        calcularCarga: (peso) => {
            const primeira = Math.round(peso * 2); // 2 J/kg
            const seguintes = Math.round(peso * 4); // 4 J/kg
            return {
                primeiraCarga: primeira,
                cargasSeguintes: seguintes,
                obs: "Usar desfibrilador manual bifásico"
            };
        }
    }
};

// Exportar para uso no aplicativo
if (typeof module !== 'undefined' && module.exports) {
    module.exports = dosesPediatricasData;
}

