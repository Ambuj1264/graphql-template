import { School } from "../../../database/schoolManagement/school";
export const getSchools = async (ids: readonly string[]): Promise<School[]> => {
    const schoolMap: Map<string, School> = new Map();
    const _ids = ids.map((id) => `${id}`);
    const schools = await School.findByIds(_ids);
    schools.forEach((school) => {
        schoolMap.set(school.id, school);
    });
    const results: (School | undefined)[] = ids.map((id) => schoolMap.get(id));

    return results.filter((school): school is School => school !== undefined);
};