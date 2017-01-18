
exports.up = knex => {
  return knex.schema.createTable('users', table => {
    table.increments();
    table.string('name').notNullable();
    table.string('email').notNullable();
    table.string('password').notNullable();
    table.string('access_token').notNullable();
    table.timestamps();
  });
};

exports.down = knex => {
  return knex.schema.dropTable('users');
};
