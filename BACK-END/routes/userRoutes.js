import { LogoutUser, authUser, getUserProfile, updateUserProfile,registerUser } from "../controllers/userController.js";
import express from 'express';
 import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post('/',registerUser);
router.post('/auth',authUser);
router.post('/logout',LogoutUser)
router.route('/profile').get(protect,getUserProfile).put(protect,updateUserProfile)


export  default router