// import important parts of sequelize library
const { Model, DataTypes } = require("sequelize");
// import our database connection from config.js
const sequelize = require("../config/connection");

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model {}

// set up fields and rules for Product model
Product.init(
  {
    // define columns

    // Defining id column
    id: {
      // These one defines the id as an integer value, otherwise it will be rejected
      type: DataTypes.INTEGER,
      // This one ensures that the id is not nullable, otherwise it will be rejected
      allowNull: false,

      // Two of these define the id as a unique identifier that is automatically generated, incremented, and inserted
      primaryKey: true,
      autoIncrement: true,
    },

    // Defining product name column
    product_name: {
      // These two define the product name as a string value that cannot be null, otherwise it will be rejected
      type: DataTypes.STRING,
      allowNull: false,
    },

    // Defining price column
    price: {
      // These two define the price as a decimal value that cannot be null, otherwise it will be rejected
      type: DataTypes.DECIMAL,
      allowNull: false,
      // This validation ensures that only decimal values are accepted, otherwise they will be rejected
      validate: {
        isDecimal: true,
      },
    },

    // Defining stock column
    stock: {
      // These two define the stock as an integer value that cannot be null, otherwise it will be rejected
      type: DataTypes.INTEGER,
      allowNull: false,

      // This one ensures that if a stock value is not supplied, the default value 20 will automatically inserted
      defaultValue: 20,
      // This validation ensures that only numeric values are accepted, otherwise they will be rejected
      validate: {
        isNumeric: true,
      },
    },

    // Defining category id column
    category_id: {
      // These one defines the category id as an integer value, otherwise it will be rejected
      type: DataTypes.INTEGER,

      // This defines a foreign key that references to the category id primary key (id)
      references: {
        model: "category",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "product",
  }
);

module.exports = Product;
