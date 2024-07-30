
import { ClientAppointmentLogs } from "../../../../database/meeting/clientAppointmentLogs";

export const getClientAppointmentLogs = async (
  _: any,
  { clientId, therapistId }: { clientId: string, therapistId: string },
) => {
  const clientLogQuery = ClientAppointmentLogs.createQueryBuilder("clientAppointmentLogs")
    .orderBy("clientAppointmentLogs.created_at", "DESC")
    .where({ client: clientId })
    .andWhere({ therapist: therapistId });
  const [logs, totalCount] = await clientLogQuery.getManyAndCount();
  let totalPaidAmount = 0;

  for (const log of logs) {
    const logAmountPaid = parseFloat(log.amountPaid); // Convert amountPaid to a number
    if (!isNaN(logAmountPaid) && logAmountPaid > 0) {
      totalPaidAmount += logAmountPaid;
    }
  }

  const totalAmount = logs.reduce((total, log) => total + parseFloat(log.totalAmount), 0);
  const totalDueAmount = totalAmount - totalPaidAmount;
  const logsNodes = logs.map((log) => {
    return {
      node: log,
      cursor: log.id,
    };
  });

  return {
    totalCount,
    totalAmount,
    totalPaidAmount,
    totalDueAmount,
    edges: logsNodes,
  };
};
