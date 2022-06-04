const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    include: {
      model: Product,
      attributes: ["id", "product_name", "price", "stock", "category_id"],
    },
  })
    .then((databaseCategoryData) => {
      if (!databaseCategoryData) {
        res
          .status(400)
          .json({ message: "Sorry, this category has not been found!" });
        return;
      }
      res.json(databaseCategoryData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({
    where: {
      id: req.params.id,
    },
    include: {
      model: Product,
      attributes: ["id", "product_name", "price", "stock", "category_id"],
    },
  })
    .then((databaseCategoryData) => {
      if (!databaseCategoryData) {
        res
          .status(400)
          .json(
            `Sorry, No category with id =>: ${req.params.id} has been found! Please check your input and try again!`
          );
        return;
      }
      res.json(databaseCategoryData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/", (req, res) => {
  // create a new category
  Category.create(req.body, {
    category_name: req.body.category_name,
  })
    .then((databaseCategoryData) => res.json(databaseCategoryData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put("/:id", (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((databaseCategoryData) => {
      if (!databaseCategoryData) {
        res
          .status(400)
          .json(
            `Sorry, No category with id =>: ${req.params.id} has been found! Please check your input and try again!`
          );
        return;
      }
      res.json(databaseCategoryData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete("/:id", (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((databaseCategoryData) => {
      if (!databaseCategoryData) {
        res.status(400).json({
          message: "Sorry, with the provided id category has not been found!",
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
