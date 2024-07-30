import { Role } from "../../../../database/role/role";
import { User } from "../../../../database/user/user";
import { Login } from "../../../../database/login/login";

export const secretaryQueryResolver = async (
    _: any,
    input: { search: string }
) => {
    try {
        // Find the role with roleConstraint "SECRETARY"
        const role = await Role.findOne({ where: { roleConstraint: "SECRETARY" } });
        if (!role) {
            throw new Error("Role not found.");
        }
        const { search } = input;
        const secretaryQuery = User.createQueryBuilder("user");
        const [secretaryResults, totalCount] = await secretaryQuery
            .leftJoin(Login, "login", "user.id = login.userId")
            .where("login.isDeleted = :isDeleted", { isDeleted: false })
            .andWhere("user.role = :role", { role: role.id })
            .andWhere("user.englishName ILIKE :search", { search: `%${search}%` })
            .getManyAndCount();
        const secretaryNodes: any = secretaryResults.map(secretary => {
            return {
                node: secretary,
                cursor: secretary.id,
            };
        });

        return {
            totalCount,
            edges: secretaryNodes,
        };
    } catch (error) {
        throw new Error(`Error fetching data: ${error}`);
    }
};
