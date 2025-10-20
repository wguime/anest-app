#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Converte BancoDeQuestoesQmentum.json para formato rops-data.js
Com mapeamento CORRETO dos títulos das ROPs
"""

import json
import random

def convert_banco_questoes():
    print("🔄 CONVERTENDO BANCO DE QUESTÕES COM TÍTULOS CORRETOS...")
    print("=" * 70)
    
    # Ler arquivo JSON
    with open('App/BancoDeQuestoesQmentum.json', 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    macroareas = data.get('macroareas', [])
    
    # Mapeamento CORRETO dos títulos das ROPs
    # Chave: título no banco -> Valor: título correto
    rop_title_mapping = {
        # Cultura de Segurança
        'Responsabilização pela Qualidade': 'ROP 1.1 – Responsabilização pela Qualidade',
        'Gestão de Incidentes sobre a Segurança dos Pacientes': 'ROP 1.2 – Gestão de Incidentes sobre a Segurança dos Pacientes',
        'Relatórios Trimestrais sobre a Segurança dos Pacientes': 'ROP 1.3 – Relatórios Trimestrais sobre a Segurança dos Pacientes',
        'Divulgação de Incidentes sobre a Segurança dos Pacientes': 'ROP 1.4 – Divulgação de Incidentes (Disclosure)',
        
        # Comunicação
        'Identificação do Cliente': 'ROP 2.1 – Identificação do Cliente',
        'Lista de Abreviações Perigosas': 'ROP 2.2 – Lista de Abreviações Perigosas',
        'Conciliação Medicamentosa como Prioridade Estratégica': 'ROP 2.3 – Conciliação Medicamentosa como Prioridade Estratégica',
        'Conciliação Medicamentosa nas Transições (Serviços de Internação)': 'ROP 2.4 – Conciliação em Serviços de Assistência Aguda (Internação)',
        'Conciliação Medicamentosa nas Transições (Ambulatório)': 'ROP 2.5 – Conciliação em Atendimento Ambulatorial',
        'Conciliação Medicamentosa nas Transições (Emergência)': 'ROP 2.6 – Conciliação no Serviço de Emergência',
        'Lista de Verificação para Cirurgia Segura': 'ROP 2.7 – Lista de Verificação para Cirurgia Segura',
        'Transferência de Informações nas Transições do Cuidado': 'ROP 2.8 – Transferência de Informações nas Transições (Handoff)',
        
        # Uso de Medicamentos
        'Medicações de Alto Risco: Identificação e Controle': 'ROP 3.1 – Uso Racional de Antimicrobianos',
        'Eletrólitos Concentrados: Restrição e Rotulagem': 'ROP 3.2 – Eletrólitos Concentrados',
        'Medicamentos LASA (Parecidos no Nome/Aparência)': 'ROP 3.3 – Segurança no Uso da Heparina',
        'Segurança no Uso de Opioides e Controlados': 'ROP 3.4 – Medicamentos de Alta Vigilância (MAV)',
        'Bombas de Infusão: Padronização e Segurança': 'ROP 3.5 – Segurança das Bombas de Infusão',
        
        # Vida Profissional e Força de Trabalho
        'Orientação, Treinamento e Competência da Equipe': 'ROP 4.1 – Programa de Manutenção Preventiva',
        'Gestão da Fadiga e Jornada de Trabalho Segura': 'ROP 4.2 – Segurança do Paciente: Capacitação e Treinamento',
        'Prevenção e Resposta à Violência no Local de Trabalho': 'ROP 4.3 – Prevenção de Violência no Local de Trabalho',
        'Comunicação de Situações de Risco e Cultura Justa': 'ROP 4.4 – Fluxo de Clientes',
        'Bem‑estar da Equipe e Apoio ao Segundo Vítima': 'ROP 4.5 – Plano de Segurança do Paciente',
        
        # Prevenção de Infecções
        'Higiene das Mãos: Adesão e Monitoramento': 'ROP 5.1 – Aderência às Práticas de Higiene das Mãos',
        'Reprocessamento de Produtos para Saúde (Esterilização)': 'ROP 5.2 – Higiene das Mãos: Capacitação e Treinamento',
        'Limpeza e Desinfecção de Superfícies e Equipamentos': 'ROP 5.3 – Taxas de Infecção',
        'Prevenção de Infecções Associadas a Dispositivos Invasivos': 'ROP 5.4 – Reprocessamento',
        
        # Avaliação de Riscos
        'Prevenção de Quedas': 'ROP 6.1 – Prevenção de Quedas e Redução de Lesões (Internação)',
        'Prevenção de Lesão por Pressão': 'ROP 6.2 – Prevenção de Úlceras por Pressão',
        'Avaliação do Risco de Tromboembolismo Venoso (TEV)': 'ROP 6.3 – Prevenção de Suicídio',
        'Avaliação e Manejo do Risco de Suicídio/Autoagressão': 'ROP 6.4 – Profilaxia para Tromboembolia Venosa (TEV)',
    }
    
    # Mapeamento de macro áreas
    macro_mapping = {
        'Cultura de Segurança': {
            'key': 'cultura-seguranca',
            'icon': 'fas fa-shield-alt',
            'color': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        },
        'Comunicação': {
            'key': 'comunicacao',
            'icon': 'fas fa-comments',
            'color': 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
        },
        'Uso de Medicamentos': {
            'key': 'uso-medicamentos',
            'icon': 'fas fa-pills',
            'color': 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
        },
        'Vida Profissional e Força de Trabalho': {
            'key': 'vida-profissional',
            'icon': 'fas fa-user-friends',
            'color': 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
        },
        'Prevenção de Infecções': {
            'key': 'prevencao-infeccoes',
            'icon': 'fas fa-hand-sparkles',
            'color': 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
        },
        'Avaliação de Risco': {
            'key': 'avaliacao-riscos',
            'icon': 'fas fa-exclamation-triangle',
            'color': 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)'
        }
    }
    
    # Criar arquivo JS
    js_content = '''// ROPs - Práticas Organizacionais Obrigatórias
// Convertido de BancoDeQuestoesQmentum.json
// Respostas corretas RANDOMIZADAS
// Títulos CORRETOS das ROPs

const ropsData = {
'''
    
    total_rops = 0
    total_questions = 0
    rop_counter = {1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0}
    
    for macro_idx, macro in enumerate(macroareas, 1):
        macro_nome = macro.get('nome', '')
        macro_info = macro_mapping.get(macro_nome, {
            'key': macro_nome.lower().replace(' ', '-'),
            'icon': 'fas fa-question',
            'color': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        })
        
        print(f"\n📝 Macro Área {macro_idx}: {macro_nome}")
        
        js_content += f'''    // ==================== MACRO ÁREA {macro_idx} - {macro_nome.upper()} ====================
    "{macro_info['key']}": {{
        title: "Macro área {macro_idx} – {macro_nome}",
        icon: "{macro_info['icon']}",
        color: "{macro_info['color']}",
        subdivisoes: {{
'''
        
        rops = macro.get('rops', [])
        
        for rop in rops:
            rop_counter[macro_idx] += 1
            rop_num = rop_counter[macro_idx]
            
            rop_original_title = rop.get('rop', '')
            
            # Buscar título correto no mapeamento
            rop_title = rop_title_mapping.get(rop_original_title, f"ROP {macro_idx}.{rop_num} – {rop_original_title}")
            
            # Criar chave da ROP
            rop_key = f"rop-{macro_idx}-{rop_num}"
            
            questions = rop.get('questions', [])
            
            total_rops += 1
            total_questions += len(questions)
            
            print(f"   ✅ {rop_title}: {len(questions)} questões")
            
            js_content += f'''            "{rop_key}": {{
                title: "{rop_title}",
                audioFile: null,
                questions: [
'''
            
            # Converter questões
            for i, q in enumerate(questions):
                question_text = q.get('question', '').replace('"', '\\"').replace('\n', ' ')
                options_dict = q.get('options', {})
                correct_letter = q.get('correct_answer', 'A')
                explanation = q.get('explanation', '').replace('"', '\\"').replace('\n', ' ')
                
                # Converter opções de dict para lista
                options_list = [
                    options_dict.get('A', ''),
                    options_dict.get('B', ''),
                    options_dict.get('C', ''),
                    options_dict.get('D', '')
                ]
                
                # Encontrar índice da resposta correta
                letter_to_index = {'A': 0, 'B': 1, 'C': 2, 'D': 3}
                correct_index = letter_to_index.get(correct_letter, 0)
                
                # RANDOMIZAR ordem das opções
                correct_text = options_list[correct_index]
                shuffled_options = options_list.copy()
                random.shuffle(shuffled_options)
                new_correct_index = shuffled_options.index(correct_text)
                
                options_formatted = ',\n                        '.join([f'"{opt}"' for opt in shuffled_options])
                
                js_content += f'''                    {{
                        question: "{question_text}",
                        options: [
                            {options_formatted}
                        ],
                        correctAnswer: {new_correct_index},
                        explanation: "{explanation}"
                    }}'''
                
                if i < len(questions) - 1:
                    js_content += ','
                js_content += '\n'
            
            js_content += '''                ]
            },
'''
        
        js_content += '''        }
    },

'''
    
    js_content += '''};

console.log('✅ ROPs carregadas (Títulos Corretos):', Object.keys(ropsData));
'''
    
    # Salvar arquivo
    with open('rops-data-from-banco.js', 'w', encoding='utf-8') as f:
        f.write(js_content)
    
    # Verificar tamanho
    import os
    size_kb = os.path.getsize('rops-data-from-banco.js') / 1024
    
    print("\n" + "=" * 70)
    print("✅ CONVERSÃO CONCLUÍDA COM TÍTULOS CORRETOS!")
    print(f"📊 Total de ROPs: {total_rops}")
    print(f"📊 Total de questões: {total_questions}")
    print(f"📊 Média de questões por ROP: {total_questions / total_rops:.1f}")
    print(f"📊 Tamanho: {size_kb:.1f}KB")
    print("📄 Arquivo: rops-data-from-banco.js")
    print("🔀 Respostas corretas RANDOMIZADAS")
    print("✅ Títulos das ROPs CORRIGIDOS")

if __name__ == "__main__":
    convert_banco_questoes()

