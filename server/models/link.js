/**
 * Model for a link.
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
  return sequelize.define("link", {
    title: DataTypes.STRING,
    url: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { isUrl: { msg: 'Invalid URL' } }
    },
    description: DataTypes.TEXT,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE
  })
}
