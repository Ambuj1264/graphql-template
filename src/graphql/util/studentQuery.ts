import { SelectQueryBuilder } from "typeorm";
import { Student } from "../../database/student/student";
import { StudentFilterOptions } from "../../types/student";

const filterByColumn = (
  columnName: string,
  queryBuilder: SelectQueryBuilder<Student>,
  value: string
) => {
  if (!value) {
    return;
  }
  queryBuilder.andWhere(`student.${columnName} ILIKE :${columnName}`, {
    [columnName]: `%${value}%`,
  });
};
const filterQueryMap: Map<string, (queryBuilder: SelectQueryBuilder<Student>, options: string) => void> = new Map([
  ["studentName",  filterByColumn.bind(null, "studentName")],
  ["fatherName",  filterByColumn.bind(null, "fatherName")],
  ["contactNumber",  filterByColumn.bind(null, "contactNumber")],
  ["currentSchool",  filterByColumn.bind(null, "currentSchool")],
  ["needs",  filterByColumn.bind(null, "needs")],
  ["age",  filterByColumn.bind(null, "age")],
  ["goToSchool",  filterByColumn.bind(null, "goToSchool")],
  ["theCurrentPlan",  filterByColumn.bind(null, "theCurrentPlan")],
  ["meeting",  filterByColumn.bind(null, "meeting")],
  ["status",  filterByColumn.bind(null, "status")],
  ["createDate",  filterByColumn.bind(null, "createDate")],
]);
export const studentFilterQueryBuilder = async (
  queryBuilder: SelectQueryBuilder<Student>,
  filterOptions: StudentFilterOptions
) => {
  let modifiedFilterOptions: StudentFilterOptions = filterOptions;

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
