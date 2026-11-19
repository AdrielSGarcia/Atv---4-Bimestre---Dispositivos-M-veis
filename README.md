# Controle de Estoque — Atividade 01 e 02 (Produtos e Movimentações)

Implementação dos módulos de **Produtos** (`src/produtos`) e **Movimentações** (`src/movimentacoes`) no backend NestJS + Prisma.

## Como executar

1. Subir o banco PostgreSQL:
   ```bash
   docker compose up -d
   ```
2. Configurar e iniciar o backend:
   ```bash
   cd backend
   npm install
   npx prisma migrate dev
   npx prisma db seed
   npm run start:dev
   ```
3. Documentação Swagger disponível em: `http://localhost:3000/api`

---

## Rotas Implementadas e Execuções (Prints)

### Documentação Swagger (`/api`)
![Visão Geral Swagger](./backend/prints/01-swagger-overview.png)

---

### Módulo de Produtos (`produtos`)

#### 1. `GET /produtos` — Listar produtos ordenados por nome com categoria (`200 OK`)
![GET /produtos](./backend/prints/02-get-produtos-200.png)

#### 2. `POST /produtos` — Cadastrar novo produto (`201 Created`)
![POST /produtos](./backend/prints/03-post-produtos-201.png)

#### 3. `GET /produtos/:id` — Buscar produto por ID (`200 OK`)
![GET /produtos/:id](./backend/prints/04-get-produto-id-200.png)

#### 4. `GET /produtos/:id` (Caso de Erro) — Produto inexistente (`404 Not Found`)
![GET /produtos/999 - 404](./backend/prints/05-erro-produto-404.png)

#### 5. `DELETE /produtos/:id` (Caso de Erro) — Produto com movimentações (`409 Conflict`)
![DELETE /produtos/2 - 409](./backend/prints/06-erro-delete-produto-409.png)

#### 6. `DELETE /produtos/:id` — Remover produto sem movimentações (`200 OK`)
![DELETE /produtos/3 - 200](./backend/prints/07-delete-produto-200.png)

---

### Módulo de Movimentações (`movimentacoes`)

#### 1. `POST /movimentacoes` — Registrar movimentação de entrada/saída (`201 Created`)
![POST /movimentacoes - 201](./backend/prints/08-post-movimentacoes-201.png)

#### 2. `GET /movimentacoes` — Listar histórico do mais recente para o mais antigo (`200 OK`)
![GET /movimentacoes - 200](./backend/prints/09-get-movimentacoes-200.png)

#### 3. `POST /movimentacoes` (Caso de Erro) — Saída maior que o estoque disponível (`400 Bad Request`)
![POST /movimentacoes - 400 Estoque Insuficiente](./backend/prints/10-erro-movimentacoes-400.png)
