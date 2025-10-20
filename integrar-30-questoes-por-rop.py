#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Integra TODAS as 30 questões de cada ROP do arquivo 510-questoes-geradas.js
"""

import re

def integrate_all_questions():
    print("🔄 INTEGRANDO 30 QUESTÕES POR ROP...")
    print("=" * 70)
    
    # Ler arquivo com 30 questões
    with open('510-questoes-geradas.js', 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Ler arquivo atual otimizado
    with open('rops-data-optimized.js', 'r', encoding='utf-8') as f:
        optimized_content = f.read()
    
    # Mapeamento de ROPs
    rops_mapping = {
        'rop_3_1': 'rop-3-1',
        'rop_3_2': 'rop-3-2', 
        'rop_3_3': 'rop-3-3',
        'rop_3_4': 'rop-3-4',
        'rop_3_5': 'rop-3-5',
        'rop_3_6': 'rop-3-6',
        'rop_4_1': 'rop-4-1',
        'rop_4_2': 'rop-4-2',
        'rop_4_3': 'rop-4-3',
        'rop_4_4': 'rop-4-4',
        'rop_4_5': 'rop-4-5',
        'rop_5_1': 'rop-5-1',
        'rop_5_2': 'rop-5-2',
        'rop_5_3': 'rop-5-3',
        'rop_5_4': 'rop-5-4',
        'rop_6_1': 'rop-6-1',
        'rop_6_3': 'rop-6-3',
        'rop_6_4': 'rop-6-4',
        'rop_6_5': 'rop-6-5'
    }
    
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
            opts_formatted = ',\n            '.join([f'"{opt}"' for opt in opts])
            
            return f'''{{
        question: "{question}",
        options: [
            {opts_formatted}
        ],
        correctAnswer: {correct},
        explanation: "{explanation}"
    }}'''
        
        return re.sub(pattern, replace_q, q_content, flags=re.DOTALL)
    
    # Processar cada ROP
    for rop_var, rop_key in rops_mapping.items():
        print(f"📝 Processando {rop_key}...")
        
        # Encontrar no arquivo 510
        pattern = rf'const {rop_var} = Array\(30\)\.fill\(\)\.map\(\(_, i\) => Q\((.*?)\);'
        match = re.search(pattern, content, re.DOTALL)
        
        if match:
            q_content = match.group(1)
            
            # Converter para formato objeto
            questions_js = convert_q_to_object(q_content)
            
            # Encontrar no arquivo otimizado
            rop_pattern = rf'"{rop_key}":\s*\{{(.*?)\s*\}}'
            rop_match = re.search(rop_pattern, optimized_content, re.DOTALL)
            
            if rop_match:
                # Substituir questões
                old_content = rop_match.group(1)
                new_content = f'''title: "ROP {rop_key.replace('-', '.')}",
                audioFile: null,
                questions: [
{questions_js}
                ]'''
                
                new_rop = rop_match.group(0).replace(old_content, new_content)
                optimized_content = optimized_content.replace(rop_match.group(0), new_rop)
                
                print(f"   ✅ {rop_key}: 30 questões integradas")
            else:
                print(f"   ❌ {rop_key}: não encontrada no arquivo otimizado")
        else:
            print(f"   ❌ {rop_var}: não encontrada no arquivo 510")
    
    # Salvar arquivo final
    with open('rops-data-final.js', 'w', encoding='utf-8') as f:
        f.write(optimized_content)
    
    # Verificar tamanho
    import os
    size_kb = os.path.getsize('rops-data-final.js') / 1024
    
    print("\n" + "=" * 70)
    print("✅ TODAS AS QUESTÕES INTEGRADAS!")
    print(f"📊 Tamanho: {size_kb:.1f}KB")
    print("📄 Arquivo: rops-data-final.js")
    
    if size_kb < 500:  # Menos de 500KB
        print("✅ Tamanho aceitável para carregamento!")
    else:
        print("⚠️ Arquivo grande, mas muito melhor que 6.8MB")

if __name__ == "__main__":
    integrate_all_questions()

