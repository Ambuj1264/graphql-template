import { CaseWorkerStudentMetting } from "../../../../database/meeting/caseWorkerMetting";
export const deleteCaseworkerMeetingToStudent = async (
  _: any,
  { ids }: { ids: string[] },
) => {
  const result = await CaseWorkerStudentMetting.createQueryBuilder()
  .delete()
  .where("id IN (:...ids)", { ids }) 
  .execute();
if (result.affected === 0) throw new Error("No meeting found to delete.");

return "Meeting deleted successfully";
}; 

export const getMeetingByStudentID = async (
    _: any,
    {studentId}: {studentId: string},
  ) => {
    const studentQuery = CaseWorkerStudentMetting.createQueryBuilder("caseWorkerStudentMetting").orderBy("caseWorkerStudentMetting.created_at", "DESC")
    .where({studentId: studentId})
    .andWhere("status = 'Done'");
    const [students, totalCount] = await studentQuery.getManyAndCount();
    const studentsNodes = students.map((student) => {
      return {
        node: student,
        cursor: student.id,
      };
    });

    return {
      totalCount,
      edges: studentsNodes,
    };
  };

  export const deleteStudentReportImg = async (
    _: any,
    { id, imgUrl }: { id: string, imgUrl: string }
  ) => {
      const caseWorkerStudentMetting = await CaseWorkerStudentMetting.findOneBy({ id });
      if (!caseWorkerStudentMetting) {
        throw new Error(`Report with id ${id} not found.`);
      }
      const attachmentIndex = caseWorkerStudentMetting.attachment.indexOf(imgUrl);
      if (attachmentIndex === -1) {
        throw new Error(`Image URL ${imgUrl} not found in the reportAttachment array.`);
      }
      caseWorkerStudentMetting.attachment.splice(attachmentIndex, 1);
      await caseWorkerStudentMetting.save();
  
      return `Attachment deleted successfully`;
  
  };
  