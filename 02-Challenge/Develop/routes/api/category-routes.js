const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/',async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const allCategorys= await Category.findAll({
      include:[Product]
    })
    res.status(200).json(allCategorys)
  } catch (err) {
    console.error(err)
    res.status(500).json(err)
    
  }
});

router.get('/:id',async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const oneCategory = await Category.findOne({
      where:{id:req.params.id},
      include:[Product]
    })
    res.status(200).json(oneCategory)

  } catch (err) {
    console.error(err)
    res.status(500).json(err)
    
  }
});

router.post('/',async (req, res) => {
  // create a new category
  try {
    const twoCategory = await Category.create(req.body)
    res.status(200).json(twoCategory)
  } catch (err) {
    console.error(err)
    res.status(500).json(err)
    
  }
});

router.put('/:id',async (req, res) => {
  // update a category by its `id` value
  try {
    const update = await Category.update(req.body,{
      where:{id:req.params.id}
    })
    res.status(200).json(update)
  } catch (err) {
    console.error(err)
    res.status(500).json(err)
    
  }
});

router.delete('/:id',async (req, res) => {
  // delete a category by its `id` value
  try {
    const deleteCategory = await Category.destroy({
      where:{id:req.params.id}
    })
    res.status(200).json(deleteCategory)
  } catch (err) {
    console.error(err)
    res.status(500).json(err)
    
  }
});

module.exports = router;
