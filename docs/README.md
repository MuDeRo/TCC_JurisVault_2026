# ⚖️ JurisVault_2026 — Gestão Jurídica Inteligente

O **JurisVault** é uma plataforma desenvolvida para auxiliar advogados autônomos e pequenos escritórios na organização de processos jurídicos, documentos e usuários dentro de um ambiente digital seguro. 
O projeto foi criado com o objetivo de modernizar a rotina jurídica, substituindo métodos manuais por um sistema mais organizado, acessível e protegido. 
A plataforma busca oferecer mais praticidade no gerenciamento de informações jurídicas, mantendo o foco na segurança dos dados e no controle de acesso dos usuários.

---

# Objetivo do Projeto

O principal objetivo do JurisVault é transformar processos manuais em uma solução digital simples e eficiente.

O sistema foi pensado para permitir o gerenciamento de documentos, autenticação de usuários e controle de acesso através de permissões administrativas.

Além disso, o projeto também possui foco acadêmico, simulando um ambiente real de advocacia digital utilizando tecnologias modernas de desenvolvimento web.

---

# Tecnologias Utilizadas

# Ferramentas Utilizadas

* VS Code
* GitHub
* Render
* MySQL


### Front-end
 ![Static Badge](https://img.shields.io/badge/JavaScript-yellow?logo=JavaScript)
 ![Static Badge](https://img.shields.io/badge/React-blue?logo=React)

O front-end é responsável pela interface visual da plataforma, permitindo a interação dos usuários com o sistema.

---

### Back-end
 ![Static Badge](https://img.shields.io/badge/node.js-green?logo=node.js)
 ![Static Badge](https://img.shields.io/badge/JSON%20Web%20Tokens-black?logo=JSON%20Web%20Tokens)
 ![Static Badge](https://img.shields.io/badge/JUCESP%20-%20OAB-red?logo=JUCESP%20-%20OAB)

O back-end é responsável pela lógica da aplicação, autenticação dos usuários, proteção das rotas e comunicação com o banco de dados.

---

## Banco de Dados

![Static Badge](https://img.shields.io/badge/MySQL-orange?logo=mysql)

O MySQL será utilizado para armazenar informações dos usuários, documentos e dados necessários para o funcionamento da plataforma.

---

# Sistema de Autenticação

O sistema utiliza autenticação baseada em JWT (JSON Web Token).
Após realizar o login, o usuário recebe um token que será utilizado para acessar áreas protegidas do sistema.
Esse mecanismo garante mais segurança e controle de acesso dentro da plataforma.

---

# Validação de Advogados

Todos os usuários poderão realizar cadastro normalmente na plataforma.

Após o cadastro, o usuário será salvo no banco de dados com o status:

**validando**

Os administradores terão acesso a uma área protegida onde poderão analisar os usuários cadastrados.
A validação será realizada manualmente através da página `ConfirmADV`.

Após a análise, o usuário poderá ser:

* aprovado;
* negado;
* ou permanecer em validação.

Somente usuários aprovados terão acesso às funcionalidades principais do sistema.

---
#  Funcionamento do Sistema

- O usuário realiza o cadastro na plataforma;

- O sistema registra automaticamente o cadastro com o status **"validando"**;

- Os administradores acessam a área protegida da aplicação;

- O cadastro é analisado manualmente através da página `ConfirmADV`;

- Após a análise, o usuário pode ser:
  - aprovado;
  - negado;
  - ou permanecer em validação;



# Estrutura do Projeto

A pasta `controllers` contém as regras e funcionalidades da aplicação.

A pasta `routes` define as rotas da API.

A pasta `middlewares` possui as validações e autenticação JWT.

A pasta `models` contém a estrutura do banco de dados.

A pasta `services` reúne funções auxiliares utilizadas pelo sistema.

A pasta `database` é responsável pela configuração do banco de dados.

---

# 🛡️ Segurança e LGPD

O projeto segue princípios da LGPD para garantir proteção de dados e segurança das informações armazenadas na plataforma.

O controle de acesso e a autenticação JWT ajudam a proteger áreas restritas do sistema.

# Equipe JurisVault

Projeto acadêmico desenvolvido com foco em segurança, organização e modernização da advocacia digital.
