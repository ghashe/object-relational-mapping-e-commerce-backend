const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection.js");

class Category extends Model {}

Category.init(
  {
    // define columns

    // Defining id column
    id: {
      // These two define the category id as an integer value that cannot be null, otherwise it will be rejected
      type: DataTypes.INTEGER,
      allowNull: false,

      // Two of these define the category id as a unique identifier that is automatically generated, incremented, and inserted
      primaryKey: true,
      autoIncrement: true,
    },
    category_name: {
      // These two define the category name as a string value that cannot be null, otherwise it will be rejected
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "category",
  }
);

module.exports = Category;
