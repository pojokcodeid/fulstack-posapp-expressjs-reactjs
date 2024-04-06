import secureLocalStorage from "react-secure-storage";
export const SetToken = {
  Authorization: "Bearer " + secureLocalStorage.getItem("acessToken"),
  "Content-Type": "application/json",
};
export const SetTokenMultipart = {
  Authorization: "Bearer " + secureLocalStorage.getItem("acessToken"),
  "Content-Type": "multipart/form-data",
};
