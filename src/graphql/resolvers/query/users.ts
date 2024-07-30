import { Brackets } from "typeorm";
import { Login } from "../../../database/login/login";
import { Role } from "../../../database/role/role";
import { User } from "../../../database/user/user";
import { UserFilterOptions } from "../../../types/user";
import { GraphQLContext } from "../../util/graphql";
import { dataLoaders } from "../dataloaders";
import { checkPermissions, createWhereExpression } from "../../util/commonMethod";
import { userFilterQueryBuilder } from "../../util/userQuery";
import { validUsersSearchFields } from "../../../types/searchFields";
import { userPermissions } from "../../../types/auth";
export const usersQueryResolver = async (
  _: any,
  input: { first: number, after: number, search: string, filterOptions: UserFilterOptions, isActive: boolean | null },
  {permissions, userId }: GraphQLContext,
) => {
  try {
    const isSpd = checkPermissions(permissions, [
      userPermissions.SCHOOL_PLACEMENT_DIVISION]);
    const { first = 10 , search, after} = input;
    const filterOptions = input?.filterOptions;
    const isActive = input.isActive;
    const userQuery = User.createQueryBuilder("user")
      .leftJoin(Login, "login", "user.id = login.userId")
      .where("login.isDeleted = :isDeleted", { isDeleted: false })
      .andWhere("user.id != :userId", { userId })
      .orderBy("user.createdAt", "DESC");
      if (isSpd) {
        const role = await Role.findOne({ where: { roleConstraint: "CASEWORKER" } });
        userQuery.andWhere("user.role = :role", { role: role?.id });
      }
      if (typeof isActive === "boolean") {
        userQuery.andWhere("login.isActive = :isActive", { isActive });
      }
    if (search) {
      userQuery.take(first);
      const brackets = new Brackets((sqb) => {
        validUsersSearchFields.map( (field, idx) => {

          const { searchString, params } =   createWhereExpression(field, search);
          sqb.orWhere(searchString, params);
        });
      });
      userQuery.andWhere(brackets);
    }
    if (filterOptions) {
      await userFilterQueryBuilder(userQuery, filterOptions);
    }
    const [users, totalCount] = await userQuery.skip(after).take(first).getManyAndCount();
    const userIDs = users.map((user) => user.id);
    const logins = await Login.createQueryBuilder("login")
    .where("login.userId IN (:...userIDs)", { userIDs }).getMany();

    const loginMap = new Map<string, boolean>();
    logins.forEach((login) => { loginMap.set(login.userId, login.isActive); });

    users.forEach((user) => { user.isActive = loginMap.get(user.id); });

    const usersNodes: any = users.map(user => {
      return {
        node: user,
        cursor: user.id,
      };
    });

    return {
      totalCount,
      edges: usersNodes,
    };
  } catch (error) {
    return {
      totalCount: 0,
      edges: [],
    };
  }
};

// Merge user preferences, with the user taking priority.
interface Permissions {
  permissions: string[];
}

export const getPreferences = async (args: {
  userId: string;
}) => {
  const { userId } = args;
  const user = await dataLoaders.userLoader.load(userId);

  const userRole =
    (await dataLoaders.roleById.load(user.role)) ?? ({} as Role);
  const userPrefs: Permissions = { permissions: [] };
  // Initialize userPrefs with the Permissions interface
  const isRole = userRole?.roleConstraint;
  if (userRole?.roleConstraint) {
    userPrefs.permissions.push(isRole);
    // Add permissions to the array
  }

  return userPrefs;
};

export const getUserDetailsByIdResolver = async (
  _: any,
  { id }: { id: string },
  { userId }: GraphQLContext
): Promise<User> => {
  return dataLoaders.userLoader.load(id);
};