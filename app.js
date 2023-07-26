const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser"); // Add this line
const app = express();
// app.use(bodyParser.json());
//use to read incoming json/data
app.use(express.json());
const port = 3055;

// establish connection to database
mongoose
  .connect("mongodb://127.0.0.1:27017/july2023")
  .then((result) => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log("error " + err);
  });

//Request handler
app.get("/", (req, res) => {
  res.send("welcome to home" + port);
});

//creating a task schema
const Schema = mongoose.Schema;
const taskSchema = new Schema({
  title: {
    type: String,
    // required:true
    required: [true, "title is required"],
  },
  description: { type: String },
  completed: { type: Boolean },
  dueDate: { type: Date },
  createdAt: { type: Date, default: Date.now },
});

// model
const Task = mongoose.model("Task", taskSchema);

// task API
const taskUrl = "/api/tasks";

// get all task
app.get(`${taskUrl}`, (req, res) => {
  Task.find()
    .then((tasks) => {
      res.json(tasks);
    })
    .catch((err) => {
      res.json(err);
    });
});

// create task
app.post(`${taskUrl}`, (req, res) => {
  const body = req.body;
  const task = new Task(body);
  // we can remove below code by passing body to task
  // const task = new Task(body);
  // task.title = body.title;
  // task.description = body.description;
  // task.completed = body.completed;
  // task.dueDate = body.dueDate;
  // task.createdAt = body.createdAt;
  task
    .save()
    .then((task) => {
      res.json(task);
    })
    .catch((err) => {
      res.json(err);
    });
});

//find one task
app.get(`${taskUrl}/:id`, (req, res) => {
  const id = req.params.id;
  console.log(req.params);
  Task.findById(id)
    .then((task) => {
      res.json(task);
    })
    .catch((err) => {
      res.json(err);
    });
});

// update task
app.put(`${taskUrl}/:id`, (req, res) => {
  const id = req.params.id;
  const body = req.body;
  console.log("body", body);
  // Task.findByIdAndUpdate(id, body); it provide found record
  // runValidators:true check the validation
  Task.findByIdAndUpdate(id, body, { new: true, runValidators: true })
    .then((task) => {
      res.json(task);
    })
    .catch((err) => {
      res.json(err);
    });
});

//delete task

app.delete(`${taskUrl}/:id`, (req, res) => {
  const id = req.params.id;
  Task.findByIdAndDelete(id)
    .then((task) => {
      res.json(task);
    })
    .catch((err) => {
      res.json(err);
    });
});

app.listen(port, () => {
  console.log("server running on port ", port);
});
