/**
 * Arquivo responsavel pelos migrations, da tabela incidents, cada tabela deve ter o seu arquivo de migraçao
 * Documentaçao: http://knexjs.org/ 
 */
exports.up = function (knex) {
    // criando a tabela
    return knex.schema.createTable('incidents', function (table) {
         //Auto incrementodo do id
         table.increments();
         // Cria as colunas da tabela do banco de dados
         table.string('title').notNullable();
         table.string('description').notNullable();
         table.decimal('value').notNullable();
         // Relacionamento
         table.string('ong_id').notNullable();
 
         // Creando o vinculo
         table.foreign('ong_id').references('id').inTable('ongs');
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('incidents');
};
