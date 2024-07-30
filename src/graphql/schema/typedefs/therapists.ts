export const therapist = `
type Therapist {
    id:String,
    hebrewName: String,
    englishName: String,
    cellPhone: String,
    numberExt: String,
    slot:[String]
    secretary: [secretaryDetails],
}

type secretaryDetails {
    id:String,
    email: String,
    hebrewName: String,
    englishName: String,
    cellPhone: String,
    numberExt: String,
    address: String,
}

type secretaryMettingToTherapist  {
    id:String,
    therapistId: Therapist,
    clientId: Client,
    userName: User,
    title: String,
    appointmentType:String,
    appointmentTime: Date,
    reason:  String,
    price:  Int,
    cell:  String,
    fatherName:  String,
    inCharge: String,
    frequency:  String,
    recurringPrice: Int,
    description: String,
    attachment: [String],
    status:  String,
    created_at:DateTime
    reportId:String
    otherBillingNote:String
    startTime: String,
    endTime: String,
}
`;