import axios from "axios";

function setAuthorizationHeader() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user) {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${user?.data.api_token}`;
  }
}

export async function post(link) {
  setAuthorizationHeader();

  return await axios.post(link.link, link.data);
}

export async function get(link) {
  setAuthorizationHeader();

  return await axios.get(link);
}
