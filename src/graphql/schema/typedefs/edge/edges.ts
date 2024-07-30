export const edges = `
type UserEdge {
    node: User
    cursor: ID
  }

  type ClientEdge {
    node: Client
    cursor: ID
  }
  
  type SchoolEdge {
    node: School
    cursor: ID
  }

  type TherapistEdge {
    node: Therapist
    cursor: ID
  }

  type secretaryEdge{
    node:secretaryDetails
    cursor: ID
  }

  type studentEdge{
    node:Student
    cursor: ID
  }

  type caseWorkerEdge{
    node:CaseWorkerDetails
    cursor: ID
  }


  type caseWorkerMeetingEdge{
    node:ScheduleCaseworkerToStudentMeeting
    cursor: ID
  }

  type secretaryMettingToTherapistEdge{
    node:secretaryMettingToTherapist
    cursor: ID
    
  }

  type clientLogsEdge{
    node:ClientappoimentLogs
    cursor: ID
  }

  type billingsEdge{
    node:billingSection
    cursor: ID
  }
`;
