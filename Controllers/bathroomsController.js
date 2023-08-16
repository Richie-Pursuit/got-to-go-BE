const express = require('express');
const bathrooms = express.Router();

const {
  getAllBathrooms,
  getOneBathroom,
  getBathroomName
} = require('../Queries/bathrooms');

bathrooms.get('/', async (req, res) => {
    const allBathrooms = await getAllBathrooms();
    if (allBathrooms) {
      res.status(200).json(allBathrooms);
    } else {
      res.status(500).json({ error: 'Unable to get all bulletin posts' });
    }
  });

  bathrooms.get('/:id', async(req, res)=>{
    const id = req.params.id
    const oneBathroom = await getOneBathroom(id);
    if(oneBathroom){
      res.status(200).json(oneBathroom)
    }
    else{
      res.status(500).json({err: 'unable to get one bathroom'})
    }
  })

  bathrooms.get('/name/:name', async(req, res)=>{
    const name= req.params.name
    const bathroomName = await getBathroomName(name);
    if(bathroomName){
      res.status(200).json(bathroomName);
    }
    else{
      res.status(500).json({error: 'unable to get bathroom name'})
    }
  })
  
  module.exports = bathrooms;