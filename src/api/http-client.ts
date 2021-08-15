import axios from "axios";
//https://saviourapi.herokuapp.com/api
//https://saviour.azurewetsites.net/api

const httpClient = axios.create({
  baseURL: "http://localhost:8000/api",
});
export default httpClient;
