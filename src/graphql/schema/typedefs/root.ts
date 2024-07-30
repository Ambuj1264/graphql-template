export const root = `
  # Query Definitions
  type Query {
    getCaseworkerChatRoom:[SingleChatRoomCaseworkerType]
    clearCache(entries: [CacheEntry]!): String
    login(loginName: String, password: String): LoginWithToken
    users(first: Int, after: Int,search: String,filterOptions: JSON,isActive: Boolean): UserConnection!
    getMyFeatures: UserFeatures
    getUserDetailsById(id:String!): User
    getRole:[Role]
    deleteUser(userIds:[String]): [ID]
    clientList(first: Int, after: Int,search: String,filterOptions: JSON):ClientConnection!
    deletClientById(id:String): ID
    getClientById(id:String):Client 
    getClientByappoinment(id:String):Client
    schoolList(first: Int, after: Int,search: String,filterOptions: JSON):SchoolConnection!
    getschoolById(id:String):School
    deleteSchool(ids:[String]) :[ID]
    therapists(first: Int, after: Int,search: String):TherapistConnection!
    getTherapistById(id:String):Therapist
    secretaryList(search: String):secretaryConnection!
    caseworkers(first: Int, after: Int,search: String,filterOptions: JSON):caseWorkerConnection!
    students(first: Int, after: Int,search: String,filterOptions: JSON):studentConnection!
    getstudentById(id:String):Student
    deleteStudent(ids:[String]) :[ID]
    deleteTherapist(id:String):ID
    deleteImg(id:String,imgUrl:String) : String
    shareSchoolList(url: String):[SchoolShareData]
    navMenus:NavMenu
    SharedLogs:[schoolLogs]
    expiredShareSchoolLink(id:String): String
    getStudentByCaseworker(first: Int, after: Int,search: String,filterOptions: JSON):studentConnection!
    getMeetingByCaseworkerID(caseworkerId:String, startDate:String, endDate:String studentId:[String]):[ScheduleCaseworkerToStudentMeeting]!
    getMeetingByCaseworker:[ScheduleCaseworkerToStudentMeeting]!
    deleteCaseworkerMeetingToStudent(ids:[String]):String
    getMeetingByStudentID(studentId:String):caseWorkerMeetingEdgeConnection!
    deleteSecretaryTherapistAppointment(ids:[String]): String
    secretaryTherapistAppointments: secretaryMettingToTherapis!
    getAppointmentByTherapistId(therapistId:String,startDate:String, endDate:String,clientId:[String]): secretaryMettingToTherapis!
    getAppointmentReports(clientId:String):secretaryMettingToTherapis!
    getClientAppointmentLogs(clientId:String,therapistId:String):clientLogsConnection!
    getBillingsData(clientIds:[String],first: Int, after: Int,search: String,filterOptions: JSON):billingsConnection!
    deleteStudentReportImg(id:String,imgUrl:String) : String
    deleteAppointmentReportImg(id:String,imgUrl:String) : String
    getClientByTherapist(id:String):ClientConnection! 
    removeSchoolImg(id:String,imgUrl:String) : String
    unAssignedCaseworker(id:String,caseworker:String):Student
    removeClientImg(id:String,imgUrl:String) : String
    getStudentByCaseworkerId(id:String):studentConnection!
    }
  
  # Mutation Definitions  
  type Mutation {
    SingleChatRoomCaseworkermutation(input:SingleChatRoomCaseworkerInput):SingleChatRoomCaseworkerType
    scheduleOperation(input:ChatInput):[Operation]
   createRole(input:roleInput!): ID
   createUser(input: CreateUserInput!): User
   loginUpdate(input: LoginUpdateInput!): LoginUpdate
   loginReset(input: LoginResetInput!): String
   changePassword(input:ChangePasswordInput!): LoginWithToken
   userUpdate(input: UserUpdateInput!): UserUpdate
   createClient(input: clientInput!):Client
   updateClient(input:updateClientInput!):Client
   createSchool(input:schoolInput!):School
   updateSchool(input:UpdateSchool!):School
   createTherapists(input:CreateTherapistInput):Therapist
   editRolePermissions(input:UpdateRoleInput):Role
   assignSecretary(input:TherapistUpdateInput):Therapist
   createStudent(input:StudentInput):Student
   updateStudent(input:updateStudentInput):Student
   unAssignedSecretary(input:TherapistUpdateInput):Therapist
   schoolListingSharing(input:SchoolListingSharingInput):String
   scheduleMeetingToStudent(input:scheduleCaseworkerToStudentMeetingInput):ScheduleCaseworkerToStudentMeeting
   updateMeetingToStudent(input:updateCaseworkerToStudentMeetingInput):ScheduleCaseworkerToStudentMeeting
   createAppointmentToTherapist(input:secretaryMettingToTherapistInput):secretaryMettingToTherapist
   updateSecretaryAppointmentToTherapist(input:updateSecretaryMettingToTherapistInput):secretaryMettingToTherapist
   updateClientLogs(input:paymentInput):String
   sharePaymentRequest(input:sharePaymentInput):String

  }

  # Scalar Definitions
  scalar DateTime
  scalar JSON
  scalar Upload

`;
