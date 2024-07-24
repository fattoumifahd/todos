const mongodb = require("mongoose");
mongodb.connect("mongodb://localhost:27017/", {
  dbName: "todos",
});
//  , err => err ?
//  console.log(err) :
//  console.log("connected to database")

const todosSchema = new mongodb.Schema({
  name: {
    type: String,
    required: true,
  },
  categorie: {
    type: String,
    require: false,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

const todos = mongodb.model("todos", todosSchema);
const result = todos.find({});
// console.log(result)

const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
// app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.get("/", () => {
  console.log("app working succesfuly");
});
app.get("/todos", (req, res) => {
  todos
    .find({})
    .then((result) => {
      console.log(JSON.stringify(result));
      res.send(JSON.stringify(result));
    })
    .catch((err) => {
      res.send({ error: err });
    });
});

app.listen(5000);
