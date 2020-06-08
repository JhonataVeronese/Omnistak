// Cria a conexao do banco de dados
const connection = require("../database/connection");
//----------------------------------------------------------------------
// Exporta todos os metodos que tiverem dentro do exports
module.exports = {
    // Metodo de criaçao que recebe por parameto uma request e reponse, e retorna o id criado ( antes era feito dentro do arquivo routes, direto, agora foi separado em uma classe )
    //-----------------------------------------------------------------------------
    async create(request, response) {
        const { title, description, value } = request.body; //  Pega o corpo da request,
        const ong_id = request.headers.authorization; // pega o id que esta sendo mandado via cabeçalho da requisiçao

        //persiste no banco e ja joga para uma varialve chamada id
        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id
        });
        return response.json({ id });
    },
    //-----------------------------------------------------------------------------

    // Metodo para listar tudo
    //-----------------------------------------------------------------------------
    async index(request, response) {

        // pega do request, todos os parametros passados por query parans, 
        // jogando na variavel page, porem caso nao exista esse parametro no query, entao a page ja inicia com o valor 1
        // A passagem de parametros query seria assim: http://localhost:3333/incidents?page=2
        const { page = 1 } = request.query;

        // const [count] = count[0] = declarar a variavel com [] ja pega o primeiro registro que vier do array
        // Contador para retornar na pesquisa de paginaçao
        const [count] = await connection('incidents').count();
        console.log(count);
        // Devolve o count na head do response.
        response.header('X-Total-Count', count['count(*)']);
        //-----------------------------------------------------------------------------
        // faz uma select * from na tabela incidents trazendo tudo
        //const allIncidents = await connection('incidents').select('*');
        //console.log(allIncidents); // Lista tudo do banco sem paginaçao
        //-----------------------------------------------------------------------------
        // Paginaçao em 5 em 5 registros
        const incidents = await connection('incidents')
            .join('ongs', 'ong_id', '=', 'incidents.ong_id')// Faz o join entre ong e o incidente, relacionado todos que forem iguais, retornando todos os dados das duas tabelas
            .limit(5)// Limite por pagina
            .offset((page - 1) * 5) // para buscar a proxima pagina, page -1 * 5 para saber quais sao os proximos 5 registros a serem buscados
            // Retorna colunas especificas das tabelas
            .select(['incidents.*',
                'ongs.name',
                'ongs.email',
                'ongs.whatsapp',
                'ongs.city',
                'ongs.uf']); //.select('*'); assim retorna tudo das duas tabelas.

        // Joga o retorno (array) no json
        return response.json(incidents);
    },

    // Metodo para deletar
    //-----------------------------------------------------------------------------
    async delete(request, response) {
        const { id } = request.params;// recupera o id a ser removido
        const ong_id = request.headers.authorization; //  recupera a ong q ele pertence, para validar se pode ou nao ser removido
        // busca do banco o incident para ser removido, com base no id que veio da request
        const insident = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first();

        // Valida se o id do incident do banco é o mesmo do que ta vindo na request, se for o mesmo sobe um erro
        if (insident.ong_id != ong_id) {
            return response.status(401).json({ error: 'Operação de removação invalida' });
            // Status 401 para erros de operaçoes, adicinando a msg no json
        }
        // Caso nao seja o mesmo id entao remove o registro
        await connection('incidents').where('id', id).delete();
        return response.status(204).send();
        // Status 204 para operaçoes q deram sucesso sem resposta, e o send apenas para enviar 
    },
}