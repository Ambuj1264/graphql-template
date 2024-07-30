import { SchoolShareList } from "../../../database/schoolManagement/schoolshareList";
import { dataLoaders } from "../dataloaders";

export const shredByResolver = {
    sharedBy: async (parent: SchoolShareList) => {
        if (parent.sharedBy === null || parent.sharedBy === undefined) return "";
        await dataLoaders.userLoader.clear(parent.sharedBy);

        return dataLoaders.userLoader.load(parent.sharedBy);
    },
};
