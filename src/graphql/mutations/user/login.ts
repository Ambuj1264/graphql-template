import bcrypt from "bcrypt";
import MailService from "../../../config/mailService";
import { Login } from "../../../database/login/login";
import { ChangePassword, LoginResetInput, LoginUpdateInput } from "../../../types/auth";
import { CreateLoginInput } from "../../../types/user";
import { dataLoaders } from "../../resolvers/dataloaders";
import { generateHash } from "../../util/commonMethod";
import resetTemplate from "../../util/emailTemplate";
import yenv from "yenv";
import jwt from "jsonwebtoken";
import { GraphQLContext } from "../../util/graphql";
import { User } from "../../../database/user/user";
import { generateToken } from "../../resolvers/query/auth";
import { Url } from "../../../config/networkInterface";
const env = yenv("env.yaml", { env: "development" });
const SECRET_KEY = env.JWT_SECRET;
export const createLogin = async ({
  userId,
  loginName,
  password,
}: CreateLoginInput) => {

  const hashedPassword = await generateHash(password);
  // Insert credentials for new user
  Login.createQueryBuilder()
    .insert()
    .values({
      userId,
      loginName,
      password: hashedPassword,
      isPending: false,
      accountIsLocked: false,
    })
    .output("*")
    .execute()
    .then((response) => {
      if (!Array.isArray(response.raw) || response.raw.length === 0) {
        throw new Error(`Failed to insert user credentials.`);
      }

      return response.identifiers[0].id;
    });
};

export const loginReset = async (
  _: any,
  { input }: { input: LoginResetInput }
) => {
  const { loginName } = input;
  const lowercaseLoginName = loginName.toLowerCase();
  const login = await Login.findOneBy({ loginName: lowercaseLoginName });
  if (!login) { return new Error("Error: This email does not exist."); }
  if (login.isDeleted || !login.isActive) {
    throw new Error(`Your account is suspend.Please contact to Admin.`);
  }
  if (login) {
    const fwChangedTime = new Date(login?.linkDate);
    const currentTime = new Date();
    const timeDifferenceMinutes = Math.floor(
      (currentTime.getTime() - fwChangedTime.getTime()) / (1000 * 60)
    );
    if (timeDifferenceMinutes < 30) {
      return new Error(`The forgot password reset email has already been dispatched. Please retry after a 30-minute interval`);
    }
  }
  const user = await dataLoaders.userLoader.load(login.userId);
  const tokenValue = (await generateToken(user, login)).token;

  const urlLink = `${Url.clientBaseURl}/reset-password?${tokenValue}`;
  const resetPasswordEmail = resetTemplate(urlLink);
  const result = await Login.createQueryBuilder()
    .update()
    .set({ tokenId: tokenValue, linkDate: new Date(), })
    .where({ loginName: lowercaseLoginName})
    .output("*")
    .execute();
  if (result.affected !== 1) throw new Error("something went wrong.");
  const mailService = MailService.getInstance();
  await mailService.sendMail(user.id, {
    to: loginName,
    subject: "Reset Your Password",
    html: resetPasswordEmail.html,
    from: `Change password Setup <${env.SMTP_SENDER}>`,
  });

  return "A forgot password email has been dispatched. Kindly review your email inbox";
};

export const changePassword = async (
  _: any,
  { input }: { input: ChangePassword }
) => {
  let logindata;
  const returnVal: any = {};
  const decodedToken = jwt.verify(input.tokenId, SECRET_KEY) as { loginId: string };
  const login = await Login.findOneBy({ id: decodedToken.loginId });
  if (login?.linkDate) {
    const currentTime = new Date().getTime();
    const linkGenerationTime = new Date(login.linkDate).getTime();
    const timeDifferenceMinutes = Math.floor((currentTime - linkGenerationTime) / (1000 * 60));
    if (timeDifferenceMinutes > 30) {
      throw new Error("Sorry, your reset password link is no longer valid. You can request another one below.");
    }
  }
  if (login?.datePwChanged && login?.linkDate) {
    const datePwChangedTime = new Date(login.datePwChanged).getTime();
    const linkGenerationTime = new Date(login.linkDate).getTime();
    if (datePwChangedTime > linkGenerationTime) {
      throw new Error("Cannot change password.Reset link has expired.");
    }
  }
  const hashedPassword = await generateHash(input.password);
  const result = await Login.createQueryBuilder()
    .update()
    .set({ password: hashedPassword, tokenId: "", datePwChanged: new Date() })
    .where({ id: decodedToken.loginId })
    .output("*")
    .execute();
  if (result.affected !== 1) throw new Error("password not update");
  const userId = result.raw[0].EntityOid;
  logindata = login || (await Login.findOneBy({ userId }) as Login);
  returnVal.info = { ...logindata, entityOid: userId };
  const user = await dataLoaders.userLoader.load(userId);
  returnVal.token = await generateToken(user, logindata, );

  return returnVal;
};

export const loginUpdate = async (
  _: any,
  { input }: { input: LoginUpdateInput },
  { userId }: GraphQLContext
) => {
  const {
    oldPassword,
    password,
    ...rest
  } = input;

  const loginUpdateData = {} as any;
  if (password) {
    const _login = await Login.findOneBy({ userId }) as Login;
    let isPasswordMatch;
    if (oldPassword) {
      isPasswordMatch = await bcrypt.compare(oldPassword, _login.password);
      if (!isPasswordMatch) {
        throw new Error(
          `Sorry, the old password you provided is not correct, please try again.`
        ); // Password does not match
      }
    }
    loginUpdateData.password = await generateHash(password);
  }

  let login;
  if (Object.keys(loginUpdateData).length > 0) {
    await Login.createQueryBuilder("login")
      .update()
      .set(loginUpdateData)
      .where({ userId })
      .output("*")
      .execute()
      .then((response) => {
        if (!Array.isArray(response.raw) || response.raw.length === 0) {
          throw new Error(`9254 Login update error.`);
          // Login update query error
        }
      });
    login = await Login.findOneBy({ userId }) as Login;
    dataLoaders.loginLoader.clear(userId).prime(userId, login);
  }

  if (Object.keys(rest).length > 0) {

    await User.createQueryBuilder("user")
      .update()
      .set({
        ...rest,
      })
      .where({ id: userId })
      .execute()
      .then((response) => {
        if (response.affected !== 1) {
          throw new Error(`9255 User update error.`);
          // Entity update query error
        }
      });
    await dataLoaders.userLoader.clear(userId);
  }

  login = login || (await Login.findOneBy({ userId }) as Login);
  const user = await dataLoaders.userLoader.load(userId);
  const { token } = await generateToken(user, login);

  return { user, login, token };
};