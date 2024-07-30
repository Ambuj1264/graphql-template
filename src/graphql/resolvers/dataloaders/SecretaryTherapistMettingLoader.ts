import { SecretaryTherapistMeeting } from "../../../database/meeting/secretaryTherapistMeeting";
export const getSecretaryTherapistMettingLoader = async (
    ids: readonly string[]
    ): Promise<SecretaryTherapistMeeting[]> => {
    const meetingMap: Map<string, SecretaryTherapistMeeting> 
    = new Map();
    const _ids = ids.map((id) => `${id}`);
    const meetings = await SecretaryTherapistMeeting.findByIds(_ids);
    meetings.forEach((meeting) => {
        meetingMap.set(meeting.id, meeting);
    });
    const results: (SecretaryTherapistMeeting | undefined)[] = ids.map((id) => meetingMap.get(id));

    return results.filter((meeting): meeting is SecretaryTherapistMeeting => meeting !== undefined);
};
