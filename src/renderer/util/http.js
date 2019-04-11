const axios = require("axios");

const url = window.location.host.split(":")[0];

const client = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? "http://localhost:3333"
      : "http://10.0.10.95:8081"
});

export default client;
