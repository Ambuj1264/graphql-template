import { Login } from "../../../database/login/login";
import { User } from "../../../database/user/user";
import { userPermissions } from "../../../types/auth";
import { UserUpdateInput } from "../../../types/user";
import { dataLoaders } from "../../resolvers/dataloaders";
import { checkPermissions } from "../../util/commonMethod";
import { GraphQLContext } from "../../util/graphql";

export const userUpdate = async (
  _: any,
  { input }: { input: UserUpdateInput },
  { permissions }: GraphQLContext
) => {
  const {
    id,
    isActive,
    ...rest
  } = input;

  const isAdmin = checkPermissions(permissions, [userPermissions.SUPER_ADMIN, userPermissions.SCHOOL_PLACEMENT_DIVISION,
     userPermissions.ADMIN]);
  if (!isAdmin) throw new Error("Unauthorized user.");

  if (isActive !== undefined) {
    await Login.createQueryBuilder("login")
      .update()
      .set({ isActive })
      .where({ userId: id })
      .execute()
      .then((response) => {
        if (response.affected !== 1) {
          throw new Error(`Login update error.`);
        }
      });
  }
  
  if (Object.keys(rest).length > 0) {
    await User.createQueryBuilder("user")
      .update()
      .set({
        ...rest,
      })
      .where({ id })
      .execute()
      .then((response) => {
        if (response.affected !== 1) {
          throw new Error(`User update error.`);
        }
      });
    await dataLoaders.userLoader.clear(id);
  }
  const login = await Login.findOneBy({ userId: id });
  const user = await dataLoaders.userLoader.load(id);

  return { user, login };
};
