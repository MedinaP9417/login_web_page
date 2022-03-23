const express = require("express");
const app = express();
const { pool } = require("./dbConfig");
const bcrypt = require("bcrypt");
const session = require("express-session");
const flash = require("express-flash");
const passport = require("passport");
const cors = require("cors");
const initializePassport = require("./passportConfig");

initializePassport(passport);

const PORT = process.env.PORT || 4000;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.json());

app.use(
  session({
    secret: "secret",

    resave: false,

    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/users/register", checkAuthenticated, (req, res) => {
  res.render("register");
});
app.get("/users/login", checkAuthenticated, (req, res) => {
  res.render("login");
});
app.get("/users/dashboard", checkNotAuthenticated, (req, res) => {
  res.render("dashboard", { user: req.user.name });
});
app.get("/users/logout", (req, res) => {
  req.logOut();
  req.flash("success_msq", "You have logged out.");
  res.redirect("/users/login");
});
app.post("/users/register", async (req, res) => {
  let { name, email, password, password2 } = req.body;

  console.log({
    name,
    email,
    password,
    password2,
  });

  let errors = [];

  if (!name || !email || !password || !password2) {
    errors.push({ message: "Please enter all fields" });
  }
  if (password.length < 6) {
    errors.push({ message: "Password should be at least 6 characters long!" });
  }
  if (password !== password2) {
    errors.push({ message: "Password do not match" });
  }
  if (errors.length > 0) {
    res.render("register", { errors });
  } else {
    let hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);

    pool.query(
      `SELECT * FROM users
      WHERE email = $1`,
      [email],
      (err, results) => {
        if (err) {
          throw err;
        }
        console.log(results.rows);
        if (results.rows.length > 0) {
          errors.push({ message: "Email already registered!" });
          res.render("register", { errors });
        } else {
          pool.query(
            `INSERT INTO users (name, email, password)
                VALUES ($1, $2, $3)
                RETURNING id, password`,
            [name, email, hashedPassword],
            (err, results) => {
              if (err) {
                throw err;
              }
              console.log(results.rows);
              req.flash(
                "success_msq",
                "You are now registered. Please log in."
              );
              res.redirect("/users/login");
            }
          );
        }
      }
    );
  }
});

app.post(
  "/users/login",
  passport.authenticate("local", {
    successRedirect: "/users/dashboard",
    failureRedirect: "/users/login",
    failureFlash: true,
  })
);

app.post("/users/dashboard/questions", async (req, res) => {
  try {
    // console.log(req.body)
    const { description } = req.body;
    const newQuestion = await pool.query(
      "INSERT INTO question (description) VALUES($1) RETURNING *",
      [description]
    );
    res.json(newQuestion.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/users/dashboard/questions", async (req, res) => {
  try {
    const allQuestions = await pool.query("SELECT * FROM question");
    res.json(allQuestions.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/users/dashboard/questions/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const question = await pool.query(
      "SELECT * FROM  question WHERE question_id = $1",
      [id]
    );
    res.json(question.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

app.delete("/users/dashboard/questions/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteQuestion = await pool.query(
      "DELETE FROM question WHERE question_id = $1",
      [id]
    );
    res.json("Question was deleted!");
  } catch (err) {
    console.error(err.message);
  }
});

app.put("/users/dashboard/questions/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updateQuestion = await pool.query(
      "UPDATE question SET description = $1 WHERE question_id = $2",
      [description, id]
    );
    res.json("Question was updated");
  } catch (err) {
    console.error(err.message);
  }
});
function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/dashboard");
  }
  next();
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect("/users/login");
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
