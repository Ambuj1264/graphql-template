import { SelectQueryBuilder } from "typeorm";
import { School } from "../../database/schoolManagement/school";
import { FilterOptions } from "../../types/client";
const filterByColumn = (
  columnName: string,
  queryBuilder: SelectQueryBuilder<School>,
  value: string | string[]
) => {
  if (!value) {
    return;
  }
  if (Array.isArray(value)) {
    queryBuilder.andWhere(`school.${columnName} IN (:...${columnName})`, {
      [columnName]: value,
    });
  } else {
    queryBuilder.andWhere(`school.${columnName} ILIKE :${columnName}`, {
      [columnName]: `%${value}%`,
    });
  }
};

  const filterQueryMap: Map<string, (queryBuilder: SelectQueryBuilder<School>, options: string) => void> = new Map([
  ["typeOfSchool",  filterByColumn.bind(null, "typeOfSchool")],
  ["region",  filterByColumn.bind(null, "region")],
  ["schoolName",  filterByColumn.bind(null, "schoolName")],
  ["roshYeshivah",  filterByColumn.bind(null, "roshYeshivah")],
  ["ryContact",  filterByColumn.bind(null, "ryContact")],
  ["menahel",  filterByColumn.bind(null, "menahel")],
  ["menahelNumber",  filterByColumn.bind(null, "menahelNumber")],
  ["yeshivahAddress",  filterByColumn.bind(null, "yeshivahAddress")],
  ["officeAddress",  filterByColumn.bind(null, "officeAddress")],
  ["email",  filterByColumn.bind(null, "email")],
  ["dormitory",  filterByColumn.bind(null, "dormitory")],
  ["mashgiach",  filterByColumn.bind(null, "mashgiach")],
  ["transportation",  filterByColumn.bind(null, "transportation")],
  ["visitedWhen",  filterByColumn.bind(null, "visitedWhen")],
  ["createdBy",  filterByColumn.bind(null, "createdBy")],
  ["chasidish",  filterByColumn.bind(null, "chasidish")],
  ["boxy",  filterByColumn.bind(null, "boxy")],
  ["levelOfLearning",  filterByColumn.bind(null, "levelOfLearning")],
  ["pureness",  filterByColumn.bind(null, "pureness")],
  ["relationshipStaffWithBuchrim",  filterByColumn.bind(null, "relationshipStaffWithBuchrim")],
  ["reports",  filterByColumn.bind(null, "reports")],
]);

export const schoolFilterQueryBuilder = async (
  queryBuilder: SelectQueryBuilder<School>,
  filterOptions: FilterOptions
) => {
  let modifiedFilterOptions: FilterOptions = filterOptions;

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
