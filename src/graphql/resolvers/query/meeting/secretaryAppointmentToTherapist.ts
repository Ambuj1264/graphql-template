
import { Client } from "../../../../database/clientManagement/client";
import { SecretaryTherapistMeeting } from "../../../../database/meeting/secretaryTherapistMeeting";
import { Therapists } from "../../../../database/therapists/therapists";
import { transformInputDate } from "../../../util/commonMethod";

export const secretaryTherapistAppointments = async (
    _: any,
  ) => {
    const studentQuery = SecretaryTherapistMeeting.createQueryBuilder("secretaryTherapistMeeting").orderBy("secretaryTherapistMeeting.created_at", "DESC");
    const [meetings, totalCount] = await studentQuery.getManyAndCount();
    const meetingsNodes = meetings.map((meeting) => {
      return {
        node: meeting,
        cursor: meeting.id,
      };
    });

    return {
      totalCount,
      edges: meetingsNodes,
    };
  };

export const deleteSecretaryTherapistAppointment = async (
    _: any,
    { ids }: { ids: string[] },
) => {
    const result = await SecretaryTherapistMeeting.createQueryBuilder()
    .delete()
    .where("id IN (:...ids)", { ids }) 
    .execute();
    if (result.affected === 0) throw new Error("No meeting found to delete.");

    return "Appointment deleted successfully";
}; 

export const getAppointmentByTherapistId = async (
  _: any,
  { therapistId, startDate, endDate, clientId }: { therapistId: string; startDate?: Date; endDate?: Date;
     clientId?: [string] },
) => {
  const existingTherapist = await Therapists.findOneBy({ id: therapistId});
  const slot = existingTherapist?.slot;
  const formattedStartDate = startDate ? transformInputDate(startDate) : null;
  const formattedEndDate = endDate ? transformInputDate(endDate) : null;
  const therapistQuery = SecretaryTherapistMeeting.createQueryBuilder("secretaryTherapistMeeting")
    .innerJoin(Client, "client", "client.id = secretaryTherapistMeeting.clientId")
    .orderBy("secretaryTherapistMeeting.created_at", "DESC")
    .where({ therapistId: therapistId });

  if (clientId && formattedStartDate && formattedEndDate) {
    therapistQuery.andWhere("secretaryTherapistMeeting.appointmentTime BETWEEN :formattedStartDate AND :formattedEndDate")
    .andWhere("secretaryTherapistMeeting.clientId IN (:...clientIds)"
    , { formattedStartDate, formattedEndDate, clientIds: clientId });
  }
  const [therapists, totalCount] = await therapistQuery.getManyAndCount();
  const therapistNodes = therapists.map((therapist) => {
    return {
      node: therapist,
      cursor: therapist.id,
    };
  });

  return {
    totalCount,
    slot,
    edges: therapistNodes,
  };
};

export const getAppointmentReports = async (
  _: any,
  {clientId}: {clientId: string},
) => {
  
  const therapistQuery = SecretaryTherapistMeeting.createQueryBuilder("caseWorkerStudentMetting").orderBy("caseWorkerStudentMetting.created_at", "DESC")
  .where({clientId: clientId})
  .andWhere("status = 'Done'");
  const [therapists, totalCount] = await therapistQuery.getManyAndCount();
  const therapistNodes = therapists.map((therapist) => {
    return {
      node: therapist,
      cursor: therapist.id,
    };
  });

  return {
    totalCount,
    edges: therapistNodes,
  };
};

export const deleteAppointmentReportImg = async (
  _: any,
  { id, imgUrl }: { id: string, imgUrl: string }
) => {
    const secretaryTherapistMeeting = await SecretaryTherapistMeeting.findOneBy({ id });
    if (!secretaryTherapistMeeting) {
      throw new Error(`Report with id ${id} not found.`);
    }
    const attachmentIndex = secretaryTherapistMeeting.attachment.indexOf(imgUrl);
    if (attachmentIndex === -1) {
      throw new Error(`Image URL ${imgUrl} not found in the reportAttachment array.`);
    }
    secretaryTherapistMeeting.attachment.splice(attachmentIndex, 1);
    await secretaryTherapistMeeting.save();

    return `Attachment deleted successfully`;

};
