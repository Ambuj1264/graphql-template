import { Brackets } from "typeorm";
import { Therapists } from "../../../../database/therapists/therapists";
import { userPermissions } from "../../../../types/auth";
import { checkPermissions, createWhereExpression } from "../../../util/commonMethod";
import { GraphQLContext } from "../../../util/graphql";
import { dataLoaders } from "../../dataloaders";
import { validTherapistsFields } from "../../../../types/searchFields";

export const therapistQueryResolver = async (
    _: any,
    input: { first: number, after: number, search: string },
    {userId, permissions }: GraphQLContext
) => {
    const { first = 10, after, search } = input;
    const therapistQuery = Therapists.createQueryBuilder("therapists")
    .orderBy("therapists.createdAt", "DESC");
    const isAuthorizedUser = checkPermissions(
        permissions, 
        [
            userPermissions.SUPER_ADMIN,
            userPermissions.ADMIN
            ]);
      const userIdJSONB = JSON.stringify([userId]);
      if (!isAuthorizedUser) {
          therapistQuery.andWhere(`:userId::jsonb <@ therapists.secretary`, { userId: userIdJSONB });
      }
    if (search) {
        const brackets = new Brackets((sqb) => {
            validTherapistsFields.map( (field, idx) => {
            const { searchString, params } = createWhereExpression(field, search);
            sqb.orWhere(searchString, params);
          });
        });
        therapistQuery.andWhere(brackets);
      }
      const  [therapists, totalCount] = await therapistQuery.skip(after).take(first).getManyAndCount();
    const therapistNodes = therapists.map(therapist => {
        return {
            node: therapist,
            cursor: therapist.id,
        };
    });

    return {
        totalCount,
        edges: therapistNodes,
    };
};

export const gettherapistById = async (
    _: any,
    {id}: {id: string},
    {permissions}: GraphQLContext
) => {
    const isAuthorizedUser = checkPermissions(
        permissions, 
        [
            userPermissions.SUPER_ADMIN ,
             userPermissions.SECRETARY
            ]);
    if (!isAuthorizedUser) throw new Error("Unauthorized user.");

    return  await dataLoaders.therapistsLoader.load(id);
}; 