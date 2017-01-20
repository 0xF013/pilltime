
exports.up = knex => {
  return knex.schema.createTable('timers', table => {
    table.increments();
    table.string('pill_name').notNullable();
    table.string('dosage').notNullable();
    table.string('injestion_time').notNullable();
    table.integer('user_id').notNullable();
    table.foreign('user_id').references('users.id');
    table.timestamps();
  });
};

exports.down = knex => {
  return knex.schema.dropTable('timers');
};
