import { School } from "../../../database/schoolManagement/school";
import { UpdateSchoolInput } from "../../../types/school";
import { checkPermissions } from "../../util/commonMethod";
import { userPermissions } from "../../../types/auth";
import { GraphQLContext } from "../../util/graphql";
import { dataLoaders } from "../../resolvers/dataloaders";
export const updateSchoolMutation = async (
    _: any,
    { input }: { input: UpdateSchoolInput; },
    { permissions , userId}: GraphQLContext
) => {
    const {email, id, ...rest} = input;
    const isAuthorizedUser = checkPermissions(
        permissions,
        [
            userPermissions.SUPER_ADMIN,
            userPermissions.SCHOOL_PLACEMENT_DIVISION 
        ]);
    if (!isAuthorizedUser) throw new Error("Unauthorized user.");
    const user = await dataLoaders.userLoader.load(userId);
  const createByName = user.englishName;
    await School.createQueryBuilder()
        .update()
        .set({...rest, createdBy: createByName})
        .where({ id })
        .output("*")
        .execute()
        .then((response) => {
            if (response.affected !== 1) {
                throw new Error("School not updated."); 
            }
        });

    return  await dataLoaders.schoolLoader.clear(input.id).load(input.id);
};