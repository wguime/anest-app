# 📊 GUIA DE CONFIGURAÇÃO - GOOGLE SHEETS

## ✅ JÁ ESTÁ INTEGRADO!

A planilha Google Sheets já está conectada ao aplicativo:
- **Planilha:** https://docs.google.com/spreadsheets/d/1RvxlGeQN6xZN6vPp9zhkWHbEbFiK6o3EGJm5eh9iR6s/edit
- **Status:** ✅ Funcionando

---

## 📱 NOVOS ÍCONES NO APP

### **1. Plantões** 🏥
- Cor: Roxo
- Ícone: Hospital
- Aba da planilha: "Plantões"

### **2. Escalas** 📅
- Cor: Azul
- Ícone: Calendário
- Aba da planilha: "Escalas"

### **3. Estágios** 🎓
- Cor: Vermelho
- Ícone: Graduação
- Aba da planilha: "Estágios"

### **4. Férias** 🏖️
- Cor: Verde
- Ícone: Guarda-sol
- Aba da planilha: "Férias"

---

## 🔧 COMO FUNCIONA

### **Automático:**
1. Usuário clica em Plantões/Escalas/Estágios/Férias
2. App carrega dados da planilha via CSV export
3. Mostra em cards organizados
4. Cache para acesso offline

### **Sem API Key:**
- Não precisa configurar Google API
- Usa endpoint público do Google Sheets (CSV export)
- Funciona instantaneamente

---

## 📝 ESTRUTURA DA PLANILHA

### **Primeira Linha = Cabeçalhos**
A primeira linha de cada aba define os nomes dos campos.

**Exemplo:**
```
Nome | Data | Turno | Local
```

### **Demais Linhas = Dados**
Cada linha vira um card no app.

**Exemplo:**
```
Dr. João | 15/12/2024 | Manhã | CTI
```

---

## 🎨 PERSONALIZAR PLANILHA

### **1. Adicionar Nova Aba:**
1. Crie nova aba na planilha
2. Adicione ao código em `google-sheets-integration.js`:
   ```javascript
   const SHEETS_URLS = {
       nova_aba: `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/gviz/tq?tqx=out:csv&sheet=Nova_Aba`
   };
   ```

### **2. Criar Novo Ícone:**
Adicione no `index.html`:
```html
<div class="menu-card" onclick="showNovaAba()">
    <div class="card-icon" style="background: linear-gradient(135deg, #color1 0%, #color2 100%)">
        <i class="fas fa-icon-name"></i>
    </div>
    <h3>Nome</h3>
    <p>Descrição</p>
</div>
```

### **3. Criar Função de Visualização:**
Adicione em `google-sheets-integration.js`:
```javascript
async function showNovaAba() {
    showScreen('custom');
    const contentDiv = document.getElementById('customContent');
    contentDiv.innerHTML = '<div class="loading-message">Carregando...</div>';
    const data = await loadSheetData('nova_aba');
    renderNovaAba(data, contentDiv);
}
```

---

## 🔐 PERMISSÕES DA PLANILHA

### **Pública (Recomendado):**
1. Abra a planilha
2. Compartilhar → "Qualquer pessoa com o link"
3. Nível: "Visualizador"
4. ✅ App pode ler dados

### **Privada:**
Se quiser manter privada:
1. Precisa configurar Google API Key
2. Editar `google-sheets-integration.js`
3. Substituir `API_KEY` pela sua chave

---

## 📊 VISUALIZAÇÃO NO APP

### **Layout:**
- Cards em grade (3 colunas desktop, 1 mobile)
- Cada linha da planilha = 1 card
- Campos organizados verticalmente
- Hover effects

### **Exemplo de Card:**
```
┌─────────────────────────┐
│ Nome: Dr. João Silva    │
│ Data: 15/12/2024        │
│ Turno: Manhã            │
│ Local: CTI              │
└─────────────────────────┘
```

---

## 🔄 ATUALIZAR DADOS

### **Usuário:**
1. Edita a planilha no Google Sheets
2. Salva
3. Recarrega o app
4. ✅ Dados atualizados automaticamente

### **Cache:**
- Dados ficam em cache local
- Se não conseguir carregar, usa cache
- Atualiza no próximo load

---

## 🎯 EXEMPLOS DE USO

### **Plantões:**
```
Médico | Data | Turno | Hospital
Dr. João | 15/12 | Manhã | Santa Casa
Dra. Maria | 16/12 | Tarde | São José
```

### **Escalas:**
```
Colaborador | Setor | Dia | Horário
João Silva | Enfermagem | Segunda | 07-19h
Maria Santos | UTI | Terça | 19-07h
```

### **Estágios:**
```
Residente | Especialidade | Início | Fim | Supervisor
Ana Costa | Anestesia | 01/01 | 31/03 | Dr. Carlos
```

### **Férias:**
```
Nome | Cargo | Início | Fim | Dias
Pedro Lima | Médico | 20/01 | 03/02 | 15
```

---

## ⚠️ IMPORTANTE

### **Primeira Aba "Mensagens":**
- ✅ **Ignorada automaticamente**
- Código já configurado para pular

### **Nome das Abas:**
- Deve ser exatamente: Escalas, Estágios, Férias, Plantões
- Case-sensitive (diferencia maiúsculas)
- Sem acentos no código (usa "Estágios" na planilha, "estagios" no código)

### **Formato CSV:**
- Google Sheets gera automaticamente
- Suporta vírgulas, aspas, quebras de linha
- Parser robusto já implementado

---

## 🐛 TROUBLESHOOTING

### **"Erro ao carregar dados":**
1. Verifique se planilha está pública
2. Confirme nome das abas
3. Veja console do navegador (F12)

### **"Nenhum dado disponível":**
1. Primeira linha deve ter cabeçalhos
2. Precisa ter pelo menos 2 linhas (header + dados)
3. Verifique se aba tem nome correto

### **Dados não atualizam:**
1. Limpe cache do navegador
2. Recarregue (Ctrl+Shift+R)
3. Verifique se salvou na planilha

---

## 📚 ARQUIVOS CRIADOS

### **`google-sheets-integration.js`** (450 linhas)
- Funções de carregamento
- Parse CSV
- Renderização de cards
- Cache system
- 4 funções show (Plantões, Escalas, Estágios, Férias)

### **`google-sheets-styles.css`** (150 linhas)
- Estilos dos cards
- Layout responsivo
- Dark mode
- Loading states
- Empty states

---

## 🎨 CUSTOMIZAÇÃO

### **Cores dos Ícones:**
Edite em `index.html`:
```css
background: linear-gradient(135deg, #cor1 0%, #cor2 100%)
```

**Cores disponíveis:**
- Roxo: `#8e44ad, #9b59b6`
- Azul: `#3498db, #2980b9`
- Vermelho: `#e74c3c, #c0392b`
- Verde: `#1abc9c, #16a085`

### **Ícones Font Awesome:**
```html
<i class="fas fa-hospital"></i>      <!-- Hospital -->
<i class="fas fa-calendar-alt"></i>  <!-- Calendário -->
<i class="fas fa-user-graduate"></i> <!-- Graduação -->
<i class="fas fa-umbrella-beach"></i><!-- Praia -->
```

Mais ícones: https://fontawesome.com/icons

---

## ✅ TUDO PRONTO!

O sistema está **100% funcional**. Basta:
1. ✅ Manter planilha pública
2. ✅ Editar dados quando necessário
3. ✅ Usuários acessam pelo app
4. ✅ Atualização automática

**Planilha:** https://docs.google.com/spreadsheets/d/1RvxlGeQN6xZN6vPp9zhkWHbEbFiK6o3EGJm5eh9iR6s/edit

---

**Dúvidas?** Consulte este guia ou a documentação em `SISTEMA_COMPLETO_IMPLEMENTADO.md`


