import { Brackets } from "typeorm";
import { Student } from "../../../../database/student/student";
import { GraphQLContext } from "../../../util/graphql";
import { validStudentSearchFields } from "../../../../types/searchFields";
import { StudentFilterOptions } from "../../../../types/student";
import { studentFilterQueryBuilder } from "../../../util/studentQuery";
import { checkPermissions, createWhereExpression } from "../../../util/commonMethod";
import { userPermissions } from "../../../../types/auth";
import { dataLoaders } from "../../dataloaders";
import { Login } from "../../../../database/login/login";
export const studentListResolver = async (
  _: any,
  input: { first: number, after: number, search: string, filterOptions: StudentFilterOptions },
  { userId, permissions }: GraphQLContext
) => {
  const { first = 10, after, search } = input;
  const filterOptions = input?.filterOptions;
  const studentQuery = Student.createQueryBuilder("student")
  .orderBy("student.created_at", "DESC")
  .leftJoin(Login, "login", "CAST(:userId AS uuid) = ANY (SELECT jsonb_array_elements_text(student.caseworker)::uuid) AND login.isDeleted = :isDeleted")
  .setParameter("userId", userId)
  .setParameter("isDeleted", false);
  const isAuthorizedUser = checkPermissions(
    permissions, 
    [
        userPermissions.SUPER_ADMIN,
        userPermissions.ADMIN,
        userPermissions.SCHOOL_PLACEMENT_DIVISION,  
        ]);
  // Check if the user has SUPER_ADMIN permission
  if (!isAuthorizedUser) {
    const caseworkerId = JSON.stringify([userId]);
    studentQuery.where(`:id::jsonb <@ student.caseworker`, { id: caseworkerId }); 
  }

  if (search) {
    const brackets = new Brackets((sqb) => {
      validStudentSearchFields.map((field, idx) => {
        const { searchString, params } = createWhereExpression(field, search);
        sqb.orWhere(searchString, params);
      });
    });
    studentQuery.andWhere(brackets);
  }
  
  if (filterOptions) {
    await studentFilterQueryBuilder(studentQuery, filterOptions);
  }

  const [students, totalCount] = await studentQuery.skip(after).take(first).getManyAndCount();
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

export const getstudentById = async (
  _: any,
  { id }: { id: string }
) => {
  if (!id) {
    throw new Error("student ID is missing or invalid");
  }
  const student = await Student.createQueryBuilder()
    .where({ id })
    .getOne();

  return student;
};

export const unAssignedCaseworker = async (
  _: any,
  input: { id: string, caseworker: string }
) => {
  const { id, caseworker } = input;
  const existingCaseworker = await Student.findOneBy({ id });
  if (!existingCaseworker) {
    throw new Error("caseworker not found.");
  }
  if (caseworker) {
   const  removecCaseworker = existingCaseworker.caseworker.filter(
      (casId) => !caseworker.includes(casId)
    );
    await Student.createQueryBuilder()
      .update()
      .set({ caseworker: removecCaseworker })
      .where({ id })
      .output("*")
      .execute()
      .then((response) => {
        if (response.affected !== 1) {
          throw new Error("Failed to unassign caseworker");
        }
      });
  }

  return await dataLoaders.studentLoader.clear(id).load(id);
};

export const getStudentByCaseworkerId = async (
  _: any,
  { id }: { id: string }
) => {
  const caseworkerId = JSON.stringify([id]);
  const studentQuery = Student.createQueryBuilder("student")
  .where(`:id::jsonb <@ student.caseworker`, { id: caseworkerId }); 
  const  [students, totalCount] = await studentQuery.getManyAndCount();
      const studentsNodes = students.map((student: any) => {
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