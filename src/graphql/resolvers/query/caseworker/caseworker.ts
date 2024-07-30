import { Role } from "../../../../database/role/role";
import { User } from "../../../../database/user/user";
import { Login } from "../../../../database/login/login";
import { UserFilterOptions } from "../../../../types/user";
import { Brackets } from "typeorm";
import { validUsersSearchFields } from "../../../../types/searchFields";
import { checkPermissions, createWhereExpression } from "../../../util/commonMethod";
import { userFilterQueryBuilder } from "../../../util/userQuery";
import { GraphQLContext } from "../../../util/graphql";
import { userPermissions } from "../../../../types/auth";

export const caseworkerQueryResolver = async (
    _: any,
    input: { first: number, after: number, search: string, filterOptions: UserFilterOptions},
    { userId, permissions }: GraphQLContext,
) => {
    const { first = 10, search, after} = input;
   const filterOptions = input?.filterOptions;
        // Find the role with roleConstraint "CASEWORKER"
        
        const role = await Role.findOne({ where: { roleConstraint: "CASEWORKER" } });
        if (!role) {
            throw new Error("Role not found.");
        }
        const caseworkerQuery = User.createQueryBuilder("user")
        .leftJoin(Login, "login", "user.id = login.userId")
            .where("login.isDeleted = :isDeleted", { isDeleted: false })
            .andWhere("user.role = :role", { role: role.id });

            const isAuthorizedUser = checkPermissions(
              permissions, 
              [
                  userPermissions.SUPER_ADMIN,
                  userPermissions.ADMIN,
                  userPermissions.SCHOOL_PLACEMENT_DIVISION,

                  ]);
            if (!isAuthorizedUser) {
              caseworkerQuery.where({id: userId});
            }

            if (search) {
                const brackets = new Brackets((sqb) => {
                  validUsersSearchFields.map( (field, idx) => {
                    const { searchString, params } =  createWhereExpression(field, search);
                    sqb.orWhere(searchString, params);
                  });
                });
                caseworkerQuery.andWhere(brackets);
              }
              if (filterOptions) {
                await userFilterQueryBuilder(caseworkerQuery, filterOptions);
            }
              
              const  [caseworkerResults, totalCount] = await caseworkerQuery.skip(after).take(first).getManyAndCount();
        const  caseworkerNodes: any =  caseworkerResults.map( caseworker => {
            return {
                node:  caseworker,
                cursor:  caseworker.id,
            };
        });

        return {
            totalCount,
            edges: caseworkerNodes,
        };
};
