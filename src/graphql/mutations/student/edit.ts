
import { Student } from "../../../database/student/student";
import { UpdateStudentInput } from "../../../types/student";
import { dataLoaders } from "../../resolvers/dataloaders";

// Utility function to update caseworker if provided
const updateCaseworker = async (id: string, caseworker: string[]) => {
  const existingCaseworker = await Student.findOneBy({ id });

  if (caseworker.length > 0) {
    if (!existingCaseworker) {
      throw new Error("Therapist not found.");
    }
    for (const existingId of existingCaseworker.caseworker) {
      if (caseworker.includes(existingId)) {
        const user = await dataLoaders.userLoader.load(existingId);
        throw new Error(`Caseworker ${user.englishName} is already assigned.`);
      }
    }
    existingCaseworker.caseworker.push(...caseworker);
  }
  await Student.createQueryBuilder()
    .update()
    .set({ caseworker: existingCaseworker?.caseworker })
    .where({ id })
    .output("*")
    .execute()
    .then((response) => {
      if (response.affected !== 1) {
        throw new Error("Caseworker not updated.");
      }
    });
};
const updateStudentData = async (id: string, rest: Partial<UpdateStudentInput>) => {
  const existingStudent = await Student.findOneBy({ id });
  
  if (rest.reportAttachment && rest.reportAttachment.length > 0) {
    const newReportAttachment = rest.reportAttachment.filter(value => 
      !(existingStudent?.reportAttachment || []).includes(value)
    );
    const updatedReportAttachment = [
      ...(existingStudent?.reportAttachment || []),
      ...newReportAttachment,
    ];
    await Student.createQueryBuilder()
      .update()
      .set({ ...rest, reportAttachment: updatedReportAttachment })
      .where({ id })
      .output("*")
      .execute()
      .then((response) => {
        if (response.affected !== 1) {
          throw new Error("Student not updated.");
        }
      });
  } else {
    await Student.createQueryBuilder()
      .update()
      .set({ ...rest })
      .where({ id })
      .output("*")
      .execute()
      .then((response) => {
        if (response.affected !== 1) {
          throw new Error("Student not updated.");
        }
      });
  }
};

export const updateStudent = async (
  _: any,
  { input }: { input: UpdateStudentInput; },
) => {
  const { id, caseworker, status, ...rest } = input;
  if (caseworker !== undefined) {
    await updateCaseworker(id, caseworker);
  }
  if (status !== undefined) {
    await updateStudentData(id, { status }); 
  }
  if (Object.keys(rest).length > 0) {
    const existingStudent = await Student.findOne({
      where: {
        studentName: rest.studentName,
        fatherName: rest.fatherName,
      },
    });
  
    if (existingStudent && existingStudent.id !== id) {
      throw new Error("Student already exists!");
    }
    await updateStudentData(id, rest);
  }
  
  return await dataLoaders.studentLoader.clear(id).load(id);
  };
  