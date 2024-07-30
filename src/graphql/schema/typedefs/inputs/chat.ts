export const ChatInput =

`input ChatInput{
    message: String
    attachment:[String]
    threadId:String
    senderId :String 
    receiverId:String
    isRead:Boolean
    isDelete:Boolean
}
input SingleChatRoomCaseworkerInput{ 
    participants:[String] 
    isDelete:Boolean
}`;
 