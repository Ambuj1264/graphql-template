import { SelectQueryBuilder } from "typeorm";
import { Client } from "../../database/clientManagement/client";
import { FilterOptions } from "../../types/client";

const filterByColumn = (
  columnName: string,
  queryBuilder: SelectQueryBuilder<Client>,
  value: string
) => {
  if (!value) {
    return;
  }
  queryBuilder.andWhere(`client.${columnName} ILIKE :${columnName}`, {
    [columnName]: `%${value}%`,
  });
};
const filterQueryMap: Map<string, (queryBuilder: SelectQueryBuilder<Client>, options: string) => void> = new Map([
  ["email",  filterByColumn.bind(null, "email")],
  ["firstName",  filterByColumn.bind(null, "firstName")],
  ["lastName",  filterByColumn.bind(null, "lastName")],
  ["fatherName",  filterByColumn.bind(null, "fatherName")],
  ["cell",  filterByColumn.bind(null, "cell")],
  ["title",  filterByColumn.bind(null, "title")],
  ["reason",  filterByColumn.bind(null, "reason")],
  ["firstPrice",  filterByColumn.bind(null, "firstPrice")],
  ["followUpPrice",  filterByColumn.bind(null, "followUpPrice")],
  ["kehilah",  filterByColumn.bind(null, "kehilah")],
  ["yeshivah",  filterByColumn.bind(null, "yeshivah")],
  ["parents",  filterByColumn.bind(null, "parents")],
  ["inCharge",  filterByColumn.bind(null, "inCharge")],
  ["billingDepartment",  filterByColumn.bind(null, "billingDepartment")],
  ["frequency",  filterByColumn.bind(null, "frequency")],
  ["createDate",  filterByColumn.bind(null, "createDate")],
]);
export const clientFilterQueryBuilder = async (
  queryBuilder: SelectQueryBuilder<Client>,
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