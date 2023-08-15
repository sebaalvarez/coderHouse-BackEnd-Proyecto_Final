import mailer from "nodemailer";
import config from "../../config/config.js";

export default class MailingService {
  constructor() {
    this.client = mailer.createTransport({
      service: config.mailing.SERVICE,
      port: 587,
      auth: {
        user: config.mailing.USER,
        pass: config.mailing.PASSWORD,
      },
    });
  }

  sendMail = async ({ from, to, subject, html, attachments = [] }) => {
    const obj = {
      from: config.mailing.USER,
      to: to,
      subject,
      html,
      attachments,
    };
    let result = await this.client.sendMail(obj);

    return result;
  };

  /*   EJEMPLO CON RES.SEND
  sendMailEJ = ({ from, to, subject, html, attachments = [] }) => {
    let result = this.client.sendMail(
      { from, to, subject, html, attachments },
      (error, info) => {
        if (error) {
          console.log(error);
          res.status(400).send({ message: "Error", payload: error });
        }
        console.log("Message sent: ", info.messageId);
        res.send({ message: "Success", payload: info });
      }
    );

    return result;
  };
*/
  // transporter.verify(function (error, success) {
  //   if (error) {
  //     console.log(error);
  //   } else {
  //     console.log("Server is ready to take our messages");
  //   }
  // });
}
