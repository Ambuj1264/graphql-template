import * as nodemailer from "nodemailer";
import yenv from "yenv";
import { MailInterface } from "../types/mailInterface";
const env = yenv("env.yaml", { env: "development" });
export default class MailService {
  private static instance: MailService;
  private transporter!: nodemailer.Transporter;

  // private constructor() {}
  // INTSTANCE CREATE FOR MAIL
  static getInstance() {
    if (!MailService.instance) {
      MailService.instance = new MailService();
    }

    return MailService.instance;
  }
  // CREATE CONNECTION FOR LOCAL
  async createLocalConnection() {
    this.transporter = nodemailer.createTransport({
      host: env.SMTP_HOST,
      port: env.SMTP_PORT,
      secure: false,
      auth: {
        user: env.SMTP_USERNAME,
        pass: env.SMTP_PASSWORD,
      },
    });
  }
  // CREATE CONNECTION FOR LIVE
  // async createConnection() {
  //   this.transporter = nodemailer.createTransport({
  //     host: env.SMTP_HOST,
  //     port: env.SMTP_PORT,
  //     secure: process.env.Strue ,
  //     auth: {
  //       user: process.env.SMTP_USERNAME,
  //       pass: process.env.SMTP_PASSWORD,
  //     },
  //   });
  // }
  // SEND MAIL
  async sendMail(requestId: string | number, options: MailInterface) {
    return  this.transporter.sendMail({
        from: options.from,
        to: options.to,
        bcc: options.bcc,
        subject: options.subject,
        text: options.text,
        html: options.html,
      })
      .then((info: { response: any; messageId: any; }) => {
        // tslint:disable-next-line
        console.log(`${requestId} - Mail sent successfully!!`);
        // tslint:disable-next-line
        console.log(
          `${requestId} - [MailResponse]=${info.response} [MessageID]=${info.messageId}`
        );

        return info;
      });
  }

  // VERIFY CONNECTION
  async verifyConnection() {
    return this.transporter.verify();
  }
  // CREATE TRANSPOTER
  getTransporter() {
    return this.transporter;
  }
}
