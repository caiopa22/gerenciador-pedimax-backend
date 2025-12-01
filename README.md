# Gerenciador Pedimax API

Uma API e bem estruturada para gerenciamento de pedidos com autenticação JWT, desenvolvida com **Node.js**, **Express** e **Prisma**.

## Funcionalidades

- ✅ Autenticação com JWT
- ✅ Gerenciamento completo de pedidos
- ✅ Sistema de usuários com registro e login
- ✅ Validação de dados com Joi
- ✅ Criptografia de senhas com bcrypt
- ✅ Documentação com Swagger

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Versão | Propósito |
|-----------|--------|----------|
| **Express** | ^5.1.0 | Framework web |
| **Prisma** | ^6.19.0 | ORM para banco de dados |
| **JWT** | ^9.0.2 | Autenticação segura |
| **bcrypt** | ^6.0.0 | Hash de senhas |
| **Joi** | ^18.0.2 | Validação de schemas |
| **Swagger** | ^6.2.8 | Documentação de API |
| **dotenv** | ^17.2.3 | Variáveis de ambiente |
| **nodemon** | ^3.1.11 | Reload automático (dev) |

## 📋 Pré-requisitos

- Node.js (v18+)
- npm ou yarn
- PostgreSQL
- Um arquivo `.env` configurado

## 📚 Estrutura do Projeto

```
src/
├── config/
│   └── database.js           # Configuração do Prisma
├── controller/
│   ├── auth.controller.js    # Controlador de autenticação
│   └── order.controller.js   # Controlador de pedidos
├── middlewares/
│   ├── authMiddleware.js     # Validação de JWT
│   ├── errorHandler.js       # Tratamento de erros
│   └── validate.js           # Validação com Joi
├── routes/
│   ├── auth.routes.js        # Rotas de autenticação
│   └── order.routes.js       # Rotas de pedidos
├── schemas/
│   ├── auth.schema.js        # Schemas de validação (auth)
│   ├── item.schema.js        # Schemas de validação (itens)
│   └── order.schema.js       # Schemas de validação (pedidos)
├── service/
│   ├── auth.service.js       # Lógica de autenticação
│   └── order.service.js      # Lógica de pedidos
├── utils/
│   └── AppError.js           # Classe de erro personalizada
├── prisma/
│   ├── migrations/           # Migrations do banco
│   └── schema.prisma         # Schema do banco de dados
├── app.js                    # Arquivo principal da API
└── swagger.js                # Configuração do Swagger
```

## 🚀 Instalação

1. Clone o repositório
```bash
git clone <seu-repositorio>
cd pedimax-api
```

2. Instale as dependências
```bash
npm install
```

3. Configure as variáveis de ambiente
```bash
cp .env.example .env
```

4. Configure seu arquivo `.env`
```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/pedimax"
JWT_SECRET="sua_chave_secreta_aqui"
```

5. Execute as migrations do Prisma
```bash
npx prisma migrate dev
```

6. Inicie o servidor
```bash
npm run dev
```

O servidor estará disponível em `http://localhost:3000`

## 🔐 Autenticação

A API utiliza **Bearer Token JWT** para autenticação. Todos os endpoints protegidos requerem o header:

```
Authorization: Bearer seu_token_aqui
```

### Fluxo de Autenticação

1. **Registrar usuário** → `POST /auth/register`
2. **Fazer login** → `POST /auth/login` (retorna token)
3. **Usar token** → Incluir em todas as requisições protegidas

## 📡 Endpoints da API

### 🔑 Autenticação

#### Registrar novo usuário
```http
POST /auth/register
Content-Type: application/json

{
  "username": "Caio Andrade",
  "email": "caioandrade@exemplo.com",
  "password": "123456"
}
```

#### Fazer login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "caioandrade@exemplo.com",
  "password": "123456"
}
```

**Resposta:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Atualizar username
```http
PUT /auth/{userId}
Authorization: Bearer seu_token_aqui
Content-Type: application/json

{
  "username": "novo_username"
}
```

#### Deletar usuário
```http
DELETE /auth/{userId}
Authorization: Bearer seu_token_aqui
```

### 📦 Pedidos

#### Criar novo pedido
```http
POST /order
Authorization: Bearer seu_token_aqui
Content-Type: application/json

{
  "numeroPedido": "12345",
  "valorTotal": 89.90,
  "dataCriacao": "2025-11-28T10:00:00.000Z",
  "items": [
    {
      "idItem": "1",
      "quantidadeItem": 2,
      "valorItem": 49.95
    }
  ]
}
```

#### Listar todos os pedidos do usuário
```http
GET /order/list
Authorization: Bearer seu_token_aqui
```

#### Buscar pedido específico
```http
GET /order/{orderId}
Authorization: Bearer seu_token_aqui
```

#### Atualizar pedido
```http
PUT /order/{orderId}
Authorization: Bearer seu_token_aqui
Content-Type: application/json

{
  "valorTotal": 120.50,
  "dataCriacao": "2025-12-01T15:00:00Z",
  "items": [
    {
      "idItem": "1",
      "quantidadeItem": 5,
      "valorItem": 22.50
    }
  ]
}
```

#### Deletar pedido
```http
DELETE /order/{orderId}
Authorization: Bearer seu_token_aqui
```

### 🏥 Health Check
```http
GET /health
```

**Resposta:**
```json
{
  "status": "ok"
}
```

## 📖 Documentação Interativa

A documentação completa da API está disponível no Swagger:

```
http://localhost:3000/docs
```

Aqui você pode testar todos os endpoints interativamente.

## 🗄️ Modelo de Dados

### Users
```
- id (Int, PK, auto-increment)
- username (String)
- email (String, unique)
- password (String, hashed)
- creationDate (DateTime, default: now)
- order (Relation: 1 → N)
```

### Order
```
- orderId (String, PK)
- userId (Int, FK)
- value (Float)
- creationDate (DateTime)
- users (Relation: N → 1)
- items (Relation: 1 → N)
```

### Items
```
- productId (String, PK)
- orderId (String, FK)
- quantity (Int)
- price (Float)
- order (Relation: N → 1)
```

### Prisma Logs

O projeto está configurado para registrar logs úteis do Prisma:
```
- query: todas as queries SQL
- error: erros do banco
- warn: avisos
```

## 🛡️ Tratamento de Erros

A API retorna erros padronizados em formato JSON:

```json
{
  "message": "Descrição do erro",
  "details": "Informações adicionais (em caso de erro 500)"
}
```
## 🧪 Testando a API

### Com cURL

```bash
# Registrar usuário
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"João","email":"joao@test.com","password":"123456"}'

# Fazer login
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"joao@test.com","password":"123456"}'

# Listar pedidos (substitua TOKEN pelo token retornado)
curl -X GET http://localhost:3000/order/list \
  -H "Authorization: Bearer TOKEN"
```

### Com Postman/Insomnia

Importe a documentação Swagger: `http://localhost:3000/docs`

## 📝 Scripts Disponíveis

```bash
# Iniciar em modo desenvolvimento (com hot-reload)
npm run dev

# Criar/atualizar migrations
npx prisma migrate dev --name descricao_migracao

# Ver estado do banco
npx prisma studio

# Gerar tipos do Prisma
npx prisma generate
```

## 🔒 Segurança

- ✅ Senhas são criptografadas com bcrypt (salt rounds: 10)
- ✅ JWT tokens com expiração de 1 hora
- ✅ Validação rigorosa de entrada com Joi
- ✅ Controle de acesso por usuário
- ✅ Tratamento centralizado de erros (sem expor informações sensíveis)
- ✅ Variáveis sensíveis em arquivo `.env`

## 🚨 Troubleshooting

**Erro de conexão com banco:**
```bash
# Verifique se o PostgreSQL está rodando
# Confirme DATABASE_URL no .env
npx prisma db push
```

**Erro de JWT inválido:**
```bash
# Verifique se JWT_SECRET está configurado
# Certifique-se de usar o mesmo SECRET para gerar e validar tokens
```

**Porta 3000 já está em uso:**
```bash
# Mude a porta no app.js ou use:
PORT=3001 npm run dev
```

## 📄 Licença

Este projeto é de uso livre para fins educacionais e comerciais.

## 👨‍💻 Autor

Desenvolvido por Caio Pacheco Andrade.

---
