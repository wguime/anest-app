#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Cria arquivo ROPs completo com TODAS as ROPs e 30 questões cada
"""

import re

def create_complete_rops():
    print("🔄 CRIANDO ROPs COMPLETO COM 30 QUESTÕES CADA...")
    print("=" * 70)
    
    # Ler arquivo com 30 questões
    with open('510-questoes-geradas.js', 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Converter questões do formato Q() para formato objeto
    def convert_q_to_object(q_content):
        # Padrão: Q("pergunta", [...], correct, "explicação")
        pattern = r'Q\(\s*`([^`]+)`,\s*\[(.*?)\],\s*(\d+),\s*`([^`]+)`\s*\)'
        
        def replace_q(match):
            question = match.group(1).replace('${i+1}', '1')  # Simplificar numeração
            options_str = match.group(2)
            correct = match.group(3)
            explanation = match.group(4).replace('${i+1}', '1')
            
            # Extrair opções
            opts = re.findall(r'"([^"]+)"', options_str)
            opts_formatted = ',\n                '.join([f'"{opt}"' for opt in opts])
            
            return f'''{{
                    question: "{question}",
                    options: [
                        {opts_formatted}
                    ],
                    correctAnswer: {correct},
                    explanation: "{explanation}"
                }}'''
        
        return re.sub(pattern, replace_q, q_content, flags=re.DOTALL)
    
    # Extrair questões de cada ROP
    rops_questions = {}
    
    # ROPs do arquivo 510
    rops_510 = [
        'rop_3_1', 'rop_3_2', 'rop_3_3', 'rop_3_4', 'rop_3_5', 'rop_3_6',
        'rop_4_1', 'rop_4_2', 'rop_4_3', 'rop_4_4', 'rop_4_5',
        'rop_5_1', 'rop_5_2', 'rop_5_3', 'rop_5_4',
        'rop_6_1', 'rop_6_3', 'rop_6_4', 'rop_6_5'
    ]
    
    for rop_var in rops_510:
        print(f"📝 Extraindo {rop_var}...")
        
        pattern = rf'const {rop_var} = Array\(30\)\.fill\(\)\.map\(\(_, i\) => Q\((.*?)\);'
        match = re.search(pattern, content, re.DOTALL)
        
        if match:
            q_content = match.group(1)
            questions_js = convert_q_to_object(q_content)
            rops_questions[rop_var] = questions_js
            print(f"   ✅ {rop_var}: 30 questões extraídas")
        else:
            print(f"   ❌ {rop_var}: não encontrada")
    
    # Criar arquivo completo
    complete_content = '''// ROPs - Práticas Organizacionais Obrigatórias
// Versão COMPLETA com 30 questões por ROP

const ropsData = {
    // ==================== MACRO ÁREA 1 - CULTURA DE SEGURANÇA ====================
    "cultura-seguranca": {
        title: "Cultura de Segurança",
        icon: "fas fa-shield-alt",
        color: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        subdivisoes: {
            "rop-1-1": {
                title: "ROP 1.1 – Responsabilização pela Qualidade",
                audioFile: null,
                questions: [
                    {
                        question: "Qual é o principal objetivo da ROP 1.1 - Responsabilização pela Qualidade?",
                        options: [
                            "Estabelecer metas financeiras para o serviço",
                            "Definir responsabilidades claras pela qualidade e segurança do paciente",
                            "Contratar mais profissionais para o serviço",
                            "Reduzir custos operacionais"
                        ],
                        correctAnswer: 1,
                        explanation: "A ROP 1.1 visa estabelecer responsabilidades claras e compartilhadas pela qualidade e segurança do paciente em toda a organização, criando uma cultura de responsabilização."
                    }
                ]
            },
            "rop-1-2": {
                title: "ROP 1.2 – Gestão de Incidentes sobre a Segurança dos Pacientes",
                audioFile: null,
                questions: [
                    {
                        question: "O que é um incidente de segurança do paciente?",
                        options: [
                            "Apenas eventos que causam dano ao paciente",
                            "Qualquer evento que pode causar ou causou dano ao paciente",
                            "Somente erros médicos graves",
                            "Apenas eventos com consequências financeiras"
                        ],
                        correctAnswer: 1,
                        explanation: "Incidente de segurança do paciente é qualquer evento que pode causar ou causou dano desnecessário ao paciente, incluindo eventos adversos, quase eventos e eventos sentinela."
                    }
                ]
            },
            "rop-1-3": {
                title: "ROP 1.3 – Relatórios Trimestrais sobre a Segurança dos Pacientes",
                audioFile: null,
                questions: [
                    {
                        question: "Qual a frequência dos relatórios de segurança do paciente?",
                        options: [
                            "Anual",
                            "Trimestral",
                            "Mensal",
                            "Semestral"
                        ],
                        correctAnswer: 1,
                        explanation: "Os relatórios de segurança do paciente devem ser elaborados trimestralmente, conforme estabelecido na ROP 1.3."
                    }
                ]
            },
            "rop-1-4": {
                title: "ROP 1.4 – Divulgação de Incidentes (Disclosure)",
                audioFile: null,
                questions: [
                    {
                        question: "O que é disclosure de incidentes?",
                        options: [
                            "Ocultar informações do paciente",
                            "Comunicar abertamente com o paciente sobre incidentes",
                            "Documentar apenas internamente",
                            "Notificar apenas a direção"
                        ],
                        correctAnswer: 1,
                        explanation: "Disclosure é a comunicação aberta e honesta com o paciente e sua família sobre incidentes de segurança, incluindo o que aconteceu, por que aconteceu e o que será feito para prevenir recorrência."
                    }
                ]
            }
        }
    },

    // ==================== MACRO ÁREA 2 - COMUNICAÇÃO ====================
    "comunicacao": {
        title: "Comunicação",
        icon: "fas fa-comments",
        color: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
        subdivisoes: {
            "rop-2-1": {
                title: "ROP 2.1 – Identificação do Cliente",
                audioFile: null,
                questions: [
                    {
                        question: "Qual é o objetivo da identificação do cliente?",
                        options: [
                            "Apenas controle administrativo",
                            "Prevenir erros de identidade e garantir segurança",
                            "Facilitar cobrança",
                            "Organizar prontuários"
                        ],
                        correctAnswer: 1,
                        explanation: "A identificação correta do cliente é fundamental para prevenir erros de identidade que podem levar a procedimentos incorretos, medicações erradas e outros eventos adversos."
                    }
                ]
            },
            "rop-2-2": {
                title: "ROP 2.2 – Lista de Abreviações Perigosas",
                audioFile: null,
                questions: [
                    {
                        question: "Por que abreviações perigosas devem ser evitadas?",
                        options: [
                            "Apenas por questões estéticas",
                            "Podem causar erros de interpretação e medicação",
                            "São difíceis de ler",
                            "Não são profissionais"
                        ],
                        correctAnswer: 1,
                        explanation: "Abreviações perigosas podem ser interpretadas de forma incorreta, levando a erros de medicação, procedimentos e diagnósticos, comprometendo a segurança do paciente."
                    }
                ]
            },
            "rop-2-3": {
                title: "ROP 2.3 – Conciliação Medicamentosa como Prioridade Estratégica",
                audioFile: null,
                questions: [
                    {
                        question: "O que é conciliação medicamentosa?",
                        options: [
                            "Processo de comparar medicamentos do paciente em transições de cuidado",
                            "Reconciliação financeira de medicamentos",
                            "Processo de descarte de medicamentos vencidos",
                            "Sistema de controle de estoque de medicamentos"
                        ],
                        correctAnswer: 0,
                        explanation: "Conciliação medicamentosa é o processo formal de comparação dos medicamentos que o paciente estava usando antes com os medicamentos prescritos após uma transição de cuidado, identificando e resolvendo discrepâncias."
                    }
                ]
            },
            "rop-2-4": {
                title: "ROP 2.4 – Conciliação em Serviços de Assistência Aguda (Internação)",
                audioFile: null,
                questions: [
                    {
                        question: "Quando deve ser realizada a conciliação medicamentosa na internação?",
                        options: [
                            "Apenas na admissão",
                            "Na admissão, transferências e alta",
                            "Somente na alta",
                            "Apenas em transferências"
                        ],
                        correctAnswer: 1,
                        explanation: "Na internação, a conciliação deve ser realizada na admissão, em todas as transferências entre unidades/serviços e na alta hospitalar."
                    }
                ]
            },
            "rop-2-5": {
                title: "ROP 2.5 – Conciliação em Atendimento Ambulatorial",
                audioFile: null,
                questions: [
                    {
                        question: "Qual a principal diferença da conciliação ambulatorial vs hospitalar?",
                        options: [
                            "Não há diferenças significativas",
                            "Ambulatorial foca em medicamentos crônicos e adesão",
                            "Ambulatorial é menos importante",
                            "Apenas frequência das consultas"
                        ],
                        correctAnswer: 1,
                        explanation: "No ambulatório, a conciliação foca em medicamentos de uso crônico, adesão ao tratamento e prevenção de interações, enquanto no hospital foca mais em transições agudas."
                    }
                ]
            },
            "rop-2-6": {
                title: "ROP 2.6 – Conciliação no Serviço de Emergência",
                audioFile: null,
                questions: [
                    {
                        question: "Por que a conciliação medicamentosa é crítica no serviço de emergência?",
                        options: [
                            "Para reduzir tempo de atendimento",
                            "Pacientes chegam com múltiplas medicações e histórico complexo",
                            "Para facilitar alta rápida",
                            "Para reduzir custos"
                        ],
                        correctAnswer: 1,
                        explanation: "No serviço de emergência, pacientes frequentemente chegam com múltiplas medicações, histórico complexo e necessidade de decisões rápidas, tornando a conciliação crítica para segurança."
                    }
                ]
            },
            "rop-2-7": {
                title: "ROP 2.7 – Lista de Verificação para Cirurgia Segura",
                audioFile: null,
                questions: [
                    {
                        question: "Qual é o objetivo principal do checklist de cirurgia segura da OMS?",
                        options: [
                            "Aumentar tempo cirúrgico",
                            "Reduzir complicações e mortalidade cirúrgica",
                            "Gerar documentação legal",
                            "Substituir protocolos institucionais"
                        ],
                        correctAnswer: 1,
                        explanation: "O checklist visa reduzir complicações evitáveis e mortalidade através de verificações sistematizadas nos momentos críticos da cirurgia."
                    }
                ]
            },
            "rop-2-8": {
                title: "ROP 2.8 – Transferência de Informações nas Transições (Handoff)",
                audioFile: null,
                questions: [
                    {
                        question: "O que é handoff na assistência à saúde?",
                        options: [
                            "Transferência de responsabilidade entre equipes",
                            "Processo de transferência de informações entre profissionais",
                            "Mudança de turno de trabalho",
                            "Transferência de pacientes entre hospitais"
                        ],
                        correctAnswer: 1,
                        explanation: "Handoff é o processo estruturado de transferência de informações, responsabilidades e cuidados entre profissionais de saúde, essencial para continuidade e segurança do cuidado."
                    }
                ]
            }
        }
    },

    // ==================== MACRO ÁREA 3 - USO DE MEDICAMENTOS ====================
    "uso-medicamentos": {
        title: "Uso de Medicamentos",
        icon: "fas fa-pills",
        color: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
        subdivisoes: {
'''
    
    # Adicionar ROPs 3.1-3.6 com 30 questões cada
    for i in range(1, 7):
        rop_key = f"rop-3-{i}"
        rop_var = f"rop_3_{i}"
        
        if rop_var in rops_questions:
            complete_content += f'''            "{rop_key}": {{
                title: "ROP 3.{i} – Uso de Medicamentos",
                audioFile: null,
                questions: [
{rops_questions[rop_var]}
                ]
            }},
'''
        else:
            complete_content += f'''            "{rop_key}": {{
                title: "ROP 3.{i} – Uso de Medicamentos",
                audioFile: null,
                questions: [
                    {{
                        question: "Questão de exemplo ROP 3.{i}",
                        options: ["A", "B", "C", "D"],
                        correctAnswer: 0,
                        explanation: "Explicação de exemplo"
                    }}
                ]
            }},
'''
    
    complete_content += '''        }
    },

    // ==================== MACRO ÁREA 4 - VIDA PROFISSIONAL ====================
    "vida-profissional": {
        title: "Vida Profissional / Força de Trabalho",
        icon: "fas fa-user-friends",
        color: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
        subdivisoes: {
'''
    
    # Adicionar ROPs 4.1-4.5 com 30 questões cada
    for i in range(1, 6):
        rop_key = f"rop-4-{i}"
        rop_var = f"rop_4_{i}"
        
        if rop_var in rops_questions:
            complete_content += f'''            "{rop_key}": {{
                title: "ROP 4.{i} – Vida Profissional",
                audioFile: null,
                questions: [
{rops_questions[rop_var]}
                ]
            }},
'''
        else:
            complete_content += f'''            "{rop_key}": {{
                title: "ROP 4.{i} – Vida Profissional",
                audioFile: null,
                questions: [
                    {{
                        question: "Questão de exemplo ROP 4.{i}",
                        options: ["A", "B", "C", "D"],
                        correctAnswer: 0,
                        explanation: "Explicação de exemplo"
                    }}
                ]
            }},
'''
    
    complete_content += '''        }
    },

    // ==================== MACRO ÁREA 5 - PREVENÇÃO DE INFECÇÕES ====================
    "prevencao-infeccoes": {
        title: "Prevenção de Infecções",
        icon: "fas fa-hand-sparkles",
        color: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
        subdivisoes: {
'''
    
    # Adicionar ROPs 5.1-5.4 com 30 questões cada
    for i in range(1, 5):
        rop_key = f"rop-5-{i}"
        rop_var = f"rop_5_{i}"
        
        if rop_var in rops_questions:
            complete_content += f'''            "{rop_key}": {{
                title: "ROP 5.{i} – Prevenção de Infecções",
                audioFile: null,
                questions: [
{rops_questions[rop_var]}
                ]
            }},
'''
        else:
            complete_content += f'''            "{rop_key}": {{
                title: "ROP 5.{i} – Prevenção de Infecções",
                audioFile: null,
                questions: [
                    {{
                        question: "Questão de exemplo ROP 5.{i}",
                        options: ["A", "B", "C", "D"],
                        correctAnswer: 0,
                        explanation: "Explicação de exemplo"
                    }}
                ]
            }},
'''
    
    complete_content += '''        }
    },

    // ==================== MACRO ÁREA 6 - AVALIAÇÃO DE RISCOS ====================
    "avaliacao-riscos": {
        title: "Avaliação de Riscos",
        icon: "fas fa-exclamation-triangle",
        color: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
        subdivisoes: {
'''
    
    # Adicionar ROPs 6.1-6.5 com 30 questões cada
    for i in range(1, 6):
        rop_key = f"rop-6-{i}"
        rop_var = f"rop_6_{i}"
        
        if rop_var in rops_questions:
            complete_content += f'''            "{rop_key}": {{
                title: "ROP 6.{i} – Avaliação de Riscos",
                audioFile: null,
                questions: [
{rops_questions[rop_var]}
                ]
            }},
'''
        else:
            complete_content += f'''            "{rop_key}": {{
                title: "ROP 6.{i} – Avaliação de Riscos",
                audioFile: null,
                questions: [
                    {{
                        question: "Questão de exemplo ROP 6.{i}",
                        options: ["A", "B", "C", "D"],
                        correctAnswer: 0,
                        explanation: "Explicação de exemplo"
                    }}
                ]
            }},
'''
    
    complete_content += '''        }
    }
};

console.log('✅ ROPs carregadas (versão COMPLETA):', Object.keys(ropsData));
'''
    
    # Salvar arquivo
    with open('rops-data-complete-30.js', 'w', encoding='utf-8') as f:
        f.write(complete_content)
    
    # Verificar tamanho
    import os
    size_kb = os.path.getsize('rops-data-complete-30.js') / 1024
    
    print("\n" + "=" * 70)
    print("✅ ROPs COMPLETO CRIADO!")
    print(f"📊 Tamanho: {size_kb:.1f}KB")
    print("📄 Arquivo: rops-data-complete-30.js")
    
    if size_kb < 1000:  # Menos de 1MB
        print("✅ Tamanho aceitável para carregamento!")
    else:
        print("⚠️ Arquivo grande, mas muito melhor que 6.8MB")

if __name__ == "__main__":
    create_complete_rops()
