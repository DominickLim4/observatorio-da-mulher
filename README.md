# Mulheres App

Aplicação web para auxílio de mulheres em situação de vulnerabilidade, com foco na coleta de dados e visualização dinâmica de resultados.

## Tecnologias Utilizadas

### Backend
- **MongoDB**: Banco de dados não relacional para armazenar os dados do formulário em formato JSON
- **Node.js & Express**: Servidor da aplicação e gerenciamento de requisições
- **Firebase**: Autenticação de usuários

### Frontend
- **React.js**: Framework para criar interfaces de usuário dinâmicas
- **Chart.js**: Criação de dashboards interativos
- **Bootstrap**: Framework CSS para responsividade e componentes de UI

## Estrutura do Projeto

```
mulheres-app/
├── client/                   # Frontend React
│   ├── public/
│   │   ├── index.html
│   │   └── favicon.ico
│   ├── src/
│   │   ├── components/       # Componentes React reutilizáveis
│   │   ├── pages/            # Páginas principais
│   │   ├── services/         # Serviços para API e Firebase
│   │   ├── App.js
│   │   ├── index.js
│   │   └── App.css
│   ├── package.json
│   └── .gitignore
├── server/                   # Backend Node.js/Express
│   ├── config/
│   ├── models/
│   ├── routes/
│   ├── index.js
│   ├── package.json
│   └── .gitignore
└── README.md
```

## Funcionalidades

1. **Login**: Autenticação via Firebase para acesso à área de dashboards
2. **Página Inicial**: Landing page informativa sobre o projeto
3. **Formulário**: Coleta de dados com perguntas de múltipla escolha
4. **Dashboards**: Visualização gráfica dos resultados coletados

## Configuração do Ambiente

### Pré-requisitos
- Node.js e npm instalados
- MongoDB instalado localmente ou conta no MongoDB Atlas
- Conta no Firebase

### Configuração do Firebase

1. Acesse [console.firebase.google.com](https://console.firebase.google.com/)
2. Crie um novo projeto
3. Em "Authentication", ative o provedor de email/senha
4. Em "Project Settings", copie as configurações do Firebase para o arquivo `firebase.js`

### Instalação e Execução

```bash
# Clone o repositório
git clone <url-do-repositorio>
cd mulheres-app

# Configuração do Backend
cd server
npm install
# Crie um arquivo .env com suas variáveis de ambiente (MONGO_URI, PORT)
npm run dev

# Configuração do Frontend
cd ../client
npm install
npm start
```

## Rotas da Aplicação

- `/`: Página inicial
- `/login`: Página de login
- `/form`: Formulário para coleta de dados
- `/dashboard`: Visualização dos resultados (protegida por autenticação)

## Licença

Este projeto está licenciado sob a licença MIT.