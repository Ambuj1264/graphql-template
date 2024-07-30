import { queryResolvers } from "./resolvers/query";
import { mutationResolvers } from "./mutations";
import { userResolver } from "./resolvers/subResolver/user";
import { therapistResolver } from "./resolvers/subResolver/therapist";
import { studentResolver } from "./resolvers/subResolver/student";
import { shredByResolver } from "./resolvers/subResolver/shareby";
import { caseWorkerStudentMettingResolver } from "./resolvers/subResolver/caseWorkerMeeting";
import { SecretaryTherapistMeetingResolver } from "./resolvers/subResolver/TherapistMeeting";
import { clientResolver } from "./resolvers/subResolver/client";
import { billingResolver, clientLogResolver } from "./resolvers/subResolver/clientlog";
import { subscriptionResolvers } from "./resolvers/subscription";
export const resolvers = {
    Query: queryResolvers,
    Mutation: mutationResolvers,
    Subscription: subscriptionResolvers,
    User: userResolver,
    Therapist: therapistResolver,
    Student: studentResolver,
    schoolLogs: shredByResolver,
    ScheduleCaseworkerToStudentMeeting: caseWorkerStudentMettingResolver,
    secretaryMettingToTherapist: SecretaryTherapistMeetingResolver,
    Client: clientResolver,
    ClientappoimentLogs: clientLogResolver,
    billingSection: billingResolver
};
