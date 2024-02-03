import { Router } from "express";
import {
  createSupplier,
  deleteSupplier,
  generateExcel,
  generatePdf,
  getAllSupplier,
  getSupplierById,
  updateSupplier,
} from "../controllers/supplier.controller.js";
import { autenticate } from "../controllers/error.controller.js";
const supplierRoute = Router();

supplierRoute.get("/suppliers", autenticate, getAllSupplier);
supplierRoute.get("/suppliers/:id", autenticate, getSupplierById);
supplierRoute.post("/suppliers", autenticate, createSupplier);
supplierRoute.put("/suppliers/:id", autenticate, updateSupplier);
supplierRoute.delete("/suppliers/:id", autenticate, deleteSupplier);
supplierRoute.get("/suppliers-pdf", autenticate, generatePdf);
supplierRoute.get("/suppliers-excel", autenticate, generateExcel);

export default supplierRoute;
