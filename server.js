const express = require("express");
const chalk = require("chalk");
const morgan = require("morgan");
const mongoose = require("mongoose");
require("dotenv").config();
const methodOverride = require("method-override");
const postRoutes = require("./routes/post-routes");
const postApiRoutes = require("./routes/api-post-routes");
const contactRoutes = require("./routes/contact-routes");
const createPath = require("./helpers/create-path");

const errorMsg = chalk.bgKeyword("white").redBright;
const successMsg = chalk.bgKeyword("green").white;

const app = express();
const PORT = 8080;
app.set("view engine", "ejs");

mongoose
  .connect(
    "mongodb+srv://natalirak911:qwerty12345@cluster0.gcbkc0m.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(res => console.log(successMsg("Connected to DB")))
  .catch(error => console.log(errorMsg(error)));

app.listen(PORT, error => {
  error
    ? console.log(errorMsg(error))
    : console.log(successMsg(`listening port ${PORT}`));
});

app.use(express.urlencoded({ extended: false }));

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);

app.use(express.static("styles"));

app.use(methodOverride("_method"));

app.get("/", (req, res) => {
  const title = "Home";
  res.render(createPath("index"), { title });
});

app.use(postRoutes);
app.use(contactRoutes);
app.use(postApiRoutes);

app.use((req, res) => {
  const title = "Error Page";
  res.status(404).render(createPath("error"), { title });
});
