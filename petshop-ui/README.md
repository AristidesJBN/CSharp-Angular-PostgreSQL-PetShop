# Petshop Manager

Este repositório contém o front-end Angular, a API ASP.NET Core e o banco PostgreSQL.

## Pré-requisitos

- Docker Desktop
- .NET SDK 8
- Node.js 20+
- npm

## 1. Subir o banco PostgreSQL

Na raiz do projeto:

```bash
docker compose up -d
```

Se o Docker reclamar que a porta `5432` já está em uso, isso significa que outro PostgreSQL já está instalado no Windows.

Nesse caso, pare o serviço local do PostgreSQL:

```bash
sc stop postgresql-x64-18
```

Depois remova o contêiner antigo e suba novamente:

```bash
docker rm -f petshop-postgres
docker compose up -d
```

## 2. Subir a API

Em um terminal separado:

```bash
dotnet run --project src\PetShop.Api --urls http://localhost:5200
```

A API fica em:

- `http://localhost:5200`
- Swagger em `http://localhost:5200/swagger`

## 3. Subir o front-end

Em outro terminal:

```bash
cd petshop-ui
npm install
npm start -- --host 0.0.0.0
```

O front-end fica em:

```text
http://localhost:4200/
```

## 4. Fluxo recomendado

```bash
docker compose up -d
dotnet run --project src\PetShop.Api --urls http://localhost:5200
cd petshop-ui
npm install
npm start -- --host 0.0.0.0
```

## Observações

- O front-end chama a API em `http://localhost:5200`.
- A API usa o PostgreSQL em `localhost:5432`.
- Se houver conflito com a porta `5432`, o processo local do PostgreSQL precisa ser interrompido ou a porta alterada no Docker.

## Build

```bash
cd petshop-ui
npm run build
```

## Testes

```bash
cd petshop-ui
npm run test
```
