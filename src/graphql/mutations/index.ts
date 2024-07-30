import { createClient } from "./clientManagement/createClient";
import { updateClient } from "./clientManagement/editClient";
import { createAppointmentToTherapist } from "./meeting/secretaryAppointmentToTherapist";
import { scheduleMeetingToStudent } from "./meeting/scheduleMeetingToStudent";
import { updateMeetingToStudent } from "./meeting/updateMeetingToStudent";
import { createRole } from "./role/createRole";
import { editRolePermissions } from "./role/edit";
import { createSchoolMutation } from "./schoolManagement/create";
import { updateSchoolMutation } from "./schoolManagement/edit";
import { schoolListingSharing } from "./schoolManagement/shareSchool";
import { createStudent } from "./student/create";
import { updateStudent } from "./student/edit";
import { createTherapists } from "./therapists/create";
import { assignSecretary } from "./therapists/edit";
import { unAssignedSecretary } from "./therapists/unAssignedSecretary";
import { createUserMutation } from "./user/create";
import { userUpdate } from "./user/edit";
import { changePassword, loginReset, loginUpdate } from "./user/login";
import { updateSecretaryAppointmentToTherapist } from "./meeting/updateSecretaryAppointmentToTherapist";
import { updateClientLogs } from "./clientLog/payment";
import { sharePaymentRequest } from "./clientLog/sharePaymentRequest";
import {scheduleOperation} from "./ChatSubscription/index";
import { SingleChatRoomCaseworkermutation } from "./ChatSubscription/SingleChatRoomCaseworker";
export const mutationResolvers = {
    createRole,
    SingleChatRoomCaseworkermutation,
    scheduleOperation,
    createUser: createUserMutation,
    loginUpdate,
    loginReset,
    userUpdate,
    createClient,
    updateClient,
    createSchool: createSchoolMutation,
    updateSchool: updateSchoolMutation,
    createTherapists,
    editRolePermissions,
    assignSecretary,
    changePassword,
    createStudent,
    updateStudent,
    unAssignedSecretary,
    schoolListingSharing,
    scheduleMeetingToStudent,
    updateMeetingToStudent,
    createAppointmentToTherapist,
    updateSecretaryAppointmentToTherapist,
    updateClientLogs,
    sharePaymentRequest
};