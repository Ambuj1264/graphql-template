import { ClientAppointmentLogs } from "../../../database/meeting/clientAppointmentLogs";
export const getAppointmentLogs = async (ids: readonly string[]): Promise<ClientAppointmentLogs[]> => {
    const clientMap: Map<string, ClientAppointmentLogs> = new Map();
    const _ids = ids.map((id) => `${id}`);
    const clients = await ClientAppointmentLogs.findByIds(_ids);
    clients.forEach((client) => {
        clientMap.set(client.id, client);
    });
    const results: (ClientAppointmentLogs | undefined)[] = ids.map((id) => clientMap.get(id));

    return results.filter((client): client is ClientAppointmentLogs => client !== undefined);
};
