/**
 * Arquivo reponsavel por conter todas as rodas da APP.
 * (Como se fosse um Logic statico ou entao um ENUM para acessar as rotas de um unico lugar.)
 * 
 * ANOTAÇOES
 * '/' ROTA / RECURSO, sempre que for acessar alguma coisa depois do localhost:8080/ é um recurso de alguma coisa, no caso uma tabela, metodo e afins
 * METODOS HTTP:
 * GET: Bucar/listar informação no back
 * POST: Criar informaçao no back
 * PUT: Alterar informaçao no back
 * DELETE: deleta uma informaçao back
 * 
 * obs: funciona tudo com get, mais o correto é usar cada metodo para o evento correto
 */

//-------------------------------------------------------------------
// Importa o express para o arquivo
const express = require('express');
// separa do express o modulo de rota em uma variavel
const routes = express.Router();
// Importa o controller criado para o ong e de insidentes, assim o metodo que esta nessa classe de ong, muda e fica dentro dessa classe
const ongsController = require('./controllers/OngController');
const insidentController = require('./controllers/IncidentController');
const profileController = require('./controllers/ProfileController');
const sessionController = require('./controllers/SessionController');

//-------------------------------------------------------------------

/**
 * TIPOS DE PARAMETROS ( vao dentro da url)
 * Query Params: Parametros nomeados que vao nas rotas (?) apos o simpolo, e serve para filtros/paginaçao (igual no sim3g)
 * Route params: Parametros utilizados para identificar recuros (/:id)
 * Request body: Corpo da requisiçao, utilizado para criar ou alterar recursos
 */
// OBS: Antes era acessado direto pelo app, mudando para classe routes, entao agora acessa pela variavel routes
routes.get('/pega/:id', (request, response) => {
    // todas as requests ficam no metodo REQUEST - Query Params 
    const requestParams = request.query; // recupera todos os parametros que foram passados com o ? e nome de atributos
    console.log(requestParams);// Printa as coisas no console
    return response.json({
        evento: 'Semana cagada',
        aluno: "Jhonata"
    })
});
//-------------------------------------------------------------------
//Valida o login, (id da ong) para saber se é ou nao possivel listar os insidents dessa ong logada
routes.post('/session', sessionController.create);
//-------------------------------------------------------------------

// Cria uma ong
// passado o parametro async pois a requisiçao pode demorar
// Chama a classe ongsController e o meotodo create, antes o fera tava aqui, agora foi jogando para  uma classe separada
routes.post('/ongs', ongsController.create);
// Lista o que tiver cadastrado em ongs
routes.get('/ongs', ongsController.index);
// Metodos do incidents
//-------------------------------------------------------------------
routes.post('/incidents', insidentController.create);
// A listagem index esta paginada, com isso a passagem seria como abaixo
// A passagem de parametros query seria assim: http://localhost:3333/incidents?page=1
routes.get('/incidents', insidentController.index);
routes.delete('/incidents/:id', insidentController.delete);
//-------------------------------------------------------------------
//Lista os incidents por ongsController, 
routes.get('/profile', profileController.index);

//-------------------------------------------------------------------
// Exporta todas as rotas que foram adicionadas na variavel routes
module.exports = routes;
