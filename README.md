<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

## Description

Back-End Test Developer

### Instruções

1. Renomear o arquivo `.env.example` para `.env`;
2. Criar conta no [OMDb API](http://www.omdbapi.com/apikey.aspx) para gerar a ApiKey e adicionar na _variável_ `API_KEY` do arquivo `.env`;
3. Garantir que as _portas_ **3000** _(API)_ e **27017** _(MONGO)_ estejam disponíveis para executar o projeto; e
4. Na raiz do projeto, deve existir um arquivo de _collection_ do **POSTMAN** para facilitar os testes.

### Docker

- Build dos projetos:
  ```bash
  docker-compose up --build
  ```

Ao executar o comando de `build`, aguarde até que todos os serviços estejam online, são:

1. mongo; e
2. api.

Após a execução dos passados acima, os serviços estarão disponíveis:

- API:
  - Serviço: [http://localhost:3000]()
  - Documentação: [http://localhost:3000/api]()
