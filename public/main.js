alert("on");
var canvas = document.getElementById("canvas");
const client = new ClientGenerator({ clientId: "sam" });

client.on("qr", (qr) => {
  console.log("generating qr code");
  const qrcode = new QRCode(document.getElementById("qrcode"), {
    text: "http://jindo.dev.naver.com/collie",
    width: 128,
    height: 128,
    colorDark: "#000000",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H,
  });
});

// const { Client, LocalAuth, NoAuth } = require("whatsapp-web.js");
// const qrcode = require("qrcode-terminal");
//
// // Create a new client instance
// const client = new Client({
//   puppeteer: {
//     args: ["--no-sandbox", "--disable-setuid-sandbox"],
//   },
//   authStrategy: new LocalAuth(),
//   webVersionCache: {
//     type: "remote",
//     remotePath:
//       "https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/{version}.html",
//   },
// });
//
// // When the client is ready, run this code (only once)
// client.once("ready", () => {
//   console.log("Client is ready!");
// });
//
// // When the client received QR-Code
// client.on("qr", (qr) => {
//   console.log("generating qr");
//   qrcode.generate(qr, { small: true });
// });
//
// client.on("message_create", async (msg) => {
//   if (msg.body.startsWith(".")) {
//     const chat = await msg.getChat();
//
//     let text = "";
//     let mentions = [];
//     console.log("participants:", chat.participants);
//
//     if (Array.isArray(chat.participants)) {
//       for (let participant of chat.participants) {
//         mentions.push(`${participant.id.user}@c.us`);
//         text += `@${participant.id.user} `;
//       }
//       await chat.sendMessage(text, { mentions });
//     }
//   }
// });
//
// // Start your client
// client.initialize();
