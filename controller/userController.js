const userModel = require("../models/userSchema");


module.exports.addUser = async (req, res) => {
  try {
    const {username, email, password}= req.body ;
    const role="client"
    const user= await userModel.create(
        username,
        email,
        password,
        role
    )
    res.status(200).json({ user });
  } catch (error) {
    console.log(error.message )
    res.status(500).json({ message: error.message });
  }
};