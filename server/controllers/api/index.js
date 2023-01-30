import express from "express";
import config from "config";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import generateToken from "../../middleware/auth/generateToken.js";
import {
  loginValidation,
  registerValidation,
  errorMiddleware,
} from "../../middleware/validation/index.js";
import userModel from "../../models/user/index.js";



const router = express.Router();

router.post(
  "/signup",
  registerValidation(),
  errorMiddleware,
  async (req, res) => {
    try {
      let { name, userId, email, password } = req.body;
      console.log("data", req.body);
      // //Basic Validations
      if (!name || !userId || !email || !password) {
        return res.status(400).json({ error: "Some Fields Are Missing " });
      }

      //Check Duplication of Email
      let Gotmail = await userModel.findOne({ email });
      if (Gotmail) {
        return res.status(409).json({ error: "Email Already exist" });
      }

      //Check Duplication of Userid
      let GotuserId = await userModel.findOne({ userId });
      if (GotuserId) {
        return res.status(409).json({ error: "userId Already exist" });
      }

      // Hashing the Password:-
      req.body.password = await bcrypt.hash(req.body.password, 10);
      let userData = req.body;

      const allusers = new userModel(userData);

      await allusers.save();

      res.status(200).json({ success: "User Signed Up Succesfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);


router.post("/login", loginValidation(), errorMiddleware, async (req, res) => {
    try {
        let { userId, password } = req.body;
        if (!userId || !password) {
            return res.status(400).json({ error: "Some Fields Are Missing " });
        }

        let userFound = await userModel.findOne({ userId })
        if (!userFound) {
            return res.status(401).json({ error: "Invalid Credentials. User not found" });
        }
        
        let matchPassword = await bcrypt.compare(req.body.password, userFound.password)
        // console.log(matchPassword);
        if (!matchPassword) {
            return res.status(401).json({ error: "Incorrect Password" });
        }

        let payload = {
            user_id: userFound._id,
            role: "user"
        }

        //GENERATE A TOKEN
        const token = generateToken(payload);

      
        res.status(200).json({ success: "Login is Successful", token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" })
    }
});

export default router;
