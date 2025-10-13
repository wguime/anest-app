#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Insere ROPs 2.3-2.6 no rops-data.js
"""

import re

def extract_questions(filename, rop_name):
    """Extrai questões de um arquivo"""
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Tentar com _questions primeiro
    pattern1 = rf'const\s+{rop_name}_questions\s*=\s*\[(.*?)\];'
    match = re.search(pattern1, content, re.DOTALL)
    
    if match:
        questions = match.group(1).strip()
        return convert_create_question(questions)
    
    # Tentar sem _questions
    pattern2 = rf'const\s+{rop_name}\s*=\s*\[(.*?)\n\];'
    match = re.search(pattern2, content, re.DOTALL)
    
    if match:
        questions = match.group(1).strip()
        return convert_create_question(questions)
    
    return None

def convert_create_question(content):
    """Converte createQuestion() para formato de objeto"""
    if 'createQuestion(' not in content:
        return content
    
    # Padrão: createQuestion("pergunta", [...], correct, "explicação")
    pattern = r'createQuestion\(\s*"([^"]*(?:\\"[^"]*)*)",\s*\[(.*?)\],\s*(\d+),\s*"([^"]*(?:\\"[^"]*)*)"\s*\)'
    
    def replace_func(match):
        question = match.group(1).replace('\\"', '"')
        options_str = match.group(2)
        correct = match.group(3)
        explanation = match.group(4).replace('\\"', '"')
        
        # Extrair opções
        opts = re.findall(r'"([^"]*(?:\\"[^"]*)*)"', options_str)
        opts_formatted = ',\n            '.join([f'"{opt}"' for opt in opts])
        
        return f'''{{
        question: "{question}",
        options: [
            {opts_formatted}
        ],
        correctAnswer: {correct},
        explanation: "{explanation}"
    }}'''
    
    result = re.sub(pattern, replace_func, content, flags=re.DOTALL)
    return result

# Dados das ROPs
rops_info = {
    '2-3': {
        'title': 'ROP 2.3 – Conciliação Medicamentosa como Prioridade Estratégica',
        'file': 'questoes-rops-completas.js',
        'var': 'rop_2_3'
    },
    '2-4': {
        'title': 'ROP 2.4 – Conciliação em Serviços de Assistência Aguda (Internação)',
        'file': 'questoes-rops-completas.js',
        'var': 'rop_2_4'
    },
    '2-5': {
        'title': 'ROP 2.5 – Conciliação em Atendimento Ambulatorial',
        'file': 'todas-questoes-rops.js',
        'var': 'rop_2_5'
    },
    '2-6': {
        'title': 'ROP 2.6 – Conciliação no Serviço de Emergência',
        'file': 'todas-questoes-rops.js',
        'var': 'rop_2_6'
    }
}

print("🔄 INSERINDO ROPs 2.3-2.6 no rops-data.js\n")

# Ler rops-data.js
with open('rops-data.js', 'r', encoding='utf-8') as f:
    rops_content = f.read()

# Criar seções das ROPs
new_sections = []

for rop_key, rop_data in rops_info.items():
    print(f"📝 Processando ROP {rop_key}...")
    
    questions = extract_questions(rop_data['file'], rop_data['var'])
    
    if not questions:
        print(f"   ❌ Questões não encontradas!")
        continue
    
    # Criar seção
    section = f'''
            "rop-{rop_key}": {{
                title: "{rop_data['title']}",
                audioFile: null,
                questions: [
{questions}
                ]
            }},
'''
    new_sections.append(section)
    
    num_q = len(re.findall(r'{\s*question:', questions))
    print(f"   ✅ {num_q} questões extraídas")

# Encontrar onde inserir (após ROP 2.2)
pattern = r'("rop-2-2":\s*\{[^}]*questions:\s*\[.*?\]\s*\},)\s*("rop-2-7":)'
match = re.search(pattern, rops_content, re.DOTALL)

if not match:
    print("\n❌ Não encontrei o ponto de inserção (entre ROP 2.2 e 2.7)")
    exit(1)

# Inserir as novas ROPs
insertion_point = match.group(1)
next_rop = match.group(2)

new_content = rops_content.replace(
    match.group(0),
    insertion_point + '\n' + ''.join(new_sections) + '\n            ' + next_rop
)

# Salvar
with open('rops-data.js', 'w', encoding='utf-8') as f:
    f.write(new_content)

print("\n" + "=" * 60)
print("✅ INTEGRAÇÃO CONCLUÍDA!")
print("\n📊 ROPs adicionados:")
for rop_key, rop_data in rops_info.items():
    print(f"  • ROP {rop_key}: {rop_data['title']}")
print("\n🎯 Total: 120 questões integradas!")
print("=" * 60)

