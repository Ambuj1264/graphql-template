export const userPermissions = {
  SUPER_ADMIN: "SUPER_ADMIN",
  ADMIN: "ADMIN",
  SECRETARY: "SECRETARY",
  BILLING_DEPARTMENT: "BILLING_DEPARTMENT",
  SCHOOL_PLACEMENT_DIVISION: "SCHOOL_PLACEMENT_DIVISION",
  CASEWORKER: "CASEWORKER",
};

export interface LoginResetInput {
  loginName: string;
}

export interface LoginUpdateInput {
  englishName: string;
  hebrewName: string;
  cellPhone: string;
  numberExt: string;
  address: string;
  profileImage: [string];
  oldPassword: string;
  password: string;
}
export interface ChangePassword {
  password: string;
  tokenId: string;
}
export interface ChangePasswordTemplateOptions {
  firstName: string;
  tempPassword: string;
}