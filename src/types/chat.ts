export interface ChatInput {
  message: string;
  attachment: [string];
  threadId: string;
  senderId: string; 
  receiverId: string;
  isRead: boolean;
  isDelete: boolean;
}
    
export interface SingleChatRoomCaseworkerInput { 
  participants: [string]; 
  isDelete: boolean;
}