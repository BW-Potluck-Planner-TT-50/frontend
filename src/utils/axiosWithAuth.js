import axios from "axios";

const axiosWithAuth = () => {
  const token = localStorage.getItem("token");

  return axios.create({
    headers: {
      authorization: token,
    },
    baseURL: "https://potluck-joon.herokuapp.com",
    // local: "http://localhost:2319"
  });
};

export default axiosWithAuth;
