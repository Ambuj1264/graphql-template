import jwt, { JwtPayload } from "jsonwebtoken";
import yenv from "yenv";
import { GraphQLContext } from "../util/graphql";
import { PubSub } from "graphql-subscriptions";
const env = yenv("env.yaml", { env: "development" });

export const pubsub = new PubSub();

export const authMiddleware = async (req: any): Promise<any> => {
  const token = getToken(req.headers.authorization);
  const integrationToken = env.JWT_SECRET;
  // extract the authorization token from the request headers
  const authorizationToken = req.headers.authorization || "";
  // check if the request is for the signup mutation
  const isSignupMutation =
    req?.body?.query?.includes("login(") ||
    req?.body?.query?.includes("createUser(") ||
    req?.body?.query?.includes("loginReset(") ||
    req?.body?.query?.includes("changePassword(") ||
    req?.body?.query?.includes("scheduleOperation(") ||
    req?.body?.query?.includes("shareSchoolList(") ;
  // skip authorization check for signup mutation

  if (isSignupMutation) {
      return { 
        loginId: authorizationToken?.loginId,
         userId: authorizationToken?.oid, 
        permissions: authorizationToken?.permissions 
      };
  }

  if (token) {
    try {
      // Verify the token using the secret key
      const decodedToken = (
        await jwt.verify(token, integrationToken
        )) as JwtPayload;

      return { 
        loginId: decodedToken.loginId,
         userId: decodedToken.oid,
          permissions: decodedToken.permissions 
        } as GraphQLContext;
    } catch (err) {
      throw new Error("Invalid or expired token");
    }
  } else {
    throw new Error("Authorization header missing");
  }
};

const getToken = (authHeader: string | undefined) => {
  if (authHeader?.startsWith("Bearer ")) {
    return authHeader.slice(7);
  }

  return null;
};
