
import { Student } from "../../../database/student/student";
export const getStudent = async (ids: readonly string[]): Promise<Student[]> => {
    const studentMap: Map<string, Student> = new Map();
        const _ids = ids.map((id) => `${id}`);
        const students = await Student.findByIds(_ids);
        students.forEach((student) => {
            studentMap.set(student.id, student);
        });
        const results: (Student | undefined)[] = ids.map((id) => studentMap.get(id));
    
        return results.filter((student): student is Student => student !== undefined);
    };
