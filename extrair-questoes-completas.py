#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Extrai TODAS as 30 questões de cada ROP do arquivo original
"""

import re

def extract_all_questions():
    print("🔄 EXTRAINDO TODAS AS QUESTÕES (30 por ROP)...")
    print("=" * 70)
    
    # Ler arquivo original
    with open('rops-data.js', 'r', encoding='utf-8') as f:
        content = f.read()
    
    # ROPs que devem ter 30 questões cada
    rops_with_questions = [
        'rop-1-1', 'rop-1-2', 'rop-1-3', 'rop-1-4',
        'rop-2-1', 'rop-2-2', 'rop-2-3', 'rop-2-4', 'rop-2-5', 'rop-2-6', 'rop-2-7', 'rop-2-8',
        'rop-3-1'
    ]
    
    # Criar arquivo otimizado com todas as questões
    optimized_content = '''// ROPs - Práticas Organizacionais Obrigatórias
// Versão completa com 30 questões por ROP

const ropsData = {
    // ==================== MACRO ÁREA 1 - CULTURA DE SEGURANÇA ====================
    "cultura-seguranca": {
        title: "Cultura de Segurança",
        icon: "fas fa-shield-alt",
        color: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        subdivisoes: {
'''
    
    # Extrair cada ROP
    for rop in rops_with_questions:
        print(f"📝 Extraindo {rop}...")
        
        # Encontrar ROP no arquivo original
        pattern = rf'"{rop}":\s*\{{(.*?)\s*\}}'
        match = re.search(pattern, content, re.DOTALL)
        
        if match:
            rop_content = match.group(1)
            
            # Contar questões
            question_count = len(re.findall(r'question:', rop_content))
            print(f"   ✅ {rop}: {question_count} questões")
            
            # Adicionar ao arquivo otimizado
            if rop.startswith('rop-1-'):
                optimized_content += f'            "{rop}": {{{rop_content}\n            }},\n'
            elif rop.startswith('rop-2-'):
                if rop == 'rop-2-1':
                    optimized_content += '''        }
    },

    // ==================== MACRO ÁREA 2 - COMUNICAÇÃO ====================
    "comunicacao": {
        title: "Comunicação",
        icon: "fas fa-comments",
        color: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
        subdivisoes: {
'''
                optimized_content += f'            "{rop}": {{{rop_content}\n            }},\n'
            elif rop.startswith('rop-3-'):
                if rop == 'rop-3-1':
                    optimized_content += '''        }
    },

    // ==================== MACRO ÁREA 3 - USO DE MEDICAMENTOS ====================
    "uso-medicamentos": {
        title: "Uso de Medicamentos",
        icon: "fas fa-pills",
        color: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
        subdivisoes: {
'''
                optimized_content += f'            "{rop}": {{{rop_content}\n            }},\n'
        else:
            print(f"   ❌ {rop}: não encontrada no arquivo original")
    
    # Finalizar arquivo
    optimized_content += '''        }
    }
};

console.log('✅ ROPs carregadas (versão completa):', Object.keys(ropsData));
'''
    
    # Salvar arquivo
    with open('rops-data-complete.js', 'w', encoding='utf-8') as f:
        f.write(optimized_content)
    
    # Verificar tamanho
    import os
    size_kb = os.path.getsize('rops-data-complete.js') / 1024
    
    print("\n" + "=" * 70)
    print("✅ QUESTÕES COMPLETAS EXTRAÍDAS!")
    print(f"📊 Tamanho: {size_kb:.1f}KB")
    print("📄 Arquivo: rops-data-complete.js")
    
    if size_kb < 1000:  # Menos de 1MB
        print("✅ Tamanho aceitável para carregamento!")
    else:
        print("⚠️ Arquivo grande, mas muito melhor que 6.8MB")

if __name__ == "__main__":
    extract_all_questions()

