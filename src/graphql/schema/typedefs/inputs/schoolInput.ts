export const schoolInput = `
input schoolInput{
  typeOfSchool:String,
    region:String,
    schoolName:String
    roshYeshivah:String
    ryContact:String,
    menahel:String,
    menahelNumber:String,
    yeshivahAddress:String,
    officeAddress:String
    email:String,
    dormitory:String,
    mashgiach:String,
    yeshivahHours:[String],
    transportation:String,
    visitedWhen:String,
    chasidish:String,
    boxy:String,
    levelOfLearning:String,
    pureness:String,
    relationshipStaffWithBuchrim:String,
    schoolApplication:[String],
    reports:String
}

input UpdateSchool {
  id:String
  typeOfSchool:String,
  region:String,
  schoolName:String
  roshYeshivah:String
  ryContact:String,
  menahel:String,
  menahelNumber:String,
  yeshivahAddress:String,
  officeAddress:String
  email:String,
  dormitory:String,
  mashgiach:String,
  yeshivahHours:[String],
  transportation:String,
  visitedWhen:String,
  chasidish:String,
  boxy:String,
  levelOfLearning:String,
  pureness:String,
  relationshipStaffWithBuchrim:String,
  schoolApplication:[String],
  reports:String
  }
  
  scalar Date
  input SchoolListingSharingInput {
    email: [String]
    linkExpireDate: Date
    shareData: JSON
    shareColumn:JSON
    sharedBy:String
    isActive:Boolean
  }

  
`;