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

## Observações importantes

- O front-end consome a API em `http://localhost:5049`.
- A API usa o banco PostgreSQL no contêiner Docker na porta `5432`.
- Se a porta `5432` estiver ocupada, pare o PostgreSQL local ou ajuste o `docker-compose.yml`.
- A foto do animal é opcional; o sistema funciona sem upload de imagem.
- A busca de CEP no cadastro de tutores completa `logradouro`, `bairro`, `cidade` e `uf` automaticamente.
- Este é o README principal do projeto; o arquivo `petshop-ui/README.md` foi removido para manter a documentação padronizada.

## Melhoria visual

O layout foi atualizado para utilizar Angular Material com um shell mais limpo, cards com sombra suave e uma lista de animais mais legível.
