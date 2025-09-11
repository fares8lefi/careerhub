var express = require('express');
var router = express.Router();
const userController= require("../controller/userController")
/* GET users listing. */
router.post("/addUser",userController.addUser)
router.get("/getUsers",userController.getUsers)
router.get("/deleteUser/:id",userController.deleteUser)
router.get("/loginUser",userController.loginUser)
module.exports = router;
