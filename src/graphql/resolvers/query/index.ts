import { loginResolver } from "./auth";
import { caseworkerQueryResolver } from "./caseworker/caseworker";
import { clearCacheQuery } from "./clearCache";
import { deletClientByIdResolver, removeClientImg } from "./clientManagement/deleteClientById";
import { clientListResolver, getClientByIdResolver, getClientByTherapist, getClientByappoinment } from "./clientManagement/getclientsList";
import { deleteUserResolver } from "./deleteUser";
import { navMenus } from "./navMenu";
import { deleteschoolReslover, removeSchoolImg } from "./schoolManagement/deleteSchool";
import { getschoolById, schoolListResolver } from "./schoolManagement/schools";
import { shareSchoolListResolver } from "./schoolManagement/shareSchoolList";
import { SharedLogs } from "./schoolManagement/sharedLogs";
import { expiredShareSchoolLink } from "./schoolManagement/expiredShareSchoolLink";
import { secretaryQueryResolver } from "./secretary/secretaryList";
import { getRoleResolver, getUserFeatureResolver } from "./setting";
import { deletStudentIdResolver, deleteImg,  } from "./student/delete";
import { getStudentByCaseworkerId, getstudentById,
     studentListResolver, unAssignedCaseworker } from "./student/students";
import { deleteTherapist } from "./therapists/delete";
import { gettherapistById, therapistQueryResolver } from "./therapists/therapists";
import { getUserDetailsByIdResolver, usersQueryResolver } from "./users";
import { getStudentByCaseworker } from "./student/getStudentByCaseworker";
import { getMeetingByCaseworker, getMeetingByCaseworkerID } from "./meeting/getMeetingByCaseworker";
import { deleteCaseworkerMeetingToStudent, deleteStudentReportImg, getMeetingByStudentID } from "./meeting/deleteCaseworkerMeetingToStudent";
import { deleteAppointmentReportImg, deleteSecretaryTherapistAppointment, 
    getAppointmentByTherapistId, getAppointmentReports, secretaryTherapistAppointments } from "./meeting/secretaryAppointmentToTherapist";
import { getClientAppointmentLogs } from "./clientLogs/clientLogs";
import { getBillingsData } from "./billing.ts/billing";
import { getCaseworkerChatRoom } from "./Chat";

export const queryResolvers = {
    clearCache: clearCacheQuery,
    login: loginResolver,
    getCaseworkerChatRoom,
    users: usersQueryResolver,
    getMyFeatures: getUserFeatureResolver,
    getRole: getRoleResolver,
    getUserDetailsById: getUserDetailsByIdResolver,
    deleteUser: deleteUserResolver,
    clientList: clientListResolver,
    deletClientById: deletClientByIdResolver,
    getClientById: getClientByIdResolver,
    schoolList: schoolListResolver,
    deleteSchool: deleteschoolReslover,
    getschoolById: getschoolById,
    therapists: therapistQueryResolver,
    getTherapistById: gettherapistById,
    secretaryList: secretaryQueryResolver,
    students: studentListResolver,
    getstudentById: getstudentById,
    deleteStudent: deletStudentIdResolver,
    deleteTherapist: deleteTherapist,
    caseworkers: caseworkerQueryResolver,
    deleteImg: deleteImg,
    shareSchoolList: shareSchoolListResolver,
    navMenus: navMenus,
    SharedLogs: SharedLogs,
    expiredShareSchoolLink: expiredShareSchoolLink,
    getStudentByCaseworker: getStudentByCaseworker,
    getMeetingByCaseworkerID: getMeetingByCaseworkerID,
    getMeetingByCaseworker: getMeetingByCaseworker,
    deleteCaseworkerMeetingToStudent: deleteCaseworkerMeetingToStudent,
    getMeetingByStudentID: getMeetingByStudentID,
    secretaryTherapistAppointments: secretaryTherapistAppointments,
    deleteSecretaryTherapistAppointment: deleteSecretaryTherapistAppointment,
    getAppointmentByTherapistId: getAppointmentByTherapistId,
    getAppointmentReports: getAppointmentReports,
    getClientAppointmentLogs: getClientAppointmentLogs,
    getBillingsData: getBillingsData,
    deleteStudentReportImg: deleteStudentReportImg,
    deleteAppointmentReportImg: deleteAppointmentReportImg,
    getClientByTherapist: getClientByTherapist,
    removeSchoolImg: removeSchoolImg,
    unAssignedCaseworker: unAssignedCaseworker,
    removeClientImg: removeClientImg,
    getStudentByCaseworkerId: getStudentByCaseworkerId,
    getClientByappoinment: getClientByappoinment
};
