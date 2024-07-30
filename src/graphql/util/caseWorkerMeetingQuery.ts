
import { SelectQueryBuilder } from "typeorm";
import { UserFilterOptions } from "../../types/user";
import { CaseWorkerStudentMetting } from "../../database/meeting/caseWorkerMetting";
import { Student } from "../../database/student/student";
import { User } from "../../database/user/user";
const filterByColumn = (
  columnName: string,
  queryBuilder: SelectQueryBuilder<CaseWorkerStudentMetting>,
  value: string
) => {
  if (!value) {
    return;
  }
  queryBuilder.andWhere(`caseWorkerStudentMetting.${columnName} ILIKE :${columnName}`, {
    [columnName]: `%${value}%`,
  });
};

const studentIdFilterQueryBuilder = async (
  queryBuilder: SelectQueryBuilder<CaseWorkerStudentMetting>,
  studentId: string
) => {
  if (!studentId) {
    return;
  }
  const uppercaseRole = studentId[0];
  const rolequery = await Student.findOne({ where: { studentName: uppercaseRole } });
      if (rolequery) {
        queryBuilder.andWhere("caseWorkerStudentMetting.studentId ILIKE :studentId", {
          studentId: `%${rolequery.id}%`,
        });
      }
};

const caseworkerIdFilterQueryBuilder = async (
  queryBuilder: SelectQueryBuilder<CaseWorkerStudentMetting>,
  caseworkerId: string
) => {
  if (!caseworkerId) {
    return;
  }
  const caseWorker = caseworkerId[0];
  const caseWorkerquery = await User.findOne({ where: { englishName: caseWorker } });
      if (caseWorkerquery) {
        queryBuilder.andWhere("caseWorkerStudentMetting.caseworkerId ILIKE :caseworkerId", {
          caseworkerId: `%${caseWorkerquery.id}%`,
        });
      }
};

const filterQueryMap: Map<string, (queryBuilder: SelectQueryBuilder<any>, options: string) => void> = new Map([
  ["status",  filterByColumn.bind(null, "status")],
  ["studentId", studentIdFilterQueryBuilder],
  ["caseworkerId", caseworkerIdFilterQueryBuilder],
  ["caseworkerId", caseworkerIdFilterQueryBuilder],
  ]);

export const CaseWorkerStudentMettingFilterQueryBuilder = async (
  queryBuilder: SelectQueryBuilder<CaseWorkerStudentMetting>, 
  filterOptions: UserFilterOptions
) => {
  let modifiedFilterOptions: UserFilterOptions = filterOptions;

  if (Array.isArray(filterOptions)) {
    modifiedFilterOptions = {};
    for (const option of filterOptions) {
      modifiedFilterOptions[option.id] = option.value;
    }
  }
  
  if (Object.keys(modifiedFilterOptions).length < 1) return queryBuilder;
  const filterOptionsKeys = Object.keys(modifiedFilterOptions);
  for (const key of filterOptionsKeys) {
    if (filterQueryMap.has(key)) {
      const cb = filterQueryMap.get(key);
      if (cb) {
        await cb(queryBuilder, modifiedFilterOptions[key]);
      }
    }
  }

  return queryBuilder;
};
