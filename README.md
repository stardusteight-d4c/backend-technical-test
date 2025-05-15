# API de Gerenciamento de Estabelecimentos e Produtos

Esta é uma API RESTful construída com NestJS para gerenciar estabelecimentos, produtos e usuários.

## Tecnologias Utilizadas

- NestJS
- TypeScript
- DynamoDB
- Class Validator

## Endpoints

### Usuários (`/users`)

#### GET `/users`
Lista todos os usuários cadastrados.

#### GET `/users/:id`
Retorna os detalhes de um usuário específico.

#### POST `/users`
Cria um novo usuário.

Corpo da requisição:
```json
{
  "name": "string",
  "email": "string",
  "type": "owner | customer"
}
```

#### PATCH `/users/:id`
Atualiza os dados de um usuário.

Corpo da requisição (todos os campos são opcionais):
```json
{
  "name": "string",
  "email": "string",
  "type": "owner | customer"
}
```

#### DELETE `/users/:id`
Remove um usuário.

### Estabelecimentos (`/establishments`)

#### GET `/establishments`
Lista todos os estabelecimentos.

#### GET `/establishments?type=:type`
Lista estabelecimentos filtrados por tipo.

#### GET `/establishments/:id`
Retorna os detalhes de um estabelecimento específico.

#### POST `/establishments`
Cria um novo estabelecimento.

Corpo da requisição:
```json
{
  "name": "string",
  "ownerId": "UUID",
  "type": "shopping | local"
}
```

> Um User só pode criar um Establishment se o campo type for "owner".

#### PATCH `/establishments/:id`
Atualiza os dados de um estabelecimento.

#### DELETE `/establishments/:id`
Remove um estabelecimento.

### Regras de Estabelecimentos (`/establishments-rules`)

#### GET `/establishments-rules/:establishmentId`
Retorna as regras de um estabelecimento específico.

#### POST `/establishments-rules`
Cria novas regras para um estabelecimento.

Corpo da requisição:
```json
{
  "establishmentId": "UUID",
  "picturesLimit": 10,
  "videoLimit": 5
}
```

#### PATCH `/establishments-rules/:id`
Atualiza as regras de um estabelecimento.

#### DELETE `/establishments-rules/:id`
Remove as regras de um estabelecimento.

### Produtos (`/products`)

#### GET `/products`
Lista todos os produtos.

#### GET `/products/:id`
Retorna os detalhes de um produto específico.

#### POST `/products`
Cria um novo produto.

Corpo da requisição:
```json
{
  "name": "string",
  "price": "number (em centavos)",
  "establishmentId": "UUID"
}
```

#### PATCH `/products/:id`
Atualiza os dados de um produto.

Corpo da requisição (todos os campos são opcionais):
```json
{
  "name": "string",
  "price": "number (em centavos)"
}
```

#### DELETE `/products/:id`
Remove um produto.

## Configuração do Ambiente

1. Copie o arquivo `example-env.txt` para `.env`
2. Configure as variáveis de ambiente necessárias
3. Instale as dependências:
```bash
npm install
```

4. Execute o projeto:
```bash
npm run start:dev
```

## Validações

A API utiliza o Class Validator para validação de dados:
- Emails devem ser válidos
- Preços devem ser números inteiros positivos (em centavos)
- IDs de estabelecimentos devem ser UUIDs válidos
- Tipos de usuário devem ser 'owner' ou 'customer'

## Banco de Dados

A API utiliza o DynamoDB como banco de dados. Certifique-se de ter as credenciais AWS configuradas corretamente no arquivo `.env`.

## Exemplos de Uso

### Criando um Usuário (Owner)
```json
{
  "name": "João Silva",
  "email": "joao@example.com",
  "type": "owner"
}
```

### Criando um Estabelecimento
```json
{
  "name": "Shopping Center XYZ",
  "ownerId": "550e8400-e29b-41d4-a716-446655440000",
  "type": "shopping"
}
```

### Criando Regras para um Estabelecimento
```json
{
  "establishmentId": "550e8400-e29b-41d4-a716-446655440000",
  "picturesLimit": 5,
  "videoLimit": 2
}
```

### Criando um Produto
```json
{
  "name": "Produto XYZ",
  "price": 1990,
  "establishmentId": "550e8400-e29b-41d4-a716-446655440000"
}
```
