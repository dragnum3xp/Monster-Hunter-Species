const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
  //#swagger.tags=["MonsterHunterSpecies"]
  try {
    const lists = await mongodb
      .getDatabase()
      .db("MonsterHunter")
      .collection("MonsterHunterSpecies")
      .find()
      .toArray();

    res.status(200).json(lists);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const getSingle = async (req, res) => {
  //#swagger.tags=["MonsterHunterSpecies"]
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Must use a valid monster id to find a contact.' });
  }

  try {
    const monsterId = new ObjectId(req.params.id);

    const result = await mongodb
      .getDatabase()
      .db("MonsterHunter")
      .collection("MonsterHunterSpecies")
      .findOne({ _id: monsterId });
    if (!result) {
      return res.status(404).json({ message: 'Monster not found.' });
    }
    res.status(200).json(result);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const createMonster = async (req, res) => {
  //#swagger.tags=["MonsterHunterSpecies"]
    const monster = {
      SpeciesName : req.body.SpeciesName,
      Classification : req.body.Classification,
      Element : req.body.Element,
      FirstAppearance : req.body.FirstAppearance,
      HasOwnTheme : req.body.HasOwnTheme,
      LastAppearance : req.body.LastAppearance,
      Weakness : req.body.Weakness
    };
  try {
    const response = mongodb 
      .getDatabase()
      .db("MonsterHunter")
      .collection("MonsterHunterSpecies").insertOne(monster);
    if (response.acknowledged > 0) {
      res.status(204).send()
    } 
  }catch(err) {
      res.status(500).json({
      message: err.message || "Some error occurred while creating the monster"})
    }
};

const updateMonster = async (req, res) => {
  //#swagger.tags=["MonsterHunterSpecies"]
    const monsterId = new ObjectId(req.params.id);
    const monster = {
      SpeciesName : req.body.SpeciesName,
      Classification : req.body.Classification,
      Element : req.body.Element,
      FirstAppearance : req.body.FirstAppearance,
      HasOwnTheme : req.body.HasOwnTheme,
      LastAppearance : req.body.LastAppearance,
      Weakness : req.body.Weakness

    };
    try{
      const response = await mongodb.getDatabase().db("MonsterHunter").collection("MonsterHunterSpecies").replaceOne({ _id: monsterId}, monster);
      if (response.modifiedCount > 0) {
        res.status(204).send()
      } 
    }catch(err) {
        res.status(500).json({
      message: err.message || "Some error occurred while updating the monster"});
      }
};

const deleteMonster = async (req, res) => {
  //#swagger.tags=["MonsterHunterSpecies"]
    const monsterId = new ObjectId(req.params.id);
    try{
      const response = await mongodb.getDatabase().db("MonsterHunter").collection("MonsterHunterSpecies").deleteOne({ _id: monsterId});
      if (response.deletedCount > 0) {
        res.status(204).send()
      } 
    }catch (err) {
        res.status(500).json({
      message: err.message || "Some error occurred while deleting the monster"});
      }
};


module.exports = {
    getAll,
    getSingle,
    createMonster,
    updateMonster,
    deleteMonster
};