//========================================================================================
/*
/* FILE NAME: Department.js
/*
/* DESCRIPTION: Uses Sequelize to build a Department Model that will be used by the database
/*              to build the Course table
/*
/* AUTHORS:
/*
/* REFERENCE:
/*
/* DATE BY CHANGE DESCRIPTION
/* ======== ======= ===========
/* 11/17/2014 Chester Added base comments
/*
*/
//========================================================================================

/**
 * Model for a LSU Department. Only used by the back end.
 *
 * @class Sequelize Department Model
 * @constructor
 */

 /**
 * Constructs a new Sequelize Department Model
 *
 * @method Constructor
 * @param {String} Name
 */

module.exports = function(sequelize, DataTypes){
  return sequelize.define("department", {
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    departmentAbbreviation: {type: DataTypes.STRING, unique: true, allowNull: true}
  })
}
