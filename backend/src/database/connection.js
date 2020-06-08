const knex = require('knex'); //  import do knex
const configuration = require('../../knexfile'); // importa o arquivo de configuraçao do knex
const connection = knex(configuration.development);// importa a configuraçao de desenvovimento
module.exports = connection;// exporta a conexao criada para ser executada em outra classe ou metodo
