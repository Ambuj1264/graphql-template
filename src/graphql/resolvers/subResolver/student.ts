import { Student } from "../../../database/student/student";
import { User } from "../../../database/user/user";
import { dataLoaders } from "../dataloaders";
export const studentResolver = {
  caseworker: async (parent: Student) => {
      if (parent.caseworker === null || parent.caseworker === undefined) return "";
      const users = await dataLoaders.userLoader.loadMany(parent.caseworker) as User[];
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
