import { Router } from "express";
import {
  createUser,
  deleteUser,
  getAllUser,
  getUserById,
  loginUser,
  setRefreshToken,
  updateUser,
} from "../controllers/user.controller.js";
import { autenticate } from "../controllers/error.controller.js";
const userRoute = Router();

userRoute.post("/users", createUser);
userRoute.put("/users/:id", autenticate, updateUser);
userRoute.delete("/users/:id", autenticate, deleteUser);
userRoute.get("/users", autenticate, getAllUser);
userRoute.get("/users/refresh", setRefreshToken);
userRoute.post("/users/login", loginUser);
userRoute.get("/users/:id", autenticate, getUserById);

export default userRoute;
