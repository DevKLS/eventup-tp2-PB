// src/data/data.js

// 1. Categorias (Unificadas)
export const categories = [
  'Todos',
  'Feira',
  'Workshop',
  'Mutirão',
  'Esporte',
  'Cultura',
  'Palestra',
  'Educação',
  'Social'
];

// 2. Funcionalidades (Highlights)
export const highlights = [
  {
    id: 1,
    title: 'Gestão Dinâmica',
    description: 'Sistema completo (CRUD) para cadastrar, listar e gerenciar eventos em tempo real.',
    icon: '⚙️'
  },
  {
    id: 2,
    title: 'Localização Inteligente',
    description: 'Integração com API ViaCEP para preenchimento automático de endereços via CEP.',
    icon: '📍'
  },
  {
    id: 3,
    title: 'Experiência SPA',
    description: 'Navegação fluida via React Router, permitindo transições instantâneas entre páginas.',
    icon: '⚡'
  },
  {
    id: 4,
    title: 'Design Mobile-First',
    description: 'Interface responsiva projetada para funcionar perfeitamente em qualquer dispositivo.',
    icon: '📱'
  }
];

// 3. Estatísticas (Unificadas)
export const stats = [
  { id: 1, label: 'Eventos cadastrados', value: '120+', icon: '📊' },
  { id: 2, label: 'Organizadores', value: '45+', icon: '🛡️' },
  { id: 3, label: 'Participantes', value: '900+', icon: '👥' },
  { id: 4, label: 'Categorias', value: '8', icon: '🏷️' }
];

// 4. Lista Completa de Eventos (Sem duplicatas)
export const events = [
  {
    id: 1,
    title: 'Feira Gastronômica Comunitária',
    category: 'Feira',
    date: '2026-04-12',
    location: 'Praça Roosevelt - Centro',
    description: 'Evento com comidas típicas, pequenos empreendedores locais e música ao vivo.',
    image: 'https://images.unsplash.com/photo-1555529771-7888783a18d3?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 2,
    title: 'Aulão de Dança ao Ar Livre',
    category: 'Cultura',
    date: '2026-04-14',
    location: 'Parque Trianon - Av. Paulista',
    description: 'Aula aberta com ritmos variados para promover bem-estar e integração social.',
    image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 3,
    title: 'Mutirão de Limpeza Comunitária',
    category: 'Mutirão',
    date: '2026-04-18',
    location: 'Bixiga - Bela Vista',
    description: 'Ação coletiva para limpeza e cuidado dos espaços públicos do bairro.',
    image: 'https://images.unsplash.com/photo-1533227268428-f9ed0900fb3b?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 4,
    title: 'Campeonato de Futebol de Bairro',
    category: 'Esporte',
    date: '2026-04-20',
    location: 'Quadra da Liberdade',
    description: 'Evento esportivo com times locais para promover lazer e união entre moradores.',
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 5,
    title: 'Oficina de Artes para Crianças',
    category: 'Cultura',
    date: '2026-04-23',
    location: 'Centro Cultural São Paulo (CCSP)',
    description: 'Atividade gratuita com pintura, desenho e expressão artística para crianças.',
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 6,
    title: 'Festival de Talentos da Comunidade',
    category: 'Cultura',
    date: '2026-04-27',
    location: 'Casa de Cultura Vila Mariana',
    description: 'Apresentações de música, dance e arte feitas por moradores da região.',
    image: 'https://images.unsplash.com/photo-1514525253361-bee8d41dfb7a?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 7,
    title: 'Palestra: Educação Financeira',
    category: 'Palestra',
    date: '2026-04-30',
    location: 'Centro Comunitário da Consolação',
    description: 'Aprenda a organizar seu dinheiro, evitar dívidas e melhorar sua qualidade de vida.',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 8,
    title: 'Workshop de Programação',
    category: 'Workshop',
    date: '2026-05-02',
    location: 'Senai Paulista',
    description: 'Introdução prática à programação com foco em lógica e primeiros passos no desenvolvimento web.',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 9,
    title: 'Feira de Empreendedores Locais',
    category: 'Feira',
    date: '2026-05-05',
    location: 'Praça Benedito Calixto',
    description: 'Exposição de produtos artesanais, moda independente e gastronomia local.',
    image: 'https://images.unsplash.com/photo-1473177104440-fee2f377574a?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 10,
    title: 'Corrida de Rua Solidária',
    category: 'Esporte',
    date: '2026-05-08',
    location: 'Parque Ibirapuera',
    description: 'Evento esportivo beneficente com arrecadação de alimentos para instituições sociais.',
    image: 'https://images.unsplash.com/photo-1530549387074-d562293b207d?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 11,
    title: 'Oficina de Fotografia Urbana',
    category: 'Cultura',
    date: '2026-05-10',
    location: 'Centro Histórico de São Paulo',
    description: 'Aprenda técnicas de fotografia explorando paisagens urbanas e arquitetura da cidade.',
    image: 'https://images.unsplash.com/photo-1449156003053-c2d21e149461?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 12,
    title: 'Mutirão de Plantio de Árvores',
    category: 'Mutirão',
    date: '2026-05-12',
    location: 'Parque Villa-Lobos',
    description: 'Ação ambiental para plantio de mudas e conscientização ecológica na comunidade.',
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 13,
    title: 'Palestra: Carreira em Tecnologia',
    category: 'Palestra',
    date: '2026-05-15',
    location: 'Instituto Infnet',
    description: 'Profissionais da área compartilham experiências e dicas para ingressar no mercado de tecnologia.',
    image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 14,
    title: 'Festival de Música Independente',
    category: 'Cultura',
    date: '2026-05-18',
    location: 'Casa Natura Musical',
    description: 'Apresentações ao vivo de bandas independentes e artistas locais.',
    image: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 15,
    title: 'Aula de Yoga ao Ar Livre',
    category: 'Esporte',
    date: '2026-05-20',
    location: 'Parque da Aclimação',
    description: 'Sessão de yoga gratuita para promover saúde física e mental em contato com a natureza.',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800'
  }
];