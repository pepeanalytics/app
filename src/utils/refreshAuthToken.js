import axios from "axios";

export default async function refreshAuthToken({ refreshToken }) {
  return axios.post("https://api.pepeanalytics.com/v1/token", {
    token: refreshToken,
  });
}
