import { Router } from "express";
import {
  createCart,
  deleteAllCart,
  deleteCart,
  getAllCart,
  getCartByProductId,
  updateCart,
} from "../controllers/cart.controller.js";
import { autenticate } from "../controllers/error.controller.js";
const cartRoute = Router();

cartRoute.get("/carts/product/:id/:userId", autenticate, getCartByProductId);
cartRoute.get("/carts", autenticate, getAllCart);
cartRoute.post("/carts", autenticate, createCart);
cartRoute.put("/carts/:id", autenticate, updateCart);
cartRoute.delete("/carts/:id/:userId", autenticate, deleteCart);
cartRoute.delete("/carts/:userId", autenticate, deleteAllCart);

export default cartRoute;
