// const fs = require('fs');
// const db = require('../db/dbConfig');
const bathroomData = require('../bathrooms.json')

const getAllBathrooms = async () => {
  try {
    return bathroomData;
  } catch (error) {
    return error;
  }
};

const getOneBathroom = async (id) => {
    try {
        return bathroomData.find(bathroom => bathroom.id === id  )
    } catch(error) {
        return error;
    }
};

const getBathroomName = async = (name) => {
    try {
        return bathroomData.find( bathroom => bathroom.name === name )
    } catch(error){
        return error;
    }
}

module.exports = {
  getAllBathrooms,
  getOneBathroom,
  getBathroomName
};
