const cloudinary = require('../cloudinary');
const db = require('../db/dbConfig');

const getAllBathroomsPaginated = async (limit, offset) => {
  try {
    const allBathrooms = await db.any('SELECT * FROM bathrooms_table LIMIT $1 OFFSET $2', [limit, offset]);
    const modifiedBathrooms = allBathrooms.map((bathroom) => ({
      ...bathroom,
      image: bathroom.image,
    }));
    return modifiedBathrooms;
  } catch (error) {
    throw error;
  }
};

const getAllBathrooms = async () => {
  try {
    const allBathrooms = await db.any('SELECT * FROM bathrooms_table');
    const modifiedBathrooms = allBathrooms.map((bathroom) => ({
      ...bathroom,
      image: bathroom.image,
    }));
    return modifiedBathrooms;
  } catch (error) {
    return error;
  }
};


const getOneBathroom = async (id) => {
    try {
        const bathroomId = await db.one('SELECT * FROM bathrooms_table WHERE id=$1', id)
        return bathroomId
    } catch(error) {
        return error;
    }
};

const getBathroomName = async (name) => {
  try {
      const bathroomName = await db.one('SELECT * FROM bathrooms_table WHERE name=$1', name);
      return bathroomName;
  } catch (error) {
      return error;
  }
};

const getBathroomByZipcode = async (zipcode) => {
  try {
      const bathroom = await db.oneOrNone('SELECT * FROM bathrooms_table WHERE zipcode = $1', zipcode);
      return bathroom;
  } catch (error) {
      return error;
  }
};



// CREATE
const createBathroom = async (bathroom) => {
  let { name, address, city, zipcode, latitude, longitude, image } = bathroom;
console.log(bathroom)
  try {
      // Upload image to Cloudinary
      console.log('this line is running')
      // const cloudinaryResponse = await cloudinary.uploader.upload(image.path); 
      // console.log(cloudinaryResponse)
      // const imageUrl = cloudinaryResponse.secure_url;

      const newBathroom = await db.one(
          "INSERT INTO bathrooms_table (name, address, city, zipcode, latitude, longitude, image) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *",
          [name, address, city, zipcode, latitude, longitude, image]
      );
        console.log(newBathroom)
      return newBathroom;
  } catch (error) {
    console.log(error)
      return error;
  }
};





// DELETE
const deleteBathroom= async(id)=>{
  try{
    const deletedBathroom = await db.one('DELETE FROM bathrooms_table WHERE id=$1 RETURNING *', id)
    return deletedBathroom

  } catch(error){
    return error
  }
}

// UPDATE

const updateBathroom= async (id, bathroom) => {
  let {name, address, city, zipcode, latitude, longitude, image} = bathroom
  try{
    const updatedBathroom = await db.one(
    "UPDATE bathrooms_table SET name=$1, address=$2, city=$3, zipcode=$4, latitude=$5, longitude=$6, image=$7 where id=$8 RETURNING *",
    [name, address, city, zipcode, latitude, longitude, image, id]
  );
  return updatedBathroom;

  } catch(error){
    return error
  }
}




module.exports = {
  getAllBathrooms,
  getOneBathroom,
  getBathroomName,
  getBathroomByZipcode,
  createBathroom,
  deleteBathroom,
  updateBathroom,
  getAllBathroomsPaginated
};