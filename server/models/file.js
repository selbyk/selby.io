module.exports = function(sequelize, DataTypes){
  return sequelize.define("file", {
    size: DataTypes.INTEGER,
    path: DataTypes.STRING,
    type: DataTypes.STRING,
    name: DataTypes.STRING,
    etag: DataTypes.STRING,
    encoding: DataTypes.STRING,
    description: DataTypes.TEXT,
    url: DataTypes.STRING,
    private: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    lastModifiedDate: DataTypes.DATE,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE
  })
}
