import { CaseWorkerStudentMetting } from "../../../database/meeting/caseWorkerMetting";
export const getCaseWorkerStudentMetting = async (ids: readonly string[]): Promise<CaseWorkerStudentMetting[]> => {
    const meetingMap: Map<string, CaseWorkerStudentMetting> = new Map();
    const _ids = ids.map((id) => `${id}`);
    const meetings = await CaseWorkerStudentMetting.findByIds(_ids);
    meetings.forEach((meeting) => {
        meetingMap.set(meeting.id, meeting);
    });
    const results: (CaseWorkerStudentMetting | undefined)[] = ids.map((id) => meetingMap.get(id));

    return results.filter((meeting): meeting is CaseWorkerStudentMetting => meeting !== undefined);
};
