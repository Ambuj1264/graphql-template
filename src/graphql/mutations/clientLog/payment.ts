
import { ClientAppointmentLogs } from "../../../database/meeting/clientAppointmentLogs";
import { PaymentInput } from "../../../types/client";
export const updateClientLogs = async (
  _: null,
  { input }: { input: PaymentInput },
) => {
  const { therapist, client, amount, ...rest } = input;
  let remainingAmount: number = amount; 
  const currentDate = new Date();
  const paymentRecords = await ClientAppointmentLogs.createQueryBuilder()
    .where({ client })
    .andWhere({ therapist })
    .orderBy("created_at", "ASC")
    .getMany();

  if (paymentRecords.length === 0) {
    throw new Error("No payment records found for the specified therapist and client.");
  }

  for (const paymentRecord of paymentRecords) {
    if (paymentRecord.paymentStatus === "Not paid" || paymentRecord.paymentStatus === "Partially paid") {
      // Convert string properties to numbers
      const totalAmount = parseFloat(paymentRecord.totalAmount);
      const amountPaid = parseFloat(paymentRecord.amountPaid);

      const amountToPay = Math.min(remainingAmount, totalAmount - amountPaid);

      // Update the payment record with the amountToPay
      paymentRecord.amountPaid = (amountPaid + amountToPay).toString(); 
      paymentRecord.amountStillOwes = (totalAmount - parseFloat(paymentRecord.amountPaid)).toString(); 

      if (parseFloat(paymentRecord.amountPaid) >= totalAmount) {
        paymentRecord.paymentStatus = "Paid";
      } else {
        paymentRecord.paymentStatus = "Partially paid";
      }
      
      await ClientAppointmentLogs.createQueryBuilder()
        .update()
        .set({
          ...rest,
          amountPaid: paymentRecord.amountPaid,
          amountStillOwes: paymentRecord.amountStillOwes,
          paymentStatus: paymentRecord.paymentStatus,
          datePaid: currentDate
        })
        .where({ id: paymentRecord.id })
        .execute();
        
      remainingAmount -= amountToPay;

      if (remainingAmount <= 0) {
        break; 
      }
    }
  }

  return "Payments updated.";
};
