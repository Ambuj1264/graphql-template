
import { SelectQueryBuilder } from "typeorm";
import { ClientAppointmentLogs } from "../../database/meeting/clientAppointmentLogs";
import { FilterOptions } from "../../types/client";

const genericFilterQueryBuilder = (
  queryBuilder: SelectQueryBuilder<ClientAppointmentLogs>,
  field: string,
  value: string | string[]
) => {
  if (!value) {
    return;
  }
  const extractCreatedAtDate = (dateTimeString: string): string => {
    const datePart = dateTimeString.split(" ")[0];

    return datePart;
  };

  if (field === "created_at" && Array.isArray(value) && value.length >= 1) {
    const exactDate = extractCreatedAtDate(value[0]);
    queryBuilder.andWhere(`DATE(clientAppointmentLogs.${field}) = :exactDate`, {
      exactDate,
    });
  } else if (Array.isArray(value)) {
        queryBuilder.orWhere(
          value.map((val) => `clientAppointmentLogs.${field} ILIKE :value`).join(" OR "),
          value.reduce((acc, val) => ({ ...acc, value: `%${val}%` }), {})
        );
  } else {
    queryBuilder.andWhere(`clientAppointmentLogs.${field} ILIKE :value`, {
      value: `%${value}%`,
    });
  }
};

const filterQueryMap: Map<string, (queryBuilder: SelectQueryBuilder<
    ClientAppointmentLogs>, value: string) => void> = new Map([
  ["comment", (qb, value) => genericFilterQueryBuilder(qb, "comment", value)],
  ["totalAmount", (qb, value) => genericFilterQueryBuilder(qb, "totalAmount", value)],
  ["amountPaid", (qb, value) => genericFilterQueryBuilder(qb, "amountPaid", value)],
  ["amountStillOwes", (qb, value) => genericFilterQueryBuilder(qb, "amountStillOwes", value)],
  ["paymentStatus", (qb, value) => genericFilterQueryBuilder(qb, "paymentStatus", value)],
  ["paymentMethod", (qb, value) => genericFilterQueryBuilder(qb, "paymentMethod", value)],
  ["created_at", (qb, value) => genericFilterQueryBuilder(qb, "created_at", value)],
]);

export const billingFilterQueryBuilder = async (
  queryBuilder: SelectQueryBuilder<ClientAppointmentLogs>,
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
