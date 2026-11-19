# Controle de Estoque — Backend (NestJS + Prisma)

Implementação dos módulos de **Produtos** e **Movimentações** da API de Controle de Estoque (Atividades 01 e 02).

## Como executar

1. Subir o banco de dados PostgreSQL via Docker:
   ```bash
   docker compose up -d
   ```
2. Instalar dependências, rodar migrations e popular o banco (seed):
   ```bash
   cd backend
   npm install
   npx prisma migrate dev
   npx prisma db seed
   ```
3. Iniciar a API em modo de desenvolvimento:
   ```bash
   npm run start:dev
   ```
4. Acessar a documentação interativa **Swagger** em:
   - `http://localhost:3000/api`

---

## Rotas Implementadas e Execuções (Prints)

### Documentação Swagger (`/api`)
![Visão Geral Swagger](./prints/01-swagger-overview.png)

---

### Módulo de Produtos (`produtos`)

#### 1. `GET /produtos` — Listar produtos ordenados por nome com categoria (`200 OK`)
![GET /produtos](./prints/02-get-produtos-200.png)

#### 2. `POST /produtos` — Cadastrar novo produto (`201 Created`)
![POST /produtos](./prints/03-post-produtos-201.png)

#### 3. `GET /produtos/:id` — Buscar produto por ID (`200 OK`)
![GET /produtos/:id](./prints/04-get-produto-id-200.png)

#### 4. `GET /produtos/:id` (Caso de Erro) — Produto inexistente (`404 Not Found`)
![GET /produtos/999 - 404](./prints/05-erro-produto-404.png)

#### 5. `DELETE /produtos/:id` (Caso de Erro) — Produto com movimentações (`409 Conflict`)
![DELETE /produtos/2 - 409](./prints/06-erro-delete-produto-409.png)

#### 6. `DELETE /produtos/:id` — Remover produto sem movimentações (`200 OK`)
![DELETE /produtos/3 - 200](./prints/07-delete-produto-200.png)

---

### Módulo de Movimentações (`movimentacoes`)

#### 1. `POST /movimentacoes` — Registrar movimentação de entrada/saída (`201 Created`)
![POST /movimentacoes - 201](./prints/08-post-movimentacoes-201.png)

#### 2. `GET /movimentacoes` — Listar histórico do mais recente para o mais antigo (`200 OK`)
![GET /movimentacoes - 200](./prints/09-get-movimentacoes-200.png)

#### 3. `POST /movimentacoes` (Caso de Erro) — Saída maior que o estoque disponível (`400 Bad Request`)
![POST /movimentacoes - 400 Estoque Insuficiente](./prints/10-erro-movimentacoes-400.png)
