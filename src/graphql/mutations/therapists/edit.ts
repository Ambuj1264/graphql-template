import { Therapists } from "../../../database/therapists/therapists";
import { userPermissions } from "../../../types/auth";
import { UpdateTherapistsInput } from "../../../types/therapists";
import { dataLoaders } from "../../resolvers/dataloaders";
import { checkPermissions } from "../../util/commonMethod";
import { GraphQLContext } from "../../util/graphql";

export const assignSecretary = async (
    _: null,
    { input }: { input: UpdateTherapistsInput },
    { permissions }: GraphQLContext
) => {
    const isAuthorizedUser = checkPermissions(permissions, [userPermissions.SUPER_ADMIN]);
    if (!isAuthorizedUser) {
        throw new Error("Unauthorized user.");
    }

    const { id, secretary, ...rest } = input;
    const existingTherapist = await Therapists.findOneBy({ id });

    if (secretary) {
        if (!existingTherapist) {
            throw new Error("Therapist not found.");
        }

        for (const existingId of existingTherapist.secretary) {
            if (secretary.includes(existingId)) {
                const user = await dataLoaders.userLoader.load(existingId);
                throw new Error(`Secretary ${user.englishName} is already assigned.`);
            }
        }

        existingTherapist.secretary.push(...secretary);
    }

        await Therapists.createQueryBuilder()
        .update()
        .set(secretary ? { secretary: existingTherapist?.secretary } : rest)
        .where({ id })
        .output("*")
        .execute()
        .then((response) => {
            if (response.affected !== 1) {
                throw new Error("Details not updated"); 
            }
        });

        return await dataLoaders.therapistsLoader.clear(id).load(id);
};
