import { Router } from "express";
import { insertOrderReturn } from "../controllers/orderReturn.controller.js";
import { autenticate } from "../controllers/error.controller.js";
const orderReturnRouter = Router();

orderReturnRouter.post("/order-returns", autenticate, insertOrderReturn);

export default orderReturnRouter;
