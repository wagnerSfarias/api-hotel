
<h1 align="center">API Hotel</h1>


## Documentação da API
                    

API desenvolvida com nodeJS, focada no sistema para um hotel tanto para parte administrativa quanto para o usuário.

## Rotas

#### Criar usuário

```bash
  POST /user
```
 As informações devem ser passadas dentro do corpo(body) da requisição.

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `name` | `string` | **Obrigatório**. |
| `email` | `string` | **Obrigatório**.|
| `password` | `string` | **Obrigatório**.|


#### Fazer Logon

```bash
  POST /sessions
```
As informações devem ser passadas dentro do corpo(body) da requisição.

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `email`      | `string` | **Obrigatório**.|
| `password`      | `string` | **Obrigatório**.|

Resposta :
```js
[
  {
    id: "ac3ebf68-e0ad-4c1d-9822-ff1b559589a8",
    email: "jose@gmail.com",
    name:"José", 
    admin: false,
    token: "jxbhydsgftt5.48415f4dfdfdf..."
  }
];
```

#### Retorna todas as unidades

```bash
  GET /units
```
#### Retorna os quartos daquela unidade

```bash
  GET /unit/bedrooms?unit_id=2
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `unit_id`      | `integer` | **Obrigatório**. O ID da unidade que você deseja. |

#### Retorna os detalhes de um quarto

```bash
  GET /bedroom/${id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `integer` | **Obrigatório**. O ID do quarto que você deseja. |

### TOKEN 

As rotas abaixo exigem de um token JWT, que é fornecido quando o usuário faz logon.

**Observação**: Para maior segurança, lembre-se de gerar um hash de senha pra seu token e insira no arquivo 
/src/config/auth.js.

 [HashMD5](https://www.md5hashgenerator.com/) - Gerador de Hash

Exemplo:

```js
export default {
  secret: 'hashMD5 AQUI',
  expiresIn: '5d',
}

```

#### Criar unidade

```bash
  POST /unit
```
As informações devem ser passadas dentro do corpo(body) da requisição.

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `name`      | `string` | **Obrigatório**. |
| `address`      | `string` | **Obrigatório**. |
| `file`      | `file` | **Obrigatório**. Arquivos de extensão .png .jpg .jpeg. |

#### Editar unidade

```bash
  PUT /unit/${id}
```
As informações devem ser passadas dentro do corpo(body) da requisição.

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `integer` | **Obrigatório**. O ID da unidade que você deseja. |
| `name`      | `string` | **Opcional**. |
| `address`      | `string` | **Opcional**. |
| `file`      | `file` | **Opcional**. Arquivos de extensão .png .jpg .jpeg. |


#### Retorna todas os quartos

```bash
  GET /bedrooms
```

#### Criar quarto

```bash
  POST /bedroom
```
As informações devem ser passadas dentro do corpo(body) da requisição.

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `name`      | `string` | **Obrigatório**. |
| `price`      | `integer` | **Obrigatório**. |
| `qtd_people`      | `integer` | **Obrigatório**. Quantidade de pessoas. |
| `file`      | `file` | **Obrigatório**. Arquivos de extensão .png .jpg .jpeg. |
| `file`      | `file` | **Obrigatório**. Arquivos de extensão .png .jpg .jpeg. |
| `file`      | `file` | **Obrigatório**. Arquivos de extensão .png .jpg .jpeg. |
| `unit_id`      | `integer` | **Obrigatório**.  O ID da unidade. |

#### Editar quarto

```bash
  PUT /bedroom/${id}
```
As informações devem ser passadas dentro do corpo(body) da requisição.

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**.O ID do quarto que deseja alterar. |
| `name`      | `string` | **Opcional**. |
| `price`      | `integer` | **Opcional**. |
| `qtd_people`      | `integer` | **Opcional**. Quantidade de pessoas. |
| `image`      | `file` | **Opcional**. Arquivos de extensão .png .jpg .jpeg. |
| `image_l`      | `file` | **Opcional**. Arquivos de extensão .png .jpg .jpeg. |
| `image_r`      | `file` | **Opcional**. Arquivos de extensão .png .jpg .jpeg. |
| `unit_id`      | `integer` | **Opcional**.  O ID da unidade. |


#### Criar reservas

```bash
  POST /reservation
```
As informações devem ser passadas dentro do corpo(body) da requisição.

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `check_in`      | `date` | **Obrigatório**.|
| `check_out`      | `date` | **Obrigatório**.|
| `bedroom_id`      | `integer` | **Obrigatório**. O ID do quarto que vai ser feito a reserva. |
| `user_id`      | `string` | **Obrigatório**. O ID do usuário que é passado pelo token. |


#### Retorna todas as reservas

```bash
  GET /reservations
```

#### Retorna as reservas do usuário

```bash
  GET /user/reservations
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `user_id`      | `string` | **Obrigatório**. O ID do usuário que é passado pelo token. |

#### Deletar reserva

```bash
  DELETE /reservation/${id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` |  **Obrigatório**. O ID da reserva que deseja deletar. |


## Rodando localmente

Antes de começar, você precisa ter o Git, Node e Docker instalados.

yarn - instalação opcional.

### Criando container do postgres

**Observação**: Lembrando que precisa estar com o aplicativo do docker aberto na sua maquina, antes de executar o comando abaixo.

```bash
docker run --name hotel-postgres -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres
```

### Clone o projeto

```bash
  git clone https://github.com/wagnerSfarias/api-hotel.git
```

### Entre no diretório do projeto

```bash
  cd api-hotel
```

### Instale as dependências

```bash
  npm install ou yarn 
```


### Rodando as migrations para que o sequelize crie as tabelas no banco de dados.


```bash
npx sequelize db:migrate ou yarn sequelize db:migrate
```
**Observação**: Lembre-se que é necessário criar um banco de dados antes e em seguida insira as informações do seu banco, dentro de ./src/config/database.js .

Exemplo:

```js
module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'postgres',
  database: 'hotelBD',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
}
```

### Inicie o servidor

```bash
  npm run dev ou yarn dev
```

**baseUrl** : http://localhost:3001


## Tecnologias utilizadas 👨🏻‍💻

- Node
- Express
- UUID
- Sequelize
- Multer
- Yup
- jsonwebtoken
- bcrypt
- Docker