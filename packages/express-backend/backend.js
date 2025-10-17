import express, { json } from "express";
import cors from "cors";
import userService from "./user-services.js";

const {
    addUser,
    getUsers,
    findUserById,
    findUserByName,
    findUserByJob,
    deleteUserById,
    findUserByNameAndJob
} = userService;


const app = express();
const port = 8000;
  
app.use(cors());
app.use(express.json());
  
app.get("/users", (req,res) => {
    const name = req.query.name;
    const job = req.query.job;
    if(name && job)
    {
        findUserByNameAndJob(name,job)
        .then((users) => {
            if(users && users.length > 0) {
                res.status(200).send({ users_list: users }); // Send the filtered result
        } else {
          res.status(404).send("User not found with the specified name and job.");
        }
      })
      .catch((error) => {
        console.error("Error while fetching user by name and job:", error);
        res.status(500).send("Error fetching user from database.");
      });
    } 
    else {
    getUsers(name, job)
      .then((users) => {
        res.send({ users_list: users });
      })
      .catch((error) => {
        console.error("Error while fetching users:", error);
        res.status(500).send("Error fetching users from database.");
      });
  }
});

app.get("/users/:id", (req,res) => {
    const _id = req.params["id"];
    findUserById(_id)
    .then((user) => {
        if(user) {res.send(user)}
        else(res.status(404).send("User not found in database"))
    })
    .catch((error) => {
        console.error("Error while finding user : ", error);
        res.status(404).send("Error while finding user in database")
    })
})

app.post("/users",(req,res) =>{
    const new_user = req.body;
    addUser(new_user)
    .then((added_user) => {
        res.status(201).send(added_user)
    })
    .catch((error) => {
        console.error("Error while inserting user in Database :",error);
        res.status(500).send("Error while inserting user")
    })
});

app.delete("/users/:id", (req, res) => {
    const userId = req.params.id;
    deleteUserById(userId)
    .then((deleteduser) => {
        if(deleteduser)
        {
            res.status(204).send(`User with id ${userId} deleted.`)
        }
        else 
        {
            res.status(404).send(`User with id ${userId} not found.`);
        }
    })
    .catch((error) => 
    {
        console.error(`Error while deleting user with id ${userId}:`, error);
        res.status(500).send("Error while deleting user");
    })
});


app.listen(port, ()=> {
    console.log(`Example app listening at http://localhost:${port}`
  );
});