export const auth = `
type LoginWithToken {
    token: Token
    info: Login
}

type Token{
    token:String
    permissions:[String]
}

  type LoginUpdate {
    token: String
    user: User
    login: Login
  }

type Login {
    id: String
    entityOid: String
    loginName: String
    screenName: String
    lastLoginDate: DateTime
    datePwChanged: DateTime
    isPending: Boolean
    isActive: Boolean
    isDeleted: Boolean
    accountIsLocked: Boolean
    createdAt: DateTime
  }
  
  `;
 