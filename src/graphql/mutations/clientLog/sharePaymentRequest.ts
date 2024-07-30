import MailService from "../../../config/mailService";
import { SharePaymentInput } from "../../../types/client";
import yenv from "yenv";
import paymentRequestTemplate from "../../util/paymentRequestTemplate";
const env = yenv("env.yaml", { env: "development" });

export const sharePaymentRequest = async (
  _: any,
  { input }: { input: SharePaymentInput },
) => {
  const mailService = MailService.getInstance();
  const resetPasswordEmail = paymentRequestTemplate(input.clientName, input.phoneNumber, input.amount);
  
  if (input) { // Check if phoneNumber is defined
    await mailService.sendMail("1", {
      to: input.email,
      subject: "Payment request",
      html: resetPasswordEmail.html,
      from: `Billing department <${env.SMTP_SENDER}>`,
    });
  
    return "Successfully send payment request.";
  } else {
    return "Failed to send payment request. Phone number not found.";
  }
};
