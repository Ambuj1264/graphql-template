import { Therapists } from "../../../../database/therapists/therapists";
export const deleteTherapist = async (
    _: any,
    {id}: {id: string},
) => {
    const result = await Therapists.createQueryBuilder()
    .delete()
    .where({ id })
    .execute();
    if (result.affected !== 1) throw new Error("Therapists not found.");

    return id;
}; 