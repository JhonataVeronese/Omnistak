// Cria a conexao do banco de dados
const connection = require("../database/connection");
//----------------------------------------------------------------------
// Exporta todos os metodos que tiverem dentro do exports
module.exports = {
    async create(request, response) {
        const { id } = request.body;
        const ong = await connection('ongs')
            .where('id', id)
            .select('name')
            .first();

        // Valida se existe ou nao a ong no banco dando um alert 
        if (!ong) {
            return response.status(400).json({ error: 'Sem ONG cadastrada para o id informado' });
        }

        // Retorna a ong que deu certo no caso somente o name, ja q é ele q ta na consulta
        return response.json(ong);
    },
}