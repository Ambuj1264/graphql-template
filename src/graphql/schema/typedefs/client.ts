export const client = `
type Client{
    id: String
    email: String
    firstName: String
    lastName: String
    fatherName: String
    cell: String
    title: String
    reason: String
    firstPrice: Int
    createdBy:String
    followUpPrice: Int
    firstNotes: JSON
    attachment: [String]
    kehilah: String 
    yeshivah: String
    selectTherapist: Therapist
    parents: String
    inCharge: String 
    billingDepartment: String
    frequency: String
    createdAt: DateTime
    otherBillingNote:String
    active: String
    appointmentTime:DateTime
    createDate:String
}
  
type ClientappoimentLogs{
  id:String
  therapist:Therapist
  client:Client
  appointmentId:String
  comment:String
  totalAmount:String
  amountPaid:String
  datePaid:Date
  amountStillOwes:String
  paymentStatus:String
  paymentMethod:String
  created_at:Date
}

type billingSection {
  id:String
  appointmentId:secretaryMettingToTherapist
  therapist:Therapist
  client:Client
  comment:String
  totalAmount:String
  amountPaid:String
  datePaid:Date
  amountStillOwes:String
  paymentStatus:String
  paymentMethod:String
  created_at:Date
}

  `;
 