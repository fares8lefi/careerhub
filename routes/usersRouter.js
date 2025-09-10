var express = require('express');
var router = express.Router();
const userController= require("../controller/userController")
/* GET users listing. */
router.post("/addUser",userController.addUser)


module.exports = router;
