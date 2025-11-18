const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
  //#swagger.tags=["MonsterHunterSpecies"]
    const result = await mongodb.getDatabase().db("MonsterHunter").collection("MonsterHunterSpecies").find();
    result.toArray().then((MonsterHunterSpecies) => {
      res.setHeader("content-type", "application/json");
      res.status(200).json(MonsterHunterSpecies);
    })
};


const getSingle = async (req, res) => {
  //#swagger.tags=["MonsterHunterSpecies"]
    const monsterId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db("MonsterHunter").collection("MonsterHunterSpecies").find({ _id: monsterId});
    result.toArray().then((MonsterHunterSpecies) => {
      res.setHeader("content-type", "application/json");
      res.status(200).json(MonsterHunterSpecies[0]);
    })
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
    const response = await mongodb.getDatabase().db("MonsterHunter").collection("MonsterHunterSpecies").insertOne(monster);
    if (response.acknowledged > 0) {
      res.status(204).send()
    } else {
      res.status(500).json(response.error || "Some error occurred while creating the monster");
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
    const response = await mongodb.getDatabase().db("MonsterHunter").collection("MonsterHunterSpecies").replaceOne({ _id: monsterId}, monster);
    if (response.modifiedCount > 0) {
      res.status(204).send()
    } else {
      res.status(500).json(response.error || "Some error occurred while updating the monster");
    }
};

const deleteMonster = async (req, res) => {
  //#swagger.tags=["MonsterHunterSpecies"]
    const monsterId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db("MonsterHunter").collection("MonsterHunterSpecies").deleteOne({ _id: monsterId});
    if (response.deletedCount > 0) {
      res.status(204).send()
    } else {
      res.status(500).json(response.error || "Some error occurred while deleting the monster");
    }
};


module.exports = {
    getAll,
    getSingle,
    createMonster,
    updateMonster,
    deleteMonster
};