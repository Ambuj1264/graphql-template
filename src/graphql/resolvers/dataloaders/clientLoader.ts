import { Client } from "../../../database/clientManagement/client";
export const getClients = async (ids: readonly string[]): Promise<Client[]> => {
    const clientMap: Map<string, Client> = new Map();
    const _ids = ids.map((id) => `${id}`);
    const clients = await Client.findByIds(_ids);
    clients.forEach((client) => {
        clientMap.set(client.id, client);
    });
    const results: (Client | undefined)[] = ids.map((id) => clientMap.get(id));

    return results.filter((client): client is Client => client !== undefined);
};
