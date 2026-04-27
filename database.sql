-- Banco de dados para Santana Auto mecânica
-- PostgreSQL

CREATE TABLE clientes (
  id BIGSERIAL PRIMARY KEY,
  nome VARCHAR(120) NOT NULL,
  telefone VARCHAR(25) NOT NULL,
  criado_em TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE veiculos (
  id BIGSERIAL PRIMARY KEY,
  cliente_id BIGINT NOT NULL REFERENCES clientes(id) ON DELETE CASCADE,
  placa VARCHAR(10) NOT NULL UNIQUE,
  marca VARCHAR(60) NOT NULL,
  modelo VARCHAR(60) NOT NULL,
  ano SMALLINT,
  criado_em TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE categorias_servico (
  id BIGSERIAL PRIMARY KEY,
  nome VARCHAR(60) NOT NULL UNIQUE
);

CREATE TABLE servicos (
  id BIGSERIAL PRIMARY KEY,
  categoria_id BIGINT NOT NULL REFERENCES categorias_servico(id),
  nome VARCHAR(150) NOT NULL,
  descricao TEXT,
  duracao_min INTEGER NOT NULL,
  preco_min NUMERIC(10,2),
  preco_max NUMERIC(10,2),
  ativo BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE agendamentos (
  id BIGSERIAL PRIMARY KEY,
  cliente_id BIGINT NOT NULL REFERENCES clientes(id),
  veiculo_id BIGINT NOT NULL REFERENCES veiculos(id),
  servico_id BIGINT NOT NULL REFERENCES servicos(id),
  data_agendada DATE NOT NULL,
  horario_agendado TIME NOT NULL,
  descricao_sintoma TEXT,
  status VARCHAR(20) NOT NULL DEFAULT 'agendado',
  origem VARCHAR(20) NOT NULL DEFAULT 'site',
  criado_em TIMESTAMP NOT NULL DEFAULT NOW(),
  CONSTRAINT chk_status_agendamento CHECK (status IN ('agendado', 'confirmado', 'em_analise', 'em_execucao', 'pronto', 'cancelado'))
);

CREATE INDEX idx_agendamentos_data_hora ON agendamentos (data_agendada, horario_agendado);
CREATE INDEX idx_veiculos_cliente ON veiculos (cliente_id);
CREATE INDEX idx_servicos_categoria ON servicos (categoria_id);

INSERT INTO categorias_servico (nome) VALUES
  ('Motor'),
  ('Transmissão'),
  ('Suspensão'),
  ('Freios'),
  ('Rodas e direção'),
  ('Arrefecimento'),
  ('Outros');

-- Exemplo de consulta para agenda diária
-- SELECT a.id, c.nome, v.placa, s.nome AS servico, a.data_agendada, a.horario_agendado, a.status
-- FROM agendamentos a
-- JOIN clientes c ON c.id = a.cliente_id
-- JOIN veiculos v ON v.id = a.veiculo_id
-- JOIN servicos s ON s.id = a.servico_id
-- WHERE a.data_agendada = CURRENT_DATE
-- ORDER BY a.horario_agendado;
