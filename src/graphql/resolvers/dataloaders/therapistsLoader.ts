import { In } from "typeorm";
import { Therapists } from "../../../database/therapists/therapists";

export const getTherapists = async (
    ids: readonly string[]
    ): Promise<Therapists[]> => {
    const therepistsMap: Map<string, Therapists> = new Map();
    const therepists = await Therapists.find({ where: { id: In(ids) } });
    therepists.forEach((therepist) => therepistsMap.set(therepist.id, therepist));
  
    return ids.map((inputId) => therepistsMap.get(inputId), null) as Therapists[];
  };