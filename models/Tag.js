const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection.js");

class Tag extends Model {}

Tag.init(
  {
    // define columns

    // Defining tag id column
    id: {
      // These one defines the tag id as an integer value, otherwise it will be rejected
      type: DataTypes.INTEGER,
      // This one ensures that the id is not nullable
      allowNull: false,

      // Two of these define the id as a unique identifier that is automatically generated, incremented, and inserted
      primaryKey: true,
      autoIncrement: true,
    },

    // Defining tag name column
    tag_name: {
      // These one defines the tag name as a string value, otherwise it will be rejected, or it can be null
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "tag",
  }
);

module.exports = Tag;
