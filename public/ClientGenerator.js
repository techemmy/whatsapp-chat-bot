const { Client, LocalAuth, NoAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");

class ClientGenerator extends Client {
  constructor({ clientId }) {
    super({
      puppeteer: {
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
      },
      webVersionCache: {
        type: "remote",
        remotePath:
          "https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2322.15.html",
      },
      // authStrategy: new LocalAuth({ clientId }),
      authStrategy: new NoAuth(),
    });

    this.setUpConnection();
    this.handleEveryoneTag();
    this.initialize();
  }

  setUpConnection() {
    console.log("setting up");
    this.on("ready", () => {
      console.log("Client is up and ready!");
    });

    this.on("qr", (qr) => {
      console.log("generating qr code");
      qrcode.generate(qr, { small: true });
    });
  }

  handleEveryoneTag() {
    this.on("message_create", async (msg) => {
      if (msg.body.startsWith(".")) {
        const chat = await msg.getChat();
        if (chat.isGroup && Array.isArray(chat.participants)) {
          let text = "";
          let mentions = [];
          for (let participant of chat.participants) {
            mentions.push(`${participant.id.user}@c.us`);
            text += `@${participant.id.user} `;
          }
          console.log(chat.participants);
          await chat.sendMessage(text, { mentions });
        }
      }
    });
  }
}

module.exports = ClientGenerator;
