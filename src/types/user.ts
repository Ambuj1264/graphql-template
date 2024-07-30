export interface CreateLoginInput {
  loginName: string;
  password: string;
  userId: string;
}

export interface CreateRoleInput {
  role: string;
  roleConstraint: string;
  navMenu: Record<string, any>;
  isActive: boolean;
  rolePermissions: Record<string, any>;
}

export interface UpdateRoleInput {
  id: string;
  isActive: boolean;
  updatedPermissions: Record<string, any>;
}

export interface CreateUserInput {
  englishName: string;
  email: string;
  hebrewName: string;
  cellPhone: string;
  numberExt: string;
  address: string;
  role: string;
  profileImage: [string];
  city: string;
  state: string;
  zipcode: string;
}

export interface UserUpdateInput {
  id: string;
  englishName: string;
  hebrewName: string;
  cellPhone: string;
  numberExt: string;
  address: string;
  role: string;
  profileImage: [string];
  city: string;
  state: string;
  zipcode: string;
  isActive: boolean;
}

export type UserFilterOptions = Record<string, string>;
export interface GetSearchUsersArgs {
  filterOptions: { id: string; value: string };
}
