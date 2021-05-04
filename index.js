const express = require("express");
const cookieSession = require("cookie-session");
const bodyParser = require("body-parser");
const usersRepo = require("./repositories/users");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cookieSession({
    keys: ["a;kwj0sjklsdjfw09s"],
  })
);

app.get("/signup", (req, res) => {
  res.send(`
    <div>
    Your ID is: ${req.session.userId}
      <form method="POST">
        <input name="email" placeholder="email" />
        <input name="password" placeholder="password" />
        <input name="passwordConfirmation" placeholder="password confirmation" />
        <button>Sign Up</button>
      </form>
    </div>
  `);
});

app.post("/signup", async (req, res) => {
  const { email, password, passwordConfirmation } = req.body;

  const existingUser = await usersRepo.getOneBy({ email });
  if (existingUser) {
    return res.send("Email in use");
  }

  if (password !== passwordConfirmation) {
    return res.send("Passwords must match");
  }

  // CREATING USER RECORD:
  //1:  Create a user in our user repo to represent this person
  const user = await usersRepo.create({ email, password });

  //2: Store the id of that user inside the user cookie using outside library to manage cookie called cookie-session npm
  req.session.userId = user.id;

  res.send("Account created!!!");
});

app.get("/signout", (req, res) => {
  req.session = null;
  res.send("You are logged out");
});

app.get("/signin", (req, res) => {
  res.send(`
  <div>
    <form method="POST">
      <input name="email" placeholder="email" />
      <input name="password" placeholder="password" />
      <button>Sign in</button>
    </form>
  </div>
  `);
});

app.post("/signin", async (req, res) => {});

app.listen(3000, () => {
  console.log("Listening");
});
