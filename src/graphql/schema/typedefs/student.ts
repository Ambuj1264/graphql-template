export const Student = `
type Student{
    id:String
    studentName:String
    fatherName:String
    contactNumber:String
    currentSchool:String
    needs:String
    age:String
    meeting:String
    status:String
    caseworker:[CaseWorkerDetails]
    goToSchool:String
    theCurrentPlan:String
    reportAttachment:[String]
    created_at: DateTime
    createDate:String
}


type CaseWorkerDetails {
    id:String,
    email: String,
    hebrewName: String,
    englishName: String,
    cellPhone: String,
    numberExt: String,
    address: String,
    profileImage:[String],
    city:String,
    state:String,
    zipcode:String,
}

type ScheduleCaseworkerToStudentMeeting{
    id:String
    caseworkerId:CaseWorkerDetails
    studentId:Student
    title:String
    meetingStartDate: Date
    fatherName:String
    cell:String
    description:String
    attachment:[String]
    status: String
    userName:User
    meetingType:String
    created_at:DateTime
    reportId:String
    startTime: String
    endTime: String
  }
`;