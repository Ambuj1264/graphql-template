
import { SelectQueryBuilder } from "typeorm";
import { User } from "../../database/user/user";
import { UserFilterOptions } from "../../types/user";
import { Role } from "../../database/role/role";
const englishNameFilterQueryBuilder = (
  queryBuilder: SelectQueryBuilder<User>,
  englishName: string
) => {
  if (!englishName) {
    return;
  }
  queryBuilder.andWhere("user.englishName ILIKE :englishName", {
    englishName: `%${englishName}%`,
  });
};

const emailFilterQueryBuilder = (
  queryBuilder: SelectQueryBuilder<User>,
  email: string
) => {
  if (!email) {
    return;
  }
  queryBuilder.andWhere("user.email ILIKE :email", {
    email: `%${email}%`,
  });
};

const hebrewNameFilterQueryBuilder = (
  queryBuilder: SelectQueryBuilder<User>,
  hebrewName: string
) => {
  if (!hebrewName) {
    return;
  }
  queryBuilder.andWhere("user.hebrewName ILIKE :hebrewName", {
    hebrewName: `%${hebrewName}%`,
  });
};

const cellPhoneFilterQueryBuilder = (
  queryBuilder: SelectQueryBuilder<User>,
  cellPhone: string
) => {
  if (!cellPhone) {
    return;
  }
  queryBuilder.andWhere("user.cellPhone ILIKE :cellPhone", {
    cellPhone: `%${cellPhone}%`,
  });
};

const numberExtFilterQueryBuilder = (
  queryBuilder: SelectQueryBuilder<User>,
  numberExt: string
) => {
  if (!numberExt) {
    return;
  }
  queryBuilder.andWhere("user.numberExt ILIKE :numberExt", {
    numberExt: `%${numberExt}%`,
  });
};

const addressFilterQueryBuilder = (
  queryBuilder: SelectQueryBuilder<User>,
  address: string
) => {
  if (!address) {
    return;
  }
  queryBuilder.andWhere("user.address ILIKE :address", {
    address: `%${address}%`,
  });
};

const cityFilterQueryBuilder = (
  queryBuilder: SelectQueryBuilder<User>,
  city: string
) => {
  if (!city) {
    return;
  }
  queryBuilder.andWhere("user.city ILIKE :city", {
    city: `%${city}%`,
  });
};

const stateFilterQueryBuilder = (
  queryBuilder: SelectQueryBuilder<User>,
  state: string
) => {
  if (!state) {
    return;
  }
  queryBuilder.andWhere("user.state ILIKE :state", {
    state: `%${state}%`,
  });
};

const zipcodeFilterQueryBuilder = (
  queryBuilder: SelectQueryBuilder<User>,
  zipcode: string
) => {
  if (!zipcode) {
    return;
  }
  queryBuilder.andWhere("user.zipcode ILIKE :zipcode", {
    zipcode: `%${zipcode}%`,
  });
};

const roleFilterQueryBuilder = async (
  queryBuilder: SelectQueryBuilder<User>,
  role: string
) => {
  if (!role) {
    return;
  }
  const uppercaseRole = role[0].toLowerCase();
  const rolequery = await Role.findOneBy({ role: uppercaseRole });
      if (rolequery) {
        queryBuilder.andWhere("user.role ILIKE :role", {
          role: `%${rolequery.id}%`,
        });
      }
};

const filterQueryMap: Map<string, (queryBuilder: SelectQueryBuilder<any>, options: string) => void> = new Map([
  ["englishName", englishNameFilterQueryBuilder],
    ["hebrewName", hebrewNameFilterQueryBuilder],
    ["email", emailFilterQueryBuilder],
    ["cellPhone", cellPhoneFilterQueryBuilder],
    ["numberExt", numberExtFilterQueryBuilder],
    ["address", addressFilterQueryBuilder],
    ["city", cityFilterQueryBuilder],
    ["state", stateFilterQueryBuilder],
    ["zipcode", zipcodeFilterQueryBuilder],
    ["role", roleFilterQueryBuilder]
  ]);

export const userFilterQueryBuilder = async (
  queryBuilder: SelectQueryBuilder<User>, 
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
