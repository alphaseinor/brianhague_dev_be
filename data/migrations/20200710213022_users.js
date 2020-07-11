exports.up = function(knex) {
  return knex.schema.createTable('users', users => {
    users.increments()
    users.string('username', 50)
      .notNullable()
      .unique()
    users.string('email', 255)
      .notNullable()
      .unique()
    users.string('password', 255)
      .notNullable()
    users.boolean('is_confirmed')
      .notNullable()
    users.string('confirmation_num')
      .notNullable()
    users.boolean('is_active')
      .notNullable()
    users.boolean('is_twofactor')
      .notNullable()
    users.string('twofactor_num')
    users.string('twofactor_type')
    users.string('phone')
    users.boolean('is_admin')
      .notNullable()
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users')
};
