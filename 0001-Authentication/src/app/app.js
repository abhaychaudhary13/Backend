import express from "express";
import jwt from "jsonwebtoken";

import userModel from "../models/user.model.js";

import { authenticate } from "../middleware/auth.middleware.js";

import dotenv from "dotenv";
dotenv.config();


const app = express();

app.use(express.json());

app.get("/api", (req, res) => {
  res.status(200).json({
    message: "Welcome to Authantication Api",
  });
});

//Register API
app.post("/api/auth/register", async(req, res) => {
  const { name, email, password } = req.body;

  /**
   * sava data to DataBase
   */

  //create token

  const user = await userModel.create({
    email, name , password
  })

  const token = jwt.sign(
    {
     id: user._id
    },
    //jwt_secret Key
    process.env.JWT_SECRET,
  );
  res.status(201).json({
    message: "User Created successfully",
    data: {
      user: {
        email,
        name,
        id:user._id
      },
      token,
    },
  });
});

app.get("/api/auth/me",authenticate, async(req,res) =>{

      console.log(req.user)

      res.status(200).json({
        data:{
          user:req.user
        }
      })   
})

export default app;
