import axios from "axios";
import secureLocalStorage from "react-secure-storage";
import { jwtDecode } from "jwt-decode";

const RefreshToken = async () => {
  const auth = secureLocalStorage.getItem("acessToken");
  const refresh = secureLocalStorage.getItem("refreshToken");

  if (!auth || !refresh) {
    return false;
  }

  const exp = new Date(jwtDecode(auth).exp * 1000);

  console.log("jalan sebelum kondisi ...");
  if (exp < new Date()) {
    console.log("Jalan ke refresh token ...");
    let headersList = {
      Authorization: "Bearer " + secureLocalStorage.getItem("refreshToken"),
      "Content-Type": "application/json",
    };

    let reqOptions = {
      url: `/api/users/refresh`,
      method: "GET",
      headers: headersList,
    };
    try {
      const response = await axios.request(reqOptions);

      if (!response.data) {
        return false;
      }

      secureLocalStorage.setItem("acessToken", response.data.acessToken);
      secureLocalStorage.setItem("refreshToken", response.data.refreshToken);
      secureLocalStorage.setItem("user", response.data.result);
      console.log("Simpan token baru berhasil ...");

      return true;
    } catch (error) {
      return false;
    }
  } else {
    return true;
  }
};

export default RefreshToken;
