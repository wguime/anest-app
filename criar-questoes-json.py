#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Converte questões para formato JSON com randomização de respostas
"""

import re
import json
import random

def randomize_options(options, correct_index):
    """Randomiza opções e retorna novo índice correto"""
    # Criar lista de tuplas (opção, é_correta)
    items = [(opt, i == correct_index) for i, opt in enumerate(options)]
    
    # Embaralhar
    random.shuffle(items)
    
    # Encontrar novo índice da resposta correta
    new_correct = next(i for i, (opt, is_correct) in enumerate(items) if is_correct)
    
    # Retornar apenas as opções
    new_options = [opt for opt, _ in items]
    
    return new_options, new_correct

def extract_questions_from_510():
    print("🔄 EXTRAINDO E CONVERTENDO QUESTÕES PARA JSON...")
    print("=" * 70)
    
    # Ler arquivo com questões
    with open('510-questoes-geradas.js', 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Encontrar todas as ROPs
    rops_pattern = r'const (rop_\d+_\d+) = Array\(30\)\.fill\(\)\.map\(\(_, i\) => Q\((.*?)\);'
    rops_matches = re.findall(rops_pattern, content, re.DOTALL)
    
    all_questions = {}
    
    for rop_var, q_template in rops_matches:
        print(f"📝 Processando {rop_var}...")
        
        # Extrair padrão da questão
        pattern = r'`([^`]+)`,\s*\[(.*?)\],\s*(\d+),\s*`([^`]+)`'
        match = re.search(pattern, q_template, re.DOTALL)
        
        if match:
            question_template = match.group(1)
            options_str = match.group(2)
            correct_answer = int(match.group(3))
            explanation_template = match.group(4)
            
            # Extrair opções
            options = re.findall(r'"([^"]+)"', options_str)
            
            # Criar 20 questões (ao invés de 30)
            questions = []
            for i in range(1, 21):  # 20 questões
                # Substituir ${i+1} pelo número
                question = question_template.replace('${i+1}', str(i))
                explanation = explanation_template.replace('${i+1}', str(i))
                
                # Randomizar opções
                randomized_options, new_correct = randomize_options(options, correct_answer)
                
                questions.append({
                    "question": question,
                    "options": randomized_options,
                    "correctAnswer": new_correct,
                    "explanation": explanation
                })
            
            # Converter rop_3_1 para rop-3-1
            rop_key = rop_var.replace('_', '-')
            all_questions[rop_key] = questions
            
            print(f"   ✅ {rop_var}: 20 questões criadas com respostas randomizadas")
        else:
            print(f"   ❌ {rop_var}: padrão não encontrado")
    
    # Salvar em JSON
    with open('rops-questions.json', 'w', encoding='utf-8') as f:
        json.dump(all_questions, f, ensure_ascii=False, indent=2)
    
    # Verificar tamanho
    import os
    size_kb = os.path.getsize('rops-questions.json') / 1024
    
    print("\n" + "=" * 70)
    print("✅ QUESTÕES CONVERTIDAS PARA JSON!")
    print(f"📊 Tamanho: {size_kb:.1f}KB")
    print(f"📊 ROPs com questões: {len(all_questions)}")
    print(f"📊 Total de questões: {sum(len(q) for q in all_questions.values())}")
    print("📄 Arquivo: rops-questions.json")
    print("✅ Respostas RANDOMIZADAS em cada questão!")

if __name__ == "__main__":
    extract_questions_from_510()
