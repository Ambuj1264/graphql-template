
import { Brackets } from "typeorm";
import { Student } from "../../../../database/student/student";
import { GraphQLContext } from "../../../util/graphql";
import { validStudentSearchFields } from "../../../../types/searchFields";
import { StudentFilterOptions } from "../../../../types/student";
import { studentFilterQueryBuilder } from "../../../util/studentQuery";
import { checkPermissions, createWhereExpression } from "../../../util/commonMethod";
import { userPermissions } from "../../../../types/auth";
export const getStudentByCaseworker = async (
  _: any,
  input: { first: number, after: number, search: string, filterOptions: StudentFilterOptions },
  { userId, permissions }: GraphQLContext
) => {
  const { first = 10, after, search } = input;
  const filterOptions = input?.filterOptions;
  const studentQuery = Student.createQueryBuilder("student").orderBy("student.created_at", "DESC");
  const isAuthorizedUser = checkPermissions(
    permissions, 
    [
        userPermissions.SUPER_ADMIN,
        ]);
  // Check if the user has SUPER_ADMIN permission
  if (!isAuthorizedUser) {
    studentQuery.where({ caseworker: userId });
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
