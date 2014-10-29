"use strict";

module.exports = {
  up: function(migration, dataTypes, done) {
    migration.createTable('subscribers', {
      id: {
        type: dataTypes.UUID,
        primaryKey: true,
        defaultValue: dataTypes.UUIDV4
      },
      created_at: dataTypes.DATE,
      updated_at: dataTypes.DATE,
      sent_at: dataTypes.DATE,
      deleted_at: dataTypes.DATE,
      endpoint: dataTypes.STRING,
      product: dataTypes.STRING
    }).done(done);
  },

  down: function(migration, dataTypes, done) {
    migration.dropTable('subscribers').done(done);
  }
};
