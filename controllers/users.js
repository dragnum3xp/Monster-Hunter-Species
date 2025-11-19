const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
  //#swagger.tags=["Users"]
  try {
    const lists = await mongodb
      .getDatabase()
      .db("MonsterHunter")
      .collection("Users")
      .find()
      .toArray();

    res.status(200).json(lists);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const getSingle = async (req, res) => {
  //#swagger.tags=["Users"]

  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Must use a valid user id to find a contact.' });
  }

  try {
    const userId = new ObjectId(req.params.id);

    const result = await mongodb
      .getDatabase()
      .db("MonsterHunter")
      .collection("Users")
      .findOne({ _id: userId });

    if (!result) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.status(200).json(result);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createUser = async (req, res) => {
  //#swagger.tags=["Users"]
    const user = {
      firstName : req.body.firstName,
      lastName : req.body.lastName,
      email : req.body.email,
      password : req.body.password,
      birthDay : req.body.birthDay
    };
    try{
      const response = await mongodb.getDatabase().db("MonsterHunter").collection("Users").insertOne(user);
      if (response.acknowledged > 0) {
        res.status(204).send()
      } 
    }catch(err) {
        res.status(500).json({
      message: err.message || "Some error occurred while creating the User"});
      }
  };

const updateUser = async (req, res) => {
  //#swagger.tags=["Users"]
    const userId = new ObjectId(req.params.id);
    const user = {
      firstName : req.body.firstName,
      lastName : req.body.lastName,
      email : req.body.email,
      password : req.body.password,
      birthDay : req.body.birthDay

    };
    try{
      const response = await mongodb.getDatabase().db("MonsterHunter").collection("Users").replaceOne({ _id: userId}, user);
      if (response.modifiedCount > 0) {
        res.status(204).send()
      } 
    }catch(err) {
        res.status(500).json({
        message: err.message || "Some error occurred while updating the User"});
      }
  };

const deleteUser = async (req, res) => {
  //#swagger.tags=["Users"]
    const userId = new ObjectId(req.params.id);
    try{
    const response = await mongodb.getDatabase().db("MonsterHunter").collection("Users").deleteOne({ _id: userId});
    if (response.deletedCount > 0) {
      res.status(204).send()
    } 
  }catch(err) {
      res.status(500).json({
      message: err.message || "Some error occurred while deleting the User"});
  }
};


module.exports = {
    getAll,
    getSingle,
    createUser,
    updateUser,
    deleteUser
};