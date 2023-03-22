import { Router } from "express";
import { body, check } from "express-validator";
import * as authBLL from "../BLL/authBLL";
import * as authMiddlewares from "../middlewares/authMiddlewares";

const router = Router();

//Endpoint localhost:3000/auth

/*gets the jwt token from cookies and verifies it
if is loggend in - get the home page, if not, get the login page*/
router.get(
  "/",
  authMiddlewares.jwtMiddleware,
  authBLL.getHomePage,
  authBLL.getLoginPage
);

router.get("/signup", authBLL.getSignupPage);

export default router;
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
