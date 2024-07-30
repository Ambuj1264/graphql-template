import { Therapists } from "../../../database/therapists/therapists";
import { User } from "../../../database/user/user";
import { dataLoaders } from "../dataloaders";

export const therapistResolver = {
    secretary: async (parent: Therapists) => {
        if (parent.secretary === null || parent.secretary === undefined) return "";
        const users = await dataLoaders.userLoader.loadMany(parent.secretary) as User[];
        const userIds = users.map(user => user?.id);
        const validUserPromises = userIds.map(async (userId: string) => {
            const login = await dataLoaders.loginLoader.load(userId);
            if (login && !login.isDeleted) {
                return dataLoaders.userLoader.load(userId);
            }

            return null;
        });
        const validUsers = await Promise.all(validUserPromises);
        const filteredUsers = validUsers.filter(user => user !== null);

        return filteredUsers;
    }
};
