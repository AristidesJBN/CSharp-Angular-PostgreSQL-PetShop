-- Script SQL para criação do banco PetShopManager
-- Execute este script no PostgreSQL após criar o banco.
--
-- Exemplo:
-- CREATE DATABASE "PetShopManager";
-- \c "PetShopManager"

BEGIN;

CREATE TABLE IF NOT EXISTS "Tutores" (
    "Id" SERIAL PRIMARY KEY,
    "Nome" VARCHAR(200) NOT NULL,
    "CEP" VARCHAR(9) NOT NULL,
    "Logradouro" VARCHAR(250) NOT NULL,
    "Numero" VARCHAR(20) NOT NULL,
    "Bairro" VARCHAR(150) NOT NULL,
    "Cidade" VARCHAR(150) NOT NULL,
    "UF" VARCHAR(2) NOT NULL
);

CREATE TABLE IF NOT EXISTS "Usuarios" (
    "Id" SERIAL PRIMARY KEY,
    "Nome" VARCHAR(200) NOT NULL,
    "Email" VARCHAR(250) NOT NULL,
    "SenhaHash" BYTEA NOT NULL,
    "SenhaSalt" BYTEA NOT NULL
);

CREATE UNIQUE INDEX IF NOT EXISTS "IX_Usuarios_Email"
    ON "Usuarios" ("Email");

CREATE TABLE IF NOT EXISTS "Animais" (
    "Id" SERIAL PRIMARY KEY,
    "Nome" VARCHAR(200) NOT NULL,
    "Idade" INTEGER NOT NULL,
    "Peso" NUMERIC NOT NULL,
    "DataNascimento" TIMESTAMPTZ NOT NULL,
    "Foto" VARCHAR(500),
    "Especie" VARCHAR(100) NOT NULL,
    "TutorId" INTEGER NOT NULL,
    CONSTRAINT "FK_Animais_Tutores_TutorId"
        FOREIGN KEY ("TutorId")
        REFERENCES "Tutores" ("Id")
        ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS "IX_Animais_TutorId"
    ON "Animais" ("TutorId");

COMMIT;
