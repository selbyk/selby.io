//========================================================================================
/*
/* FILE NAME: Modules/Instructor.js
/*
/* DESCRIPTION: Uses Sequelize to build a Department Model that will be used by the database
/*              to build the Department table
/*
/* AUTHORS: Chester Schofield, Alfonso Bausa
/*
/* REFERENCE:
/*
/* DATE BY CHANGE DESCRIPTION
/* ======== ======= ===========
/* 11/16/2014 Alfonso created instructor model
/* 11/17/2014 Chester Added base comments
/*
*/
//========================================================================================

/**
 * Model for a LSU Instructor. Only used by the back end.
 *
 * @class Sequelize Instructor Model
 * @constructor
 */

 /**
 * Constructs a new Sequelize Instructor Model
 *
 * @method Constructor
 * @param {String} Name
 * @param {Integer} Course Number
 * @param {String} Course Abbreviation
 * @param {String} Department
 * @param {Integer} Room Number
 * @param {String} Building Name
 */

module.exports = function(sequelize, DataTypes){
  return sequelize.define("instructor", {
	    name: DataTypes.STRING,
	    courseNumber: DataTypes.INTEGER,
	    courseAbbreviation: DataTypes.STRING,
	    department: DataTypes.STRING,
	    room: DataTypes.INTEGER,
	    building: DataTypes.STRING
  })
}
