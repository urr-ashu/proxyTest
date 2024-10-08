//https://www.npmjs.com/package/http-proxy-middleware?activeTab=readme#http-proxy-middleware-options
const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const cors = require("cors");

let PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());

app.use(
  "/*",
  createProxyMiddleware({
    target: "wss://socketproxytest.onrender.com/my/socket",
    ws: true,
    changeOrigin: true,
  })
);

app.listen(PORT, () => {
  const message = `\nInfo: Application started running\n-----------------------------\n \nPort: ${PORT}\nTime: ${new Date()}\n-----------------------------`;
  console.info(message);
});

process.on("unhandledRejection", (reason, p) =>
  console.error(reason, "Proxy Server - Unhandled Rejection at Promise", p)
);

process.on("uncaughtException", (err) =>
  console.error(err, "Proxy Server - Uncaught Exception thrown")
);
