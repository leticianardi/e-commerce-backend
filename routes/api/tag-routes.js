const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// find all tags
router.get('/', (req, res) => {
  Tag.findAll({
    // attributes: ['tag_name'],
    include: [
      {
        model: Product,
        through: ProductTag
      }
    ]
  })
    .then((tag) => res.json(tag))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  Tag.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Product,
        through: ProductTag
      }
    ]
  })
    .then((tag) => res.json(tag))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// create a new tag
router.post('/', (req, res) => {
  Tag.create(req.body)
    .then((tag) => res.json(tag))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// update a tag
router.put('/:id', (req, res) => {
  Tag.update(req.body, {
    where: {
      id: req.params.id
    }
  })
    .then((tag) => res.json(tag))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// delete a tag
router.delete('/:id', (req, res) => {
  Tag.destroy({
    where: {
      id: req.params.id
    }
  })
    .then((tag) => {
      console.log(tag);
      res.json(tag);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
