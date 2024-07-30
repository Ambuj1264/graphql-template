import DataLoader from "dataloader";
import { getLogins, getUsers, roleById } from "./userLoader";
import { Role } from "../../../database/role/role";
import { Login } from "../../../database/login/login";
import { User } from "../../../database/user/user";
import { Client } from "../../../database/clientManagement/client";
import { getClients } from "./clientLoader";

import { getSchools } from "./schoolLoader";
import { School } from "../../../database/schoolManagement/school";
import { Therapists } from "../../../database/therapists/therapists";
import { getTherapists } from "./therapistsLoader";
import { Student } from "../../../database/student/student";
import { getStudent } from "./studentLoader";
import { getCaseWorkerStudentMetting } from "./caseWorkerStudentMettingLoader";
import { CaseWorkerStudentMetting } from "../../../database/meeting/caseWorkerMetting";
import { getSecretaryTherapistMettingLoader } from "./SecretaryTherapistMettingLoader";
import { SecretaryTherapistMeeting } from "../../../database/meeting/secretaryTherapistMeeting";
import { ClientAppointmentLogs } from "../../../database/meeting/clientAppointmentLogs";
import { getAppointmentLogs } from "./clientAppointmentLogLoader";
const cacheProp = { cache: true };
export const dataLoaders = {
    loginLoader: new DataLoader<string, Login>(getLogins, cacheProp),
    roleById: new DataLoader<string, Role>(roleById, cacheProp),
    userLoader: new DataLoader<string, User>(getUsers, cacheProp),
    clientLoader: new DataLoader<string, Client>(getClients, cacheProp),
    schoolLoader: new DataLoader<string, School>(getSchools, cacheProp),
    therapistsLoader: new DataLoader<string, Therapists>(getTherapists, cacheProp),
    studentLoader: new DataLoader<string, Student>(getStudent, cacheProp),
    caseWorkerStudentMettingLoader: 
    new DataLoader<string, CaseWorkerStudentMetting>(getCaseWorkerStudentMetting, cacheProp),
    SecretaryTherapistMeetingLoader:
     new DataLoader<string, SecretaryTherapistMeeting>(getSecretaryTherapistMettingLoader, cacheProp),
    appointmentLoader:
     new DataLoader<string, ClientAppointmentLogs>(getAppointmentLogs, cacheProp),
};
