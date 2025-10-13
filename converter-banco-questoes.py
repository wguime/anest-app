#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Converte BancoDeQuestoesQmentum.json para formato rops-data.js
"""

import json
import random

def convert_banco_questoes():
    print("🔄 CONVERTENDO BANCO DE QUESTÕES...")
    print("=" * 70)
    
    # Ler arquivo JSON
    with open('App/BancoDeQuestoesQmentum.json', 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    macroareas = data.get('macroareas', [])
    
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

const ropsData = {
'''
    
    total_rops = 0
    total_questions = 0
    
    for macro in macroareas:
        macro_nome = macro.get('nome', '')
        macro_info = macro_mapping.get(macro_nome, {
            'key': macro_nome.lower().replace(' ', '-'),
            'icon': 'fas fa-question',
            'color': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        })
        
        print(f"\n📝 {macro_nome}:")
        
        js_content += f'''    // ==================== {macro_nome.upper()} ====================
    "{macro_info['key']}": {{
        title: "{macro_nome}",
        icon: "{macro_info['icon']}",
        color: "{macro_info['color']}",
        subdivisoes: {{
'''
        
        rops = macro.get('rops', [])
        
        for rop in rops:
            rop_id = rop.get('rop', '').replace('.', '-').lower()
            rop_key = f"rop-{rop_id}"
            rop_title = rop.get('rop', 'ROP')
            questions = rop.get('questions', [])
            
            total_rops += 1
            total_questions += len(questions)
            
            print(f"   {rop_title}: {len(questions)} questões")
            
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

console.log('✅ ROPs carregadas (do Banco de Questões):', Object.keys(ropsData));
'''
    
    # Salvar arquivo
    with open('rops-data-from-banco.js', 'w', encoding='utf-8') as f:
        f.write(js_content)
    
    # Verificar tamanho
    import os
    size_kb = os.path.getsize('rops-data-from-banco.js') / 1024
    
    print("\n" + "=" * 70)
    print("✅ CONVERSÃO CONCLUÍDA!")
    print(f"📊 Total de ROPs: {total_rops}")
    print(f"📊 Total de questões: {total_questions}")
    print(f"📊 Média de questões por ROP: {total_questions / total_rops:.1f}")
    print(f"📊 Tamanho: {size_kb:.1f}KB")
    print("📄 Arquivo: rops-data-from-banco.js")
    print("🔀 Respostas corretas RANDOMIZADAS")

if __name__ == "__main__":
    convert_banco_questoes()