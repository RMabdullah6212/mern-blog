import express from "express";
import { test, updateUser } from "../controllers/user.controllers.js"
import { verifyToken } from "../utils/verifyUser.js";


const Router = express.Router();
Router.get('/test', test);
Router.put('/update/:userId', verifyToken, updateUser);
  

export default Router;