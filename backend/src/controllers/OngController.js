// Cria a conexao do banco de dados
const connection = require("../database/connection");
// import de criptografia direto do node
const crypto = require('crypto');
//----------------------------------------------------------------------
// Exporta todos os metodos que tiverem dentro do exports
module.exports = {
    // Metodo de criaçao que recebe por parameto uma request e reponse, e retorna o id criado ( antes era feito dentro do arquivo routes, direto, agora foi separado em uma classe )
    //-----------------------------------------------------------------------------
    async create(request, response) {
        // Pega tudo em uma variavel
        const data = request.body;
        console.log(data);// Printa as coisas no console
        // pega de maneira desestruturada direto em variaveis
        const { name, email, whatsapp, city, uf } = request.body;
        // Gera uma string "criptografada"
        const id = crypto.randomBytes(4).toString('HEX');

        // usando o await, para aguardar a executaçao. em casos de execuçoes mais demoradas
        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf
        });
        return response.json({ id });
    },
    //-----------------------------------------------------------------------------

    // Metodo para listar tudo
    //-----------------------------------------------------------------------------
    async index(request, response) {
        // faz uma select * from na tabela ongs trazendo tudo
        const ongs = await connection('ongs').select('*');

        // Joga o retorno (array) no json
        return response.json(ongs);
    },
}