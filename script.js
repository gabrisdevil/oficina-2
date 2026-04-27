const servicos = [
  { categoria: 'Motor', nome: 'Troca de óleo do motor', tempo: '40 min', preco: 'R$ 120 - R$ 220' },
  { categoria: 'Motor', nome: 'Troca de filtro de óleo', tempo: '20 min', preco: 'R$ 40 - R$ 80' },
  { categoria: 'Motor', nome: 'Troca de filtro de ar', tempo: '20 min', preco: 'R$ 50 - R$ 120' },
  { categoria: 'Motor', nome: 'Troca de filtro de combustível', tempo: '30 min', preco: 'R$ 80 - R$ 180' },
  { categoria: 'Motor', nome: 'Troca de velas', tempo: '45 min', preco: 'R$ 120 - R$ 280' },
  { categoria: 'Motor', nome: 'Limpeza de TBI', tempo: '1h', preco: 'R$ 160 - R$ 320' },
  { categoria: 'Motor', nome: 'Troca de juntas', tempo: '2h', preco: 'R$ 250 - R$ 650' },
  { categoria: 'Motor', nome: 'Retífica parcial', tempo: '1 a 2 dias', preco: 'R$ 1.200 - R$ 3.000' },
  { categoria: 'Transmissão', nome: 'Troca de embreagem', tempo: '4h', preco: 'R$ 900 - R$ 2.400' },
  { categoria: 'Transmissão', nome: 'Troca de disco, platô e rolamento', tempo: '4h', preco: 'R$ 1.000 - R$ 2.700' },
  { categoria: 'Transmissão', nome: 'Troca de óleo da caixa manual', tempo: '1h', preco: 'R$ 180 - R$ 380' },
  { categoria: 'Transmissão', nome: 'Revisão de caixa de marcha', tempo: '1 a 3 dias', preco: 'R$ 1.500 - R$ 4.500' },
  { categoria: 'Suspensão', nome: 'Troca de amortecedores', tempo: '2h', preco: 'R$ 500 - R$ 1.600' },
  { categoria: 'Suspensão', nome: 'Troca de molas', tempo: '2h', preco: 'R$ 400 - R$ 1.200' },
  { categoria: 'Suspensão', nome: 'Troca de bandejas', tempo: '2h', preco: 'R$ 450 - R$ 1.300' },
  { categoria: 'Suspensão', nome: 'Troca de pivôs', tempo: '1h30', preco: 'R$ 280 - R$ 780' },
  { categoria: 'Suspensão', nome: 'Troca de buchas de suspensão', tempo: '2h', preco: 'R$ 320 - R$ 900' },
  { categoria: 'Suspensão', nome: 'Troca de bieletas', tempo: '1h', preco: 'R$ 180 - R$ 520' },
  { categoria: 'Freios', nome: 'Troca de pastilhas de freio', tempo: '1h', preco: 'R$ 220 - R$ 680' },
  { categoria: 'Freios', nome: 'Troca de lonas de freio', tempo: '1h30', preco: 'R$ 250 - R$ 720' },
  { categoria: 'Freios', nome: 'Troca de discos de freio', tempo: '1h30', preco: 'R$ 360 - R$ 1.200' },
  { categoria: 'Freios', nome: 'Troca de cilindro de roda', tempo: '2h', preco: 'R$ 300 - R$ 900' },
  { categoria: 'Freios', nome: 'Troca de fluido de freio', tempo: '45 min', preco: 'R$ 120 - R$ 250' },
  { categoria: 'Freios', nome: 'Sangria do sistema', tempo: '45 min', preco: 'R$ 100 - R$ 220' },
  { categoria: 'Rodas e direção', nome: 'Alinhamento', tempo: '40 min', preco: 'R$ 90 - R$ 180' },
  { categoria: 'Rodas e direção', nome: 'Balanceamento', tempo: '40 min', preco: 'R$ 80 - R$ 160' },
  { categoria: 'Rodas e direção', nome: 'Troca de pneus', tempo: '1h', preco: 'R$ 80 - R$ 220 (mão de obra)' },
  { categoria: 'Rodas e direção', nome: 'Rodízio de pneus', tempo: '30 min', preco: 'R$ 60 - R$ 120' },
  { categoria: 'Rodas e direção', nome: 'Troca de terminais de direção', tempo: '1h30', preco: 'R$ 250 - R$ 700' },
  { categoria: 'Rodas e direção', nome: 'Troca de caixa de direção', tempo: '4h', preco: 'R$ 1.000 - R$ 3.200' },
  { categoria: 'Arrefecimento', nome: 'Troca de radiador', tempo: '2h', preco: 'R$ 500 - R$ 1.600' },
  { categoria: 'Arrefecimento', nome: 'Troca de mangueiras', tempo: '1h', preco: 'R$ 180 - R$ 520' },
  { categoria: 'Arrefecimento', nome: 'Troca de bomba d’água', tempo: '3h', preco: 'R$ 600 - R$ 1.700' },
  { categoria: 'Arrefecimento', nome: 'Troca de válvula termostática', tempo: '1h30', preco: 'R$ 250 - R$ 700' },
  { categoria: 'Arrefecimento', nome: 'Limpeza do sistema de arrefecimento', tempo: '1h30', preco: 'R$ 200 - R$ 550' },
  { categoria: 'Outros', nome: 'Troca de correia dentada', tempo: '3h', preco: 'R$ 600 - R$ 1.900' },
  { categoria: 'Outros', nome: 'Troca de correia auxiliar', tempo: '1h', preco: 'R$ 180 - R$ 500' },
  { categoria: 'Outros', nome: 'Troca de tensionadores', tempo: '2h', preco: 'R$ 320 - R$ 950' },
  { categoria: 'Outros', nome: 'Troca de coxins do motor', tempo: '2h', preco: 'R$ 400 - R$ 1.300' },
  { categoria: 'Outros', nome: 'Aperto geral e revisão preventiva', tempo: '2h', preco: 'R$ 250 - R$ 700' }
];

const serviceGrid = document.getElementById('service-grid');
const selectServico = document.getElementById('servico-select');

servicos.forEach((servico) => {
  const card = document.createElement('article');
  card.className = 'card';
  card.innerHTML = `
    <h3>${servico.categoria} — ${servico.nome}</h3>
    <p>Descrição: serviço mecânico executado por equipe especializada.</p>
    <p><strong>Tempo médio:</strong> ${servico.tempo}</p>
    <p><strong>Faixa de preço:</strong> ${servico.preco}</p>
  `;
  serviceGrid.appendChild(card);

  const option = document.createElement('option');
  option.value = servico.nome;
  option.textContent = `${servico.categoria} - ${servico.nome}`;
  selectServico.appendChild(option);
});

const form = document.getElementById('booking-form');
const feedback = document.getElementById('booking-feedback');
const whatsappLink = document.getElementById('whatsapp-link');

document.getElementById('year').textContent = new Date().getFullYear();

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const data = new FormData(form);
  const payload = Object.fromEntries(data.entries());

  localStorage.setItem('ultimo_agendamento', JSON.stringify(payload));

  const text = `Olá, Santana Auto mecânica! Quero confirmar meu agendamento:%0A
Nome: ${payload.nome}%0A
Telefone: ${payload.telefone}%0A
Placa: ${payload.placa}%0A
Veículo: ${payload.veiculo}%0A
Serviço: ${payload.servico}%0A
Data: ${payload.data} às ${payload.hora}%0A
Descrição: ${payload.descricao || 'Sem observações'}`;

  whatsappLink.href = `https://wa.me/5500000000000?text=${text}`;
  feedback.textContent = 'Agendamento salvo! Clique em “Falar no WhatsApp” para finalizar a confirmação.';
  form.reset();
});
