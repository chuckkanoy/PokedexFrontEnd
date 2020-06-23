import axios from "axios";
import { API_BASE_URL } from "./config.js";

const user = JSON.parse(localStorage.getItem("user"));

if (user) {
  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${user.data.api_token}`;
}

export async function accessUser(link, data) {
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
}

export async function interactPokemon(link, id) {
  let result = null;
  await axios
    .post(API_BASE_URL + `/pokemon/${link}/${id}`)
    .then(function (response) {
      result = { captureMessage: response.data };
    });

  return result;
}

export async function loadUserData(link) {
  let result = null;

  await axios.get(link).then((response) => {
    result = response.data;
  });

  return result;
}
