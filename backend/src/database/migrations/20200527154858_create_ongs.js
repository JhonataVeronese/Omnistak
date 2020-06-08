/**
 * Arquivo responsavel pelos migrations, da tabela ong, cada tabela deve ter o seu arquivo de migraçao
 * Documentaçao: http://knexjs.org/ 
 */
exports.up = function (knex) {// Sempre responsavel pela criaçao da tabela
    // criando a tabela
    return knex.schema.createTable('ongs', function (table) {
        // Cria as colunas da tabela do banco de dados
        table.string('id').primary();
        table.string('name').notNullable();
        table.string('email').notNullable();
        table.string('whatsapp').notNullable();
        table.string('city').notNullable();
        table.string('uf', 2).notNullable();
    });
};

exports.down = function (knex) {// Caso der problema na migrçao, entao o compando down é executando
    // Remove a tabela do banco de dados
    return knex.schema.dropTable('ongs');
};
