export interface CreateTherapistsInput {
    englishName: string;
    hebrewName: string;
    cellPhone: string;
    numberExt: string;
    slot: [string];
}

export interface UpdateTherapistsInput {
    id: string;
    englishName: string;
    hebrewName: string;
    cellPhone: string;
    numberExt: string;
    secretary:  [string];
    slot: [string];
}

export interface CreateSecretaryMettingToTherapistInput {
    therapistId: string;
    userName: string;
    appointmentType: string;
    clientId: string;
    title: string;
    appointmentTime: Date;
    reason: string;
    price: number;
    cell: string;
    fatherName: string;
    inCharge: string;
    frequency: string;
    recurringPrice: number;
    description: string;
    attachment: [string];
    status: string;
    otherBillingNote: string;
    startTime: string;
    endTime: string;
  }

  export interface UpdateSecretaryMettingToTherapistInput {
    id: string;
    therapistId: string;
    appointmentType: string;
    clientId: string;
    title: string;
    appointmentTime: Date;
    reason: string;
    price: number;
    cell: string;
    fatherName: string;
    inCharge: string;
    frequency: string;
    recurringPrice: number;
    description: string;
    attachment: [string];
    status: string;
    otherBillingNote: string;
    startTime: string;
    endTime: string;
  }