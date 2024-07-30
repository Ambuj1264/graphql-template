
import { User } from "../../../database/user/user";
import { dataLoaders } from "../dataloaders";

export const userResolver = {
    role: async (parent: User) => {
        if (parent.role === null || parent.role === undefined) return "";
        await dataLoaders.roleById.clear(parent.role);

        return dataLoaders.roleById.load(parent.role);
    },
};
