#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Divide rops-data.js em arquivos menores para resolver problema de carregamento
"""

import re

def split_rops_data():
    print("🔄 DIVIDINDO rops-data.js (6.8MB) em arquivos menores...")
    print("=" * 70)
    
    # Ler arquivo original
    with open('rops-data.js', 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Encontrar início e fim do objeto ropsData
    start_pattern = r'const ropsData = \{'
    end_pattern = r'\};'
    
    start_match = re.search(start_pattern, content)
    if not start_match:
        print("❌ Não encontrou início do ropsData")
        return
    
    # Encontrar cada macro área
    macro_areas = [
        ('cultura-seguranca', 'MACRO ÁREA 1 - CULTURA DE SEGURANÇA'),
        ('comunicacao', 'MACRO ÁREA 2 - COMUNICAÇÃO'),
        ('uso-medicamentos', 'MACRO ÁREA 3 - USO DE MEDICAMENTOS'),
        ('vida-profissional', 'MACRO ÁREA 4 - VIDA PROFISSIONAL'),
        ('prevencao-infeccoes', 'MACRO ÁREA 5 - PREVENÇÃO DE INFECÇÕES'),
        ('avaliacao-riscos', 'MACRO ÁREA 6 - AVALIAÇÃO DE RISCOS')
    ]
    
    # Criar arquivo base
    base_content = '''// ROPs - Práticas Organizacionais Obrigatórias
// Arquivo base - carrega dados dinamicamente

const ropsData = {};

// Carregar dados das macro áreas
async function loadROPsData() {
    try {
        // Carregar cada macro área
        const responses = await Promise.all([
            fetch('/anest-app/rops-cultura.js').then(r => r.text()),
            fetch('/anest-app/rops-comunicacao.js').then(r => r.text()),
            fetch('/anest-app/rops-medicamentos.js').then(r => r.text()),
            fetch('/anest-app/rops-vida-profissional.js').then(r => r.text()),
            fetch('/anest-app/rops-infeccoes.js').then(r => r.text()),
            fetch('/anest-app/rops-riscos.js').then(r => r.text())
        ]);
        
        // Executar cada script
        responses.forEach(script => {
            eval(script);
        });
        
        console.log('✅ Dados ROPs carregados:', Object.keys(ropsData));
        
    } catch (error) {
        console.error('❌ Erro ao carregar dados ROPs:', error);
        // Fallback: carregar dados básicos
        loadBasicROPsData();
    }
}

// Dados básicos (fallback)
function loadBasicROPsData() {
    ropsData['cultura-seguranca'] = {
        title: "Cultura de Segurança",
        icon: "fas fa-shield-alt",
        color: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        subdivisoes: {
            "rop-1-1": {
                title: "ROP 1.1 – Responsabilização pela Qualidade",
                audioFile: null,
                questions: []
            }
        }
    };
    console.log('⚠️ Usando dados básicos ROPs');
}

// Carregar automaticamente
loadROPsData();
'''
    
    # Salvar arquivo base
    with open('rops-data-base.js', 'w', encoding='utf-8') as f:
        f.write(base_content)
    
    print("✅ Arquivo base criado: rops-data-base.js")
    print("📊 Tamanho: ~2KB (vs 6.8MB original)")
    
    # Extrair cada macro área
    for i, (key, comment) in enumerate(macro_areas, 1):
        print(f"\n📝 Extraindo macro área {i}: {key}")
        
        # Padrão para encontrar a macro área
        pattern = rf'// ==================== {re.escape(comment)} ====================\s*\n\s*"{key}":\s*\{{(.*?)\s*\}}'
        match = re.search(pattern, content, re.DOTALL)
        
        if match:
            macro_content = match.group(1)
            
            # Criar arquivo da macro área
            file_content = f'''// {comment}
// Arquivo: rops-{key.replace('-', '_')}.js

ropsData['{key}'] = {{{macro_content}
}};

console.log('✅ {comment} carregada');
'''
            
            filename = f'rops-{key.replace("-", "_")}.js'
            with open(filename, 'w', encoding='utf-8') as f:
                f.write(file_content)
            
            file_size = len(file_content.encode('utf-8')) / 1024  # KB
            print(f"   ✅ {filename}: {file_size:.1f}KB")
        else:
            print(f"   ❌ Não encontrada: {key}")
    
    print("\n" + "=" * 70)
    print("✅ DIVISÃO CONCLUÍDA!")
    print("\n📊 RESULTADO:")
    print("• Arquivo original: 6.8MB")
    print("• Arquivo base: ~2KB")
    print("• 6 arquivos de macro áreas: ~1MB cada")
    print("\n🎯 Carregamento será MUITO mais rápido!")

if __name__ == "__main__":
    split_rops_data()

