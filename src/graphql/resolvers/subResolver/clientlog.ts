import { ClientAppointmentLogs } from "../../../database/meeting/clientAppointmentLogs";
import { dataLoaders } from "../dataloaders";

export const clientLogResolver = {
    client: async (parent: ClientAppointmentLogs) => {
        if (parent.client === null || parent.client === undefined) return "";

        return dataLoaders.clientLoader.clear(parent.client).load(parent.client);
    },
    therapist: async (parent: ClientAppointmentLogs) => {
        if (parent.therapist === null || parent.therapist === undefined) return "";

        return dataLoaders.therapistsLoader.clear(parent.therapist).load(parent.therapist);
    },
    
};

export const billingResolver = {
    
    client: async (parent: ClientAppointmentLogs) => {
        if (parent.client === null || parent.client === undefined) return "";

        return dataLoaders.clientLoader.clear(parent.client).load(parent.client);
    },
    therapist: async (parent: ClientAppointmentLogs) => {
        if (parent.therapist === null || parent.therapist === undefined) return "";

        return dataLoaders.therapistsLoader.clear(parent.therapist).load(parent.therapist);
    },
    appointmentId: async (parent: ClientAppointmentLogs) => {
        if (parent.appointmentId === null || parent.appointmentId === undefined) return "";

        return dataLoaders.SecretaryTherapistMeetingLoader.clear(parent.appointmentId).load(parent.appointmentId);
    },
    
};
