# 🏪 API de Gerenciamento de Estabelecimentos e Produtos

Uma API RESTful construída com NestJS para gerenciar estabelecimentos, produtos e usuários.

## 📚 Índice

- [Tecnologias](#-tecnologias)
- [Configuração](#-configuração)
- [Endpoints](#-endpoints)
- [Exemplos](#-exemplos)
- [Validações](#-validações)
- [Banco de Dados](#-banco-de-dados)

## 🚀 Tecnologias

- [NestJS](https://nestjs.com/) - Framework Node.js
- TypeScript - Linguagem de programação
- DynamoDB - Banco de dados
- Class Validator - Validação de dados

## ⚙️ Configuração

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

## 🛣️ Endpoints

### 👥 Usuários (`/users`)

#### `GET /users`
> Lista todos os usuários cadastrados.

#### `GET /users/:id`
> Retorna os detalhes de um usuário específico.

#### `POST /users`
> Cria um novo usuário.

Corpo da requisição:
```json
{
  "name": "string",
  "email": "string",
  "type": "owner | customer"
}
```

> Não permite um email já cadastrado

#### `PATCH /users/:id`
> Atualiza os dados de um usuário.

Corpo da requisição (todos os campos são opcionais):
```json
{
  "name": "string",
  "email": "string",
  "type": "owner | customer"
}
```

#### `DELETE /users/:id`
> Remove um usuário.

### 🏢 Estabelecimentos (`/establishments`)

#### `GET /establishments`
> Lista todos os estabelecimentos.

#### `GET /establishments?type=:type`
> Lista estabelecimentos filtrados por tipo.

#### `GET /establishments/:id`
> Retorna os detalhes de um estabelecimento específico.

#### `POST /establishments`
> Cria um novo estabelecimento.

⚠️ **Importante**: Um User só pode criar um Establishment se o campo type for "owner".

Corpo da requisição:
```json
{
  "name": "string",
  "ownerId": "UUID",
  "type": "shopping | local"
}
```

#### `PATCH /establishments/:id`
> Atualiza os dados de um estabelecimento.

#### `DELETE /establishments/:id`
> Remove um estabelecimento.

### 📋 Regras de Estabelecimentos (`/establishments-rules`)

#### `GET /establishments-rules/:establishmentId`
> Retorna as regras de um estabelecimento específico.

#### `POST /establishments-rules`
> Cria novas regras para um estabelecimento.

Corpo da requisição:
```json
{
  "establishmentId": "UUID",
  "picturesLimit": 10,
  "videoLimit": 5
}
```

#### `PATCH /establishments-rules/:id`
> Atualiza as regras de um estabelecimento.

#### `DELETE /establishments-rules/:id`
> Remove as regras de um estabelecimento.

### 🛍️ Produtos (`/products`)

#### `GET /products`
> Lista todos os produtos.

#### `GET /products/:id`
> Retorna os detalhes de um produto específico.

#### `POST /products`
> Cria um novo produto.

Corpo da requisição:
```json
{
  "name": "string",
  "price": "number (em centavos)",
  "establishmentId": "UUID"
}
```

#### `PATCH /products/:id`
> Atualiza os dados de um produto.

Corpo da requisição (todos os campos são opcionais):
```json
{
  "name": "string",
  "price": "number (em centavos)"
}
```

#### `DELETE /products/:id`
> Remove um produto.

## 💡 Exemplos

### 👤 Criando um Usuário (Owner)
```json
{
  "name": "João Silva",
  "email": "joao@example.com",
  "type": "owner"
}
```

### 🏬 Criando um Estabelecimento
```json
{
  "name": "Shopping Center XYZ",
  "ownerId": "550e8400-e29b-41d4-a716-446655440000",
  "type": "shopping"
}
```

### ⚖️ Criando Regras para um Estabelecimento
```json
{
  "establishmentId": "550e8400-e29b-41d4-a716-446655440000",
  "picturesLimit": 5,
  "videoLimit": 2
}
```

### 📦 Criando um Produto
```json
{
  "name": "Produto XYZ",
  "price": 1990,
  "establishmentId": "550e8400-e29b-41d4-a716-446655440000"
}
```

## ✅ Validações

A API utiliza o Class Validator para validação de dados:

- 📧 Emails devem ser válidos
- 💰 Preços devem ser números inteiros positivos (em centavos)
- 🔑 IDs de estabelecimentos devem ser UUIDs válidos
- 👥 Tipos de usuário devem ser 'owner' ou 'customer'
- 🏢 Tipos de estabelecimento devem ser 'shopping' ou 'local'

## 🧪 Testes

O projeto inclui testes automatizados para todos os controllers, garantindo o funcionamento correto das funcionalidades.

### Executando os Testes

Para executar os testes dos controllers:
```bash
npm run test:controllers
```

Para executar os testes em modo watch:
```bash
npm run test:controllers:watch
```

### Cobertura de Testes

#### UsersController
- Criação de usuários
  - ✓ Cria um novo usuário
  - ✓ Impede a criação de usuário com email duplicado
- Busca de usuários
  - ✓ Retorna um usuário por ID
  - ✓ Lança NotFoundException quando usuário não existe
- Atualização de usuários
  - ✓ Atualiza dados do usuário
  - ✓ Lança NotFoundException ao atualizar usuário inexistente
- Remoção de usuários
  - ✓ Remove um usuário
  - ✓ Lança NotFoundException ao remover usuário inexistente
- Listagem de usuários
  - ✓ Retorna todos os usuários
  - ✓ Retorna array vazio quando não há usuários

#### EstablishmentsController
- Criação de estabelecimentos
  - ✓ Cria um novo estabelecimento
  - ✓ Impede criação com owner inexistente
  - ✓ Impede criação por usuário não-owner
- Busca de estabelecimentos
  - ✓ Retorna um estabelecimento por ID
  - ✓ Lança NotFoundException quando estabelecimento não existe
- Atualização de estabelecimentos
  - ✓ Atualiza dados do estabelecimento
  - ✓ Lança NotFoundException ao atualizar estabelecimento inexistente
- Remoção de estabelecimentos
  - ✓ Remove um estabelecimento
  - ✓ Lança NotFoundException ao remover estabelecimento inexistente
- Listagem de estabelecimentos
  - ✓ Retorna todos os estabelecimentos
  - ✓ Filtra estabelecimentos por tipo
  - ✓ Retorna array vazio quando não há estabelecimentos

#### EstablishmentsRulesController
- Criação de regras
  - ✓ Cria regras para um estabelecimento
  - ✓ Impede criação para estabelecimento inexistente
- Busca de regras
  - ✓ Retorna regras por ID do estabelecimento
  - ✓ Lança NotFoundException quando estabelecimento não existe
- Atualização de regras
  - ✓ Atualiza regras do estabelecimento
  - ✓ Lança erro ao atualizar regras inexistentes
- Remoção de regras
  - ✓ Remove regras de um estabelecimento

#### ProductsController
- Criação de produtos
  - ✓ Cria um novo produto
  - ✓ Impede criação para estabelecimento inexistente
- Busca de produtos
  - ✓ Retorna um produto por ID
  - ✓ Lança NotFoundException quando produto não existe
- Atualização de produtos
  - ✓ Atualiza dados do produto
  - ✓ Lança NotFoundException ao atualizar produto inexistente
- Remoção de produtos
  - ✓ Remove um produto
  - ✓ Lança NotFoundException ao remover produto inexistente
- Listagem de produtos
  - ✓ Retorna todos os produtos
  - ✓ Retorna array vazio quando não há produtos

### Estrutura dos Testes

Os testes utilizam repositórios em memória (`InMemoryRepository`) para simular o banco de dados, permitindo testes rápidos e isolados. Cada controller tem seu próprio arquivo de teste que verifica:

1. Funcionalidades básicas (CRUD)
2. Casos de erro
3. Validações de negócio
4. Relacionamentos entre entidades

Os testes são escritos usando Jest e seguem as melhores práticas de testes unitários, incluindo:
- Isolamento de testes
- Limpeza do estado entre testes
- Verificação de casos de sucesso e erro
- Asserções claras e específicas

## 💾 Banco de Dados

A API utiliza o DynamoDB como banco de dados. Certifique-se de ter as credenciais AWS configuradas corretamente no arquivo `.env`.
