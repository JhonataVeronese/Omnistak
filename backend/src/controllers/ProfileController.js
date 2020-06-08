/**
 * Classe criada para ter metodos por perfil, ou seja o MVC so permite 5 metodos por controle, com isso para uma lista 
 * especifica, entao criamos uma classe que ira conter todas as listas por perfil que iremos precisar
 */

// Cria a conexao do banco de dados
const connection = require("../database/connection");
module.exports = {
    async index(request, response) {
        const ong_id = request.headers.authorization;
        const incidents = await connection('incidents')
            .where('ong_id', ong_id)
            .select('*');

        return response.json(incidents);
    },
};