import { SchoolShareList } from "../../../database/schoolManagement/schoolshareList";
import { SchoolListingSharingInput } from "../../../types/school";
import yenv from "yenv";
const env = yenv("env.yaml", { env: "development" });
import schoolDataEmailTemplate from "../../util/schoolDataEmailTemplate";
import MailService from "../../../config/mailService";
import randomstring from "randomstring";
import bcrypt from "bcrypt";
import { Url } from "../../../config/networkInterface";
import { GraphQLContext } from "../../util/graphql";
export const schoolListingSharing = async (
  _: any,
  { input }: { input: SchoolListingSharingInput },
  {userId }: GraphQLContext,
) => {
  const sharedBy = userId;
  const randomString = randomstring.generate(16);
  const hashedUrl = await bcrypt.hash(randomString, 16); 
  input.url = hashedUrl;
  const urlLink = `${Url.clientBaseURl}/school-data?${hashedUrl}`;
  const insertResult = await SchoolShareList.createQueryBuilder()
    .insert()
    .values({...input, sharedBy: sharedBy, sharedUrl: urlLink })
    .output("*")
    .execute();
  if (!Array.isArray(insertResult.raw) || insertResult.raw.length === 0) {
    throw new Error("Failed to send data");
  }
 
  const sharedData = schoolDataEmailTemplate(urlLink);
  const mailService = MailService.getInstance();
  await mailService.sendMail(insertResult.raw[0].id, {
    to: input.email,
    subject: "Schools Sheets Document",
    html: sharedData.html,
    from: `Schools Sheets Document <${env.SMTP_SENDER}>`,
  });

  return "Data has been successfully sent to the provided email.";
};
