import express from "express";
import * as authController from "../controllers/auth-controller.js";

const router = express.Router();
// Route to login
router.post('/login',authController.checkUser);
// Route to google login
router.post('/', authController.googleLoginVerify);

export default router;
