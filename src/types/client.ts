export interface ClientInput {
    email: string;
    firstName: string;
    lastName: string;
    fatherName: string;
    cell: string;
    title: string;
    reason: string;
    firstPrice: string;
    followUpPrice:  string;
    firstNotes: JSON[];
    attachment: [string];
    kehilah: string;
    yeshivah: string;
    selectTherapist: string;
    parents: string;
    inCharge: string;
    billingDepartment: string;
    frequency: string;
    otherBillingNote: string;
    active: string;
}
export interface UpdateClientInput {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    fatherName: string;
    cell: string;
    title: string;
    reason: string;
    firstPrice:  string;
    followUpPrice:  string;
    firstNotes: JSON[];
    attachment: [string];
    kehilah: string;
    yeshivah: string;
    selectTherapist: string;
    parents: string;
    inCharge: string;
    billingDepartment: string;
    frequency: string;
    otherBillingNote: string;
    active: string;
}

export interface PaymentInput {
  amount: number;
  comment: string; 
  therapist: string;
  client: string;
  paymentStatus: string;
  paymentMethod: string;
}

export interface SharePaymentInput {
  amount: number;
  email: string;
  clientName: string;
  phoneNumber: string;

}

export type FilterOptions = Record<string, string>;
export interface GetSearchArgs {
  filterOptions: { id: string; value: string };
}
