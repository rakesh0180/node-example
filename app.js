const express = require("express");
const app = express();
//use to read incoming json/data
app.use(express.json());
const port = 8080;

const customers = [
  { id: 1, name: "ABC" },
  { id: 2, name: "BCD" },
  { id: 3, name: "CDE" },
  { id: 4, name: "DEF" },
];
//Request handler
app.get("/", (req, res) => {
  res.send("welcome to home" + port);
});

app.get("/customers", (req, res) => {
  res.json(customers);
});

app.get("/customers/:cid", (req, res) => {
  const id = +req.params.cid;
  const customer = customers.find((customer) => customer.id === id);
  console.log(customer);
  if (customer) {
    res.json(customer);
  } else {
    {
      res.json({ error: "Customer not found." });
    }
  }
});

app.post("/customers", (req, res) => {
  const body = req.body;
  console.log(body);
  res.json(body);
});

//put
app.put("/customers/:id", (req, res) => {
  const id = req.params.id;
  const body = req.body;
  res.send(`put request sent to the server ${id}`);
});

// delete
app.delete("/customers/:id", (req, res) => {
  const id = req.params.id;
  const body = req.body;
  res.send(`delete request sent to the server ${id}`);
});

app.listen(port, () => {
  console.log("server running on port", port);
});
