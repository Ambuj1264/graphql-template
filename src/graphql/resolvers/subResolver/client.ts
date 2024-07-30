import { Client } from "../../../database/clientManagement/client";
import { dataLoaders } from "../dataloaders";

export const clientResolver = {
    selectTherapist: async (parent: Client) => {
        if (parent.selectTherapist === null || parent.selectTherapist === undefined) return "";
        await dataLoaders.therapistsLoader.clear(parent.selectTherapist);

        return dataLoaders.therapistsLoader.load(parent.selectTherapist);
    },
};
