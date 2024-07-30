export const therapistInput = `
  input CreateTherapistInput {
    hebrewName: String
    englishName: String!
    cellPhone: String
    numberExt: String
    secretary: String
    slot:[String]
  }
  
  input TherapistUpdateInput {
    id: String
    secretary: [String],
    hebrewName: String
    englishName: String
    cellPhone: String
    numberExt: String
    slot:[String]
  }

  input secretaryMettingToTherapistInput  {
    therapistId: String,
    clientId: String,
    userName: String,
    title: String,
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
    appointmentType:String,
    status:  String,
    otherBillingNote:String,
    startTime: String,
  endTime: String,
}

input updateSecretaryMettingToTherapistInput  {
  id:String,
  therapistId: String,
  clientId: String,
  title: String,
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
  appointmentType:String,
  otherBillingNote:String
  startTime: String,
  endTime: String,
}
  `;