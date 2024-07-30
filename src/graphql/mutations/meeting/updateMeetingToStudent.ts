
import { CaseWorkerStudentMetting } from "../../../database/meeting/caseWorkerMetting";
import { Student } from "../../../database/student/student";
import { UpdateCaseworkerToStudentMeetingInput } from "../../../types/student";
import { dataLoaders } from "../../resolvers/dataloaders";
import { transformInputDate } from "./scheduleMeetingToStudent";
import { isMeetingWithinValidHours, parseTimeStringToTimeObject } from "./secretaryAppointmentToTherapist";

export const updateMeetingToStudent = async (
  _: null,
  { input }: { input: UpdateCaseworkerToStudentMeetingInput },
) => {
  const {id, studentId, caseworkerId, ...rest} = input;
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
      .andWhere("id != :id", { id }) 
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
 await CaseWorkerStudentMetting.createQueryBuilder()
  .update()
  .set({...rest, meetingStartDate: transformedMeetingStartDate, })
  .where({ id })
  .output("*")
  .execute()
  .then((response) => {
      if (response.affected !== 1) {
          throw new Error("Meeting not updated."); 
      }
  });

  if (input.status === "Done") {
    await Student.createQueryBuilder()
      .update()
      .set({ meeting: "Yes" })
      .where({ id: studentId })
      .execute()
      .then((response) => {
        if (response.affected !== 1) {
          throw new Error("Student meeting not updated.");
        }
      });
  }

  return await dataLoaders.caseWorkerStudentMettingLoader.clear(id).load(id);
};
