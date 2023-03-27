# O PokéCenter de Pallet Town

## Stack utilizada

**Database:** Postgres

**Back-end:** Node, Fastify, gRPC

## Requisitos

- Docker + Docker Compose Plugin. https://docs.docker.com/engine/install/
- Node 18

## Rodando localmente

Clone o projeto

```bash
  git clone https://github.com/paulofellix/desafio-backend-pokecenter.git
```

Entre no diretório do projeto

```bash
  cd desafio-backend-pokecenter
```

Instale as dependências

```bash
  yarn install
```

Subindo o banco de dados

```bash
  chmod +x ./database/init.sh
  yarn bootstrap
```

Inicie o servidor

```bash
  yarn dev
```

## Autores

- [@paulofellix](https://www.github.com/paulofellix)
