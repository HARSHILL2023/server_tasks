const express = require("express");

const app = express();

app.use(express.json());



let users = [
  {
    uid: 108243,
    att: "80",
    total_sub: 14,
    bonus: "20",
    name: "jay"
  },
  {
    uid: 108242,
    att: "80",
    total_sub: 14,
    bonus: "20",
    name: "ronak"
  },
  {
    uid: 108241,
    att: "80",
    total_sub: 14,
    bonus: "20",
    name: "harshil"
  }
];


app.get("/", (req, res) => {
  res.send("Express server is running");
});



app.get("/users", (req, res) => {
  res.status(200).json(users);
});


app.get("/users/:uid", (req, res) => {

  const uid = Number(req.params.uid);

  const user = users.find(u => u.uid === uid);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json(user);
});



app.post("/users", (req, res) => {

  const { uid, att, total_sub, bonus, name } = req.body;

  if (!uid || !name) {
    return res.status(400).json({
      message: "uid and name are required"
    });
  }

 
  const exists = users.find(u => u.uid === uid);

  if (exists) {
    return res.status(400).json({
      message: `User with uid ${uid} already exists`
    });
  }

  const newUser = {
    uid,
    att,
    total_sub,
    bonus,
    name
  };

  users.push(newUser);

  res.status(201).json({
    message: "User added successfully",
    user: newUser
  });
});


app.put("/users/:uid", (req, res) => {

  const uid = Number(req.params.uid);

  const index = users.findIndex(u => u.uid === uid);

  if (index === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  users[index] = {
    ...users[index],
    att: req.body.att,
    total_sub: req.body.total_sub,
    bonus: req.body.bonus,
    name: req.body.name
  };

  res.status(200).json({
    message: "User updated successfully",
    user: users[index]
  });
});


app.delete("/users/:uid", (req, res) => {
  const userId = Number(req.params.uid);
  const index = users.findIndex(u => u.uid === userId);

  if (index === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  users.splice(index, 1);

  res.status(204).end();
});

app.listen(5000, () => {
  console.log("Server started on port 5000");
});