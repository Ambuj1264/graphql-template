export const user = `
type User {
    id:String,
    email: String,
    hebrewName: String,
    englishName: String,
    cellPhone: String,
    numberExt: String,
    address: String,
    role: Role,  
    profileImage:[String],
    city:String,
    state:String,
    zipcode:String,
    isActive:Boolean
}

type UserUpdate {
    user: User
    login: Login
  }

type UserFeatures{
  role:String
  roleConstraint:String
  navMenu:JSON
  rolePermissions:JSON
  id:String
}
`;
