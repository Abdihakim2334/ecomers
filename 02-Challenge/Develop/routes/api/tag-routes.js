const router = require('express').Router();
const { Tag, Product } = require('../../models');

// The `/api/tags` endpoint

// GET all tags with associated Products
router.get('/', async (req, res) => {
  try {
    const tags = await Tag.findAll({
      include: [
        {
          model: Product,
          attributes: ['id', 'product_name', 'price'], // Ensure these match the actual column names
          through: {
            attributes: [], // Exclude ProductTag table fields
          },
        },
      ],
    });
    res.status(200).json(tags);
  } catch (error) {
    console.error('Error fetching tags:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// POST a new tag
router.post('/', async (req, res) => {
  try {
    const { name } = req.body; // The request body should contain a 'name' field

    // Validate input
    if (!name || typeof name !== 'string') {
      return res.status(400).json({ error: 'Name is required and must be a string.' });
    }

    // Create a new tag
    const newTag = await Tag.create({ name });

    // Fetch and return the newly created tag with associated Products
    const fullTagData = await Tag.findByPk(newTag.id, {
      include: [
        {
          model: Product,
          attributes: ['id', 'name', 'price'],
          through: {
            attributes: [],
          },
        },
      ],
    });

    res.status(201).json(fullTagData);
  } catch (error) {
    console.error('Error creating tag:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// PUT update a tag by its `id` value
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    // Validate input
    if (!name || typeof name !== 'string') {
      return res.status(400).json({ error: 'Name is required and must be a string.' });
    }

    // Find the tag by ID
    const tag = await Tag.findByPk(id);

    if (!tag) {
      return res.status(404).json({ error: 'Tag not found.' });
    }

    // Update the tag's name
    await tag.update({ name });

    // Fetch and return the updated tag with associated Products
    const updatedTag = await Tag.findByPk(id, {
      include: [
        {
          model: Product,
          attributes: ['id', 'name', 'price'],
          through: {
            attributes: [],
          },
        },
      ],
    });

    res.status(200).json(updatedTag);
  } catch (error) {
    console.error('Error updating tag:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// DELETE a tag by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Find the tag by ID
    const tag = await Tag.findByPk(id);

    if (!tag) {
      return res.status(404).json({ error: 'Tag not found.' });
    }

    // Delete the tag
    await tag.destroy();

    // Return a success response
    res.status(204).end(); // No content to return
  } catch (error) {
    console.error('Error deleting tag:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
