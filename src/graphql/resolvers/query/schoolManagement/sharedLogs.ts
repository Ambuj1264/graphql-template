import { SchoolShareList } from "../../../../database/schoolManagement/schoolshareList";
import CronJob from "node-cron";
export const SharedLogs = async (
  _: any,
) => {
  const schoolQuery = SchoolShareList.createQueryBuilder("schoolShareList");
  const schoolShareLists = await schoolQuery.orderBy("created_at", "DESC").getMany();
  if (schoolShareLists.length === 0) {
    throw new Error("Error: Something went wrong.");
  }

    return schoolShareLists;
};

const job = CronJob.schedule("0 20 * * *", async () => {
   cronJobs();
    // tslint:disable-next-line
  console.log("Cron job executed!");
}, {
  timezone: "Asia/Kolkata" 
});
// Start the cron job
job.start();

// Your updateShareSchoolsData function
export const   cronJobs = async () => {
  const currentDate = new Date().toJSON().slice(0, 10);
  await SchoolShareList.createQueryBuilder("SchoolShareList")
    .update()
    .set({ isActive: false })
    .where("linkExpireDate < :currentDate", { currentDate })
    .execute();
  const schoolQuery = SchoolShareList.createQueryBuilder("schoolShareList");
  const schoolShareLists = await schoolQuery.getMany();
  if (schoolShareLists.length === 0) {
    throw new Error("Error: Something went wrong.");
  }

  return schoolShareLists;
};
