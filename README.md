# CadastroPessoaFrontend

Este projeto foi criado utilizando [Angular CLI](https://github.com/angular/angular-cli) versão 21.0.4.

## Como executar o projeto localmente

```bash
npm install
```

Executar em modo desenvolvimento

```bash
ng serve
```

Acesse

```bash
http://localhost:4200
```

## Building
O projeto tem como objetivo consumir a API .NET, ApiCadastroPessoa, repositório: https://github.com/IgorDias1998/ApiCadastroPessoa, que realiza um CRUD completo de um cadastro de pessoa.
Os endpoints principais:
GET /api/pessoas

GET /api/pessoas/{id}

POST /api/pessoas

PUT /api/pessoas/{id}

DELETE /api/pessoas/{id}

GET /api/cep/{cep}

Rodando localmente a API pode ser configurada no service deste projeto:
private readonly apiUrl = 'https://localhost:7032/api/pessoas';

Por fim, este teste consistiu em um desafio pessoal de lidar com uma nova linguagem, foi de grande valor e aprendizado poder entender um pouco da estrutura para seguir estudando e me aprofundando neste assunto.

