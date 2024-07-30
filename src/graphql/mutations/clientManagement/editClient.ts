import { UpdateClientInput } from "../../../types/client";
import { Client } from "../../../database/clientManagement/client";
import { dataLoaders } from "../../resolvers/dataloaders";
export const updateClient = async (
    _: any,
    { input }: { input: UpdateClientInput },
) => {
    const { id, ...rest } = input;
    const existingClient = await Client.findOneBy({ id });
  if (rest.attachment && rest.attachment.length > 0) {
    const newReportAttachment = rest.attachment.filter(value => 
      !(existingClient?.attachment || []).includes(value)
    );
    const updatedReportAttachment = [
      ...(existingClient?.attachment || []),
      ...newReportAttachment,
    ];
    await Client.createQueryBuilder()
      .update()
      .set({ ...rest, attachment: updatedReportAttachment })
      .where({ id })
      .output("*")
      .execute()
      .then((response) => {
        if (response.affected !== 1) {
          throw new Error("Client not updated.");
        }
      });
  } else {
    await Client.createQueryBuilder()
      .update()
      .set({ ...rest })
      .where({ id })
      .output("*")
      .execute()
      .then((response) => {
        if (response.affected !== 1) {
          throw new Error("Client not updated.");
        }
      });
  }

    await dataLoaders.clientLoader.clear(input.id);

    return await dataLoaders.clientLoader.load(input.id);
};
