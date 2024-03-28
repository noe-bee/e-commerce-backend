const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

//GET all categories & its associated Product data
router.get("/", async (req, res) => {
  try {
    const categoryData = await Category.findAll(req.body, {
      include: [{ model: Product }],
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET a single category by its `id` & its associated Products
router.get("/:id", async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    if (!categoryData) {
      return res
        .status(404)
        .json({ message: "No category found with this id!" });
      // return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//CREATE a new category
/*
{
	"category_name": "Gloves"
}
*/
router.post("/", async (req, res) => {
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

//UPDATE a category by its `id` value
/*
{
	"category_name": "Jackets"
}
*/
router.put("/:id", async (req, res) => {
  try {
    const categoryData = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!categoryData) {
      return res
        .status(404)
        .json({ message: "No category found with this id!" });
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE a category by its `id` value
router.delete("/:id", async (req, res) => {
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!categoryData) {
      return res
        .status(404)
        .json({ message: "No category found with this id!" });
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
