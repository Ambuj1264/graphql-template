export const subscription = `
type Subscription { 
  operationFinished: [Operation]!
} 
type Operation {
  message: String
  attachment:[String]
  threadId:String
  senderId :String
  receiverId:String 
  isRead:Boolean
  isDelete:Boolean
  createdAt:Date
}
`;
