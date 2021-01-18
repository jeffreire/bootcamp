// Criando o servidor
const { request, response } = require('express');
const cors = require('cors');
const express = require('express');
// Biblioteca de gerador de IDs
const { uuid, isUuid } = require('uuidv4');

const app = express();

// Add um tipo de funcao que todas as rotas vao ter que passar por ela
app.use(cors());
app.use( express.json() );

/**
* Método HTTP:
* 
* GET: Buscar informações do back-end
* POST: Criar uma informação no back-end
* PUT/PATCH: Alterar uma informação no back-end
* DELETE: Deletar uma informação no back-end
*/

/**
 * Tipos de Parametros:
 * 
 * Query Params: Filtros e paginação, GET 
 * ex: localhost/3333?title=jeff&owron=jaja
 * Route Params: Identificar recursos ( Atualizar/deletar ), PUT = ID
 * Request Body: Conteudo na hora de criar e deletar um recurso 
 * (vem em JSON), post
 */

/**
 * Middleware:
 * 
 * Interceptador de requisições que interrompe totalmente a requisição 
 * ou alterar dados da requisição
 */

// Array fazio que ira armazenar os dados do request
const projects = [];

// Função que interrompe totalmente a requisição
// Retorna a rota da requição
function logRequests(request, response, next) {
  const { method, url } = request;

  const logLabel = `[${method.toUpperCase()}] ${url}`;

  console.time( logLabel ); // - Inicia a contagem do tempo da requisição;
  
  next(); // - passa para a proxima requisicao, ou seja, GET; // Próximo middleware
  
  console.timeEnd( logLabel ); // - Printa o tempo final da requisição;
}

// Middleware para validar ID
function validateProjectId(request, response, next) {
  const { id } = request.params;

  if(!isUuid( id )) {
    return response.status(400).json({ error: 'Invalid project ID.' });
  }

  return next();
}

app.use( logRequests );
// Especificando os requerimentos que sera aplicado o validateProjectId
app.use('/projects/:id', validateProjectId);

// buscar alguma informação utiliza-se GET
app.get('/projects', (request, response) => {
  const { title } = request.query;
  const results = title 
    ? projects.filter( project => project.title.includes( title ) )
    : projects;

  // console.log( title );
  // console.log( owner );

  return response.json( results );
});

// Criar alguma informação
app.post('/projects', (request, response) => {
  const { title, owner } = request.body;

  const project = { id: uuid(), title, owner };
  
  projects.push( project );

  return response.json( project );
});

// Método para atualizar alguma informação passando por parametro o ID
app.put('/projects/:id', (request, response) => {
  const { id } = request.params;
  const { title, owner } = request.body;

  // buscando o projeto na array projects de acordo com o ID fornecido
  //retornando o index do projeto no array
  const projectIndex = projects.findIndex( project => project.id === id )

  if (projectIndex < 0){
    return response.status(400).json({error: "Project not found!"});
  };

  // Criando um  novo projeto
  const project = { 
    id,
    title,
    owner,
  };

  //Trocando o projeto do index pelo novo project
  projects[ projectIndex ] = project;

  return response.json( project );
});

// Deletar alguma informação, passando o ID da informação que deseja excluir
app.delete('/projects/:id', (request, response) => {
  const { id } = request.params;

  const projectIndex = projects.findIndex( project => project.id == id);

  if ( projectIndex < 0 ){
    return response.status(400).json({ error: 'Project not found!'})
  }

  // splice retira a informação de dentro de um array, passando o index e o
  //conteudo
  projects.splice( projectIndex, 1 );
  
  // Caso o project nao tem conteudo, entao retorna o erro 204 por padrao
  return response.status(204).send();
});

// porta do localhost: ou seja localhost:3333
app.listen(3333, () => {
  //Definindo mensagens para exibir no console ao iniciar a aplicação
  console.log('🚀 back-end started!')
})

