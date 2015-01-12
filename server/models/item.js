/**
 * Model for an Item.
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
  return sequelize.define("item", {
    //tags: DS.hasMany('tag', {
    //  async: true
    //}),
    name: DataTypes.STRING,
    slug: DataTypes.STRING,
    description: DataTypes.TEXT,
    album: DataTypes.INTEGER,
    //photos: DS.hasMany('photo'),
    brand: DataTypes.INTEGER,
    color_one: DataTypes.INTEGER,
    color_two: DataTypes.INTEGER,
    color_three: DataTypes.INTEGER,
    designer_id: DataTypes.STRING,
    gender: DataTypes.STRING,
    pattern_id: DataTypes.STRING,
    category_one_id: DataTypes.STRING,
    category_two_id: DataTypes.STRING,
    asin: DataTypes.STRING,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
    productUrl: DataTypes.STRING,
    msrp: DataTypes.STRING,
    privacy_setting: DataTypes.STRING,
    owner_type: DataTypes.STRING
  })
}
