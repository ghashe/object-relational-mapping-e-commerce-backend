const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", (req, res) => {
  // find all tags
  // be sure to include its associated Product data

  Tag.findAll({
    // Including associated Products data
    include: {
      model: Product,
      attributes: ["product_name", "price", "stock", "category_id"],
    },
  })
    .then((databaseTagData) => res.json(databaseTagData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data

  Tag.findOne({
    where: {
      id: req.params.id,
    },

    // Incorporating Product data
    include: {
      model: Product,
      attributes: ["product_name", "price", "stock", "category_id"],
    },
  })
    .then((databaseTagData) => {
      if (!databaseTagData) {
        // Sending a status 400 message to the user if Tag with the given id is not found
        res
          .status(400)
          .json(
            `Sorry, No tag with id =>: ${req.params.id} has been found! Please check your input and try again!`
          );

        // Sending the tag to the user if tag with the given id is found
        return;
      }
      // Converting data to json format
      res.json(databaseTagData);
    })
    // Sending a status 500 to the user if the server encountered an unexpected condition that prevented it from fulfilling the request.
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/", (req, res) => {
  // create a new tag
  Tag.create({
    tag_name: req.body.tag_name,
  })
    .then((databaseTagData) =>
      res
        .status(200)
        .json(
          `Tag with tag name => ${req.body.tag_name} has been successfully created!`
        )
    )
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put("/:id", (req, res) => {
  // The first step is to verify that the tag with the provided id exists
  Tag.findOne({
    where: {
      id: req.params.id,
    },

    include: {
      model: Product,
      attributes: ["product_name", "price", "stock", "category_id"],
    },
  }).then((databaseTagData) => {
    // If the Tag with the given id doesn't exists, sending a status 400 message to the user
    if (!databaseTagData) {
      res
        .status(400)
        .json(
          `Sorry, No tag with id ${req.params.id} has been found! Please check your input and try again!`
        );
      // Sending the tag to the user if tag with the given id is found
      return;
    }
    // If the Tag with the given id exists, then update the tag
    Tag.update(
      {
        tag_name: req.body.tag_name,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    )
      .then((databaseCategoryData) => {
        res
          .status(200)
          .json(
            `Tag with id =>: ${req.params.id} has been successfully updated!`
          );
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  });
});

router.delete("/:id", (req, res) => {
  // delete on tag by its `id` value

  Tag.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((databaseTagData) => {
      // Sending a status 404 message to the user if no tag with the given id is found
      if (!databaseTagData) {
        res
          .status(404)
          .json(
            `Sorry, No tag with id ${req.params.id} has been found! Please check your input and try again!`
          );
        return;
      }
      res.json(
        `Tag with tag id =>: ${req.params.id} has been successfully removed`
      );
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
