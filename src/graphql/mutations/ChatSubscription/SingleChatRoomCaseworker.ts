import { SingleChatRoomCaseworker } from "../../../database/chat/singleChatRoomCaseworker"; 
import { SingleChatRoomCaseworkerInput } from "../../../types/chat"; 
export const SingleChatRoomCaseworkermutation = async (_: any, { input }: { input: SingleChatRoomCaseworkerInput }) => {
  const sortedParticipants = input.participants.sort(); 
  const existingRow = await SingleChatRoomCaseworker.createQueryBuilder()
    .select()
    .where( { participants: sortedParticipants })
    .getOne();

  if (existingRow) { 

    return existingRow;
  } 
  const result = await SingleChatRoomCaseworker.createQueryBuilder()
    .insert()
    .values({
      ...input,
      participants: sortedParticipants, 
    })
    .output("*")
    .execute(); 
    
  return result.raw[0];
};
