
import { Brackets } from "typeorm";
import { Client } from "../../../../database/clientManagement/client";
import { validClientSearchFields } from "../../../../types/searchFields";
import { createWhereExpression } from "../../../util/commonMethod";
import { FilterOptions } from "../../../../types/client";
import { clientFilterQueryBuilder } from "../../../util/clientQuery";
import { SecretaryTherapistMeeting } from "../../../../database/meeting/secretaryTherapistMeeting";
export const clientListResolver = async (
  _: any,
  input: { first: number, after: number, search: string, filterOptions: FilterOptions },
) => {
  const { first = 10, after, search } = input;
  const filterOptions = input?.filterOptions;
  const clientQuery = Client.createQueryBuilder("client");

  if (search) {
    const brackets = new Brackets((sqb) => {
      validClientSearchFields.map((field, idx) => {
        const { searchString, params } = createWhereExpression(field, search);
        sqb.orWhere(searchString, params);
      });
    });
    clientQuery.andWhere(brackets);
  }

  if (filterOptions) {
    await clientFilterQueryBuilder(clientQuery, filterOptions);
  }

  const [clients, totalCount] = await clientQuery.skip(after).take(first).getManyAndCount();
  const clientsNodes = clients.map(client => {
    return {
      node: client,
      cursor: client.id,
    };
  });

  return {
    totalCount,
    edges: clientsNodes,
  };
};
export const getClientByIdResolver = async (
  _: any,
  { id }: { id: string }
) => {
  const client = await Client.createQueryBuilder()
    .where({ id })
    .getOne();

  if (client) {
    const meeting = await SecretaryTherapistMeeting.createQueryBuilder("meeting")
      .select("meeting.appointmentTime")
      .where("meeting.clientId = :id", { id })
      .orderBy("meeting.appointmentTime", "DESC")
      .getOne();
    if (meeting) {
      client.appointmentTime = meeting.appointmentTime;
    }
  }

  return client;
};

export const getClientByTherapist = async (
  _: any,
  { id }: { id: string }
) => {
  const clientQuery = Client.createQueryBuilder("client")
    .where({ selectTherapist: id });
  const [clients, totalCount] = await clientQuery.getManyAndCount();
  const clientsNodes = clients.map(client => {
    return {
      node: client,
      cursor: client.id,
    };
  });

  return {
    totalCount,
    edges: clientsNodes,
  };
};

export const getClientByappoinment = async (
  _: any,
  { id }: { id: string }
) => {
  const client = await Client.createQueryBuilder()
    .where({ id })
    .getOne();
  if (client) {
    const meeting = await SecretaryTherapistMeeting.createQueryBuilder()
      .select()
      .where({ clientId: id })
      .andWhere({ therapistId: client.selectTherapist })
      .getMany();
    if (meeting.length > 0) {
      if (client.firstPrice) {
        client.firstPrice = client.followUpPrice;
      }
    }
  }

  return client;
};
