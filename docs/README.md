# ⚖️ JurisVault_2026 — Gestão Jurídica Inteligente

O **JurisVault** é uma plataforma desenvolvida para auxiliar advogados autônomos e pequenos escritórios na organização de processos, documentos e informações jurídicas em um ambiente digital.

O projeto busca modernizar a rotina jurídica, centralizando informações, facilitando o gerenciamento dos casos e utilizando recursos de autenticação e controle de acesso.

---

# Objetivo do Projeto

O principal objetivo do JurisVault é transformar processos manuais em uma solução digital simples e organizada.

O sistema foi desenvolvido para permitir:

- Cadastro e gerenciamento de advogados;
- Autenticação de advogados e administradores;
- Validação de cadastros;
- Gerenciamento de casos;
- Associação entre advogados e casos;
- Organização de documentos, provas, etapas e tarefas;
- Controle de acesso;
- Armazenamento das informações em banco de dados MySQL.

Além disso, o projeto possui finalidade acadêmica, simulando uma solução digital para a área jurídica.

---

# Tecnologias Utilizadas

# Ferramentas Utilizadas

- VS Code
- GitHub
- Git
- Render
- MySQL

### Front-end

![JavaScript](https://img.shields.io/badge/JavaScript-yellow?logo=javascript)
![React](https://img.shields.io/badge/React-blue?logo=react)
![Vite](https://img.shields.io/badge/Vite-purple?logo=vite)
![Axios](https://img.shields.io/badge/Axios-5A29E4?logo=axios)
![React Router](https://img.shields.io/badge/React%20Router-CA4245?logo=reactrouter)

O front-end é responsável pela interface visual, navegação, formulários e interação dos usuários com o sistema.

### Back-end

![Node.js](https://img.shields.io/badge/Node.js-green?logo=node.js)
![Express](https://img.shields.io/badge/Express-black?logo=express)
![JWT](https://img.shields.io/badge/JWT-black?logo=jsonwebtokens)
![Bcrypt](https://img.shields.io/badge/Bcrypt-red)
![Multer](https://img.shields.io/badge/Multer-orange)

O back-end é responsável pela lógica da aplicação, autenticação, validações, proteção das rotas e comunicação com o banco de dados.

---

# Banco de Dados

![MySQL](https://img.shields.io/badge/MySQL-orange?logo=mysql)

O MySQL é utilizado para armazenar as informações necessárias para o funcionamento da plataforma.

Entre as principais tabelas estão:

- `administradores`
- `advogados`
- `enderecos`
- `casos`
- `advogados_casos`
- `arquivos`
- `provas`
- `etapas`
- `tarefas`
- `etapas_arquivos`
- `requerentes`
- `requeridos`

---

# Sistema de Autenticação

O sistema utiliza autenticação baseada em **JWT (JSON Web Token)**.

Após realizar o login, o usuário recebe um token utilizado para acessar áreas protegidas do sistema.

O projeto possui autenticação para:

- Advogados;
- Administradores.

As senhas são protegidas utilizando **Bcrypt** e o acesso às áreas administrativas utiliza middleware de autenticação.

---

# Validação de Advogados

Os advogados podem realizar o cadastro na plataforma.

Após o cadastro, o usuário é salvo no banco de dados com o status:

**validando**

Os administradores possuem uma área protegida para analisar os cadastros.

Após a análise, o cadastro pode receber os seguintes status:

- **aprovado**
- **negado**
- **validando**

O sistema possui endpoints específicos para consultar, aprovar e negar os cadastros.

---

# Funcionamento do Sistema

- O advogado realiza o cadastro na plataforma;
- Os dados são validados;
- A senha é armazenada de forma protegida;
- O cadastro recebe o status **"validando"**;
- O administrador acessa a área administrativa;
- O cadastro é analisado;
- O administrador pode aprovar ou negar o cadastro;
- Os casos podem ser cadastrados e associados aos advogados;
- As informações são armazenadas no banco de dados.

---

# Gerenciamento de Casos

O sistema possui funcionalidades para gerenciamento de casos jurídicos.

É possível realizar operações de:

- Cadastro;
- Consulta;
- Atualização;
- Exclusão.

Os casos podem ser relacionados aos advogados através da tabela `advogados_casos`.

A estrutura do banco também possui tabelas relacionadas a:

- Arquivos;
- Provas;
- Etapas;
- Tarefas;
- Requerentes;
- Requeridos.

---

# Upload de Arquivos

O projeto possui configuração para upload de arquivos utilizando **Multer**.

São permitidos arquivos nos formatos:

- PDF;
- JPEG;
- JPG;
- PNG.

O limite configurado para upload é de **150 MB**.

---

# Estrutura do Projeto

O projeto está dividido em **backend** e **frontend**.

### Backend

A pasta `controllers` contém as regras e funcionalidades da aplicação.

A pasta `routes` define as rotas da API.

A pasta `middlewares` possui autenticação, validações e controle de acesso.

A pasta `models` representa as entidades utilizadas pela aplicação.

A pasta `repositories` concentra a comunicação com o banco de dados.

A pasta `config` contém configurações do banco de dados e upload de arquivos.

A pasta `utils` reúne funções auxiliares.

### Frontend

A pasta `components` contém componentes reutilizáveis da interface.

A pasta `pages` contém as páginas do sistema.

A pasta `services` contém a configuração de comunicação com a API.

---

# Principais Rotas da API

### Autenticação

```http
POST /auth/login/advogado
POST /auth/login/admin
```

### Advogados

```http
POST /advogado/cadastro
GET  /advogado/perfil
PUT  /advogado/atualizar/:id
```

### Administradores

```http
GET   /administrador/pendentes
GET   /administrador/aprovados
PATCH /administrador/aprovar/:id
PATCH /administrador/negar/:id
```

### Casos

```http
GET    /casos
POST   /casos
PUT    /casos/:id
DELETE /casos/:id
```

### Advogados e Casos

```http
GET    /advogadosCasos
POST   /advogadosCasos
PUT    /advogadosCasos/:id
DELETE /advogadosCasos/:id
```

---

# 🛡️ Segurança e LGPD

O projeto considera princípios da **LGPD** para proteção das informações armazenadas.

Entre os recursos utilizados estão:

- Autenticação JWT;
- Controle de acesso;
- Hash de senhas com Bcrypt;
- Validação de dados;
- Variáveis de ambiente;
- Controle de tipos e tamanho dos arquivos;
- Proteção das áreas administrativas.

---

# Estrutura de Pastas

```text
TCC_JurisVault_2026/
│
├── backend/
│   └── src/
│       ├── config/
│       ├── controllers/
│       ├── middlewares/
│       ├── models/
│       ├── repositories/
│       ├── routes/
│       ├── utils/
│       └── server.js
│
├── frontend/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── services/
│       ├── App.jsx
│       └── main.jsx
│
└── docs/
```

---

# Execução do Projeto

### Backend

```bash
cd backend
npm install
```

Configure as variáveis de ambiente e execute o servidor conforme a configuração do projeto.

### Frontend

```bash
cd frontend
npm install
npm run dev
```