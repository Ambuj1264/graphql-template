export interface StudentInput {
    studentName: string;
    fatherName: string;
    contactNumber: string;
    currentSchool: string;
    needs: string;
    age: string;
    caseworker:  [string];
    goToSchool: string;
    theCurrentPlan: string;
    reportAttachment: [string];
}

export interface UpdateStudentInput {
    id: string;
    studentName: string;
    fatherName: string;
    contactNumber: string;
    currentSchool: string;
    needs: string;
    meeting: string;
    status: string;
    age: string;
    caseworker:  [string];
    goToSchool: string;
    theCurrentPlan: string;
    reportAttachment: [string];
}

export interface ScheduleCaseworkerToStudentMeetingInput {
  caseworkerId: string;
  studentId: string;
  title: string;
  meetingStartDate: Date;
  fatherName: string;
  cell: string;
  userName: string;
  description: string;
  attachment: [string];
  meetingType: string;
  status: string;
  startTime: string;
  endTime: string;
}

export interface UpdateCaseworkerToStudentMeetingInput {
  id: string;
  caseworkerId: string;
  studentId: string;
  title: string;
  meetingStartDate: Date;
  fatherName: string;
  cell: string;
  userName: string;
  description: string;
  attachment: [string];
  meetingType: string;
  status: string;
  startTime: string;
  endTime: string;
}

export type StudentFilterOptions = Record<string, string>;
export interface GetSearchStudentsArgs {
  filterOptions: { id: string; value: string };
}
