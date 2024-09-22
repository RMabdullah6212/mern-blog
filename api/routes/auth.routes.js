import express from "express";
import { signup } from  '../controllers/auth.controllers.js'
const router = express.Router();
import { signin } from "../controllers/auth.controllers.js";
import { google } from "../controllers/auth.controllers.js";

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/google', google);

export default router;