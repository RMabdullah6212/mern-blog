import express from "express";
import { deleteUser, test, updateUser } from "../controllers/user.controllers.js"
import { verifyToken } from "../utils/verifyUser.js";


const Router = express.Router();
Router.get('/test', test);
Router.put('/update/:userId', verifyToken, updateUser);  
Router.delete('/delete/:userId', verifyToken, deleteUser);  


export default Router;