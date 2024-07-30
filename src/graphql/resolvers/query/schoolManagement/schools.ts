
import { Brackets } from "typeorm";
import { School } from "../../../../database/schoolManagement/school";
import { userPermissions } from "../../../../types/auth";
import { checkPermissions, createWhereExpression } from "../../../util/commonMethod";
import { GraphQLContext } from "../../../util/graphql";
import { dataLoaders } from "../../dataloaders";
import { validSchoolSearchFields } from "../../../../types/searchFields";
import { FilterOptions } from "../../../../types/client";
import { schoolFilterQueryBuilder } from "../../../util/schoolQuery";
export const schoolListResolver = async (
    _: any,
    input: { first: number, after: number, search: string, filterOptions: FilterOptions},
    { permissions }: GraphQLContext
) => {
    const isAuthorizedUser = checkPermissions(
    permissions, [userPermissions.SUPER_ADMIN ,
    userPermissions.SECRETARY ,
    userPermissions.CASEWORKER,
    userPermissions.ADMIN,
    userPermissions.SCHOOL_PLACEMENT_DIVISION]);
    if (!isAuthorizedUser) throw new Error("Unauthorized user.");
    const { first = 10, after, search } = input;

    const filterOptions = input?.filterOptions;
    const schoolQuery = School.createQueryBuilder("school")
    .orderBy("school.createdAt", "DESC");
        if (search) {
            const brackets = new Brackets((sqb) => {
                validSchoolSearchFields.map( (field, idx) => {
                const { searchString, params } =  createWhereExpression(field, search);
                sqb.orWhere(searchString, params);
              });
            });
            schoolQuery.andWhere(brackets);
          }
          if (filterOptions) {
            await schoolFilterQueryBuilder(schoolQuery, filterOptions);
        }
          const  [schools, totalCount] = await schoolQuery.skip(after).take(first).getManyAndCount();
    
    const schoolsNodes = schools.map(school => {
        return {
            node: school,
            cursor: school.id,
        };
    });

    return {
        totalCount,
        edges: schoolsNodes,
    };
};

export const getschoolById = async (
    _: any,
    {id}: {id: string},
    {permissions}: GraphQLContext
) => {
    const isAuthorizedUser = checkPermissions(
        permissions, 
        [
            userPermissions.SUPER_ADMIN ||
             userPermissions.SECRETARY ||
             userPermissions.SCHOOL_PLACEMENT_DIVISION ||
             userPermissions.BILLING_DEPARTMENT
            ]);
    if (!isAuthorizedUser) throw new Error("Unauthorized user.");

    return  await dataLoaders.schoolLoader.load(id);
}; 