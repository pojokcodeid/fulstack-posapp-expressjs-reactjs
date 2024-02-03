import { Router } from "express";
import categoryRoute from "./category.route.js";
import supplierRoute from "./supplier.route.js";
import productRoute from "./product.route.js";
import cartRoute from "./cart.route.js";
import orderRouter from "./order.route.js";
import userRoute from "./user.route.js";
import orderReturnRouter from "./orderReturn.route.js";
import purchaseRouter from "./purchase.route.js";
const router = Router();

router.use("/api", categoryRoute);
router.use("/api", supplierRoute);
router.use("/api", productRoute);
router.use("/api", cartRoute);
router.use("/api", orderRouter);
router.use("/api", userRoute);
router.use("/api", orderReturnRouter);
router.use("/api", purchaseRouter);
router.use("*", (req, res) => {
  res.status(404).json({
    message: "Not Found",
  });
});

export default router;
