import { Role } from "../../../database/role/role";
import { userPermissions } from "../../../types/auth";
import { UpdateRoleInput } from "../../../types/user";
import { checkPermissions } from "../../util/commonMethod";
import { GraphQLContext } from "../../util/graphql";

export const editRolePermissions = async (_: any, { input }: { input: UpdateRoleInput },
    { permissions }: GraphQLContext) => {
    const { id, isActive, updatedPermissions } = input;
    const isAuthorizedUser = checkPermissions(
        permissions,
        [
            userPermissions.SUPER_ADMIN]);
    if (!isAuthorizedUser) {
        throw new Error("Unauthorized user.");
    }
    const updatedAt = new Date().toISOString();

    const queryBuilder = Role.createQueryBuilder()
        .update(Role)
        .set({
            updated_at: updatedAt
        })
        .where("id = :id", { id: id });
    if (updatedPermissions) {
        queryBuilder.set({
            rolePermissions: () => `rolePermissions || '${JSON.stringify(updatedPermissions)}'::jsonb`
        });
    }

    if (isActive !== undefined) {
        const isSuperAdmin = await Role.findOneBy({ id });
        if (isSuperAdmin?.roleConstraint === "SUPER_ADMIN") {
            throw new Error("Super Admin cannot be edited");
        }
        queryBuilder.set({ isActive: isActive });
    }
    const result = await queryBuilder.output("*").execute();
    if (result.affected !== 1) {
        throw new Error("Failed to update");
    }

    return result.raw[0];

};
