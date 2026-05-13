const express = require("express");
const connectDB = require("./config/db");
const passport = require("passport");
const session = require("express-session");
const chatRoutes = require("./routes/chatRoutes");
const flashcardRoutes = require("./routes/flashcardRoutes");
require("dotenv").config();


connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require("./config/passport");
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/api/flashcards", flashcardRoutes);
app.use("/api/chat", chatRoutes);
app.use("/auth", require("./routes/googleAuthRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/documents", require("./routes/documentRoutes"));


app.get("/", (req, res) => {
  res.send("API Running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});