# 🚀 INTEGRAÇÃO RESIDÊNCIA MÉDICA - GUIA COMPLETO

## 📋 ÍNDICE
1. [Visão Geral](#visão-geral)
2. [Configuração Supabase](#configuração-supabase)
3. [Configuração Z-API (WhatsApp)](#configuração-z-api)
4. [Configuração N8N](#configuração-n8n)
5. [Testando as Integrações](#testando-as-integrações)
6. [Troubleshooting](#troubleshooting)

---

## 🎯 VISÃO GERAL

### Funcionalidades Implementadas

O módulo **Residência Médica** integra 3 serviços externos:

| Serviço | Função | Status |
|---------|--------|--------|
| **Supabase** | Banco de dados para aulas, artigos, escalas, estágios e férias | ✅ Implementado |
| **Z-API** | Notificações via WhatsApp | ✅ Implementado |
| **N8N** | Automações e workflows | ✅ Implementado |

### Estrutura de Arquivos

```
Qmentum/
├── residencia-config.js     # Configurações de integração
├── residencia-app.js         # Funcionalidades do app
├── supabase-setup.sql        # Script de criação das tabelas
├── INTEGRACAO_RESIDENCIA.md  # Este arquivo
└── index.html                # Atualizado com novos scripts
```

---

## 🗄️ CONFIGURAÇÃO SUPABASE

### Passo 1: Acessar o Projeto

1. Acesse: https://supabase.com/dashboard
2. Login:
   - Email: `anestresidencia@gmail.com`
   - Senha: `Anest2526#`
3. Selecione o projeto: **Projeto residência**

### Passo 2: Criar as Tabelas

1. No dashboard do Supabase, clique em **SQL Editor**
2. Clique em **New Query**
3. Copie TODO o conteúdo do arquivo `supabase-setup.sql`
4. Cole no editor
5. Clique em **Run** (botão verde)
6. ✅ Aguarde: "Success. No rows returned"

### Passo 3: Obter Credenciais

1. No menu lateral, clique em **Project Settings** (ícone engrenagem)
2. Clique em **API**
3. Copie os valores:

**Project URL:**
```
https://uxshczgwwgckbcvqgxte.supabase.co
```

**anon public:**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Passo 4: Configurar no Código

Abra `residencia-config.js` e atualize:

```javascript
const SUPABASE_CONFIG = {
    url: 'https://uxshczgwwgckbcvqgxte.supabase.co',
    anonKey: 'COLE_SUA_ANON_KEY_AQUI',
    projectId: 'uxshczgwwgckbcvqgxte'
};
```

### Passo 5: Habilitar Email Auth (Importante!)

Para integração com Firebase Auth:

1. No Supabase, vá em **Authentication** > **Providers**
2. Habilite **Email**
3. Em **Site URL**, adicione:
   ```
   https://wguime.github.io/anest-app/
   ```
4. Em **Redirect URLs**, adicione:
   ```
   https://wguime.github.io/anest-app/
   ```

### ✅ Testar Supabase

Abra o console do navegador na sua aplicação e digite:

```javascript
// Testar conexão
supabaseClient.from('aulas').select('*').then(console.log);
```

Se retornar `{ data: [], error: null }` → ✅ Funcionando!

---

## 📱 CONFIGURAÇÃO Z-API (WHATSAPP)

### Passo 1: Acessar Z-API

1. Acesse: https://api.z-api.io/
2. Login:
   - Email: `anestresidencia@gmail.com`
   - Senha: `Anest2526#`

### Passo 2: Criar/Conectar Instância

1. No dashboard, clique em **Minhas Instâncias**
2. Se não tiver instância:
   - Clique em **Nova Instância**
   - Siga o tutorial de conexão do WhatsApp (QR Code)
3. Anote:
   - **Instance ID**: `YOUR_INSTANCE_ID`
   - **Token**: `YOUR_TOKEN`

### Passo 3: Configurar no Código

Abra `residencia-config.js` e atualize:

```javascript
const ZAPI_CONFIG = {
    instance: 'SEU_INSTANCE_ID_AQUI',
    token: 'SEU_TOKEN_AQUI',
    baseUrl: 'https://api.z-api.io',
    phone: '5549XXXXXXXXX' // Número base para testes
};
```

### Passo 4: Configurar Webhook (Opcional)

Para receber mensagens no app:

1. No Z-API, vá em **Webhooks**
2. Configure:
   - **URL**: `https://n8n.anest-residencia.com/webhook/whatsapp`
   - **Eventos**: `message-received`

### ✅ Testar Z-API

No console do navegador:

```javascript
// Enviar mensagem de teste
sendWhatsAppMessage('5549999999999', '🧪 Teste de integração ANEST!');
```

Você deve receber a mensagem no WhatsApp!

---

## 🔄 CONFIGURAÇÃO N8N

### Passo 1: Acessar N8N

Você mencionou **Google Cloud** com app **N8N**.

#### Opção A: N8N no Google Cloud Run

1. Acesse: https://console.cloud.google.com/
2. Login com: `anestresidencia@gmail.com`
3. Selecione projeto: **Residência Anest**
4. Procure por **Cloud Run** > **n8n**
5. Copie a **URL do serviço**

#### Opção B: N8N Cloud (Recomendado)

1. Acesse: https://n8n.io/
2. Crie conta gratuita ou use existente
3. Após login, copie a URL base (ex: `https://seu-workspace.app.n8n.cloud`)

### Passo 2: Criar Workflows

#### Workflow 1: Nova Aula

1. No N8N, clique em **New Workflow**
2. Nome: `Nova Aula - Notificação`
3. Adicione nó **Webhook**:
   - Method: `POST`
   - Path: `nova-aula`
4. Adicione nó **Function** para processar dados:
   ```javascript
   return {
     phone: items[0].json.user.phone,
     message: `🎓 Nova Aula: ${items[0].json.data.titulo}`
   };
   ```
5. Adicione nó **HTTP Request** para Z-API:
   - Method: `POST`
   - URL: `https://api.z-api.io/instances/{{$env.ZAPI_INSTANCE}}/token/{{$env.ZAPI_TOKEN}}/send-text`
   - Body: 
     ```json
     {
       "phone": "{{$json.phone}}",
       "message": "{{$json.message}}"
     }
     ```
6. Ative o workflow
7. Copie a URL do webhook

#### Workflow 2: Escala Atualizada

Repita o processo para:
- `escala-atualizada`
- `lembrete-estagio`
- `aprovacao-ferias`

### Passo 3: Configurar no Código

Abra `residencia-config.js` e atualize:

```javascript
const N8N_CONFIG = {
    webhookUrl: 'https://seu-n8n.com/webhook',
    workflowIds: {
        novaAula: 'nova-aula',
        novoArtigo: 'novo-artigo',
        escalaAtualizada: 'escala-atualizada',
        lembreteEstagio: 'lembrete-estagio',
        aprovacaoFerias: 'aprovacao-ferias'
    }
};
```

### ✅ Testar N8N

No console do navegador:

```javascript
// Acionar workflow
triggerN8NWorkflow('novaAula', {
    titulo: 'Teste de Aula',
    data: '2024-03-15'
});
```

Verifique os logs no N8N!

---

## 🧪 TESTANDO AS INTEGRAÇÕES

### Teste Completo End-to-End

1. **Abra o aplicativo**: https://wguime.github.io/anest-app/
2. **Faça login** com sua conta
3. **Vá para Residência Médica** (ícone com chapéu de formatura)
4. **Clique em Aulas** > **Adicionar Aula**
5. Preencha:
   - Título: "Teste de Integração"
   - Data: Amanhã
   - Horário: 14:00
6. **Clique em Salvar**

**O que deve acontecer:**

✅ Aula salva no Supabase  
✅ Webhook N8N acionado  
✅ Mensagem WhatsApp enviada (se configurado)  
✅ Toast de sucesso no app  
✅ Volta para lista de aulas  

### Verificar no Supabase

1. Vá para Supabase > **Table Editor**
2. Selecione tabela `aulas`
3. Deve aparecer sua aula criada!

### Verificar no N8N

1. Vá para N8N > **Executions**
2. Deve aparecer a execução do workflow
3. Clique para ver detalhes

---

## 🛠️ TROUBLESHOOTING

### ❌ Erro: "Supabase não inicializado"

**Problema:** Biblioteca Supabase não carregou

**Solução:**
```html
<!-- Verifique se está no index.html ANTES de app.js -->
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
```

---

### ❌ Erro: "Failed to fetch" no Supabase

**Problema:** CORS ou credenciais incorretas

**Solução:**
1. Verifique as credenciais em `residencia-config.js`
2. No Supabase, vá em **Authentication** > **URL Configuration**
3. Adicione sua URL em **Site URL**

---

### ❌ WhatsApp não envia

**Problema:** Instância Z-API desconectada

**Solução:**
1. Acesse https://api.z-api.io/
2. Vá em **Minhas Instâncias**
3. Verifique status: deve estar **Conectado** (verde)
4. Se não, reconecte escaneando QR Code

---

### ❌ N8N não aciona

**Problema:** Workflow desativado ou URL incorreta

**Solução:**
1. Abra o workflow no N8N
2. Verifique se está **Ativo** (toggle verde)
3. Copie novamente a URL do webhook
4. Atualize em `residencia-config.js`

---

### ❌ Firebase fallback sendo usado

**Problema:** Supabase com problema, está usando Firebase

**Solução:**
- Isso é normal! O sistema tem fallback automático
- Os dados serão salvos no Firebase Firestore
- Para voltar ao Supabase, corrija as credenciais

---

## 📊 MONITORAMENTO

### Ver Logs no Navegador

Abra o console (F12) e você verá:

```
✅ Supabase inicializado com sucesso!
📱 Módulo Residência Médica carregado!
📱 Residência Médica - App carregado!
```

### Ver Dados no Supabase

1. Supabase > **Table Editor**
2. Selecione a tabela
3. Veja todos os registros

### Ver Execuções no N8N

1. N8N > **Executions**
2. Filtre por workflow
3. Veja sucesso/erro

---

## 🎉 PRONTO!

Agora você tem um sistema completo de **Residência Médica** com:

- ✅ **Aulas** com notificações automáticas
- ✅ **Artigos** científicos organizados
- ✅ **Escalas** de plantão
- ✅ **Estágios** e rodízios
- ✅ **Férias** com aprovação
- ✅ **Integrações** funcionando (Supabase + Z-API + N8N)
- ✅ **Notificações** WhatsApp automáticas
- ✅ **Automações** via N8N

---

## 📞 PRÓXIMOS PASSOS

1. **Testar todas as funcionalidades**
2. **Adicionar mais workflows no N8N**
3. **Personalizar mensagens WhatsApp**
4. **Criar relatórios e dashboards**
5. **Adicionar calendário visual**

---

## 🔐 SEGURANÇA

⚠️ **IMPORTANTE:**

1. **Nunca commite credenciais** no GitHub
2. **Use .env em produção**
3. **Ative 2FA** em todos os serviços
4. **Revise permissões** do Supabase RLS
5. **Monitore** uso de APIs

---

**Desenvolvido para ANEST Residência Médica** 🏥

Qualquer dúvida, consulte a documentação oficial:
- Supabase: https://supabase.com/docs
- Z-API: https://developer.z-api.io/
- N8N: https://docs.n8n.io/

