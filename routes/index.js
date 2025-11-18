const router = require("express").Router();

router.use("/", require("./swagger"));

router.get("/", (req, res) => (
    //#swagger.tags=["Happy Hunting"]
    res.send("Happy Hunting")));

router.use("/monsters", require("./monsters"));

router.use("/users", require("./users"));

module.exports = router;