// Calculadoras Clínicas para Anestesiologia e Segurança do Paciente
// Baseado no Compêndio de Calculadoras

const calculadorasData = {
    // ==================== SUBGRUPO 1: CALCULADORAS DE ACREDITAÇÃO (QMENTUM) ====================
    "acreditacao": {
        title: "Calculadoras de Acreditação (Qmentum)",
        icon: "fas fa-certificate",
        color: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        calculadoras: {
            "morse": {
                title: "Escala de Quedas de Morse",
                description: "Avaliação do risco de quedas durante internação",
                campos: [
                    {
                        nome: "histórico_quedas",
                        label: "1. Histórico de Quedas (último ano)",
                        tipo: "select",
                        opcoes: [
                            { texto: "Não", valor: 0 },
                            { texto: "Sim", valor: 25 }
                        ]
                    },
                    {
                        nome: "diagnostico_secundario",
                        label: "2. Diagnóstico Secundário (mais de um diagnóstico)",
                        tipo: "select",
                        opcoes: [
                            { texto: "Não", valor: 0 },
                            { texto: "Sim", valor: 15 }
                        ]
                    },
                    {
                        nome: "auxilio_deambular",
                        label: "3. Auxílio para Deambular",
                        tipo: "select",
                        opcoes: [
                            { texto: "Nenhum / Acamado / Cadeira de Rodas", valor: 0 },
                            { texto: "Muletas / Bengala / Andador", valor: 15 },
                            { texto: "Apoia-se na Mobília", valor: 30 }
                        ]
                    },
                    {
                        nome: "terapia_iv",
                        label: "4. Terapia Endovenosa / Cateter",
                        tipo: "select",
                        opcoes: [
                            { texto: "Não", valor: 0 },
                            { texto: "Sim", valor: 20 }
                        ]
                    },
                    {
                        nome: "marcha",
                        label: "5. Marcha",
                        tipo: "select",
                        opcoes: [
                            { texto: "Normal / Acamado / Imóvel", valor: 0 },
                            { texto: "Fraca / Debilitada", valor: 10 },
                            { texto: "Comprometida / Cambaleante", valor: 20 }
                        ]
                    },
                    {
                        nome: "estado_mental",
                        label: "6. Estado Mental",
                        tipo: "select",
                        opcoes: [
                            { texto: "Orientado sobre suas próprias capacidades", valor: 0 },
                            { texto: "Superestima ou esquece suas limitações", valor: 15 }
                        ]
                    }
                ],
                calcular: function(valores) {
                    const total = Object.values(valores).reduce((sum, val) => sum + val, 0);
                    let risco = "";
                    let recomendacao = "";
                    let cor = "";
                    
                    if (total <= 24) {
                        risco = "Baixo";
                        recomendacao = "Implementar precauções universais de segurança.";
                        cor = "#28a745";
                    } else if (total <= 44) {
                        risco = "Médio";
                        recomendacao = "Implementar plano de prevenção padrão.";
                        cor = "#ffc107";
                    } else {
                        risco = "Alto";
                        recomendacao = "Implementar plano de prevenção de alto risco com intervenções específicas.";
                        cor = "#dc3545";
                    }
                    
                    return {
                        escore: total,
                        resultado: `Risco ${risco}`,
                        detalhes: recomendacao,
                        cor: cor
                    };
                }
            },
            "braden": {
                title: "Escala de Braden",
                description: "Avaliação do risco de Lesões por Pressão (LPP)",
                campos: [
                    {
                        nome: "percepcao_sensorial",
                        label: "Percepção Sensorial",
                        tipo: "select",
                        opcoes: [
                            { texto: "Completamente Limitada", valor: 1 },
                            { texto: "Muito Limitada", valor: 2 },
                            { texto: "Ligeiramente Limitada", valor: 3 },
                            { texto: "Nenhuma Limitação", valor: 4 }
                        ]
                    },
                    {
                        nome: "umidade",
                        label: "Umidade",
                        tipo: "select",
                        opcoes: [
                            { texto: "Constantemente Úmida", valor: 1 },
                            { texto: "Muito Úmida", valor: 2 },
                            { texto: "Ocasionalmente Úmida", valor: 3 },
                            { texto: "Raramente Úmida", valor: 4 }
                        ]
                    },
                    {
                        nome: "atividade",
                        label: "Atividade",
                        tipo: "select",
                        opcoes: [
                            { texto: "Acamado", valor: 1 },
                            { texto: "Confinado à Cadeira", valor: 2 },
                            { texto: "Deambula Ocasionalmente", valor: 3 },
                            { texto: "Deambula Frequentemente", valor: 4 }
                        ]
                    },
                    {
                        nome: "mobilidade",
                        label: "Mobilidade",
                        tipo: "select",
                        opcoes: [
                            { texto: "Completamente Imóvel", valor: 1 },
                            { texto: "Muito Limitada", valor: 2 },
                            { texto: "Ligeiramente Limitada", valor: 3 },
                            { texto: "Nenhuma Limitação", valor: 4 }
                        ]
                    },
                    {
                        nome: "nutricao",
                        label: "Nutrição",
                        tipo: "select",
                        opcoes: [
                            { texto: "Muito Pobre", valor: 1 },
                            { texto: "Provavelmente Inadequada", valor: 2 },
                            { texto: "Adequada", valor: 3 },
                            { texto: "Excelente", valor: 4 }
                        ]
                    },
                    {
                        nome: "friccao_cisalhamento",
                        label: "Fricção e Cisalhamento",
                        tipo: "select",
                        opcoes: [
                            { texto: "Problema", valor: 1 },
                            { texto: "Problema Potencial", valor: 2 },
                            { texto: "Nenhum Problema Aparente", valor: 3 }
                        ]
                    }
                ],
                calcular: function(valores) {
                    const total = Object.values(valores).reduce((sum, val) => sum + val, 0);
                    let risco = "";
                    let cor = "";
                    
                    if (total >= 15) {
                        risco = "Leve";
                        cor = "#28a745";
                    } else if (total >= 13) {
                        risco = "Moderado";
                        cor = "#ffc107";
                    } else if (total >= 10) {
                        risco = "Alto";
                        cor = "#fd7e14";
                    } else {
                        risco = "Altíssimo";
                        cor = "#dc3545";
                    }
                    
                    return {
                        escore: total,
                        resultado: `Risco ${risco}`,
                        detalhes: `Pontuação total: ${total} pontos (escala de 6 a 23)`,
                        cor: cor
                    };
                }
            },
            "asa": {
                title: "Classificação ASA",
                description: "Estado físico do paciente pré-procedimento",
                campos: [
                    {
                        nome: "classe_asa",
                        label: "Selecione a Classificação ASA",
                        tipo: "select",
                        opcoes: [
                            { texto: "ASA I - Paciente saudável", valor: 1 },
                            { texto: "ASA II - Doença sistêmica leve", valor: 2 },
                            { texto: "ASA III - Doença sistêmica grave com limitação", valor: 3 },
                            { texto: "ASA IV - Doença grave que ameaça a vida", valor: 4 },
                            { texto: "ASA V - Paciente moribundo", valor: 5 },
                            { texto: "ASA VI - Morte cerebral", valor: 6 }
                        ]
                    }
                ],
                calcular: function(valores) {
                    const classe = valores.classe_asa;
                    const exemplos = {
                        1: "Paciente jovem, não fumante, para cirurgia eletiva.",
                        2: "Hipertensão controlada, diabetes tipo 2 controlado, fumante, gestante.",
                        3: "Diabetes mal controlado, DPOC sintomático, obesidade mórbida, IAM > 3 meses.",
                        4: "Angina instável, sepse, ICC descompensada, IAM < 3 meses.",
                        5: "Aneurisma de aorta roto, trauma craniano grave, falência múltipla de órgãos.",
                        6: "Morte cerebral declarada para doação de órgãos."
                    };
                    
                    return {
                        escore: classe,
                        resultado: `ASA ${classe}`,
                        detalhes: exemplos[classe],
                        cor: classe <= 2 ? "#28a745" : classe <= 3 ? "#ffc107" : "#dc3545"
                    };
                }
            },
            "mallampati": {
                title: "Classificação de Mallampati",
                description: "Predição de via aérea difícil",
                campos: [
                    {
                        nome: "classe",
                        label: "Estruturas Visíveis",
                        tipo: "select",
                        opcoes: [
                            { texto: "Classe I - Palato mole, fauce, úvula e pilares completos", valor: 1 },
                            { texto: "Classe II - Palato mole, fauce e úvula", valor: 2 },
                            { texto: "Classe III - Palato mole e base da úvula", valor: 3 },
                            { texto: "Classe IV - Apenas palato duro visível", valor: 4 }
                        ]
                    }
                ],
                calcular: function(valores) {
                    const classe = valores.classe;
                    let predicao = "";
                    let recomendacao = "";
                    let cor = "";
                    
                    if (classe <= 2) {
                        predicao = "Via Aérea Fácil";
                        recomendacao = "Intubação convencional geralmente sem dificuldades.";
                        cor = "#28a745";
                    } else {
                        predicao = "Via Aérea Difícil";
                        recomendacao = "Preparar plano alternativo e equipamentos avançados (ex: videolaringoscópio).";
                        cor = "#dc3545";
                    }
                    
                    return {
                        escore: classe,
                        resultado: `Classe ${classe} - ${predicao}`,
                        detalhes: recomendacao,
                        cor: cor
                    };
                }
            },
            "apfel": {
                title: "Escore de Apfel (NVPO)",
                description: "Risco de Náuseas e Vômitos Pós-Operatórios",
                campos: [
                    {
                        nome: "genero_feminino",
                        label: "1. Gênero Feminino",
                        tipo: "checkbox",
                        valor: 1
                    },
                    {
                        nome: "nao_fumante",
                        label: "2. Não-Fumante",
                        tipo: "checkbox",
                        valor: 1
                    },
                    {
                        nome: "historia_nvpo",
                        label: "3. História Prévia de NVPO ou Cinetose",
                        tipo: "checkbox",
                        valor: 1
                    },
                    {
                        nome: "uso_opioides",
                        label: "4. Uso de Opioides no Pós-Operatório",
                        tipo: "checkbox",
                        valor: 1
                    }
                ],
                calcular: function(valores) {
                    const total = Object.values(valores).reduce((sum, val) => sum + val, 0);
                    const riscos = [10, 20, 40, 60, 80];
                    const risco = riscos[total];
                    
                    let cor = "#28a745";
                    if (total >= 3) cor = "#dc3545";
                    else if (total >= 2) cor = "#ffc107";
                    
                    return {
                        escore: total,
                        resultado: `${total} fatores de risco`,
                        detalhes: `Risco de NVPO: ~${risco}%`,
                        cor: cor
                    };
                }
            },
            "padua": {
                title: "Escore de Pádua (TEV)",
                description: "Risco de TEV em pacientes clínicos",
                campos: [
                    {
                        nome: "cancer_ativo",
                        label: "Câncer ativo",
                        tipo: "checkbox",
                        valor: 3
                    },
                    {
                        nome: "tev_previo",
                        label: "TEV prévio",
                        tipo: "checkbox",
                        valor: 3
                    },
                    {
                        nome: "mobilidade_reduzida",
                        label: "Mobilidade reduzida (acamado ≥ 3 dias)",
                        tipo: "checkbox",
                        valor: 3
                    },
                    {
                        nome: "trombofilia",
                        label: "Trombofilia conhecida",
                        tipo: "checkbox",
                        valor: 3
                    },
                    {
                        nome: "trauma_cirurgia",
                        label: "Trauma ou cirurgia recente (≤ 1 mês)",
                        tipo: "checkbox",
                        valor: 2
                    },
                    {
                        nome: "idade_70",
                        label: "Idade ≥ 70 anos",
                        tipo: "checkbox",
                        valor: 1
                    },
                    {
                        nome: "insuf_card_resp",
                        label: "Insuficiência Cardíaca ou Respiratória",
                        tipo: "checkbox",
                        valor: 1
                    },
                    {
                        nome: "iam_avc",
                        label: "IAM ou AVC isquêmico agudo",
                        tipo: "checkbox",
                        valor: 1
                    },
                    {
                        nome: "infeccao_reuma",
                        label: "Infecção aguda ou doença reumatológica",
                        tipo: "checkbox",
                        valor: 1
                    },
                    {
                        nome: "obesidade",
                        label: "Obesidade (IMC ≥ 30 kg/m²)",
                        tipo: "checkbox",
                        valor: 1
                    },
                    {
                        nome: "terapia_hormonal",
                        label: "Terapia hormonal ou contraceptivos",
                        tipo: "checkbox",
                        valor: 1
                    }
                ],
                calcular: function(valores) {
                    const total = Object.values(valores).reduce((sum, val) => sum + val, 0);
                    let risco = "";
                    let recomendacao = "";
                    let cor = "";
                    
                    if (total < 4) {
                        risco = "Baixo";
                        recomendacao = "Profilaxia não indicada rotineiramente.";
                        cor = "#28a745";
                    } else {
                        risco = "Alto";
                        recomendacao = "Profilaxia farmacológica recomendada.";
                        cor = "#dc3545";
                    }
                    
                    return {
                        escore: total,
                        resultado: `Risco ${risco} de TEV`,
                        detalhes: recomendacao,
                        cor: cor
                    };
                }
            },
            "caprini": {
                title: "Escore de Caprini (TEV)",
                description: "Risco de TEV em pacientes cirúrgicos",
                campos: [
                    {
                        nome: "pontos_1",
                        label: "Fatores de 1 Ponto",
                        tipo: "number",
                        min: 0,
                        max: 20,
                        descricao: "Idade 41-60, cirurgia pequena, IMC>25, edema MMII, etc."
                    },
                    {
                        nome: "pontos_2",
                        label: "Fatores de 2 Pontos",
                        tipo: "number",
                        min: 0,
                        max: 20,
                        descricao: "Idade 61-74, cirurgia grande >45min, câncer, etc."
                    },
                    {
                        nome: "pontos_3",
                        label: "Fatores de 3 Pontos",
                        tipo: "number",
                        min: 0,
                        max: 15,
                        descricao: "Idade ≥75, história de TEV, trombofilias"
                    },
                    {
                        nome: "pontos_5",
                        label: "Fatores de 5 Pontos",
                        tipo: "number",
                        min: 0,
                        max: 10,
                        descricao: "AVC <1 mês, artroplastia, fratura quadril/perna"
                    }
                ],
                calcular: function(valores) {
                    const total = (valores.pontos_1 || 0) + 
                                 (valores.pontos_2 || 0) * 2 + 
                                 (valores.pontos_3 || 0) * 3 + 
                                 (valores.pontos_5 || 0) * 5;
                    
                    let risco = "";
                    let cor = "";
                    
                    if (total === 0) {
                        risco = "Muito Baixo";
                        cor = "#28a745";
                    } else if (total <= 2) {
                        risco = "Baixo";
                        cor = "#28a745";
                    } else if (total <= 4) {
                        risco = "Moderado";
                        cor = "#ffc107";
                    } else {
                        risco = "Alto";
                        cor = "#dc3545";
                    }
                    
                    return {
                        escore: total,
                        resultado: `Risco ${risco}`,
                        detalhes: `Pontuação total: ${total} pontos`,
                        cor: cor
                    };
                }
            },
            "dor": {
                title: "Escalas de Avaliação da Dor",
                description: "Avaliação da intensidade da dor",
                campos: [
                    {
                        nome: "escala_tipo",
                        label: "Tipo de Escala",
                        tipo: "select",
                        opcoes: [
                            { texto: "Escala Numérica (0-10)", valor: "numerica" },
                            { texto: "Escala Visual Analógica (EVA)", valor: "eva" },
                            { texto: "Escala de Faces (Wong-Baker)", valor: "faces" }
                        ]
                    },
                    {
                        nome: "intensidade",
                        label: "Intensidade da Dor (0-10)",
                        tipo: "number",
                        min: 0,
                        max: 10
                    }
                ],
                calcular: function(valores) {
                    const intensidade = valores.intensidade || 0;
                    let classificacao = "";
                    let cor = "";
                    
                    if (intensidade === 0) {
                        classificacao = "Sem dor";
                        cor = "#28a745";
                    } else if (intensidade <= 3) {
                        classificacao = "Dor leve";
                        cor = "#ffc107";
                    } else if (intensidade <= 6) {
                        classificacao = "Dor moderada";
                        cor = "#fd7e14";
                    } else {
                        classificacao = "Dor intensa";
                        cor = "#dc3545";
                    }
                    
                    return {
                        escore: intensidade,
                        resultado: classificacao,
                        detalhes: `Intensidade: ${intensidade}/10`,
                        cor: cor
                    };
                }
            }
        }
    },
    
    // ==================== SUBGRUPO 2: CALCULADORAS GERAIS ====================
    "gerais": {
        title: "Calculadoras Gerais de Anestesiologia",
        icon: "fas fa-calculator",
        color: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
        calculadoras: {
            "rcri": {
                title: "Índice de Risco Cardíaco (RCRI)",
                description: "Risco de complicações cardíacas em cirurgias não cardíacas",
                campos: [
                    {
                        nome: "cirurgia_alto_risco",
                        label: "Cirurgia de alto risco (intratorácica, intraperitoneal, vascular)",
                        tipo: "checkbox",
                        valor: 1
                    },
                    {
                        nome: "doenca_isquemica",
                        label: "História de doença cardíaca isquêmica",
                        tipo: "checkbox",
                        valor: 1
                    },
                    {
                        nome: "icc",
                        label: "História de insuficiência cardíaca congestiva",
                        tipo: "checkbox",
                        valor: 1
                    },
                    {
                        nome: "doenca_cerebrovascular",
                        label: "História de doença cerebrovascular (AVC ou AIT)",
                        tipo: "checkbox",
                        valor: 1
                    },
                    {
                        nome: "diabetes_insulina",
                        label: "Diabetes mellitus em uso de insulina",
                        tipo: "checkbox",
                        valor: 1
                    },
                    {
                        nome: "creatinina_alta",
                        label: "Creatinina sérica > 2.0 mg/dL",
                        tipo: "checkbox",
                        valor: 1
                    }
                ],
                calcular: function(valores) {
                    const total = Object.values(valores).reduce((sum, val) => sum + val, 0);
                    const riscos = [3.9, 6.0, 10.1, 15.0];
                    const risco = total === 0 ? riscos[0] : 
                                 total === 1 ? riscos[1] : 
                                 total === 2 ? riscos[2] : riscos[3];
                    
                    let cor = total === 0 ? "#28a745" : 
                             total <= 1 ? "#ffc107" : "#dc3545";
                    
                    return {
                        escore: total,
                        resultado: `${total} preditores`,
                        detalhes: `Risco de complicação cardíaca: ${risco}%`,
                        cor: cor
                    };
                }
            },
            "child_pugh": {
                title: "Escore de Child-Pugh",
                description: "Função hepática e risco cirúrgico",
                campos: [
                    {
                        nome: "bilirrubina",
                        label: "Bilirrubina Total (mg/dL)",
                        tipo: "select",
                        opcoes: [
                            { texto: "< 2", valor: 1 },
                            { texto: "2 - 3", valor: 2 },
                            { texto: "> 3", valor: 3 }
                        ]
                    },
                    {
                        nome: "albumina",
                        label: "Albumina Sérica (g/dL)",
                        tipo: "select",
                        opcoes: [
                            { texto: "> 3.5", valor: 1 },
                            { texto: "2.8 - 3.5", valor: 2 },
                            { texto: "< 2.8", valor: 3 }
                        ]
                    },
                    {
                        nome: "inr",
                        label: "INR",
                        tipo: "select",
                        opcoes: [
                            { texto: "< 1.7", valor: 1 },
                            { texto: "1.7 - 2.2", valor: 2 },
                            { texto: "> 2.2", valor: 3 }
                        ]
                    },
                    {
                        nome: "ascite",
                        label: "Ascite",
                        tipo: "select",
                        opcoes: [
                            { texto: "Ausente", valor: 1 },
                            { texto: "Leve (controlada)", valor: 2 },
                            { texto: "Moderada a Severa", valor: 3 }
                        ]
                    },
                    {
                        nome: "encefalopatia",
                        label: "Encefalopatia Hepática",
                        tipo: "select",
                        opcoes: [
                            { texto: "Nenhuma", valor: 1 },
                            { texto: "Grau 1-2", valor: 2 },
                            { texto: "Grau 3-4", valor: 3 }
                        ]
                    }
                ],
                calcular: function(valores) {
                    const total = Object.values(valores).reduce((sum, val) => sum + val, 0);
                    let classe = "";
                    let mortalidade = "";
                    let cor = "";
                    
                    if (total <= 6) {
                        classe = "A";
                        mortalidade = "~10%";
                        cor = "#28a745";
                    } else if (total <= 9) {
                        classe = "B";
                        mortalidade = "~30%";
                        cor = "#ffc107";
                    } else {
                        classe = "C";
                        mortalidade = "70-80%";
                        cor = "#dc3545";
                    }
                    
                    return {
                        escore: total,
                        resultado: `Classe ${classe}`,
                        detalhes: `Mortalidade operatória: ${mortalidade}`,
                        cor: cor
                    };
                }
            },
            "aldrete": {
                title: "Índice de Aldrete (Alta SRPA)",
                description: "Critérios de alta da sala de recuperação (adultos)",
                campos: [
                    {
                        nome: "atividade",
                        label: "Atividade",
                        tipo: "select",
                        opcoes: [
                            { texto: "Move 4 extremidades", valor: 2 },
                            { texto: "Move 2 extremidades", valor: 1 },
                            { texto: "Não move extremidades", valor: 0 }
                        ]
                    },
                    {
                        nome: "respiracao",
                        label: "Respiração",
                        tipo: "select",
                        opcoes: [
                            { texto: "Respira fundo e tosse", valor: 2 },
                            { texto: "Dispneia / Respiração superficial", valor: 1 },
                            { texto: "Apneia", valor: 0 }
                        ]
                    },
                    {
                        nome: "circulacao",
                        label: "Circulação (PA vs basal)",
                        tipo: "select",
                        opcoes: [
                            { texto: "PA ± 20%", valor: 2 },
                            { texto: "PA ± 20-49%", valor: 1 },
                            { texto: "PA ± 50%", valor: 0 }
                        ]
                    },
                    {
                        nome: "consciencia",
                        label: "Consciência",
                        tipo: "select",
                        opcoes: [
                            { texto: "Totalmente desperto", valor: 2 },
                            { texto: "Desperta ao chamado", valor: 1 },
                            { texto: "Não responde", valor: 0 }
                        ]
                    },
                    {
                        nome: "saturacao",
                        label: "Saturação de O₂",
                        tipo: "select",
                        opcoes: [
                            { texto: "SpO₂ > 92% em ar ambiente", valor: 2 },
                            { texto: "SpO₂ > 90% com O₂", valor: 1 },
                            { texto: "SpO₂ ≤ 90% com O₂", valor: 0 }
                        ]
                    }
                ],
                calcular: function(valores) {
                    const total = Object.values(valores).reduce((sum, val) => sum + val, 0);
                    let resultado = "";
                    let cor = "";
                    
                    if (total >= 9) {
                        resultado = "Apto para alta";
                        cor = "#28a745";
                    } else {
                        resultado = "Não apto para alta";
                        cor = "#dc3545";
                    }
                    
                    return {
                        escore: total,
                        resultado: resultado,
                        detalhes: `Pontuação: ${total}/10 (mínimo 9 para alta)`,
                        cor: cor
                    };
                }
            },
            "steward": {
                title: "Escore de Steward (Alta SRPA)",
                description: "Critérios de alta da sala de recuperação (pediátrico)",
                campos: [
                    {
                        nome: "consciencia",
                        label: "Consciência",
                        tipo: "select",
                        opcoes: [
                            { texto: "Acordado ou chorando", valor: 2 },
                            { texto: "Responde a estímulos", valor: 1 },
                            { texto: "Não responde", valor: 0 }
                        ]
                    },
                    {
                        nome: "via_aerea",
                        label: "Vias Aéreas",
                        tipo: "select",
                        opcoes: [
                            { texto: "Tosse sob comando ou chora", valor: 2 },
                            { texto: "Mantém via aérea pérvia", valor: 1 },
                            { texto: "Via aérea requer manutenção", valor: 0 }
                        ]
                    },
                    {
                        nome: "movimento",
                        label: "Movimento",
                        tipo: "select",
                        opcoes: [
                            { texto: "Move membros propositalmente", valor: 2 },
                            { texto: "Movimentos não propositais", valor: 1 },
                            { texto: "Imóvel", valor: 0 }
                        ]
                    }
                ],
                calcular: function(valores) {
                    const total = Object.values(valores).reduce((sum, val) => sum + val, 0);
                    let resultado = "";
                    let cor = "";
                    
                    if (total === 6) {
                        resultado = "Apto para alta";
                        cor = "#28a745";
                    } else {
                        resultado = "Não apto para alta";
                        cor = "#dc3545";
                    }
                    
                    return {
                        escore: total,
                        resultado: resultado,
                        detalhes: `Pontuação: ${total}/6 (necessário 6 para alta)`,
                        cor: cor
                    };
                }
            },
            "pci": {
                title: "Peso Corporal Ideal (PCI)",
                description: "Cálculo do peso ideal para dosagem de fármacos",
                campos: [
                    {
                        nome: "altura",
                        label: "Altura (cm)",
                        tipo: "number",
                        min: 100,
                        max: 250
                    },
                    {
                        nome: "sexo",
                        label: "Sexo",
                        tipo: "select",
                        opcoes: [
                            { texto: "Masculino", valor: "M" },
                            { texto: "Feminino", valor: "F" }
                        ]
                    }
                ],
                calcular: function(valores) {
                    const altura = valores.altura || 170;
                    const sexo = valores.sexo || "M";
                    
                    let pci = 0;
                    if (sexo === "M") {
                        pci = 50 + 0.9 * (altura - 152);
                    } else {
                        pci = 45.5 + 0.9 * (altura - 152);
                    }
                    
                    return {
                        escore: Math.round(pci * 10) / 10,
                        resultado: `${Math.round(pci * 10) / 10} kg`,
                        detalhes: `Peso Corporal Ideal (Fórmula de Devine)`,
                        cor: "#007bff"
                    };
                }
            },
            "pediatria": {
                title: "Doses Pediátricas",
                description: "Cálculo de doses de fármacos em pediatria",
                campos: [
                    {
                        nome: "peso",
                        label: "Peso da Criança (kg)",
                        tipo: "number",
                        min: 1,
                        max: 100
                    },
                    {
                        nome: "farmaco",
                        label: "Fármaco",
                        tipo: "select",
                        opcoes: [
                            { texto: "Propofol (Indução)", valor: "propofol_inducao" },
                            { texto: "Midazolam (Pré-medicação Oral)", valor: "midazolam_oral" },
                            { texto: "Cetamina (Indução IV)", valor: "cetamina_iv" },
                            { texto: "Fentanil (Analgesia)", valor: "fentanil" },
                            { texto: "Succinilcolina", valor: "succinilcolina" },
                            { texto: "Rocurônio (Rotina)", valor: "rocuronio" },
                            { texto: "Adrenalina (Parada/Anafilaxia)", valor: "adrenalina" },
                            { texto: "Atropina (Bradicardia)", valor: "atropina" }
                        ]
                    }
                ],
                calcular: function(valores) {
                    const peso = valores.peso || 10;
                    const farmaco = valores.farmaco || "propofol_inducao";
                    
                    const doses = {
                        propofol_inducao: { dose: `${peso * 2.5} - ${peso * 5} mg`, descricao: "Propofol Indução: 2.5-5 mg/kg IV" },
                        midazolam_oral: { dose: `${peso * 0.3} - ${peso * 0.5} mg`, descricao: "Midazolam Oral: 0.3-0.5 mg/kg" },
                        cetamina_iv: { dose: `${peso * 1} - ${peso * 2} mg`, descricao: "Cetamina IV: 1-2 mg/kg" },
                        fentanil: { dose: `${peso * 1} - ${peso * 2} mcg`, descricao: "Fentanil: 1-2 mcg/kg IV" },
                        succinilcolina: { dose: `${peso * 1} - ${peso * 2} mg`, descricao: "Succinilcolina: 1-2 mg/kg IV" },
                        rocuronio: { dose: `${peso * 0.6} mg`, descricao: "Rocurônio: 0.6 mg/kg IV" },
                        adrenalina: { dose: `${peso * 10} mcg (${peso * 0.1} mL de 1:10.000)`, descricao: "Adrenalina: 10 mcg/kg" },
                        atropina: { dose: `${Math.max(0.1, peso * 0.02)} mg`, descricao: "Atropina: 0.02 mg/kg (mínimo 0.1 mg)" }
                    };
                    
                    const resultado = doses[farmaco];
                    
                    return {
                        escore: peso,
                        resultado: resultado.dose,
                        detalhes: resultado.descricao,
                        cor: "#007bff"
                    };
                }
            }
        }
    }
};

console.log('✅ Calculadoras carregadas:', Object.keys(calculadorasData));

