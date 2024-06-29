const express = require("express");
const { join } = require("path");
const ClientGenerator = require("./public/ClientGenerator");

const app = express();

app.set("views", join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(join(__dirname, "public")));

const client = new ClientGenerator({ clientId: "cooler" });
let qr;
client.on("qr", (qrcode) => {
  qr = qrcode;
  console.log(qr);
  return res.redirect(200, "/");
});

app.get("/", (req, res) => {
  res.render("index", { qr: qr ?? "" });
});

app.listen(3000, () => {
  console.log("listening at 3000");
});
