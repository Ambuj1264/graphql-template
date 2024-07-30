
import { SecretaryTherapistMeeting } from "../../../database/meeting/secretaryTherapistMeeting";
import { dataLoaders } from "../dataloaders";

export const SecretaryTherapistMeetingResolver = {
    therapistId: async (parent: SecretaryTherapistMeeting) => {
        if (parent.therapistId === null || parent.therapistId === undefined) return "";

        return dataLoaders.therapistsLoader.clear(parent.therapistId).load(parent.therapistId);
    },
    clientId: async (parent: SecretaryTherapistMeeting) => {
        if (parent.clientId === null || parent.clientId === undefined) return "";

        return dataLoaders.clientLoader.clear(parent.clientId).load(parent.clientId);
    },

    userName: async (parent: SecretaryTherapistMeeting) => {
        if (parent.userName === null || parent.userName === undefined) return "";

        return dataLoaders.userLoader.clear(parent.userName).load(parent.userName);
    },
};
