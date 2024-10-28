import * as nodemailer from "nodemailer";
import { envs } from "../config";
import { sendOrderEmail } from "../templates";

export class EmailService {
  async sendOrderEmail(args: any): Promise<any> {
    const { sessionId, email } = args;
    const subject = "Confirmar pago de la Orden";
    const urlRedirect = `${envs.API_HOST}:${envs.API_PORT}/orders/confirm?sessionId=${sessionId}`;
    const templateHTML = sendOrderEmail(args, urlRedirect);

    return this.sendEmail({ email, subject, templateHTML });
  }

  public async sendEmail(args: any) {
    const { email, subject, templateHTML } = args;

    const transporter = nodemailer.createTransport({
      host: envs.EMAIL_HOST,
      port: envs.EMAIL_PORT,
      secure: envs.EMAIL_SECURE,
      auth: {
        user: envs.EMAIL_AUTH_USER,
        pass: envs.EMAIL_AUTH_PASS,
      },
      tls: {
        rejectUnauthorized: envs.EMAIL_REJECT_UNAUTHORIZED,
      },
    });

    const info = await transporter.sendMail({
      from: `Wallet App <${envs.EMAIL_AUTH_USER}>`,
      to: email,
      subject,
      html: templateHTML,
    });

    return info;
  }
}
