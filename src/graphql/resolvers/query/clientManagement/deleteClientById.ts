import { Client } from "../../../../database/clientManagement/client";
export const deletClientByIdResolver = async (
    _: any,
    {id}: {id: string},
) => {
    const result = await Client.createQueryBuilder()
    .delete()
    .where({ id })
    .execute();
    if (result.affected !== 1) throw new Error("Client not found.");

    return id;
}; 

export const removeClientImg = async (
    _: any,
    { id, imgUrl }: { id: string, imgUrl: string }
  ) => {
      const client = await Client.findOneBy({ id });
      if (!client) {
        throw new Error(`client with id ${id} not found.`);
      }
      const attachmentIndex = client.attachment.indexOf(imgUrl);
      if (attachmentIndex === -1) {
        throw new Error(`Image URL ${imgUrl} not found in the attachment array.`);
      }
      client.attachment.splice(attachmentIndex, 1);
      await client.save();
  
      return `Image has been deleted from the attachment record.`;
  
  };