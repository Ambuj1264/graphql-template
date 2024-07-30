
import { SchoolShareList } from "../../../../database/schoolManagement/schoolshareList";
export const expiredShareSchoolLink = async (
  _: any,
  { id }: { id: string },
) => {
  const schoolQuery = SchoolShareList.createQueryBuilder("schoolShareList");
  await schoolQuery
  .update(SchoolShareList)
  .set({ isActive: false })
  .where({id}) 
  .execute() .then((response) => {
    if (response.affected !== 1) {
      throw new Error(`error`);
    }
  });

  return "Link expired successfully";
};
