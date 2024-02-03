import secureLocalStorage from "react-secure-storage";
import Login from "./Login";

function Logout() {
  secureLocalStorage.removeItem("acessToken");
  secureLocalStorage.removeItem("refreshToken");
  secureLocalStorage.removeItem("user");
  // secureLocalStorage.clear();
  return (
    <>
      <Login />
    </>
  );
}

export default Logout;
