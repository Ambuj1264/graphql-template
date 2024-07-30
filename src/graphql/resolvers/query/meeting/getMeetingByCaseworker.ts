
import { CaseWorkerStudentMetting } from "../../../../database/meeting/caseWorkerMetting";
import { Student } from "../../../../database/student/student";
import { transformInputDate } from "../../../util/commonMethod";
import { GraphQLContext } from "../../../util/graphql";
export const getMeetingByCaseworker = async (
    _: any,
   __: any,
    { userId }: GraphQLContext
) => {
    const meetingQuery = await CaseWorkerStudentMetting.createQueryBuilder("CaseWorkerStudentMetting")
    .where({ caseworkerId: userId })
    .getMany();

    return  meetingQuery;
};
 
export const getMeetingByCaseworkerID = async (
    _: any,
    { caseworkerId, startDate, endDate, studentId }: { caseworkerId: string;
       startDate?: Date; endDate?: Date; studentId?: string[] },
  ) => {
    if (!caseworkerId) {
      throw new Error("Meeting not found.");
    }
    const formattedStartDate = startDate ? transformInputDate(startDate) : null;
    const formattedEndDate = endDate ? transformInputDate(endDate) : null;
    const meetingQuery = CaseWorkerStudentMetting.createQueryBuilder("CaseWorkerStudentMetting")
      .innerJoin(Student, "student", "student.id = CaseWorkerStudentMetting.studentId")
      .where({ caseworkerId: caseworkerId });
    if ( formattedStartDate && formattedEndDate) {
      meetingQuery.andWhere("CaseWorkerStudentMetting.meetingStartDate BETWEEN :formattedStartDate AND :formattedEndDate")
      .andWhere("CaseWorkerStudentMetting.studentId IN (:...studentIds)",
       { formattedStartDate, formattedEndDate, studentIds: studentId });
    }
    const meetings = await meetingQuery.getMany();

    return meetings;
  };
  