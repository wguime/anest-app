-- ==================== SUPABASE - RESIDÊNCIA MÉDICA ====================
-- Execute este script no SQL Editor do Supabase
-- Projeto: Residência Anest

-- ==================== TABELA DE AULAS ====================
CREATE TABLE IF NOT EXISTS aulas (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    titulo TEXT NOT NULL,
    descricao TEXT,
    data DATE NOT NULL,
    horario TIME,
    professor TEXT,
    tipo TEXT,
    local TEXT,
    link TEXT,
    criado_por UUID NOT NULL,
    criado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    atualizado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para melhor performance
CREATE INDEX idx_aulas_data ON aulas(data);
CREATE INDEX idx_aulas_criado_por ON aulas(criado_por);

-- RLS (Row Level Security)
ALTER TABLE aulas ENABLE ROW LEVEL SECURITY;

-- Política: Todos podem ler
CREATE POLICY "Todos podem ler aulas" 
ON aulas FOR SELECT 
USING (true);

-- Política: Apenas autenticados podem inserir
CREATE POLICY "Autenticados podem criar aulas" 
ON aulas FOR INSERT 
WITH CHECK (auth.role() = 'authenticated');

-- Política: Apenas o criador pode atualizar
CREATE POLICY "Criador pode atualizar aula" 
ON aulas FOR UPDATE 
USING (auth.uid() = criado_por);

-- Política: Apenas o criador pode deletar
CREATE POLICY "Criador pode deletar aula" 
ON aulas FOR DELETE 
USING (auth.uid() = criado_por);

-- ==================== TABELA DE ARTIGOS ====================
CREATE TABLE IF NOT EXISTS artigos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    titulo TEXT NOT NULL,
    autores TEXT,
    revista TEXT,
    data_publicacao DATE,
    resumo TEXT,
    categoria TEXT,
    link TEXT,
    arquivo_url TEXT,
    criado_por UUID NOT NULL,
    criado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    atualizado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices
CREATE INDEX idx_artigos_categoria ON artigos(categoria);
CREATE INDEX idx_artigos_data ON artigos(data_publicacao);
CREATE INDEX idx_artigos_criado_por ON artigos(criado_por);

-- RLS
ALTER TABLE artigos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Todos podem ler artigos" 
ON artigos FOR SELECT 
USING (true);

CREATE POLICY "Autenticados podem criar artigos" 
ON artigos FOR INSERT 
WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Criador pode atualizar artigo" 
ON artigos FOR UPDATE 
USING (auth.uid() = criado_por);

CREATE POLICY "Criador pode deletar artigo" 
ON artigos FOR DELETE 
USING (auth.uid() = criado_por);

-- ==================== TABELA DE ESCALAS ====================
CREATE TABLE IF NOT EXISTS escalas (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nome TEXT NOT NULL,
    tipo TEXT, -- 'plantão', 'ambulatório', 'cirurgia', etc
    data_inicio DATE NOT NULL,
    data_fim DATE NOT NULL,
    horario_inicio TIME,
    horario_fim TIME,
    local TEXT,
    responsavel UUID,
    status TEXT DEFAULT 'ativa', -- 'ativa', 'cancelada', 'concluída'
    observacoes TEXT,
    criado_por UUID NOT NULL,
    criado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    atualizado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices
CREATE INDEX idx_escalas_data_inicio ON escalas(data_inicio);
CREATE INDEX idx_escalas_responsavel ON escalas(responsavel);
CREATE INDEX idx_escalas_status ON escalas(status);

-- RLS
ALTER TABLE escalas ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Todos podem ler escalas" 
ON escalas FOR SELECT 
USING (true);

CREATE POLICY "Autenticados podem criar escalas" 
ON escalas FOR INSERT 
WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Responsável pode atualizar escala" 
ON escalas FOR UPDATE 
USING (auth.uid() = responsavel OR auth.uid() = criado_por);

-- ==================== TABELA DE ESTÁGIOS ====================
CREATE TABLE IF NOT EXISTS estagios (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nome TEXT NOT NULL,
    especialidade TEXT,
    instituicao TEXT,
    data_inicio DATE NOT NULL,
    data_fim DATE NOT NULL,
    carga_horaria INTEGER,
    supervisor TEXT,
    objetivos TEXT,
    residente_id UUID NOT NULL,
    status TEXT DEFAULT 'agendado', -- 'agendado', 'em_andamento', 'concluído', 'cancelado'
    avaliacao JSONB,
    criado_por UUID NOT NULL,
    criado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    atualizado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices
CREATE INDEX idx_estagios_residente ON estagios(residente_id);
CREATE INDEX idx_estagios_data_inicio ON estagios(data_inicio);
CREATE INDEX idx_estagios_status ON estagios(status);

-- RLS
ALTER TABLE estagios ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Residente pode ver seus estágios" 
ON estagios FOR SELECT 
USING (auth.uid() = residente_id OR auth.role() = 'authenticated');

CREATE POLICY "Autenticados podem criar estágios" 
ON estagios FOR INSERT 
WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Residente pode atualizar seu estágio" 
ON estagios FOR UPDATE 
USING (auth.uid() = residente_id OR auth.uid() = criado_por);

-- ==================== TABELA DE FÉRIAS ====================
CREATE TABLE IF NOT EXISTS ferias (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    residente_id UUID NOT NULL,
    data_inicio DATE NOT NULL,
    data_fim DATE NOT NULL,
    dias_totais INTEGER NOT NULL,
    motivo TEXT,
    status TEXT DEFAULT 'pendente', -- 'pendente', 'aprovada', 'rejeitada', 'cancelada'
    aprovado_por UUID,
    data_aprovacao TIMESTAMP WITH TIME ZONE,
    observacoes TEXT,
    criado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    atualizado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices
CREATE INDEX idx_ferias_residente ON ferias(residente_id);
CREATE INDEX idx_ferias_status ON ferias(status);
CREATE INDEX idx_ferias_data_inicio ON ferias(data_inicio);

-- RLS
ALTER TABLE ferias ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Residente pode ver suas férias" 
ON ferias FOR SELECT 
USING (auth.uid() = residente_id OR auth.role() = 'authenticated');

CREATE POLICY "Residente pode criar solicitação de férias" 
ON ferias FOR INSERT 
WITH CHECK (auth.uid() = residente_id);

CREATE POLICY "Residente pode atualizar suas férias pendentes" 
ON ferias FOR UPDATE 
USING (auth.uid() = residente_id AND status = 'pendente');

-- ==================== FUNÇÃO PARA ATUALIZAR TIMESTAMP ====================
CREATE OR REPLACE FUNCTION update_atualizado_em()
RETURNS TRIGGER AS $$
BEGIN
    NEW.atualizado_em = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers para atualizar timestamp automaticamente
CREATE TRIGGER update_aulas_timestamp
BEFORE UPDATE ON aulas
FOR EACH ROW
EXECUTE FUNCTION update_atualizado_em();

CREATE TRIGGER update_artigos_timestamp
BEFORE UPDATE ON artigos
FOR EACH ROW
EXECUTE FUNCTION update_atualizado_em();

CREATE TRIGGER update_escalas_timestamp
BEFORE UPDATE ON escalas
FOR EACH ROW
EXECUTE FUNCTION update_atualizado_em();

CREATE TRIGGER update_estagios_timestamp
BEFORE UPDATE ON estagios
FOR EACH ROW
EXECUTE FUNCTION update_atualizado_em();

CREATE TRIGGER update_ferias_timestamp
BEFORE UPDATE ON ferias
FOR EACH ROW
EXECUTE FUNCTION update_atualizado_em();

-- ==================== VIEWS ÚTEIS ====================

-- View de aulas próximas (próximos 30 dias)
CREATE OR REPLACE VIEW aulas_proximas AS
SELECT * FROM aulas
WHERE data >= CURRENT_DATE 
AND data <= CURRENT_DATE + INTERVAL '30 days'
ORDER BY data, horario;

-- View de escalas ativas
CREATE OR REPLACE VIEW escalas_ativas AS
SELECT * FROM escalas
WHERE status = 'ativa'
AND data_fim >= CURRENT_DATE
ORDER BY data_inicio;

-- View de estágios em andamento
CREATE OR REPLACE VIEW estagios_andamento AS
SELECT * FROM estagios
WHERE status = 'em_andamento'
AND data_fim >= CURRENT_DATE
ORDER BY data_fim;

-- View de férias pendentes
CREATE OR REPLACE VIEW ferias_pendentes AS
SELECT * FROM ferias
WHERE status = 'pendente'
ORDER BY criado_em;

-- ==================== DADOS DE EXEMPLO (OPCIONAL) ====================
-- Descomente para inserir dados de teste

/*
-- Exemplo de aula
INSERT INTO aulas (titulo, descricao, data, horario, professor, tipo, local, criado_por)
VALUES (
    'Anatomia Cardiovascular',
    'Estudo detalhado do sistema cardiovascular',
    '2024-03-15',
    '14:00:00',
    'Dr. João Silva',
    'Teórica',
    'Sala 201',
    '00000000-0000-0000-0000-000000000000' -- Substituir por UUID real
);

-- Exemplo de artigo
INSERT INTO artigos (titulo, autores, revista, data_publicacao, resumo, categoria, criado_por)
VALUES (
    'Avanços em Anestesiologia 2024',
    'Silva, J.; Santos, M.',
    'Brazilian Journal of Anesthesiology',
    '2024-01-15',
    'Este artigo revisa os principais avanços em técnicas anestésicas...',
    'Anestesiologia Geral',
    '00000000-0000-0000-0000-000000000000' -- Substituir por UUID real
);
*/

-- ==================== FIM DO SCRIPT ====================
-- Execute este script no Supabase SQL Editor
-- Lembre-se de configurar as credenciais no residencia-config.js

