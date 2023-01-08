const router = require("express").Router()
const User = require("../model/User")
const jwt = require('jsonwebtoken')
const bcrypt = require("bcrypt")
const cors = require('cors')

// register
router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10)
    const hashedPass = await bcrypt.hash(req.body.password, salt)

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPass,
    })

    const user = await newUser.save()
    res.status(200).json(user)
  } catch (error) {
    res.status(500).json(error)
  }
})

// login

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email })
    //if no user
    !user && res.status(400).json("Wrong Credntials!")

    //if same user then compare password
    const validate = bcrypt.compare(req.body.password, user.password)
    //if not validate
    !validate && res.status(400).json("Wrong Credentials!")

    const token = jwt.sign({email: user.email, password: user.password},"secret",{"expiresIn": "4hr"}); 
    const { password, ...other } = user._doc;
    const response = {token: token, other: other}; res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error)
  }
})
module.exports = router
