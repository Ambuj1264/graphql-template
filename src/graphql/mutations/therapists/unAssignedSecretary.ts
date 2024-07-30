import { Therapists } from "../../../database/therapists/therapists";
import { UpdateTherapistsInput } from "../../../types/therapists";
import { dataLoaders } from "../../resolvers/dataloaders";

export const unAssignedSecretary = async (
  _: any,
  { input }: { input: UpdateTherapistsInput }
) => {
  const { id, secretary } = input;
  const existingTherapist = await Therapists.findOneBy({ id });
  if (!existingTherapist) {
    throw new Error("Therapist not found.");
  }
  if (secretary) {
   const  removeSecretary = existingTherapist.secretary.filter(
      (secId) => !secretary.includes(secId)
    );
    await Therapists.createQueryBuilder()
      .update()
      .set({ secretary: removeSecretary })
      .where({ id })
      .output("*")
      .execute()
      .then((response) => {
        if (response.affected !== 1) {
          throw new Error("Failed to unassign secretary");
        }
      });
  }

  return await dataLoaders.therapistsLoader.clear(id).load(id);
};
