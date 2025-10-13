#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Cria seções ROPs 4.1-6.5 no rops-data.js
"""

import re

# Dados das ROPs faltantes
rops_to_create = {
    'vida-profissional': {
        '4-1': 'ROP 4.1 – Programa de Manutenção Preventiva',
        '4-2': 'ROP 4.2 – Segurança do Paciente: Capacitação e Treinamento',
        '4-3': 'ROP 4.3 – Prevenção de Violência no Local de Trabalho',
        '4-4': 'ROP 4.4 – Fluxo de Clientes',
        '4-5': 'ROP 4.5 – Plano de Segurança do Paciente',
    },
    'prevencao-infeccoes': {
        '5-1': 'ROP 5.1 – Aderência às Práticas de Higiene das Mãos',
        '5-2': 'ROP 5.2 – Higiene das Mãos: Capacitação e Treinamento',
        '5-3': 'ROP 5.3 – Taxas de Infecção',
        '5-4': 'ROP 5.4 – Reprocessamento',
    },
    'avaliacao-riscos': {
        '6-1': 'ROP 6.1 – Prevenção de Quedas e Redução de Lesões (Internação)',
        '6-2': 'ROP 6.2 – Prevenção de Úlceras por Pressão',
        '6-3': 'ROP 6.3 – Prevenção de Suicídio',
        '6-4': 'ROP 6.4 – Profilaxia para Tromboembolia Venosa (TEV)',
        '6-5': 'ROP 6.5 – Tratamento da Pele e Feridas',
    }
}

print("🔄 CRIANDO SEÇÕES ROPs 4.1-6.5\n")
print("=" * 70)

# Ler rops-data.js
with open('rops-data.js', 'r', encoding='utf-8') as f:
    rops_data = f.read()

total_created = 0

for macro_key, rops in rops_to_create.items():
    print(f"\n📁 Macro área: {macro_key}")
    
    # Encontrar a macro área
    pattern = rf'"{macro_key}":\s*\{{\s*title:.*?subdivisoes:\s*\{{(.*?)\s*\}}\s*\}}'
    match = re.search(pattern, rops_data, re.DOTALL)
    
    if not match:
        print(f"   ❌ Macro área {macro_key} não encontrada!")
        continue
    
    subdivisoes_content = match.group(1)
    
    # Criar novas subdivisões
    new_subdivisoes = []
    
    for rop_key, rop_title in rops.items():
        print(f"   ✅ Criando ROP {rop_key}")
        
        rop_section = f'''
            "rop-{rop_key}": {{
                title: "{rop_title}",
                audioFile: null,
                questions: []
            }},'''
        
        new_subdivisoes.append(rop_section)
        total_created += 1
    
    # Inserir no final das subdivisões existentes
    full_match = match.group(0)
    insertion_point = subdivisoes_content.rstrip()
    
    # Adicionar vírgula no último item se necessário
    if insertion_point and not insertion_point.rstrip().endswith(','):
        insertion_point += ','
    
    new_full = full_match.replace(
        subdivisoes_content,
        insertion_point + ''.join(new_subdivisoes) + '\n        '
    )
    
    rops_data = rops_data.replace(full_match, new_full)

# Salvar
with open('rops-data.js', 'w', encoding='utf-8') as f:
    f.write(rops_data)

print("\n" + "=" * 70)
print(f"✅ CRIAÇÃO CONCLUÍDA!")
print(f"🎯 Total: {total_created} ROPs criadas")
print("=" * 70)

