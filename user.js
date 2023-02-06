const express = require('express'); 
const User = require("./modals/user");
const { encryptPassword, comparePassword } = require("./passencript");
const { createToken } = require("./tokenHandler");

const userRoute = (app) => {
  app.get("/", (req, res) => {
    res.send("Hello world");
  });

  app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
      const foundUser = await User.find({ email: email });
      if (foundUser.length > 0) {
        const isPasswordCorrect = await comparePassword(
          password,
          foundUser[0].hashedPassword
        );
        if (isPasswordCorrect === true) {
          const token = createToken(foundUser);
          return res.json({ token : `Bearer ${token}` });
        }
      }

      return res.send("password or email is incorrect");
    } catch (e) {
      console.log("e" , e)
     return res.send(500);
    }
  });

  app.post("/register", async (req, res) => {
    const { email, password } = req.body;
    try {
      const foundUser = await User.find({ email: email });
      if (foundUser.length > 0) {
        return res.send(400);
      }
      var hashedPassword = await encryptPassword(password);
      console.log("hashedPassword", hashedPassword);
      const user = User({
        hashedPassword: hashedPassword,
        email: email
      });

      const savedUser = await user.save();
      const token = createToken(savedUser);
      console.log("token",token)
      return res.json({ token : `Bearer ${token}` });
    } catch (e) {
      console.log("e", e);
      return res.send(500);
    }
  });
};

module.exports = { userRoute };
