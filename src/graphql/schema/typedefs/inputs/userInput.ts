export const userInput = `
  input CreateUserInput {
    email: String!
    hebrewName: String
    englishName: String!
    cellPhone: String
    numberExt: String
    address: String
    role: String!
    city:String,
    state:String,
    zipcode:String
  }
  
  input UserUpdateInput {
    id: String
    hebrewName: String
    englishName: String
    cellPhone: String
    numberExt: String
    address: String
    role: String
    profileImage:[String],
    city:String,
    state:String,
    zipcode:String
    isActive:Boolean
  }
  
  input LoginResetInput {
    loginName: String!
  }

  input LoginUpdateInput {
    englishName: String
    hebrewName: String
    cellPhone: String
    numberExt: String
    address: String
    profileImage: [String]
    oldPassword: String
    password: String
  }

  input ChangePasswordInput{
    password: String
    tokenId: String

  }
  `;