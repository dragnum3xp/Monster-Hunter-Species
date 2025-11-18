const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = (req, res) => {
  //#swagger.tags=["Users"]
  mongodb
    .getDb()
    .db("MonsterHunter")
    .collection("Users")
    .find()
    .toArray((err, lists) => {
      if (err) {
        res.status(400).json({ message: err });
      }
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
};


const getSingle = (req, res) => {
  //#swagger.tags=["Users"]
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid user id to find a contact.');
  }
  const userId = new ObjectId(req.params.id);
  mongodb
    .getDb()
    .db("MonsterHunter")
    .collection("Users")
    .find({ _id: userId })
    .toArray((err, result) => {
      if (err) {
        res.status(400).json({ message: err });
      }
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(result[0]);
    });
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
    const response = await mongodb.getDatabase().db("MonsterHunter").collection("Users").insertOne(user);
    if (response.acknowledged > 0) {
      res.status(204).send()
    } else {
      res.status(500).json(response.error || "Some error occurred while creating the User");
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
    const response = await mongodb.getDatabase().db("MonsterHunter").collection("Users").replaceOne({ _id: userId}, user);
    if (response.modifiedCount > 0) {
      res.status(204).send()
    } else {
      res.status(500).json(response.error || "Some error occurred while updating the User");
    }
};

const deleteUser = async (req, res) => {
  //#swagger.tags=["Users"]
    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db("MonsterHunter").collection("Users").deleteOne({ _id: userId});
    if (response.deletedCount > 0) {
      res.status(204).send()
    } else {
      res.status(500).json(response.error || "Some error occurred while deleting the User");
    }
};


module.exports = {
    getAll,
    getSingle,
    createUser,
    updateUser,
    deleteUser
};