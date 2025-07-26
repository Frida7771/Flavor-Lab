import express from "express";
import * as userController from "../controllers/user-controller.js";
import * as authController from "../controllers/auth-controller.js";

const router = express.Router();
// Route to create a new user
router.post('/', userController.createUser);
// Route to get a user based on id
router.get('/:id', userController.getUser);
// Route to update a user based on id
router.put('/:id',userController.updateUser);
// Route to delete a user based on id
router.delete('/:id', userController.deleteUser);
export default router;