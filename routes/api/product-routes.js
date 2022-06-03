const router = require("express").Router();
const { json } = require("body-parser");
const { Product, Category, Tag, ProductTag } = require("../../models");

// The `/api/products` endpoint

// get all products
router.get("/", (req, res) => {
  // find all products
  // be sure to include its associated Category and Tag data
  Product.findAll({
    attributes: ["id", "product_name", "price", "stock"],
    // Including associated Category and Tag data
    include: [
      // Including associated Category data
      {
        model: Category,
        attributes: ["category_name"],
      },

      // Including associated Tag data
      {
        model: Tag,
        attributes: ["tag_name"],
      },
    ],
  })
    .then((databaseCategoryData) => res.json(databaseCategoryData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// get one product
router.get("/:id", (req, res) => {
  // find a single product by its `id`
  // be sure to include its associated Category and Tag data

  Product.findOne({
    where: {
      id: req.params.id,
    },

    attributes: ["id", "product_name", "price", "stock"],
    // Incorporating Category and Tag data
    include: [
      // Incorporating Category data
      {
        model: Category,
        attributes: ["category_name"],
      },

      // Incorporating Tag data
      {
        model: Tag,
        attributes: ["tag_name"],
      },
    ],
  })
    .then((databaseCategoryData) => {
      if (!databaseCategoryData) {
        // Sending a status 400 message to the user if product with the given id is not found
        res.status(400).json({
          message: `Sorry, No product with id ${req.params.id} has been found! Please check your input and try again!`,
        });

        // Sending the product to the user if product with the given id is found
        return;
      }
      // Converting data to json format
      res.json(databaseCategoryData);
    })
    // Sending a status 500 to the user if the server encountered an unexpected condition that prevented it from fulfilling the request.
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// create new product
router.post("/", (req, res) => {
  /* req.body should look like this...
    {
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
      tagIds: [1, 2, 3, 4]
    }
  */
  Product.create(req.body)
    .then((product) => {
      // if there's product tags, we need to create pairings to bulk create in the ProductTag model
      if (req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      // if no product tags, just respond
      res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// update product
router.put("/:id", (req, res) => {
  // update product data
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      // find all associated tags from ProductTag
      return ProductTag.findAll({ where: { product_id: req.params.id } });
    })
    .then((productTags) => {
      // get list of current tag_ids
      const productTagIds = productTags.map(({ tag_id }) => tag_id);
      // create filtered list of new tag_ids
      const newProductTags = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });
      // figure out which ones to remove
      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

      // run both actions
      return Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    })
    .then((updatedProductTags) => res.json(updatedProductTags))
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
});

router.delete("/:id", (req, res) => {
  // delete one product by its `id` value
  Product.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((databaseCategoryData) => {
      // Sending a status 404 message to the user if no product with the given id is found
      if (!databaseCategoryData) {
        res.status(404).json({
          message: `Sorry, No product with id ${req.params.id} has been found! Please check your input and try again!`,
        });
        return;
      }
      res.json(databaseCategoryData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
