
const db = require('../db/dbConfig');


const getAllBathrooms = async () => {
  try {
    const allBathrooms = await db.any('SELECT * FROM bathrooms_table');
    return allBathrooms;
  } catch (error) {
    return error;
  }
};

// const getAllBathrooms = async () => {
//   try {
//     const query = 'SELECT * FROM bathrooms_table';
//     console.log('SQL Query:', query);
//     const allBathrooms = await db.any(query);
//     return allBathrooms;
//   } catch (error) {
//     console.error('Error:', error);
//     return error;
//   }
// };


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


module.exports = {
  getAllBathrooms,
  getOneBathroom,
  getBathroomName,
  getBathroomByZipcode
};
