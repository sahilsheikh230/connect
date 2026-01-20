import express from "express";
import { registerUser,loginUser,meet,roomjoin,history} from "../controller/userController.js";
import { validateLogin, verifyUser } from "../auth/validateLogin.js";

const router = express.Router();

router.post("/signup", registerUser);
router.post("/login", validateLogin, loginUser);
router.get("/meet", verifyUser, meet);
router.get("/meet/:id",verifyUser,roomjoin)
router.get("/history",verifyUser,history);
export default router;
