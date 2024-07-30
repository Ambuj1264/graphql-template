
import { Client } from "../../../../database/clientManagement/client";
import { ClientAppointmentLogs } from "../../../../database/meeting/clientAppointmentLogs";
import { SecretaryTherapistMeeting } from "../../../../database/meeting/secretaryTherapistMeeting";
import { Therapists } from "../../../../database/therapists/therapists";
import { FilterOptions } from "../../../../types/client";
import { valiClientAppointmentLogsFields } from "../../../../types/searchFields";
import { billingFilterQueryBuilder } from "../../../util/billingQuery";
import { createWhereExpression } from "../../../util/commonMethod";
import { Brackets } from "typeorm";
export const getBillingsData = async (
  _: any,
   input: { first: number, after: number, search: string, clientIds: string[], filterOptions: FilterOptions  },
) => {
  const clientIds = input.clientIds;
  const filterOptions = input?.filterOptions;
  const { first = 10, after, search } = input;
  const billingQuery = ClientAppointmentLogs.createQueryBuilder("clientAppointmentLogs")
  .innerJoin(Client, "client", "client.id = clientAppointmentLogs.client")
  .innerJoin(Therapists, "therapists", "therapists.id = clientAppointmentLogs.therapist")
  .innerJoin(SecretaryTherapistMeeting, "secretaryTherapistMeeting", "secretaryTherapistMeeting.id = clientAppointmentLogs.appointmentId")
  .orderBy("clientAppointmentLogs.created_at", "DESC");
if (clientIds && clientIds.length > 0) {
  billingQuery.where("client IN (:...clientIds)", { clientIds });
}
  if (search) {
    const brackets = new Brackets((sqb) => {
      valiClientAppointmentLogsFields.map((field, idx) => {
        const { searchString, params } = createWhereExpression(field, search);
        sqb.orWhere(searchString, params);
      });
    });
    billingQuery.andWhere(brackets);
  }

  if (filterOptions) {
    await billingFilterQueryBuilder(billingQuery, filterOptions);
  }
  const [biils, totalCount] = await billingQuery.skip(after).take(first).getManyAndCount();
  const logsNodes = biils.map((bill) => {
    return {
      node: bill,
      cursor: bill.id,
    };
  });

  return {
    totalCount,
    edges: logsNodes,
  };
};
