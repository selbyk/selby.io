//========================================================================================
/* 
/* FILE NAME: Modules/Course.js
/* 
/* DESCRIPTION: Uses Sequelize to build a Course Model that will be used by the database 
/*              to build the Course table
/* 
/* AUTHORS: Chester Schofield, 
/*
/* REFERENCE: 
/* 
/* DATE BY CHANGE DESCRIPTION
/* ======== ======= =========== 
/* 11/01/2014 Chester Created the model
/* 11/17/2014 Chester Added base comments 
/* 
*/ 
//========================================================================================

/**
 * Model for a LSU Course. Only used by the back end.
 *
 * @class Sequelize Course Model
 * @constructor 
 */

 /**
 * Constructs a new Sequelize Course Model
 *
 * @method Constructor
 * @param {String} Available
 * @param {String} Enrollment Count
 * @param {String} Course Abbreviation
 * @param {Integer} Course Number
 * @param {String} Course Type
 * @param {Integer} Section Number
 * @param {String} Course Title
 * @param {Decimal} Credit Hour
 * @param {DateTime} Time Begin
 * @param {DateTime} Time End
 * @param {String} Days
 * @param {Integer} Room Number
 * @param {String} Building Name
 * @param {String} Special Enrollment
 * @param {String} Instructor Name
 */

module.exports = function(sequelize, DataTypes){
  return sequelize.define("course", {
    available: DataTypes.STRING,
    enrollmentCount: DataTypes.STRING,
    courseAbbrivation: DataTypes.STRING,
    courseNumber: DataTypes.INTEGER,
    type: DataTypes.STRING,
    sectionNumber: DataTypes.INTEGER,
    courseTitle: DataTypes.STRING,
    creditHour: DataTypes.DECIMAL(1, 1),
    timeBegin: DataTypes.DATE,
    timeEnd: DataTypes.DATE,
    days: DataTypes.STRING,
    room: DataTypes.INTEGER,
    building: DataTypes.STRING,
    specialEnrollment: DataTypes.STRING,
    instructor: DataTypes.STRING
  })
}
