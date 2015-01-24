"use strict";
var Sequelize = require('sequelize');

module.exports = {
  up: function(migration, DataTypes, done) {
    // add altering commands here, calling 'done' when finished
    migration.addColumn(
      'posts',
      'private',
      { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: true }
    );
    done();
  },

  down: function(migration, DataTypes, done) {
    // add reverting commands here, calling 'done' when finished
    migration.removeColumn('posts', 'private')
    done();
  }
};
