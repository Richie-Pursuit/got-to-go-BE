const express = require('express');
const bathrooms_table  = express.Router();

const {
  getAllBathrooms,
  getOneBathroom,
  getBathroomName,
  getBathroomByZipcode
} = require('../Queries/bathrooms');

bathrooms_table.get('/', async (req, res) => {
    const allBathrooms = await getAllBathrooms();
    if (allBathrooms[0]) {
      res.status(200).json(allBathrooms);
    } else {
      res.status(500).json({ error: 'Unable to get all bathrooms' });
    }
  });

  bathrooms_table.get('/:id', async(req, res)=>{
    const { id } = req.params
    const oneBathroom = await getOneBathroom(id);
    if(oneBathroom){
      res.status(200).json(oneBathroom)
    }
    else{
      res.status(500).json({err: 'unable to get one bathroom'})
    }
  })

  bathrooms_table .get('/name/:name', async(req, res)=>{
    const { name }= req.params
    const bathroomName = await getBathroomName(name);
    if(bathroomName){
      res.status(200).json(bathroomName);
    }
    else{
      res.status(500).json({error: 'unable to get bathroom name'})
    }
  })

  bathrooms_table .get('/zipcode/:zipcode', async(req, res)=>{
    const { zipcode }= req.params
    const bathroomZipcode= await getBathroomByZipcode(zipcode);
    if(bathroomZipcode){
      res.status(200).json(bathroomZipcode);
    }
    else{
      res.status(500).json({error: 'unable to get bathroom name'})
    }
  })



  
  
  module.exports = bathrooms_table ;