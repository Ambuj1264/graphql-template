import { ChatInput } from "../../../types/chat";
import { pubsub } from "../../schema/index";
import { CaseWorkerChat } from "../../../database/chat";

export const scheduleOperation = async (_: any, { input }: { input: ChatInput }) => {
  try { 
   await CaseWorkerChat.createQueryBuilder()
      .insert()
      .values({
        ...input,
      })
      .execute(); 
    const allData = await CaseWorkerChat.createQueryBuilder()
    .where({ threadId: input.threadId }) 
    .getMany();  

    pubsub.publish("OPERATION_FINISHED", { operationFinished: allData }); 
    
    return allData; 
  } catch (error) {
    throw new Error("Error scheduling operation");
  }
};
