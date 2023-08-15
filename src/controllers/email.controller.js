import { _dirname } from "../utils.js";
import MailingService from "../services/email/mailing.js";

const mailingService = new MailingService();

const destino = "salvarezagpro.com.ar";

const mailOptions = {
  // Objeto del mensaje
  // from: "Coder Test " + config.mailing.USER,
  to: destino,
  subject: "Correo de prueba Coderhouse Programacion Backend clase 30.",
  html: `<div><h1>Esto es un Test de envio de correos con Nodemailer!</h1></div>`,
  attachments: [],
};

const mailOptionsWithAttach = {
  // Objeto del mensaje
  // from: "Coder Test " + config.mailing.USER,
  to: destino,
  subject: "Correo de prueba Coderhouse Programacion Backend clase 30.",
  html: `<div>
                <h1>Esto es un Test de envio de correos con Nodemailer!</h1>
                <p>Ahora usando imagenes: </p>
                <img src="cid:meme"/>
            </div>`,
  attachments: [
    {
      filename: "Meme de Programacion",
      path: _dirname + "/public/images/meme.png",
      cid: "meme",
    },
  ],
};

export const sendEmail = async (req, res) => {
  try {
    let result = await mailingService.sendMail(mailOptions);
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send({
      error: error,
      message: "No se pudo enviar el email",
    });
  }
};

export const sendEmailWithAttachments = (req, res) => {
  // Logica
  try {
    let result = mailingService.sendMail(
      mailOptionsWithAttach,
      (error, info) => {
        if (error) {
          console.log(error);
          res.status(400).send({ message: "Error", payload: error });
        }
        console.log("Message sent: ", info.messageId);
        res.send({ message: "Success", payload: info });
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).send({
      error: error,
      message: "No se pudo enviar el email",
    });
  }
};
