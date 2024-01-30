const db = require('../db/dbConfig');

const getAllPerks = async (groups_id) => {
    try {
      const allPerks = await db.any('SELECT * FROM perks_table ');
      return allPerks;
    } catch (error) {
      return error;
    }
  };

  const getPerk = async (bathrooms_id) => {
    try {
      const post = await db.any('SELECT * FROM perks_table WHERE bathrooms_id=$1', bathrooms_id);
      return post;
    } catch (error) {
      return error;
    }
  };

  const createPerk = async (singlePerk) => {
    let { bathrooms_id, accessibility, baby_changing, family_room,open,close,is_public } = singlePerk;
    try {
      const newPerk = await db.one(
        'INSERT INTO perks_table (bathrooms_id, accessibility, baby_changing, family_room, open, close, is_public ) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
        [bathrooms_id, accessibility, baby_changing,, family_room, open, close, is_public]
      );
      return newPerk;
    } catch (error) {
      return error;
    }
  };

  const deletePerk = async (id) => {
    try {
      const deletedPerk = await db.one(
        'DELETE FROM perks_table WHERE id=$1 RETURNING *',
        id
      );
      return deletedPerk;
    } catch (error) {
      return error;
    }
  };

  const updatePerk = async (id, singlePerk) =>{
    let {bathrooms_id, accessibility, baby_changing, family_room,open,close,is_public} = singlePerk
    try {
        const updatedPerk = await db.one(
            'UPDATE posts SET bathrooms_id=$1, accessibility=$2, baby_changing=$3, family_room=$4, open=$5, close=$6, is_public=$7 WHERE id=$8 RETURNING *',
            [bathrooms_id, accessibility, baby_changing, family_room,open,close,is_public, id]
        )
        return updatedPerk
    } catch (error) {
        return error
    }
};
  

  module.exports = { getAllPerks, getPerk, createPerk, deletePerk, updatePerk}