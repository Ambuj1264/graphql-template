export const connections = `
type UserConnection {
    totalCount: Int
    edges: [UserEdge]
  }

  type ClientConnection {
    totalCount: Int
    edges: [ClientEdge]
  }
  
  type SchoolConnection {
    totalCount: Int
    edges: [SchoolEdge]
  }

  type TherapistConnection {
    totalCount: Int
    edges: [TherapistEdge]
  }

  type secretaryConnection {
    totalCount: Int
    edges: [secretaryEdge]
  }

  type studentConnection {
    totalCount: Int
    edges: [studentEdge]
  }

  type caseWorkerConnection {
    totalCount: Int
    edges: [caseWorkerEdge]
  }


  type caseWorkerMeetingEdgeConnection {
    totalCount: Int
    edges: [caseWorkerMeetingEdge]
  }
  
  type secretaryMettingToTherapis {
    totalCount: Int
    slot:[String]
    edges: [secretaryMettingToTherapistEdge]
  }
  type clientLogsConnection {
    totalCount: Int
    totalPaidAmount: Int
    totalDueAmount: Int
    totalAmount:Int
    edges: [clientLogsEdge]
  }
type billingsConnection{
  totalCount: Int
  edges: [billingsEdge]
}
`;
