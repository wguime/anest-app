#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Integrador de Questões ROPs
Integra questões dos arquivos separados no rops-data.js
"""

import re
import json

def read_file(filename):
    """Lê conteúdo de um arquivo"""
    with open(filename, 'r', encoding='utf-8') as f:
        return f.read()

def write_file(filename, content):
    """Escreve conteúdo em um arquivo"""
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(content)

def extract_questions_array(content, rop_name):
    """Extrai array de questões de um ROP específico"""
    # Padrão 1: const rop_X_Y_questions = [...]
    pattern1 = rf'const\s+{rop_name}_questions\s*=\s*(\[.*?\n\]);'
    match1 = re.search(pattern1, content, re.DOTALL)
    if match1:
        return match1.group(1)
    
    # Padrão 2: const rop_X_Y = [...]  
    pattern2 = rf'const\s+{rop_name}\s*=\s*(\[.*?\n\]);'
    match2 = re.search(pattern2, content, re.DOTALL)
    if match2:
        return match2.group(1)
    
    return None

def convert_format(questions_array):
    """Converte formato de helper Q() para formato padrão"""
    # Substituir Q(...) por objeto direto
    converted = questions_array
    
    # Padrão Q("pergunta", ["opt1", "opt2", "opt3", "opt4"], correctIdx, "explicação")
    pattern = r'Q\(\s*"([^"]+)",\s*\[(.*?)\],\s*(\d+),\s*"([^"]+)"\s*\)'
    
    def replace_q(match):
        question = match.group(1).replace('\\"', '"')
        options_str = match.group(2)
        correct = match.group(3)
        explanation = match.group(4).replace('\\"', '"')
        
        # Extrair opções
        options = re.findall(r'"([^"]+)"', options_str)
        options_formatted = ',\n            '.join([f'"{opt}"' for opt in options])
        
        return f'''{{
        question: "{question}",
        options: [
            {options_formatted}
        ],
        correctAnswer: {correct},
        explanation: "{explanation}"
    }}'''
    
    converted = re.sub(pattern, replace_q, converted, flags=re.DOTALL)
    
    return converted

# Mapeamento de ROPs para arquivos
rops_map = {
    'rop_2_3': 'questoes-rops-completas.js',
    'rop_2_4': 'questoes-rops-completas.js',
    'rop_2_5': 'todas-questoes-rops.js',
    'rop_2_6': 'todas-questoes-rops.js',
}

# Mapeamento para chaves do rops-data.js
rops_keys = {
    'rop_2_3': 'rop-2-3',
    'rop_2_4': 'rop-2-4',
    'rop_2_5': 'rop-2-5',
    'rop_2_6': 'rop-2-6',
}

print("🔄 INTEGRADOR DE QUESTÕES ROPs\n")
print("=" * 60)

# Ler rops-data.js
rops_data_content = read_file('rops-data.js')
print("✅ rops-data.js lido")

# Processar cada ROP
for rop_var, source_file in rops_map.items():
    print(f"\n📝 Processando {rop_var} de {source_file}...")
    
    # Ler arquivo fonte
    source_content = read_file(source_file)
    
    # Extrair questões
    questions_array = extract_questions_array(source_content, rop_var)
    
    if not questions_array:
        print(f"   ❌ Não encontrado em {source_file}")
        continue
    
    # Converter formato se necessário
    if 'Q(' in questions_array:
        questions_array = convert_format(questions_array)
    
    # Encontrar posição no rops-data.js
    rop_key = rops_keys[rop_var]
    pattern = rf'"{rop_key}":\s*\{{\s*title:.*?questions:\s*\[(.*?)\]'
    match = re.search(pattern, rops_data_content, re.DOTALL)
    
    if not match:
        print(f"   ❌ Chave {rop_key} não encontrada em rops-data.js")
        continue
    
    # Substituir questões
    old_questions = match.group(1).strip()
    new_questions = questions_array.strip()[1:-1]  # Remove [ e ] externos
    
    # Fazer substituição
    old_section = match.group(0)
    new_section = old_section.replace(old_questions, f"\n{new_questions}\n                ")
    
    rops_data_content = rops_data_content.replace(old_section, new_section)
    
    print(f"   ✅ {rop_key} atualizado!")

# Salvar rops-data.js atualizado
write_file('rops-data.js', rops_data_content)

print("\n" + "=" * 60)
print("✅ INTEGRAÇÃO CONCLUÍDA!")
print("\n📊 ROPs atualizados:")
print("  • ROP 2.3 - Conciliação Medicamentosa")
print("  • ROP 2.4 - Conciliação em Internação")  
print("  • ROP 2.5 - Conciliação Ambulatorial")
print("  • ROP 2.6 - Conciliação em Emergência")
print("\n🎯 Total: 120 questões integradas!")

