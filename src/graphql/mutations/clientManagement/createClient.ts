
import moment from "moment";
import { Client } from "../../../database/clientManagement/client";
import { ClientInput } from "../../../types/client";
import { dataLoaders } from "../../resolvers/dataloaders";
import { GraphQLContext } from "../../util/graphql";
export const createClient = async (
    _: null,
    { input }: { input: ClientInput },
    { permissions, userId }: GraphQLContext,
) => {
    const currentDateTime = moment().format("MM-DD-YYYY");
    const user = await dataLoaders.userLoader.load(userId);
    const createByName = user.englishName;
    const client = await Client.createQueryBuilder()
        .insert()
        .values({ ...input, createdBy: createByName, createDate: currentDateTime})
        .output("*")
        .execute()
        .then((response) => {
            if (!Array.isArray(response.raw) || response.raw.length === 0) {
                throw new Error("Failed to client data save");
            }

            return response.raw[0];
        });

    return await dataLoaders.clientLoader.load(client.id);
};
