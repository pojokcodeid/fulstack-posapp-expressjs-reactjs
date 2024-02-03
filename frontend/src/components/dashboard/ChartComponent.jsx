import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { axiosInstance } from "../../auth/AxiosConfig.jsx";
import secureLocalStorage from "react-secure-storage";
import { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
// import { faker } from "@faker-js/faker";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ChartComponent = ({ setTotPurchase, setTotOrder }) => {
  const [purchase, setPurchase] = useState([]);
  const [order, setOrder] = useState([]);
  // load purchase
  const loadPurchase = useCallback(async () => {
    const out = await axiosInstance.get("/api/purchase-year", {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + secureLocalStorage.getItem("acessToken"),
      },
    });
    setPurchase(out.data.result);
    setTotPurchase(out.data.result.reduce((a, b) => a + b, 0));
  }, [setTotPurchase]);
  const loadOrder = useCallback(async () => {
    const out = await axiosInstance.get("/api/orders-year", {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + secureLocalStorage.getItem("acessToken"),
      },
    });
    setOrder(out.data.result);
    setTotOrder(out.data.result.reduce((a, b) => a + b, 0));
  }, [setTotOrder]);
  useEffect(() => {
    loadPurchase();
    loadOrder();
  }, [loadPurchase, loadOrder]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: `PERFORMANCE PT ABCD ${new Date().getFullYear()}`,
      },
    },
  };

  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const data = {
    labels,
    datasets: [
      {
        label: "Sales",
        data: order,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Purchase",
        data: purchase,
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };
  return <Bar options={options} data={data} />;
};

ChartComponent.propTypes = {
  setTotPurchase: PropTypes.func,
  setTotOrder: PropTypes.func,
};

export default ChartComponent;
