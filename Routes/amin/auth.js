const express = require("express");
const { check, validationResult } = require("express-validator");
const usersRepo = require("../../repositories/users");
const signupTemplate = require("../../views/admin/auth/signup");
const signinTemplate = require("../../views/admin/auth/signin");
const router = express.Router();

// Route 1:
router.get("/signup", async (req, res) => {
  res.send(signupTemplate({ req: req }));
});

//   Route 2:
router.post(
  "/signup",
  [
    check("email").trim().normalizeEmail().isEmail(),
    check("password").trim().isLength({ min: 4, max: 20 }),
    check("passwordConfirmation").trim().isLength({ min: 4, max: 20 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    console.log(errors);

    // const { email, passwordEntered, passwordConfirmation } = req.body;

    // const thisEmailExists = await usersRepo.getOneBy({ email });
    // if (thisEmailExists) {
    //   return res.send("Email in use");
    // }

    // if (passwordEntered !== passwordConfirmation) {
    //   return res.send(
    //     "both password entered and Password confirmation must match"
    //   );
    // }

    // CREATING USER RECORD:
    //1:  Create a user in our user repo to represent this person
    // const user = await usersRepo.create({ email, password });

    //2: Store the id of that user inside the user cookie using outside library to manage cookie called cookie-session npm
    // req.session.userId = user.id;

    // res.send("Account created!!!");
  }
);

//   Route 3:
router.get("/signout", (req, res) => {
  req.session = null;
  res.send("You are logged out");
});

//   Route 4:
router.get("/signin", (req, res) => {
  res.send(signinTemplate());
});

//   ROUTE 5:
router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  const user = await usersRepo.getOneBy({ email: email });

  if (!user) {
    return res.send("Email does not exist");
  }

  const validPassword = await usersRepo.comparepasswords(
    user.password,
    password
  );

  if (!validPassword) {
    return res.send("invalid password");
  }

  req.session.userId = user.id;

  res.send("You are logged in!");
});

module.exports = router;
