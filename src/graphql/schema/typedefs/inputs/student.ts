export const StudentInput = `
input StudentInput{
    studentName:String
    fatherName:String
    contactNumber:String
    currentSchool:String
    needs:String
    age:String
    caseworker:[String]
    goToSchool:String
    theCurrentPlan:String
    reportAttachment:[String]
}
input updateStudentInput{
    id:String
    studentName:String
    fatherName:String
    contactNumber:String
    currentSchool:String
    needs:String
    age:String
    meeting:String
    status:String
    caseworker:[String]
    goToSchool:String
    theCurrentPlan:String
    reportAttachment:[String]
}

input scheduleCaseworkerToStudentMeetingInput{
  caseworkerId: String
  studentId: String
  title:String
  meetingStartDate: Date
  fatherName:String
  cell:String
  userName:String
  description:String
  attachment:[String]
  status: String
  meetingType:String
  startTime: String
  endTime: String
  }

  input updateCaseworkerToStudentMeetingInput{
  id:String
  caseworkerId: String
  studentId: String
  title:String
  meetingStartDate: Date
  fatherName:String
  cell:String
  userName:String
  description:String
  attachment:[String]
  status: String
  meetingType:String
  startTime: String
  endTime: String
  }
`;
