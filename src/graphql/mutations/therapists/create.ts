import { Therapists } from "../../../database/therapists/therapists";
import { userPermissions } from "../../../types/auth";
import { CreateTherapistsInput } from "../../../types/therapists";
import { dataLoaders } from "../../resolvers/dataloaders";
import { checkPermissions } from "../../util/commonMethod";
import { GraphQLContext } from "../../util/graphql";

export const createTherapists = async (
    _: null,
    { input }: { input: CreateTherapistsInput },
    { permissions }: GraphQLContext
) => {
    const isAuthorizedUser = checkPermissions(
      permissions,
      [userPermissions.SUPER_ADMIN]);
    if (!isAuthorizedUser) {
      throw new Error("Unauthorized user.");
    }
    const existingTherapist = await Therapists.findOne({
      where: { cellPhone: input.cellPhone },
  });

  if (existingTherapist) {
      throw new Error("Number is duplicate.");
  }
    const therepist = await Therapists.createQueryBuilder()
    .insert()
    .values({...input})
    .output("*")
    .execute()
    .then((response) => {
        if (!Array.isArray(response.raw) || response.raw.length === 0) { 
        throw new Error("Failed to school data save");
        }

        return response.identifiers[0].id;
    });

    return  await dataLoaders.therapistsLoader.load(therepist);
};
