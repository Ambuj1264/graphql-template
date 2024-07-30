import { Role } from "../../../database/role/role";
import { 
  adminMenu,
  billingUnitMenu,
  schoolPlacementMenu,
  secretariesMenu,
  superAdminMenu 
} from "../../../types/navMenu";
import { 
  adminPreferences,
  billingUnitPreferences,
  schoolPlacementDepartmentPreferences,
  secretaryPreferences,
  superAdminPreferences,
  caseworkerPreferences
} from "../../../types/preferences";
import { CreateRoleInput } from "../../../types/user";
export const createRole = async (
  _: null,
  { input }: { input: CreateRoleInput },
): Promise<any> => {
  const existingRole = await Role.findOne({ where: { role: input.role } });
  if (existingRole) {
    throw new Error(`Role with '${input.role}' already exists.`);
  }
  const result = await Role.createQueryBuilder()
    .insert()
    .values({
      ...input
    })
    .output("*")
    .execute()
    .then((response) => {
      if (!Array.isArray(response.raw) || response.raw.length === 0) {
        throw new Error("Failed to save data");
      }

      return response.raw[0].id;    
    });

  return result;
};

export const getPreferencesByRole = async (userRole: string) => {
   switch (userRole) {
    case "SUPER_ADMIN":
      return superAdminPreferences;
    case "ADMIN":
      return adminPreferences;
    case "SECRETARY":
      return secretaryPreferences;
    case "SCHOOL_PLACEMENT_DIVISION":
      return schoolPlacementDepartmentPreferences;
    case "BILLING_DEPARTMENT":
      return billingUnitPreferences;
      case "CASEWORKER":
        return caseworkerPreferences;
    default:
      return {}; 
      // Return null for an unknown role or
      //  handle accordingly in your application.
  }
};

export const getNavMenusByRole = async (userRole: string) => {
   switch (userRole) {
    case "SUPER_ADMIN":
      return superAdminMenu;
    case "ADMIN":
      return adminMenu;
    case "SECRETARY":
      return secretariesMenu;
    case "SCHOOL_PLACEMENT_DIVISION":
      return schoolPlacementMenu;
    case "BILLING_DEPARTMENT":
      return billingUnitMenu;
      case "CASEWORKER":
        return caseworkerPreferences;
    default:
      return {}; 
      // Return null for an unknown role or
      //  handle accordingly in your application.
  }
};
