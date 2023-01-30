import { body, validationResult } from "express-validator";

function loginValidation() {
  return [
    body("userId", "userId Is Required").notEmpty(),
    body("password", "Passowrd is Required").notEmpty(),
  ];
}

function registerValidation() {
  return [
    body("name", "Name is Required").notEmpty().isLength({ max: 30 }),
    body("userId", "userId should be Min 8 Characters")
      .notEmpty()
      .isLength({ min: 8, max: 12 }),
    body("email", "Email Is Invalid").isEmail(),
    body(
      "password",
      "Password should be Min 8 Characters, Atleast 1 Uppercase, 1 Lowercase, 1 Number, 1 Special Character"
    ).isStrongPassword(),
  ];
}

function locationValidation(){
  return [
    body("name", "Name is Required").notEmpty().isLength({ max: 30 }),
    body("locationName", "locationName is Required").notEmpty()
  ];
}

function errorMiddleware(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  return next();
}

export { loginValidation, registerValidation,locationValidation, errorMiddleware };
