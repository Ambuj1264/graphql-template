import { Student } from "../../../../database/student/student";
import { userPermissions } from "../../../../types/auth";
import { checkPermissions } from "../../../util/commonMethod";
import { GraphQLContext } from "../../../util/graphql";
export const deletStudentIdResolver = async (
    _: any,
    { ids }: { ids: string[] },
    { permissions }: GraphQLContext
) => {
    const isAuthorizedUser = checkPermissions(
        permissions, [userPermissions.SUPER_ADMIN ,
        userPermissions.SECRETARY, userPermissions.SCHOOL_PLACEMENT_DIVISION]);
        if (!isAuthorizedUser) throw new Error("Unauthorized user.");
    const result = await Student.createQueryBuilder()
    .delete()
    .where("id IN (:...ids)", { ids }) 
    .execute();
  if (result.affected === 0) throw new Error("No student found to delete.");

  return ids;
}; 

export const deleteImg = async (
  _: any,
  { id, imgUrl }: { id: string, imgUrl: string }
) => {
    const student = await Student.findOneBy({ id });
    if (!student) {
      throw new Error(`Student with id ${id} not found.`);
    }
    const attachmentIndex = student.reportAttachment.indexOf(imgUrl);
    if (attachmentIndex === -1) {
      throw new Error(`Image URL ${imgUrl} not found in the reportAttachment array.`);
    }
    student.reportAttachment.splice(attachmentIndex, 1);
    await student.save();

    return `Image has been deleted from the student record.`;

};
