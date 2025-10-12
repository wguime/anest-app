// ==================== RESIDÊNCIA MÉDICA - CONFIGURAÇÕES ====================
// Configurações de integração para Supabase, Z-API e N8N

// SUPABASE Configuration
const SUPABASE_CONFIG = {
    url: 'https://uxshczgwwgckbcvqgxte.supabase.co',
    anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV4c2hjemd3d2dja2JjdnFneHRlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDkzMjQ0MjAsImV4cCI6MjAyNDkwMDQyMH0.YOUR_ANON_KEY_HERE',
    projectId: 'uxshczgwwgckbcvqgxte'
};

// Z-API Configuration (WhatsApp)
const ZAPI_CONFIG = {
    instance: 'YOUR_INSTANCE_ID',
    token: 'YOUR_ZAPI_TOKEN',
    baseUrl: 'https://api.z-api.io',
    phone: '5549999999999' // Número de telefone base para notificações
};

// N8N Configuration (Automação)
const N8N_CONFIG = {
    webhookUrl: 'https://n8n.anest-residencia.com/webhook',
    workflowIds: {
        novaAula: 'workflow-nova-aula',
        novoArtigo: 'workflow-novo-artigo',
        escalaAtualizada: 'workflow-escala-atualizada',
        lembreteEstagio: 'workflow-lembrete-estagio',
        aprovacaoFerias: 'workflow-aprovacao-ferias'
    }
};

// Supabase Client Initialization
let supabaseClient = null;

function initSupabase() {
    try {
        // Tenta usar a biblioteca do Supabase se disponível
        if (typeof supabase !== 'undefined') {
            supabaseClient = supabase.createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.anonKey);
            console.log('✅ Supabase inicializado com sucesso!');
            return true;
        } else {
            console.warn('⚠️ Biblioteca Supabase não carregada. Usando fallback Firebase.');
            return false;
        }
    } catch (error) {
        console.error('❌ Erro ao inicializar Supabase:', error);
        return false;
    }
}

// Função auxiliar para fazer requisições HTTP
async function makeRequest(url, options = {}) {
    try {
        const response = await fetch(url, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            }
        });
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('Erro na requisição:', error);
        throw error;
    }
}

// ==================== SUPABASE OPERATIONS ====================

async function supabaseSelect(table, filters = {}) {
    try {
        if (supabaseClient) {
            let query = supabaseClient.from(table).select('*');
            
            // Aplica filtros
            Object.entries(filters).forEach(([key, value]) => {
                query = query.eq(key, value);
            });
            
            const { data, error } = await query;
            if (error) throw error;
            return data;
        } else {
            // Fallback para Firebase
            return await firebaseFallbackRead(table, filters);
        }
    } catch (error) {
        console.error(`Erro ao ler ${table}:`, error);
        return [];
    }
}

async function supabaseInsert(table, data) {
    try {
        if (supabaseClient) {
            const { data: result, error } = await supabaseClient
                .from(table)
                .insert([data])
                .select();
            
            if (error) throw error;
            return result[0];
        } else {
            // Fallback para Firebase
            return await firebaseFallbackWrite(table, data);
        }
    } catch (error) {
        console.error(`Erro ao inserir em ${table}:`, error);
        throw error;
    }
}

async function supabaseUpdate(table, id, data) {
    try {
        if (supabaseClient) {
            const { data: result, error } = await supabaseClient
                .from(table)
                .update(data)
                .eq('id', id)
                .select();
            
            if (error) throw error;
            return result[0];
        } else {
            // Fallback para Firebase
            return await firebaseFallbackUpdate(table, id, data);
        }
    } catch (error) {
        console.error(`Erro ao atualizar ${table}:`, error);
        throw error;
    }
}

// ==================== Z-API (WhatsApp) OPERATIONS ====================

async function sendWhatsAppMessage(phone, message) {
    try {
        const url = `${ZAPI_CONFIG.baseUrl}/instances/${ZAPI_CONFIG.instance}/token/${ZAPI_CONFIG.token}/send-text`;
        
        const response = await makeRequest(url, {
            method: 'POST',
            body: JSON.stringify({
                phone: phone,
                message: message
            })
        });
        
        console.log('✅ Mensagem WhatsApp enviada:', response);
        return response;
    } catch (error) {
        console.error('❌ Erro ao enviar WhatsApp:', error);
        // Não falha a aplicação, apenas loga
        return null;
    }
}

async function sendWhatsAppNotification(userId, type, data) {
    try {
        // Busca telefone do usuário
        const userPhone = await getUserPhone(userId);
        if (!userPhone) {
            console.warn('Usuário sem telefone cadastrado');
            return false;
        }
        
        // Monta mensagem baseada no tipo
        let message = '';
        switch (type) {
            case 'nova_aula':
                message = `🎓 *Nova Aula Disponível!*\n\n*${data.title}*\n${data.description}\n\n📅 Data: ${data.date}\n🔗 Acesse o app ANEST para ver!`;
                break;
            case 'novo_artigo':
                message = `📚 *Novo Artigo Publicado!*\n\n*${data.title}*\nPor: ${data.author}\n\n🔗 Leia no app ANEST`;
                break;
            case 'escala_atualizada':
                message = `📋 *Escala Atualizada!*\n\n*${data.periodo}*\nSeu plantão: ${data.horario}\nLocal: ${data.local}\n\n⏰ Não esqueça!`;
                break;
            case 'lembrete_estagio':
                message = `🏥 *Lembrete de Estágio*\n\n*${data.estagio}*\nData: ${data.data}\nHorário: ${data.horario}\n\n📍 Local: ${data.local}`;
                break;
            case 'ferias_aprovadas':
                message = `✅ *Férias Aprovadas!*\n\nPeríodo: ${data.inicio} até ${data.fim}\n\nBoas férias! 🌴`;
                break;
        }
        
        await sendWhatsAppMessage(userPhone, message);
        return true;
    } catch (error) {
        console.error('Erro ao enviar notificação WhatsApp:', error);
        return false;
    }
}

// ==================== N8N AUTOMATION TRIGGERS ====================

async function triggerN8NWorkflow(workflowType, data) {
    try {
        const workflowId = N8N_CONFIG.workflowIds[workflowType];
        if (!workflowId) {
            console.warn(`Workflow ${workflowType} não configurado`);
            return false;
        }
        
        const url = `${N8N_CONFIG.webhookUrl}/${workflowId}`;
        
        const response = await makeRequest(url, {
            method: 'POST',
            body: JSON.stringify({
                trigger: workflowType,
                timestamp: new Date().toISOString(),
                user: currentUser ? currentUser.uid : 'anonymous',
                data: data
            })
        });
        
        console.log('✅ Workflow N8N acionado:', response);
        return response;
    } catch (error) {
        console.error('❌ Erro ao acionar N8N:', error);
        // Não falha a aplicação, apenas loga
        return null;
    }
}

// ==================== FIREBASE FALLBACKS ====================

async function firebaseFallbackRead(collection, filters = {}) {
    try {
        let query = db.collection(`residencia_${collection}`);
        
        Object.entries(filters).forEach(([key, value]) => {
            query = query.where(key, '==', value);
        });
        
        const snapshot = await query.get();
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error('Erro Firebase fallback read:', error);
        return [];
    }
}

async function firebaseFallbackWrite(collection, data) {
    try {
        const docRef = await db.collection(`residencia_${collection}`).add({
            ...data,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            userId: currentUser.uid
        });
        
        return { id: docRef.id, ...data };
    } catch (error) {
        console.error('Erro Firebase fallback write:', error);
        throw error;
    }
}

async function firebaseFallbackUpdate(collection, id, data) {
    try {
        await db.collection(`residencia_${collection}`).doc(id).update({
            ...data,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        
        return { id, ...data };
    } catch (error) {
        console.error('Erro Firebase fallback update:', error);
        throw error;
    }
}

// ==================== HELPER FUNCTIONS ====================

async function getUserPhone(userId) {
    try {
        const userDoc = await db.collection('users').doc(userId).get();
        if (userDoc.exists) {
            return userDoc.data().phone || null;
        }
        return null;
    } catch (error) {
        console.error('Erro ao buscar telefone:', error);
        return null;
    }
}

// Inicializa Supabase quando o script carrega
if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => {
            initSupabase();
        }, 1000);
    });
}

console.log('📱 Módulo Residência Médica carregado!');

