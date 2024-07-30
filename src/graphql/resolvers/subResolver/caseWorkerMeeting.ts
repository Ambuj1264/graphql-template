import { CaseWorkerStudentMetting } from "../../../database/meeting/caseWorkerMetting";
import { dataLoaders } from "../dataloaders";

export const caseWorkerStudentMettingResolver = {
    studentId: async (parent: CaseWorkerStudentMetting) => {
        if (parent.studentId === null || parent.studentId === undefined) return "";

        return dataLoaders.studentLoader.clear(parent.studentId).load(parent.studentId);
    },
    caseworkerId: async (parent: CaseWorkerStudentMetting) => {
        if (parent.caseworkerId === null || parent.caseworkerId === undefined) return "";

        return dataLoaders.userLoader.clear(parent.caseworkerId).load(parent.caseworkerId);
    },

    userName: async (parent: CaseWorkerStudentMetting) => {
        if (parent.userName === null || parent.userName === undefined) return "";

        return dataLoaders.userLoader.clear(parent.userName).load(parent.userName);
    },
};
