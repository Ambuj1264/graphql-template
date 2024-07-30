import bcrypt from "bcrypt";
import { Role } from "../../database/role/role";
import moment from "moment";

export function generateRandomString(strLength: number = 8): string {
  const uppercaseLetters: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowercaseLetters: string = "abcdefghijklmnopqrstuvwxyz";
  const digits: string = "0123456789";
  const specialCharacters: string = "!@#$%^&*";
  
  const charset: string = uppercaseLetters + 
  lowercaseLetters + 
  digits + 
  specialCharacters;
  const charsetLen: number = charset.length;
  
  // Ensure minimum length of 8 characters
  const length: number = Math.max(strLength, 8);

  let randomStr: string = "";

  // Add at least one uppercase letter
  randomStr += uppercaseLetters
  .charAt(Math.floor(Math.random() * uppercaseLetters.length));

  // Add at least one lowercase letter
  randomStr += lowercaseLetters
  .charAt(Math.floor(Math.random() * lowercaseLetters.length));

  // Add at least one digit
  randomStr += digits
  .charAt(Math.floor(Math.random() * digits.length));

  // Add at least one special character
  randomStr += specialCharacters
  .charAt(Math.floor(Math.random() * specialCharacters.length));

  // Generate remaining characters randomly
  for (let i = randomStr.length; i < length; i++) {
    randomStr += charset
    .charAt(Math.floor(Math.random() * charsetLen));
  }

  return randomStr;
}

export async function generateHash
(
    password: string,
    saltRounds = 10
    ): Promise<string> {
  return bcrypt.hash(password, saltRounds);
}

export const checkPermissions = (
    userPermissions: string[],
    allowedPermissions: string[]
   ) => {
  return userPermissions?.some((role: string) => 
  allowedPermissions
  .includes(role));
};

interface WhereExpressionType {
  searchString: string;
  params: { searchText: string };
}

export const createWhereExpression = (
  fieldName: string,
  search: string|number
): WhereExpressionType => {
  return {
    searchString: `${fieldName} ILIKE :searchText`,
    params: {
      searchText: `%${search}%`,
    },
  };
};

export const createUserWhereExpression = async (
  fieldName: string,
  search: string
): Promise<WhereExpressionType> => {
    const role = await Role.findOneBy({ role: search });
    if (role) {
      return {
        searchString: `user.role ILIKE :searchText`,
        params: {
          searchText: `%${role?.id}%`,
        },
      };
    }
  
  return {
    searchString: `${fieldName} ILIKE :searchText`,
    params: {
      searchText: `%${search}%`,
    },
  };
};

export function extractCreatedAtDate(dateString: string): string {
  const [month, day, year] = dateString.split("-");
  const formattedDate = `${year}-${month}-${day}`;

  return formattedDate;
}

export const transformInputDate = (inputDate: Date | string): string => {
  const dateObject = inputDate instanceof Date ? inputDate : moment(inputDate, "MM-DD-YYYY").toDate();

  return moment(dateObject).format("YYYY-MM-DD HH:mm:ss");
};
