import bcrypt from "bcrypt";
import { dataLoaders } from "../dataloaders";
import { GraphQLContext } from "../../util/graphql";
import { getPreferences } from "./users";
import jwt from "jsonwebtoken";
import { Login } from "../../../database/login/login";
import { User } from "../../../database/user/user";
import yenv from "yenv";
import {getLocationDetails} from "../../../config/networkInterface";
import { Role } from "../../../database/role/role";
const env = yenv("env.yaml", { env: "development" });

export const loginResolver = async (
  _: any,
  { loginName, password }: { loginName: string, password: string },
  { userId }: GraphQLContext
) => {

  let login!: Login ;
  let _userId!: string;
  let isPasswordMatch;
  const returnVal: any = {};
 // Convert loginName to lowercase
  const lowercaseLoginName = loginName.toLowerCase();
  const locationDetails = await getLocationDetails();
  // Convert locationDetails into the expected type
  const lastLoginDetails = [{ details: locationDetails }];
  if (loginName && password) {
    login = await Login.findOneBy({ loginName: lowercaseLoginName } ) as Login;
    if (login) {
      isPasswordMatch = await bcrypt.compare(password, login.password);
    }
    if (!login || login.isPending  || !isPasswordMatch) {
      throw new Error(`Email and password do not match`);
    }
    if (login.isDeleted || !login.isActive) {
      throw new Error(`Your account is suspend.Please contact to Admin.`);
    }
    if (login.userId) {
      const user = await User.findOneBy({ id: login.userId });
      if (user) {
        const role =  await Role.findOneBy({ id: user.role });
        if (!role || !role.isActive) {
          throw new Error("Role is not active. Login denied.");
        }
      }
    }
    const { password: pw, userId: uid, ...restLogin } = login;
    _userId = uid;

    returnVal.info = { ...restLogin, entityOid: uid };
  }

  // If loginName and password aren't provided, the user should already
  // be logged in and have a token.
  if (userId) {
    const inputUser = await dataLoaders.userLoader.load(userId);
    const rootUserId = inputUser.id ? inputUser.id : userId;
    login = await Login.findOneBy({ userId: rootUserId }) as Login;
    const { password: pw, userId: uid, ...restLogin } = login;
    _userId = uid;
    // This response shape is for the legacy REST server
    returnVal.info = { ...restLogin, entityOid: uid };
  }
  await Login.createQueryBuilder("login")
    .update()
    .set({ lastLoginDate: new Date(), lastLoginDetails, isActive: true })
    .where({ id: login?.id })
    .output("*")
    .execute()
    .then((response) => {
      if (!Array.isArray(response.raw) || response.raw.length === 0) {
        throw new Error(`Login db error.`);
      }
    });
  const rootUser = await dataLoaders.userLoader.clear(_userId).load(_userId);
  returnVal.token = (await generateToken(rootUser, login));

  return returnVal;
};

export const generateToken = async (
  user: User,
  login: Login,
) => {
  const preferences = await getPreferences({ userId: user.id });
  const { permissions = [] } = preferences;

  const tokenPayload = {
    oid: user.id,
    loginId: login.id,
    englishName: user.englishName,
    hebrewName: user.hebrewName,
    email: user.email,
    accountIsLocked: login.accountIsLocked,
    permissions,
  };

  const now = new Date();
  const nowInSeconds = Math.round(now.getTime() / 1000);
  const exp = nowInSeconds + 10 * 3600;
  const secret = env.JWT_SECRET;

  const token = jwt.sign({
    ...tokenPayload,
    iat: nowInSeconds,
    exp
  }, secret);
  
  return { token, permissions};
};