#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Integra 570 questões ROPs 3.2-6.5 no rops-data.js
"""

import re

def extract_rop_questions(content, rop_var):
    """Extrai questões de um ROP específico"""
    pattern = rf'const {rop_var} = (.*?)\);'
    match = re.search(pattern, content, re.DOTALL)
    
    if not match:
        return None
    
    questions_code = match.group(1) + ')'
    
    # Executar código Python para gerar questões
    # Substituir Q() por dicionário Python
    code = questions_code.replace('Q(', 'create_q(')
    
    # Função helper
    questions = []
    def create_q(q, opts, correct, expl):
        questions.append({
            'question': q,
            'options': opts,
            'correctAnswer': correct,
            'explanation': expl
        })
    
    # Avaliar código
    try:
        exec(code, {'create_q': create_q, 'Array': lambda n: {'fill': lambda: ArrayHelper(n)}})
    except:
        # Se falhar, criar manualmente
        pass
    
    return questions

class ArrayHelper:
    def __init__(self, n):
        self.n = n
    
    def fill(self):
        return self
    
    def map(self, func):
        return [func(None, i) for i in range(self.n)]

print("🔄 INTEGRANDO 570 QUESTÕES ROPs 3.2-6.5\n")
print("=" * 70)

# Ler arquivo 510-questoes-geradas.js
with open('510-questoes-geradas.js', 'r', encoding='utf-8') as f:
    questoes_content = f.read()

# Mapeamento de ROPs
rops_to_integrate = {
    '3-2': ('Eletrólitos Concentrados', 'rop_3_2'),
    '3-3': ('Segurança no Uso da Heparina', 'rop_3_3'),
    '3-4': ('Medicamentos de Alta Vigilância (MAV)', 'rop_3_4'),
    '3-5': ('Segurança das Bombas de Infusão', 'rop_3_5'),
    '3-6': ('Segurança no Uso de Narcóticos (Opioides)', 'rop_3_6'),
    '4-1': ('Programa de Manutenção Preventiva', 'rop_4_1'),
    '4-2': ('Segurança do Paciente: Capacitação e Treinamento', 'rop_4_2'),
    '4-3': ('Prevenção de Violência no Local de Trabalho', 'rop_4_3'),
    '4-4': ('Fluxo de Clientes', 'rop_4_4'),
    '4-5': ('Plano de Segurança do Paciente', 'rop_4_5'),
    '5-1': ('Aderência às Práticas de Higiene das Mãos', 'rop_5_1'),
    '5-2': ('Higiene das Mãos: Capacitação e Treinamento', 'rop_5_2'),
    '5-3': ('Taxas de Infecção', 'rop_5_3'),
    '5-4': ('Reprocessamento', 'rop_5_4'),
    '6-1': ('Prevenção de Quedas e Redução de Lesões (Internação)', 'rop_6_1'),
    '6-2': ('Prevenção de Úlceras por Pressão', 'rop_6_2'),
    '6-3': ('Prevenção de Suicídio', 'rop_6_3'),
    '6-4': ('Profilaxia para Tromboembolia Venosa (TEV)', 'rop_6_4'),
    '6-5': ('Tratamento da Pele e Feridas', 'rop_6_5'),
}

# Ler rops-data.js
with open('rops-data.js', 'r', encoding='utf-8') as f:
    rops_data = f.read()

# Extrair seção de cada ROP e adicionar ao rops-data.js
total_integrated = 0

for rop_key, (title, rop_var) in rops_to_integrate.items():
    print(f"📝 Processando ROP {rop_key} - {title}...")
    
    # Encontrar a seção no 510-questoes-geradas.js
    pattern = rf'const {rop_var} = (Array\(30\).*?\);)'
    match = re.search(pattern, questoes_content, re.DOTALL)
    
    if not match:
        print(f"   ❌ Não encontrado em 510-questoes-geradas.js")
        continue
    
    array_code = match.group(1)
    
    # Converter para formato JS do rops-data.js
    # Manter o código como está (é válido JavaScript)
    questions_js = array_code
    
    # Procurar ROP no rops-data.js
    rop_pattern = rf'"rop-{rop_key}":\s*\{{\s*title:.*?questions:\s*\[(.*?)\]'
    rop_match = re.search(rop_pattern, rops_data, re.DOTALL)
    
    if rop_match:
        # Já existe, substituir questões
        old_questions = rop_match.group(1).strip()
        
        # Criar nova seção
        new_questions = f"\n                    ...{array_code}\n                "
        
        # Substituir
        old_section = rop_match.group(0)
        new_section = old_section.replace(old_questions, new_questions)
        
        rops_data = rops_data.replace(old_section, new_section)
        
        print(f"   ✅ 30 questões integradas")
        total_integrated += 30
    else:
        print(f"   ⚠️  ROP {rop_key} não existe em rops-data.js - criar seção")

# Salvar rops-data.js
with open('rops-data.js', 'w', encoding='utf-8') as f:
    f.write(rops_data)

print("\n" + "=" * 70)
print(f"✅ INTEGRAÇÃO CONCLUÍDA!")
print(f"🎯 Total: {total_integrated} questões integradas")
print("=" * 70)


