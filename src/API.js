import axios from "axios";
import { API_BASE_URL } from "./config.js";

export class API_Access {
  static registerUser = (data) => {
    return axios
      .post(API_BASE_URL + `/register`, data)
      .then((response) => {
        localStorage.setItem("user", JSON.stringify(response));
        return true;
      })
      .catch((error) => {
        console.log(error);
        if (error.response) {
          if (error.response.status === 422) {
            return false;
          }
        }
      });
  };
}
