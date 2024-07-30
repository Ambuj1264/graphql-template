export const ClientInput = `
input clientInput {
    email: String
    firstName: String
    lastName: String
    fatherName: String
    cell: String
    title: String
    reason: ReasonValue
    firstPrice: Int
    followUpPrice: Int
    firstNotes: JSON
    attachment: [String]
    kehilah: String 
    yeshivah: String
    selectTherapist: String
    parents: String
    inCharge: String
    billingDepartment: BillingDepartmentValue
    frequency: FrequencyValue
    otherBillingNote:String
    active: String
}


input updateClientInput {
  id:String
  email: String
  firstName: String
  lastName: String
  fatherName: String
  cell: String
  title: String
  reason: ReasonValue
  firstPrice: Int
  followUpPrice: Int
  firstNotes: JSON
  attachment: [String]
  kehilah: String 
  yeshivah: String
  selectTherapist: String
  parents: String
  inCharge: String
  billingDepartment: BillingDepartmentValue
  frequency: FrequencyValue
  otherBillingNote:String
  active: String
}


input paymentInput{
  amount:Int
  comment:String
  therapist:String
  client:String
  paymentMethod:String
}
input sharePaymentInput {
  amount: Int
  email:String
  clientName:String
  phoneNumber:String
}
  `;
 