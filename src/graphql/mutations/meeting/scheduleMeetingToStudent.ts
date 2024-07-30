
import { CaseWorkerStudentMetting } from "../../../database/meeting/caseWorkerMetting";
import { ScheduleCaseworkerToStudentMeetingInput } from "../../../types/student";
import { dataLoaders } from "../../resolvers/dataloaders";
import { GraphQLContext } from "../../util/graphql";
import { isMeetingWithinValidHours, parseTimeStringToTimeObject } from "./secretaryAppointmentToTherapist";
import moment from "moment";
export const scheduleMeetingToStudent = async (
  _: null,
  { input }: { input: ScheduleCaseworkerToStudentMeetingInput },
  { userId }: GraphQLContext,
) => {

  const transformedMeetingStartDate = input?.meetingStartDate
    ? transformInputDate(input.meetingStartDate)
    : undefined;
  if (input.startTime && input.endTime) {
    const validMeetingHours = isMeetingWithinValidHours
      (parseTimeStringToTimeObject(input.startTime), parseTimeStringToTimeObject(input.endTime));
    const inputStartTime = parseTimeStringToTimeObject(input.startTime);
    const inputEndTime = parseTimeStringToTimeObject(input.endTime);
    const timeDifference = inputEndTime.getTime() - inputStartTime.getTime();
    const minutesDifference = timeDifference / (1000 * 60);

    // Check if the difference is exactly 30 minutes
    if (minutesDifference < 30) {
      throw new Error("The meeting duration must be exactly 30 minutes.");
    }
    if (!validMeetingHours) {
      throw new Error("Meeting must be scheduled between 9 am and 9 pm.");
    }

    const existingMeetings = await CaseWorkerStudentMetting.createQueryBuilder("caseWorkerStudentMetting")
      .where({ caseworkerId: input.caseworkerId })
      .andWhere("status = 'Booked'")
      .getMany();

    if (existingMeetings && existingMeetings.length > 0) {
      const inputMeetingTime = new Date(input.meetingStartDate);
      for (const existingMeeting of existingMeetings) {
        const existingStartTime = parseTimeStringToTimeObject(existingMeeting.startTime);
        const existingEndTime = parseTimeStringToTimeObject(existingMeeting.endTime);
        const existingMeetingTime = new Date(existingMeeting.meetingStartDate);

        // Check if the input Meeting is the same as existing ones
        if (inputMeetingTime.getTime() === existingMeetingTime.getTime()) {
          if (
            existingMeeting.startTime === input.startTime &&
            existingMeeting.endTime === input.endTime
          ) {
            throw new Error("Caseworker has a meeting already scheduled at the specified date & time.");
          }

          // Check for overlapping times
          if (
            (inputStartTime >= existingStartTime && inputStartTime < existingEndTime) ||
            (inputEndTime > existingStartTime && inputEndTime <= existingEndTime) ||
            (inputStartTime <= existingStartTime && inputEndTime >= existingEndTime)
          ) {
            throw new Error("Caseworker has a meeting already scheduled at the specified date & time.");
          }

          // Check if input.startTime is equal to input.endTime
          if (input.startTime === input.endTime) {
            throw new Error("Start time and end time cannot be the same.");
          }

          // Check if input.startTime is after input.endTime
          if (input.startTime > input.endTime) {
            throw new Error("Start time should be smaller than End Time.");
          }
        }
      }
    }

  }
  const reportId = generateReportID();
  const meeting = await CaseWorkerStudentMetting.createQueryBuilder()
    .insert()
    .values({ ...input, userName: userId, meetingStartDate: transformedMeetingStartDate, reportId: reportId })
    .output("*")
    .execute()
    .then((response) => {
      if (!Array.isArray(response.raw) || response.raw.length === 0) {
        throw new Error("Failed to schedule meeting");
      }

      return response.raw[0];
    });

  return await dataLoaders.caseWorkerStudentMettingLoader.load(meeting.id);
};

let reportCounter = 1;

export function generateReportID() {
  const now = new Date();
  const year = now.getFullYear().toString();
  const month = (now.getMonth() + 1).toString().padStart(2, "0");
  const day = now.getDate().toString().padStart(2, "0");
  const suffix = reportCounter.toString().padStart(3, "0");
  const reportID = `${month}${day}${year}-${suffix}`;
  reportCounter++;

  return reportID;
}

export function transformInputDate(inputDate: Date): string {
  const dateObject = inputDate instanceof Date ? inputDate : new Date(inputDate);

  return moment(dateObject).format("YYYY-MM-DD HH:mm:ss");
}