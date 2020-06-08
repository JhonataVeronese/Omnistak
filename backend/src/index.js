//-------------------------------------------------------------------
const express = require('express'); // importa as coisa do express para serem utilizadas
const app = express(); // variavel da aplicaçao
const routes = require('./routes');// Importa o arquivo de rotas, como se fosse um ENUM ou um serviceLogic
//-------------------------------------------------------------------

//Aqui é adicionado as coisas que a aplicaçao vai usar, como se fosse um import de classes ou recursos
// Faz com que qlqr json que venha por request seja interpretado pela app, qndo usando o metodo post
app.use(express.json());
// Faz a adiçao do arquivo importando "routes" na nossa aplicaçao
app.use(routes);

// Usando a rota direto no index
// app.get('/pega/:id', (request, response) => {
//     // todas as requests ficam no metodo REQUEST - Query Params 
//     const requestParams = request.query; // recupera todos os parametros que foram passados com o ? e nome de atributos
//     console.log(requestParams);// Printa as coisas no console
//     return response.json({
//         evento: 'Semana cagada',
//         aluno: "Jhonata"
//     })
// });

// app.post('/posta', (request, response) => {
//     const routeParams = request.body;
//     console.log(routeParams);// Printa as coisas no console
//     return response.json({
//         evento: 'Semana cagada',
//         aluno: "Jhonata"
//     })
// });


app.listen(3333); // se abrir a pagina nessa porta, vai cair aqui

//-------------------------------------------------------------------
//-------------------------------------------------------------------
// Anotaçoes
/**
 * BANCO DE DADOS
 * SQL: Postgres, SQLite da vida e afins
 * NoSQL: MongoDB, CouchDB
 */

/**
 * Como usar:
 * Driver: instala o drive do banco e dai da de usar a sql pura
 * Query builder: table('user').select('*') - KNEX.JS  é a biblioteca para query builder ( dai é tipo na ws)
 */