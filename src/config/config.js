import dotenv from "dotenv";
import { Command } from "commander";

const program = new Command(); //Crea la instancia de comandos de commander.

program
  .option("--test", "Variable para correr los test", false)
  .option("-d", "Variable para debug", false)
  // .option("-p <port>", "Puerto del servidor", 8080)
  .option("--mode <mode>", "Modo de trabajo", "develop")
  .option("--persist <mode>", "Modo de persistencia", "mongodb");
program.parse();

console.log("Options: ", program.opts());

const environment = program.opts().mode;

dotenv.config({
  path:
    environment === "production"
      ? "./src/config/.env.production"
      : "./src/config/.env.development",
});

export default {
  port: process.env.PORT,
  persistence: process.env.PERSISTENCE,
  environment: program.opts().mode,
  runTests: program.opts().test,
  mongoUrl: process.env.MONGO_URL,
  adminName: process.env.ADMIN_NAME,
  adminPassword: process.env.ADMIN_PASSWORD,
  mailing: {
    SERVICE: process.env.MAILING_SERVICE,
    USER: process.env.MAILING_ACCOUNT,
    PASSWORD: process.env.MAILING_PASSWORD,
  },
  twilioAccountSID: process.env.TWILIO_ACCOUNT_SID,
  twilioAuthToken: process.env.TWILIO_AUTH_TOKEN,
  twilioSmsNumber: process.env.TWILIO_SMS_NUMBER,
  twilioToSmsNumber: process.env.TWILIO_TO_SMS_NUMBER,
  PrivateKeyJWT: process.env.PRIVATE_KEY_JWT,
};
