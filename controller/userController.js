const userModel = require("../models/userSchema");
const jwt = require("jsonwebtoken");
const createToken = (id) => {
  return jwt.sign({ id }, process.env.net_Secret, { expiresIn: maxTime });
};

const maxTime = 24 * 60 * 60; //24H
module.exports.addUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const role = "client";

    const user = await userModel.create({
      username,
      email,
      password,
      role,
    });

    res.status(201).json({ success: true, user });
  } catch (error) {
    console.log(" Erreur addUser :", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};


module.exports.getUsers = async (req, res) => {
  try {
    const users = await userModel.find()
    res.status(200).json({ success: true, users });
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ success: false, message: error.message });
  }
};



module.exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await userModel.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ success: false, message: "Utilisateur non trouvé" });
    }
    res.status(200).json({ success: true, message: "Utilisateur supprimé" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports.loginUser = async function (req, res) {
  try {
    const { email, password } = req.body;
    const user = await userModel.login(email, password);
    const token = createToken(user._id);

    res.cookie("jwt_login", token, {
      httpOnly: true,
      maxAge: maxTime * 1000,
    });

    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        username:user.username,
        email: user.email,
        role: user.role,
        status: user.status,
      },
      token, 
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};