
import { SingleChatRoomCaseworker } from "../../../../database/chat/singleChatRoomCaseworker";
import { GraphQLContext } from "../../../util/graphql";
export const getCaseworkerChatRoom = async (
    _: any,
   __: any,
    { userId }: GraphQLContext
) => {
const Result = await SingleChatRoomCaseworker.createQueryBuilder()
.select()
.where(":id = ANY(participants)", { id: userId })
.getMany(); 

return Result;
};
