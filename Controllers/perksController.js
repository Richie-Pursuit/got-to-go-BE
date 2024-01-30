const express = require('express');
const perks_table  = express.Router();

const {
    getAllPerks, 
    getPerk, 
    createPerk, 
    deletePerk, 
    updatePerk
  
} = require('../Queries/perks');


// GET ALL

perks_table .get('/', async (req, res) => {
    const { perks_id } = req.params
  
    const allPerks= await getAllPerks(perks_id)
    if (allPerks[0]) {
      res.status(200).json(allPerks)
    } else {
      res.status(500).json({ error: 'Internal Server Error'})
    }
  })
  
  // Show Route

perks_table.get('/:id', async (req, res) => {
    const { id } = req.params;
    const perk = await getPerk(id);
    console.log('perk', perk);
    if (perk[0]) {
      res.status(200).json(perk);
    } else {
      res.status(400).json({ error: ' Post Not found' });
    }
    
  });

  //CREATE
perks_table.post('/', async (req, res) => {
    try {
      const perk = await createPerk(req.body);
      res.status(200).json(perk);
    } catch (error) {
      res.status(500).json({ error: 'Cannot create a post error' });
    }
  });

  // Delete

perks_table.delete('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const deletedPerk = await deletePerk(id);
      res.status(200).json(deletedPerk);
    } catch (error) {
      res.status(500).json({ error: 'invalid request to remove a perk' });
    }
  });

  perks_table.put('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const updatedPerk = await updatePerk(id, req.body);
      res.status(200).json(updatedPerk);
    } catch (error) {
      res.status(500).json({ error: 'Cannot update perk error' });
    }
  });
  
  module.exports = perks_table;
