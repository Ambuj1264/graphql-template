
import { dataLoaders } from "../../resolvers/dataloaders";
import { SecretaryTherapistMeeting } from "../../../database/meeting/secretaryTherapistMeeting";
import { CreateSecretaryMettingToTherapistInput } from "../../../types/therapists";
import { GraphQLContext } from "../../util/graphql";
import { transformInputDate } from "./scheduleMeetingToStudent";
const validStartHour = 9;
const validEndHour = 21;
export const createAppointmentToTherapist = async (
  _: null,
  { input }: { input: CreateSecretaryMettingToTherapistInput },
  { userId }: GraphQLContext,
) => {

  const transformedMeetingStartDate = input?.appointmentTime
    ? transformInputDate(input.appointmentTime)
    : undefined;

  if (input.startTime && input.endTime) {
    const validMeetingHours = isMeetingWithinValidHours
      (parseTimeStringToTimeObject(input.startTime), parseTimeStringToTimeObject(input.endTime));
    const inputStartTime = parseTimeStringToTimeObject(input.startTime);
    const inputEndTime = parseTimeStringToTimeObject(input.endTime);
    const timeDifference = inputEndTime.getTime() - inputStartTime.getTime();
    const minutesDifference = timeDifference / (1000 * 60);
    if (minutesDifference < 60) {
      throw new Error("Meeting end time must be 60 minutes after the start time.");
    }
    if (!validMeetingHours) {
      throw new Error("Meeting must be scheduled between 9 am and 9 pm.");
    }
    const existingMeetings = await SecretaryTherapistMeeting.createQueryBuilder("secretaryTherapistMeeting")
      .where("secretaryTherapistMeeting.therapistId = :therapistId", {
        therapistId: input.therapistId,
      })
      .andWhere("status = 'Booked'")
      .getMany();

    if (existingMeetings && existingMeetings.length > 0) {
      const inputAppointmentTime = new Date(input.appointmentTime);

      for (const existingMeeting of existingMeetings) {
        const existingStartTime = parseTimeStringToTimeObject(existingMeeting.startTime);
        const existingEndTime = parseTimeStringToTimeObject(existingMeeting.endTime);
        const existingAppointmentTime = new Date(existingMeeting.appointmentTime);

        // Check if the input appointmentTime is the same as existing ones
        if (inputAppointmentTime.getTime() === existingAppointmentTime.getTime()) {
          if (
            existingMeeting.startTime === input.startTime &&
            existingMeeting.endTime === input.endTime
          ) {
            throw new Error("Therapist has an appointment already booked at the specified time.");
          }

          // Check for overlapping times
          if (
            (inputStartTime >= existingStartTime && inputStartTime < existingEndTime) ||
            (inputEndTime > existingStartTime && inputEndTime <= existingEndTime) ||
            (inputStartTime <= existingStartTime && inputEndTime >= existingEndTime)
          ) {
            throw new Error("Therapist has an appointment already booked at the specified time.");
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
  const meeting = await SecretaryTherapistMeeting.createQueryBuilder()
    .insert()
    .values({ ...input, userName: userId, appointmentTime: transformedMeetingStartDate, reportId: reportId })
    .output("*")
    .execute()
    .then((response) => {
      if (!Array.isArray(response.raw) || response.raw.length === 0) {
        throw new Error("Failed to schedule meeting");
      }

      return response.raw[0];
    });

  return await dataLoaders.SecretaryTherapistMeetingLoader.load(meeting.id);
};

let reportCounter = 1;
export function generateReportID() {
  const now = new Date();
  const year = now.getFullYear().toString().slice(-2);
  const month = (now.getMonth() + 1).toString().padStart(2, "0");
  const day = now.getDate().toString().padStart(2, "0");
  const suffix = reportCounter.toString().padStart(3, "0");
  const reportID = `${year}${month}${day}-${suffix}`;
  reportCounter++;

  return reportID;
}

export const parseTimeStringToTimeObject = (timeString: string): Date => {
  const [hours, minutes, seconds] = timeString.split(":").map(Number);
  const date = new Date();
  date.setHours(hours, minutes, seconds || 0, 0);

  return date;
};

export const isMeetingWithinValidHours = (startTime: Date, endTime: Date): boolean => {
  return startTime.getHours() >= validStartHour && endTime.getHours() <= validEndHour;
};
