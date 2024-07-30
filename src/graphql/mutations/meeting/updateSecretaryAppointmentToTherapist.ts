import { SecretaryTherapistMeeting } from "../../../database/meeting/secretaryTherapistMeeting";
import { UpdateSecretaryMettingToTherapistInput } from "../../../types/therapists";
import { dataLoaders } from "../../resolvers/dataloaders";
import { ClientAppointmentLogs } from "../../../database/meeting/clientAppointmentLogs";
import { isMeetingWithinValidHours, parseTimeStringToTimeObject } from "./secretaryAppointmentToTherapist";
import { transformInputDate } from "./scheduleMeetingToStudent";

export const updateSecretaryAppointmentToTherapist = async (
  _: null,
  { input }: { input: UpdateSecretaryMettingToTherapistInput },
) => {
  const { id, therapistId, clientId, ...rest } = input;
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
      .andWhere("id != :id", { id }) 
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
  const updatedAppointment = await SecretaryTherapistMeeting.createQueryBuilder()
    .update()
    .set({ ...rest, appointmentTime: transformedMeetingStartDate, })
    .where({ id })
    .output("*")
    .execute()
    .then((response) => {
      if (response.affected !== 1) {
        throw new Error("Therapist appointment not updated.");
      }

      return response.raw[0];
    });
  if (input.status) {
    await ClientAppointmentLogs.createQueryBuilder()
      .insert()
      .values({
        appointmentId: id,
        totalAmount: updatedAppointment.price,
        client: updatedAppointment.clientId,
        therapist: updatedAppointment.therapistId,
        amountStillOwes: updatedAppointment.price
      })
      .output("*")
      .execute()
      .then((response) => {
        if (!Array.isArray(response.raw) || response.raw.length === 0) {
          throw new Error("Failed to create ClientAppointmentLogs entry.");
        }
      });
  }

  return await dataLoaders.SecretaryTherapistMeetingLoader.clear(id).load(id);
};
