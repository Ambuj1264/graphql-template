import { userPermissions } from "../../../../types/auth";
import { School } from "../../../../database/schoolManagement/school";
import { checkPermissions } from "../../../util/commonMethod";
import { GraphQLContext } from "../../../util/graphql";
export const deleteschoolReslover = async (
    _: any,
    { ids }: { ids: string[] },
    { permissions }: GraphQLContext
) => {
    const isAuthorizedUser = checkPermissions(permissions,
        [
            userPermissions.SUPER_ADMIN,
            userPermissions.SECRETARY,
            userPermissions.SCHOOL_PLACEMENT_DIVISION
        ]);
    if (!isAuthorizedUser) {
        throw new Error("Unauthorized user.");
    }
    const result = await School.createQueryBuilder()
        .delete()
        .where("id IN (:...ids)", { ids })
        .execute();
    if (result.affected === 0) throw new Error("School not found.");

    return ids;
};

export const removeSchoolImg = async (
    _: any,
    { id, imgUrl }: { id: string, imgUrl: string }
  ) => {
      const school = await School.findOneBy({ id });
      if (!school) {
        throw new Error(`School with id ${id} not found.`);
      }
      const attachmentIndex = school.schoolApplication.indexOf(imgUrl);
      if (attachmentIndex === -1) {
        throw new Error(`Image URL ${imgUrl} not found in the schoolApplication array.`);
      }
      school.schoolApplication.splice(attachmentIndex, 1);
      await school.save();
  
      return `Image has been deleted from the school record.`;
  
  };
  