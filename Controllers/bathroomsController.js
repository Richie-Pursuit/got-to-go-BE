const express = require('express');
const bathrooms_table  = express.Router();

const {
  getAllBathrooms,
  getOneBathroom,
  getBathroomName,
  getBathroomByZipcode,
  createBathroom,
  deleteBathroom,
  updateBathroom,
  getAllBathroomsPaginated
  
} = require('../Queries/bathrooms');

// show all

bathrooms_table.get('/', async (req, res) => {
  const { page = 1, limit = 10 } = req.query; // Default to page 1 and 10 items per page
  try {
    const offset = (page - 1) * limit;
    const allBathrooms = await getAllBathroomsPaginated(limit, offset);
    if (allBathrooms[0]) {
      res.status(200).json(allBathrooms);
    } else {
      res.status(500).json({ error: 'Unable to get all bathrooms' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
  // show by ID

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



  // show by name

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

  // get by zipcode 

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

  // CREATE
bathrooms_table.post("/",  async (req, res) => {
  try {
    const newBathroom = await createBathroom(req.body);
    res.status(200).json(newBathroom);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});



// DELETE

bathrooms_table.delete("/:id", async (req, res) => {
  try{ 
  const { id } = req.params;
  const deletedBathroom = await deleteBathroom(id);
  res.status(200).json(deletedBathroom)
  }catch(error){
    res.status(404).json({error: 'id not found'})
  }
});

// UPDATE

bathrooms_table.put("/:id", async (req, res) => {
  try{
    const { id } = req.params;
    const updatedBathroom = await updateBathroom(id, req.body);
    res.status(200).json(updatedBathroom);
    }catch(error){
      res.status(404).json({error: 'bathroom not found'})
    }
});




  
  
  module.exports = bathrooms_table ;