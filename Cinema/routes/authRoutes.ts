import { Router } from "express";
import { body, check } from "express-validator";
import * as authBLL from "../BLL/authBLL";
import * as authMiddlewares from "../middlewares/authMiddlewares";

const router = Router();

//Endpoint localhost:3000/auth

//
router.post(
  "/signup",
  [
    body("userName")
      .isEmail()
      .withMessage("Please enter a valid email address."),
    body("password")
      .trim()
      .isStrongPassword()
      .withMessage("Password not strong enough."),
  ],
  authBLL.postSignup
);

router.post(
  "/login",
  [
    body("userName")
      .isEmail()
      .withMessage("Please enter a valid email address.")
      .trim(),
  ],
  authBLL.postLogin
);

router.post("/logout", authBLL.postLogout);

export default router;
