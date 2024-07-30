import { School } from "../../../database/schoolManagement/school";
import { userPermissions } from "../../../types/auth";
import { CreateSchoolInput } from "../../../types/school";
import { dataLoaders } from "../../resolvers/dataloaders";
import { checkPermissions } from "../../util/commonMethod";
import { GraphQLContext } from "../../util/graphql";
export const createSchoolMutation = async (
  _: null,
  { input }: { input: CreateSchoolInput },
  { permissions, userId }: GraphQLContext,
) => {
  const isAuthorizedUser = checkPermissions(
    permissions,
    [
      userPermissions.SUPER_ADMIN,
      userPermissions.SECRETARY,
      userPermissions.SCHOOL_PLACEMENT_DIVISION]);
  if (!isAuthorizedUser) {
    throw new Error("Unauthorized user.");
  }
  const user = await dataLoaders.userLoader.load(userId);
  const createByName = user.englishName;
  const school = await School.createQueryBuilder()
    .insert()
    .values({ ...input, createdBy: createByName })
    .output("*")
    .execute()
    .then((response) => {
      if (!Array.isArray(response.raw) || response.raw.length === 0) {
        throw new Error("Failed to school data save");
      }

      return response.raw[0];
    });

  return await dataLoaders.schoolLoader.load(school.id);
};

interface SchoolDuplicationResult {
  emailIsDuplicated: boolean;
  errorMessage?: string;
}

export const checkEmailDuplication = async (
  email: string
): Promise<SchoolDuplicationResult> => {
  let result: SchoolDuplicationResult = {
    emailIsDuplicated: false,
  };

  // Check email of new School
  const sanitizedEmail = email.trim().toLowerCase();
  const schoolEmail = await School.createQueryBuilder("school")
    .where("LOWER(TRIM(email)) like :email", {
      email: `${sanitizedEmail}%`,
    })
    .getOne();
  if (schoolEmail) {
    result = {
      emailIsDuplicated: true,
      errorMessage: `Cannot create new School. Email already exists: '${sanitizedEmail}'`
    };
  }

  return result;
};