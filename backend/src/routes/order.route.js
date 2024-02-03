import { Router } from "express";
import {
  generateExcel,
  generatePdf,
  getAllOrder,
  getOrderById,
  insertOrder,
  purchaseYearly,
} from "../controllers/order.controller.js";
import { autenticate } from "../controllers/error.controller.js";
const orderRouter = Router();

orderRouter.post("/orders/:userId", autenticate, insertOrder);
orderRouter.get("/orders/:id", autenticate, getOrderById);
orderRouter.get("/orders", autenticate, getAllOrder);
orderRouter.post("/orders-pdf", autenticate, generatePdf);
orderRouter.post("/orders-excel", autenticate, generateExcel);
orderRouter.get("/orders-year", autenticate, purchaseYearly);

export default orderRouter;
