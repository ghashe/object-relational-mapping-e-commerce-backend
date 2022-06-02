const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection");

class ProductTag extends Model {}

ProductTag.init(
  {
    // define columns

    // Defining product tag id column
    id: {
      // These one defines the product tag id as an integer value, otherwise it will be rejected
      type: DataTypes.INTEGER,
      // This one ensures that the product tag id is not nullable, otherwise it will be rejected
      allowNull: false,

      // Two of these define the product tag id as a unique identifier that is automatically generated, incremented, and inserted
      primaryKey: true,
      autoIncrement: true,
    },

    // Defining product id column as a foreign key
    product_id: {
      // These one defines the product id as an integer value, otherwise it will be rejected
      type: DataTypes.INTEGER,

      // This defines a foreign key that references to the product primary key column (id)
      references: {
        model: "product",
        key: "id",
      },
    },

    // Defining tag id column as a foreign key
    tag_id: {
      // These one defines the tag id as an integer value, otherwise it will be rejected
      type: DataTypes.INTEGER,

      // This defines a foreign key that references to the tag primary key column (id)
      references: {
        model: "tag",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "product_tag",
  }
);

module.exports = ProductTag;
