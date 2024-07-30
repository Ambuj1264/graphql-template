import { SchoolShareList } from "../../../../database/schoolManagement/schoolshareList";
export const shareSchoolListResolver = async (
  _: any,
  { url }: { url: string },
) => {
  const currentDate =  new Date().toJSON().slice(0, 10);
  const schoolQuery = SchoolShareList.createQueryBuilder("schoolShareList");
  const schoolShareLists = await schoolQuery
    .where({ url, isActive: true })
    .andWhere("schoolShareList.linkExpireDate >= :currentDate", { currentDate })
    .getMany();
  if (schoolShareLists.length === 0) {
    throw new Error("Error: It seems the link you are trying to access has expired. Please contact the concerned person and ask them to share the link again.");
  }

  return schoolShareLists;
};
