// backend.js
import express from "express";
import cors from "cors";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

const users = {
    users_list: [
      {
        id: "xyz789",
        name: "Charlie",
        job: "Janitor"
      },
      {
        id: "abc123",
        name: "Mac",
        job: "Bouncer"
      },
      {
        id: "ppp222",
        name: "Mac",
        job: "Professor"
      },
      {
        id: "yat999",
        name: "Dee",
        job: "Aspring actress"
      },
      {
        id: "zap555",
        name: "Dennis",
        job: "Bartender"
      }
    ]
  };

app.get("/", (req, res) => {
  res.send("Hello World!");
});

function generateID() {
    return Math.floor(Math.random() * 1000);
}

const findUserByName = (name) => {
    return users["users_list"].filter(
      (user) => user["name"] === name
    );
  };

const findUserByNameJob = (name,job) => {
return users["users_list"].filter(
    (user) => user["name"] === name && user["job"] === job
);
};
  
const findUserById = (id) =>
users["users_list"].find((user) => user["id"] === id);

const removeUserById = (id) => {
    const initialUserLength = users["users_list"].length;
    users["users_list"] = users["users_list"].filter((user) => user["id"] != id)
    const newUserLength = users["users_list"].length
    return initialUserLength > newUserLength;
}
  
const addUser = (user) => {
    users["users_list"].push(user);
    return user;
};

app.get("/users", (req, res) => {
const name = req.query.name;
const job = req.query.job;
if (name != undefined) {
    if (job != undefined) {
        let result = findUserByNameJob(name, job);
        result = {users_list: result};
        res.status(200).send(result);
    }
    else{
        let result = findUserByName(name);
        result = { users_list: result };
        res.status(200).send(result);
    }
} else {
    console.log(users)
    res.status(200).send(users);
}
});


app.get("/users/:id", (req, res) => {
    const id = req.params["id"]; //or req.params.id
    let result = findUserById(id);
    if (result === undefined) {
        res.status(404).send("Resource not found.");
    } else {
        res.status(200).send(result);
    }
});

app.delete("/users/:id", (req, res) => {
    const id = req.params["id"]; //or req.params.id
    let result = removeUserById(id);
    if (result === undefined) {
        res.status(404).send("Resource not found.");
    } else {
        res.status(202).send(result);
    }
});

app.post("/users", (req, res) => {
    const userToAdd = req.body;
    userToAdd["id"] = generateID();
    addUser(userToAdd);
    res.status(201).send(userToAdd);
});

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});