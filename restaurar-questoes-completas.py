#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Restaura questões completas de forma otimizada
"""

import re

def restore_complete_questions():
    print("🔄 RESTAURANDO QUESTÕES COMPLETAS...")
    print("=" * 70)
    
    # Ler arquivo original grande
    with open('rops-data.js', 'r', encoding='utf-8') as f:
        original_content = f.read()
    
    # Ler arquivo simplificado
    with open('rops-data-simple.js', 'r', encoding='utf-8') as f:
        simple_content = f.read()
    
    # Extrair questões de ROPs específicas do arquivo original
    rops_to_restore = [
        'rop-1-1', 'rop-1-2', 'rop-1-3', 'rop-1-4',
        'rop-2-1', 'rop-2-2', 'rop-2-3', 'rop-2-4', 'rop-2-5', 'rop-2-6', 'rop-2-7', 'rop-2-8',
        'rop-3-1'
    ]
    
    restored_content = simple_content
    
    for rop in rops_to_restore:
        print(f"📝 Restaurando {rop}...")
        
        # Encontrar no arquivo original
        pattern = rf'"{rop}":\s*\{{(.*?)\s*\}}'
        match = re.search(pattern, original_content, re.DOTALL)
        
        if match:
            rop_content = match.group(1)
            
            # Substituir no arquivo simplificado
            simple_pattern = rf'"{rop}":\s*\{{[^}}]*\}}'
            if re.search(simple_pattern, restored_content, re.DOTALL):
                restored_content = re.sub(
                    simple_pattern,
                    f'"{rop}": {{{rop_content}}}',
                    restored_content,
                    flags=re.DOTALL
                )
                print(f"   ✅ {rop} restaurada")
            else:
                print(f"   ❌ {rop} não encontrada no arquivo simples")
        else:
            print(f"   ❌ {rop} não encontrada no arquivo original")
    
    # Salvar arquivo restaurado
    with open('rops-data-restored.js', 'w', encoding='utf-8') as f:
        f.write(restored_content)
    
    # Verificar tamanho
    import os
    size_kb = os.path.getsize('rops-data-restored.js') / 1024
    
    print("\n" + "=" * 70)
    print("✅ QUESTÕES RESTAURADAS!")
    print(f"📊 Tamanho: {size_kb:.1f}KB")
    print("📄 Arquivo: rops-data-restored.js")
    
    if size_kb < 500:  # Menos de 500KB
        print("✅ Tamanho aceitável para carregamento!")
    else:
        print("⚠️ Arquivo ainda grande, mas melhor que 6.8MB")

if __name__ == "__main__":
    restore_complete_questions()
