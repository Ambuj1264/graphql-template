export const School = `
type School{
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
    createdBy:String,
    chasidish:String,
    boxy:String,
    levelOfLearning:String,
    pureness:String,
    relationshipStaffWithBuchrim:String,
    createdAt:DateTime,
    dateOfReportsUpdated:DateTime,
    schoolApplication:[String],
    reports:String
}

type SchoolShareData {
    shareData:JSON
    shareColumn:JSON
}
scalar Date
type schoolLogs {
    id:String,
    email: [String]
    shareData:JSON
    shareColumn:JSON
    url: String
    linkExpireDate: Date
    sharedBy:sharedBy
    isActive:Boolean
    sharedUrl:String
    created_at:DateTime,
}

type sharedBy {
    id:String,
    email: String,
    hebrewName: String,
    englishName: String,
    cellPhone: String,
    numberExt: String,
    address: String,
}
`;
