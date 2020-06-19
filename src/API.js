import axios from "axios";
import { API_BASE_URL } from "./config.js";

const user = JSON.parse(localStorage.getItem("user"));

if (user) {
  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${user.data.api_token}`;
}

export class API_Access {
  static accessUser = async (link, data) => {
    let result = null;

    await axios
      .post(API_BASE_URL + link, data)
      .then((response) => {
        localStorage.setItem("user", JSON.stringify(response));
        result = true;
      })
      .catch((error) => {
        console.log(error);
        if (error.response) {
          if (error.response.status === 401) {
            result = false;
          }
        }
      });
    return result;
  };

  static interactPokemon = async (link, id) => {
    let result = null;
    await axios
      .post(API_BASE_URL + `/pokemon/${link}/${id}`)
      .then(function (response) {
        result = { captureMessage: response.data };
      })
      .catch(console.log);

    return result;
  };

  static loadUserData = async (link) => {
    let result = null;

    await axios
      .get(link)
      .then((response) => {
        result = response.data;
      })
      .catch(console.log);

    return result;
  };
}
