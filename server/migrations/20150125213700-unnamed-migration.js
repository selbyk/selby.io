"use strict";
var Sequelize = require('sequelize');

module.exports = {
  up: function(migration, DataTypes, done) {
    // add altering commands here, calling 'done' when finished
    migration.addColumn(
      'files',
      'etag',
      { type: Sequelize.STRING, allowNull: true}
    );
    done();
  },

  down: function(migration, DataTypes, done) {
    // add reverting commands here, calling 'done' when finished
    migration.removeColumn('files', 'etag')
    done();
  }
};
