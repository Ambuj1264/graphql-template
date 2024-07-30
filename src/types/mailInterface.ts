import { Address } from "nodemailer/lib/mailer";

export interface MailInterface {
  from: string | Address | undefined;
  to: string | string[];
  cc?: string | string[];
  bcc?: string | string[];
  subject: string;
  text?: string;
  html: string;
}
