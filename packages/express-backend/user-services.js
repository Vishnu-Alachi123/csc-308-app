import mongoose from "mongoose";
import userModel from "./user.js";
import path from 'path';
import { fileURLToPath } from 'url';
import { config } from 'dotenv'; // Import the correct function: config

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

config({path: path.resolve(__dirname, '..', '..', '.env')});

const uri = process.env.MONGODB_URI; 

mongoose.set("debug", true);

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((error) => console.log(error));

function getUsers(name, job) {
  let promise;
  if (name === undefined && job === undefined) {
    promise = userModel.find();
  } else if (name && !job) {
    promise = findUserByName(name);
  } else if (job && !name) {
    promise = findUserByJob(job);
  }
  return promise;
}

function findUserById(_id) {
  return userModel.findById(_id);
}


function addUser(user) {
  const userToAdd = new userModel(user);
  const promise = userToAdd.save();
  return promise;
}

function findUserByName(name) {
  return userModel.find({ name: name });
}

function findUserByJob(job) {
  return userModel.find({ job: job });
}

function findUserByNameAndJob(name,job) {
    return userModel.find({name: name, job: job})
}

function deleteUserById(_id) {
    const promise = userModel.findByIdAndDelete(_id);
    return promise;
}

export default {
  addUser,
  getUsers,
  findUserById,
  findUserByName,
  findUserByJob,
  findUserByNameAndJob,
  deleteUserById,
};