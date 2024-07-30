import { userPermissions } from "../../../types/auth";
import { StudentInput } from "../../../types/student";
import { Student } from "../../../database/student/student";
import { checkPermissions } from "../../util/commonMethod";
import { GraphQLContext } from "../../util/graphql";
import { dataLoaders } from "../../resolvers/dataloaders";
import moment from "moment";

export const createStudent = async (
    _: null,
    { input }: { input: StudentInput },
    { permissions }: GraphQLContext
) => {
    const currentDateTime = moment().format("MM-DD-YYYY");
    const isAuthorizedUser = checkPermissions(
        permissions,
        [
            userPermissions.SUPER_ADMIN ,
            userPermissions.SECRETARY,
            userPermissions.SCHOOL_PLACEMENT_DIVISION
        ]
    );
    if (!isAuthorizedUser) {
        throw new Error("Unauthorized user.");
    }
    const existingStudent = await Student.findOneBy({ 
        studentName: input.studentName, 
        fatherName: input.fatherName});
    if (existingStudent) {
      throw new Error("Student already exists!");
    }
    const student = await Student.createQueryBuilder()
    .insert()
    .values({ ...input, createDate: currentDateTime})
    .output("*")
    .execute()
    .then((response) => {
        if (!Array.isArray(response.raw) || response.raw.length === 0) {
            throw new Error("Failed to client data save");
        }

        return response.raw[0];
    });

    return await dataLoaders.studentLoader.load(student.id);
};
