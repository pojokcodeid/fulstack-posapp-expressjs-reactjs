import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../components/Home.jsx";
import ListCategory from "../components/category/ListCategory.jsx";
import { ToastContainer } from "react-toastify";
import AddCategory from "../components/category/AddCategory.jsx";
import EditCategory from "../components/category/EditCategory.jsx";
import ListSupplier from "../components/supplier/ListSupplier.jsx";
import AddSupplier from "../components/supplier/AddSupplier.jsx";
import EditSupplier from "../components/supplier/EditSupplier.jsx";
import ListProduct from "../components/product/ListProduct.jsx";
import AddProduct from "../components/product/AddProduct.jsx";
import EditProduct from "../components/product/EditProduct.jsx";
import ListSales from "../components/sales/ListSales.jsx";
import OrderSend from "../components/sales/OrderSend.jsx";
import ListSalesHistory from "../components/salesHistory/ListSalesHistory.jsx";
import Login from "../components/Login.jsx";
import secureLocalStorage from "react-secure-storage";
import { jwtDecode } from "jwt-decode";
import NoPage from "../components/NoPage.jsx";
import Logout from "../components/Logout.jsx";
import SalesReturn from "../components/salesHistory/SalesReturn.jsx";
import ListPurchase from "../components/purchase/ListPurchase.jsx";
import AddPruchase from "../components/purchase/AddPruchase.jsx";
import PrintPurchase from "../components/purchase/PrintPurchase.jsx";
import ProductReport from "../components/report/product/ProductReport.jsx";
import SupplierReport from "../components/report/supplier/SupplierReport.jsx";
import SalesReport from "../components/report/sales/SalesReport.jsx";
import PurchaseReport from "../components/report/purchase/PurchaseReport.jsx";

const RouteNavigation = () => {
  // check user login
  let refreshExpiration = new Date();
  const refreshToken = secureLocalStorage.getItem("refreshToken");
  if (refreshToken) {
    try {
      refreshExpiration = new Date(jwtDecode(refreshToken).exp * 1000);
    } catch (error) {
      console.log(error);
    }
  }

  const buildNav = () => {
    if (refreshExpiration > new Date()) {
      return (
        <>
          <BrowserRouter>
            <Routes>
              {/* home */}
              <Route path="/" element={<Home />} />
              {/* category */}
              <Route path="/category" element={<ListCategory />} />
              <Route path="/category/add" element={<AddCategory />} />
              <Route path="/category/:id" element={<EditCategory />} />
              {/* supplier */}
              <Route path="/supplier" element={<ListSupplier />} />
              <Route path="/supplier/add" element={<AddSupplier />} />
              <Route path="/supplier/:id" element={<EditSupplier />} />
              {/* product */}
              <Route path="/product" element={<ListProduct />} />
              <Route path="/product/add" element={<AddProduct />} />
              <Route path="/product/:id" element={<EditProduct />} />
              {/* sales */}
              <Route path="/sales" element={<ListSales />} />
              <Route path="/orders/:id" element={<OrderSend />} />
              {/* sales History */}
              <Route path="/sales-history" element={<ListSalesHistory />} />
              <Route path="/sales-return/:id" element={<SalesReturn />} />
              {/* purchase */}
              <Route path="/purchase" element={<ListPurchase />} />
              <Route path="/purchase/add" element={<AddPruchase />} />
              <Route path="/purchase/print/:id" element={<PrintPurchase />} />
              {/* report */}
              <Route path="/supplier-report" element={<SupplierReport />} />
              <Route path="/product-report" element={<ProductReport />} />
              <Route path="/sales-report" element={<SalesReport />} />
              <Route path="/purchase-report" element={<PurchaseReport />} />
              {/* not found */}
              <Route path="/logout" element={<Logout />} />
              <Route path="*" element={<NoPage />} />
            </Routes>
          </BrowserRouter>
        </>
      );
    } else {
      return (
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<Login />} />
          </Routes>
        </BrowserRouter>
      );
    }
  };
  return (
    <>
      {buildNav()}
      <ToastContainer />
    </>
  );
};

export default RouteNavigation;
