// client/src/data/questions.js
export const questions = [
    {
      id: 'bairro',
      title: 'Qual bairro da sua residência?',
      type: 'select',
      options: [
        'Alemanha',
        'Alto da Esperança',
        'Angelim',
        'Anil',
        'Anjo da Guarda',
        'Apeadouro',
        'Apicum',
        'Araçagy',
        'Areinha',
        'Vila Bacanga',
        'Bairro de Fatima',
        'Bequimão',
        'Boa Vista',
        'Bom Milagre',
        'Calhau',
        'Camboa',
        'Canto da Fabril',
        'Centro',
        'Cidade Olímpica',
        'Cidade Operária',
        'Cohab',
        'Cohab (variante 1)',
        'Cohafuma',
        'Cohama',
        'Cohatrac 1',
        'Cohatrac 2',
        'Cohatrac 3',
        'Cohatrac 4',
        'Cohatrac 5',
        'Coheb Filipinho',
        'Coheb Filipinho (variante 1)',
        'Coroadinho',
        'Coroadinho (variante 1)',
        'Coroado',
        'Diamante',
        'Divineia',
        'Estiva',
        'Filipinho',
        'Forquilha',
        'Fumacê',
        'Fumacê (variante 1)',
        'Fumacê (variante 2)',
        'Gancharia',
        'Gapara',
        'Geniparana',
        'Ilha da Paz',
        'Ipase',
        'Ipem',
        'Ipem Turu',
        'Itaqui Bacanga',
        'Ivar Saldanha',
        'Janaina',
        'Jardim América',
        'João de Deus',
        'João de Deus (variante 1)',
        'João Paulo',
        'Jota Lima',
        'Kiola',
        'Liberdade',
        'Madre Deus',
        'Maioba',
        'Maiobão',
        'Maiobão (variante 1)',
        'Maiobinha',
        'Maracanã',
        'Maracanã (variante 1)',
        'Maranhão Novo',
        'Monte Castelo',
        'Olho d\'Água',
        'Outeiro da Cruz',
        'Panaquatira',
        'Pão de Açúcar',
        'Pão de Açúcar (variante 1)',
        'Paranã',
        'Parque Amazonas',
        'Parque Timbiras',
        'Parque Vitória',
        'Pau Deitado',
        'Pedrinhas',
        'Pedrinhas (variante 1)',
        'Ponta d\'Areia',
        'Ponta d\'Areia (variante 1)',
        'Quebra Pote',
        'Radional',
        'Recanto dos Vinhais',
        'Recanto Fialho',
        'Renascença',
        'Renascença (variante 1)',
        'Residencial Paraíso',
        'Residencial Pirâmide',
        'Rio Grande',
        'Sacavém',
        'Santa Barbara',
        'Santa Clara',
        'Santa Cruz',
        'Santo Antônio',
        'Santo Antônio (variante 1)',
        'São Cristovão',
        'São Francisco',
        'São Raimundo',
        'Sá viana',
        'Sitio Grande',
        'Sol e Mar',
        'Upaon Açu',
        'Vassoural',
        'Vera Cruz',
        'Vicente Fialho',
        'Vila Brasil',
        'Vila Cafeteira',
        'Vila Cascavel',
        'Vila Embratel',
        'Vila Esperança',
        'Vila Flamengo',
        'Vila Isabel',
        'Vila Lobão',
        'Vila Luizão',
        'Vila Maranhão',
        'Vila Nova',
        'Vila Operária',
        'Vila Palmeira',
        'Vila Passos',
        'Vila Passos (variante 1)',
        'Vila Riod',
        'Vila Riod (variante 1)',
        'Vila Sarney',
        'Vila Vitória',
        'Vinhais'
      ],
      required: true
    },
    {
      id: 'estudando',
      title: '1.1 Você está atualmente estudando?',
      type: 'radio',
      options: ['Sim', 'Não'],
      required: true
    },
    {
      id: 'motivo_interrupcao',
      title: '1.2 Se não está estudando, qual motivo de interrupção dos estudos?',
      type: 'checkbox',
      options: [
        'Necessidade de trabalhar',
        'Gravidez/Maternidade',
        'Violência doméstica',
        'Falta de recursos financeiros',
        'Falta de apoio',
        'Outro'
      ],
      conditional: {
        field: 'estudando',
        value: 'Não'
      }
    },
    {
      id: 'tempo_interrupcao',
      title: '1.3 Se você já interrompeu os estudos no passado, foi por quanto tempo?',
      type: 'radio',
      options: [
        'Menos de 1 ano',
        '1 a 3 anos',
        '3 a 5 anos',
        'Mais de 5 anos',
        'Nunca interrompi'
      ]
    },
    {
      id: 'dificuldades_educacao',
      title: '1.4 Quais são as maiores dificuldades que você enfrenta para continuar sua educação?',
      type: 'checkbox',
      options: [
        'Falta de tempo devido ao trabalho',
        'Falta de apoio para cuidar dos filhos',
        'Falta de recursos financeiros',
        'Distância da instituição educacional',
        'Medo ou insegurança',
        'Outro'
      ]
    },
    {
      id: 'educacao_distancia',
      title: '1.5 Você tem acesso a educação a distância?',
      type: 'radio',
      options: ['Sim', 'Não']
    },
    {
      id: 'qualidade_ead',
      title: '1.6 Se sim, como avalia a qualidade da educação a distância que você acessa?',
      type: 'radio',
      options: ['Muito boa', 'Boa', 'Regular', 'Ruim', 'Muito ruim'],
      conditional: {
        field: 'educacao_distancia',
        value: 'Sim'
      }
    },
    {
      id: 'plano_saude',
      title: '2.1 Você tem algum convênio ou plano de saúde?',
      type: 'radio',
      options: ['Sim', 'Não']
    },
    {
      id: 'acesso_hospital_publico',
      title: '2.2 Você já teve acesso a posto/centro de saúde/hospital público?',
      type: 'radio',
      options: ['Sim', 'Não']
    },
    {
      id: 'atendimento_adequado',
      title: '2.3 Você considera adequado o atendimento que recebeu na rede pública de saúde?',
      type: 'radio',
      options: ['Sim', 'Não'],
      conditional: {
        field: 'acesso_hospital_publico',
        value: 'Sim'
      }
    },
    {
      id: 'regiao_precaria',
      title: '2.4 Você considera a região que você mora precária em termos de saúde pública?',
      type: 'radio',
      options: ['Sim', 'Não']
    },
    {
      id: 'sofreu_violencia',
      title: '3.1 Você já sofreu algum tipo de violência?',
      type: 'radio',
      options: ['Sim', 'Não']
    },
    {
      id: 'tipo_violencia',
      title: '3.2 Se sim, qual(is) tipo(s) de violência você já sofreu?',
      type: 'checkbox',
      options: [
        'Violência física (ex: agressão, espancamento)',
        'Violência psicológica/emocional (ex: ameaças, humilhações, isolamento)',
        'Violência sexual (ex: estupro, assédio sexual)',
        'Violência patrimonial (ex: destruição de objetos, retenção de bens)',
        'Violência moral (ex: calúnia, difamação)',
        'Outro'
      ],
      conditional: {
        field: 'sofreu_violencia',
        value: 'Sim'
      }
    },
    {
      id: 'autor_violencia',
      title: '3.3 Quem foi o autor da violência?',
      type: 'checkbox',
      options: [
        'Marido/Companheiro',
        'Ex-marido/Ex-companheiro',
        'Parente',
        'Amigo/Conhecido',
        'Desconhecido',
        'Outro'
      ],
      conditional: {
        field: 'sofreu_violencia',
        value: 'Sim'
      }
    },
    {
      id: 'frequencia_violencia',
      title: '3.4 Com que frequência você sofre ou sofreu violência?',
      type: 'radio',
      options: [
        'Uma única vez',
        'Algumas vezes ao longo do tempo',
        'Regularmente',
        'Atualmente sofre violência',
        'Nunca sofri violência'
      ]
    },
    {
      id: 'procurou_ajuda',
      title: '3.5 Você já procurou ajuda após sofrer violência?',
      type: 'radio',
      options: ['Sim', 'Não', 'Não se aplica'],
      conditional: {
        field: 'sofreu_violencia',
        value: 'Sim'
      }
    },
    {
      id: 'onde_procurou_ajuda',
      title: '3.6 Se sim, onde você procurou ajuda?',
      type: 'checkbox',
      options: [
        'Delegacia da Mulher',
        'Centro de Referência da Mulher',
        'Serviço de Saúde',
        'Apoio Jurídico',
        'Família/Amigos',
        'Outro'
      ],
      conditional: {
        field: 'procurou_ajuda',
        value: 'Sim'
      }
    },
    {
      id: 'qualidade_atendimento',
      title: '3.7 Como você avalia a qualidade do atendimento recebido?',
      type: 'radio',
      options: ['Muito boa', 'Boa', 'Regular', 'Ruim', 'Muito ruim', 'Não se aplica'],
      conditional: {
        field: 'procurou_ajuda',
        value: 'Sim'
      }
    },
    {
      id: 'conhece_maria_penha',
      title: '3.8 Você conhece a Lei Maria da Penha?',
      type: 'radio',
      options: ['Sim', 'Não']
    },
    {
      id: 'servicos_utilizados',
      title: '3.9 Você conhece ou já utilizou algum dos seguintes serviços?',
      type: 'checkbox',
      options: [
        'Disque 180',
        'Casa Abrigo',
        'Medida Protetiva de Urgência',
        'Nenhum',
        'Outro'
      ]
    },
    {
      id: 'impacto_saude_fisica',
      title: '3.10 A violência sofrida impactou sua saúde física?',
      type: 'radio',
      options: ['Sim', 'Não', 'Não se aplica'],
      conditional: {
        field: 'sofreu_violencia',
        value: 'Sim'
      }
    },
    {
      id: 'impacto_saude_mental',
      title: '3.11 A violência sofrida impactou sua saúde mental?',
      type: 'radio',
      options: ['Sim', 'Não', 'Não se aplica'],
      conditional: {
        field: 'sofreu_violencia',
        value: 'Sim'
      }
    },
    {
      id: 'afastamento_trabalho',
      title: '3.12 Você precisou se afastar do trabalho por causa da violência?',
      type: 'radio',
      options: ['Sim', 'Não', 'Não se aplica'],
      conditional: {
        field: 'sofreu_violencia',
        value: 'Sim'
      }
    },
    {
      id: 'impacto_educacao',
      title: '3.13 Você acredita que a violência que sofreu impactou sua educação?',
      type: 'radio',
      options: ['Sim', 'Não', 'Não se aplica'],
      conditional: {
        field: 'sofreu_violencia',
        value: 'Sim'
      }
    },
    {
      id: 'forma_impacto_educacao',
      title: '3.14 Se sim, de que forma a violência impactou sua trajetória educacional?',
      type: 'checkbox',
      options: [
        'Abandono escolar',
        'Dificuldade de concentração nos estudos',
        'Desmotivação para estudar',
        'Mudança frequente de escola',
        'Dificuldade de acesso a recursos educacionais',
        'Outro'
      ],
      conditional: {
        field: 'impacto_educacao',
        value: 'Sim'
      }
    },
    {
      id: 'apoio_educacional',
      title: '3.15 Você recebeu apoio educacional após ter sofrido violência?',
      type: 'radio',
      options: ['Sim', 'Não', 'Não se aplica'],
      conditional: {
        field: 'sofreu_violencia',
        value: 'Sim'
      }
    },
    {
      id: 'origem_apoio',
      title: '3.16 Se sim, de onde veio esse apoio?',
      type: 'checkbox',
      options: [
        'Escola',
        'Programas governamentais',
        'Organizações não-governamentais',
        'Família/Amigos',
        'Outro'
      ],
      conditional: {
        field: 'apoio_educacional',
        value: 'Sim'
      }
    },
    {
      id: 'educacao_ferramenta',
      title: '3.17 Você sente que a educação poderia ser uma ferramenta para superar as consequências da violência?',
      type: 'radio',
      options: ['Sim', 'Não', 'Não se aplica'],
      conditional: {
        field: 'sofreu_violencia',
        value: 'Sim'
      }
    },
    {
      id: 'mudanca_residencia',
      title: '3.18 Você já teve que mudar de residência por causa da violência?',
      type: 'radio',
      options: ['Sim', 'Não', 'Não se aplica'],
      conditional: {
        field: 'sofreu_violencia',
        value: 'Sim'
      }
    },
    {
      id: 'seguranca_bairro',
      title: '3.19 Você se sente segura no seu bairro/comunidade?',
      type: 'radio',
      options: ['Sim', 'Não', 'Às vezes']
    },
    {
      id: 'barreiras_denuncia',
      title: '3.20 Quais são as principais barreiras para denunciar a violência?',
      type: 'checkbox',
      options: [
        'Medo de represálias',
        'Falta de confiança nas autoridades',
        'Dependência financeira',
        'Falta de conhecimento sobre os direitos',
        'Falta de apoio familiar/social',
        'Outro'
      ]
    },
    {
      id: 'comentario',
      title: '4.1 Gostaria de deixar algum comentário ou sugestão sobre o tema?',
      type: 'textarea'
    }
  ];