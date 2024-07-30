import { ChatInput } from "./chat";
import { ClientInput } from "./clientInput";
import { miscInputs } from "./miscInputs";
import { roleInput } from "./roleInput";
import { schoolInput } from "./schoolInput";
import { StudentInput } from "./student";
import { therapistInput } from "./therapistsInput";
import { userInput } from "./userInput";

export const inputTypes = [
    miscInputs,
    roleInput,
    userInput,
    ClientInput,
    schoolInput,
    therapistInput,
    StudentInput,
    ChatInput
];
