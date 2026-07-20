# PetShop Manager

Aplicação PetShop Manager com front-end Angular, back-end ASP.NET Core e banco de dados PostgreSQL.

## Autores

- Aristides Neto
- Klyngher Cabral

## Visão geral

O sistema implementa:

- Login e autenticação JWT
- CRUD completo de animais
- Cadastro de tutores com busca de CEP via ViaCEP
- Telas de login, listagem, cadastro e edição
- Persistência em PostgreSQL via Docker

> Observação: o enunciado menciona uma única tabela `Animais`, mas a implementação utiliza as tabelas `Animais` e `Tutores` de forma relacional, o que melhora a organização dos dados.

## Requisitos

- Docker Desktop
- .NET SDK 8
- Node.js 20+
- npm

## Execução

1. Abra o terminal na raiz do projeto:

```bash
cd c:\Users\anagi\CSharp-Angular-PostgreSQL-PetShop
```

2. Inicie o banco de dados PostgreSQL:

```bash
docker compose up -d
```

3. Inicie a API .NET em outro terminal:

```bash
dotnet run --project src\PetShop.Api
```

A API será executada em:

- `http://localhost:5049`
- Swagger: `http://localhost:5049/swagger`

4. Inicie o front-end Angular em outro terminal:

```bash
cd petshop-ui
npm install
npm start -- --host 0.0.0.0
```

O front-end ficará disponível em:

- `http://localhost:4200`

## Fluxo recomendado

```bash
docker compose up -d
dotnet run --project src\PetShop.Api
cd petshop-ui
npm install
npm start -- --host 0.0.0.0
```

## Login e Senha
login: admin@petshop.com
senha: Admin@123

