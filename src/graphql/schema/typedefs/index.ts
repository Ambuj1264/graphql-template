import { connections } from "./connection/connections";
import { edges } from "./edge/edges";
import { inputTypes } from "./inputs";
import { root } from "./root";
import { role } from "./role";
import { user } from "./user";
import { auth } from "./auth";
import { client } from "./client";
import { enums } from "./enums/enums";
import { School } from "./school";
import { therapist } from "./therapists";
import { Student } from "./student";
import {subscription} from "./subscription";
import { SingleChatRoomCaseworkerType } from "./chat";
export const typeDefs = [
    ...inputTypes,
    auth,
    root,
    subscription,
    connections,
    edges,
    user,
    role,
    client,
    SingleChatRoomCaseworkerType,
    enums,
    School,
    therapist,
    Student
];
