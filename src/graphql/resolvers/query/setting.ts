import { Role } from "../../../database/role/role";
import { GraphQLContext } from "../../util/graphql";
import { dataLoaders } from "../dataloaders";

export const getUserFeatureResolver = async (
  _: any,
  __: any,
  { userId }: GraphQLContext
): Promise<Role> => {
    const userDetails = await dataLoaders.userLoader.load(userId);
    await dataLoaders.roleById.clear(userDetails.role);

    return dataLoaders.roleById.load(userDetails.role);
};

export const getRoleResolver = async (): Promise<Role[]> => {
  return (await Role.createQueryBuilder("Role").getMany());
};