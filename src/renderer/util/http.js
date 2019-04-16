const axios = require("axios");

const url = window.location.host.split(":")[0];

const client = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? "http://localhost:3333"
      : "http://187.44.14.114:7071"
});

export default client;
