const express = require('express');
const router = express.Router();
const db = require('../db/dbConfig');

// Function to fetch public bathrooms
const getPublicBathrooms = async () => {
  try {
    const query = `
      SELECT bt.*, pt.is_public
      FROM bathrooms_table bt
      JOIN perks_table pt ON bt.id = pt.bathrooms_id
      WHERE pt.is_public = true
    `;
    const publicBathrooms = await db.any(query);
    return publicBathrooms;
  } catch (error) {
    console.error('Error fetching public bathrooms:', error);
    throw error;
  }
};

// Route to get public bathrooms
router.get('/public', async (req, res) => {
  try {
    const publicBathrooms = await getPublicBathrooms();
    res.status(200).json(publicBathrooms);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch public bathrooms' });
  }
});

module.exports = router;
