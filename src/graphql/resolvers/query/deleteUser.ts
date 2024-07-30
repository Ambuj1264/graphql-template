
import { Login } from "../../../database/login/login";
import { Role } from "../../../database/role/role";
import { User } from "../../../database/user/user";
import { userPermissions } from "../../../types/auth";
import { checkPermissions } from "../../util/commonMethod";
import { GraphQLContext } from "../../util/graphql";

export const deleteUserResolver = async (
  _: any,
  { userIds }: { userIds: string[] },
  { permissions }: GraphQLContext
) => {
  const isAdmin = checkPermissions(permissions, [userPermissions.SUPER_ADMIN,
     userPermissions.SCHOOL_PLACEMENT_DIVISION]);
  if (!isAdmin) throw new Error("Unauthorized user.");
  if (!userIds || userIds.length === 0) {
    throw new Error("User IDs are missing.");
  }
  const users = await User.createQueryBuilder("user")
  .whereInIds(userIds)
  .getMany();
  for (const user of users) {
    const userRoles = await Role.createQueryBuilder("role")
    .whereInIds(user.role)
    .getMany();
    
    // Check if any of the roles have the "SUPER_ADMIN" role constraint.
    const hasSuperAdminRole = userRoles.some(
      (role) => role.roleConstraint === "SUPER_ADMIN"
    );

    if (hasSuperAdminRole) {
      throw new Error("Deletion Error: Super Admin account can't be deleted.");
    }
  }

  const result = await Login.createQueryBuilder()
    .update()
    .set({ isDeleted: true })
    .where("userId IN (:...userIds)", { userIds }) 
    .execute();
  if (result.affected === 0) throw new Error("No users found to delete.");

  return userIds;
};
