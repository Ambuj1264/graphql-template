import { BaseEntity, Column, Entity, Generated, PrimaryGeneratedColumn } from "typeorm";
@Entity({ name: "Student" })
export class Student extends BaseEntity {
    @PrimaryGeneratedColumn({ name: "id" })
    @Generated("uuid")
    id: string;

    @Column({ name: "studentName", })
    studentName: string;

    @Column({ name: "fatherName", })
    fatherName: string;

    @Column({ name: "contactNumber", })
    contactNumber: string;

    @Column({ name: "currentSchool", })
    currentSchool: string;

    @Column({ name: "needs", })
    needs: string;

    @Column({ name: "age", })
    age: string;

    @Column({ type: "jsonb", default: "[]" }) 
    caseworker: string[];
    
    @Column({ name: "goToSchool", default: null })
    goToSchool: string;

    @Column({ name: "theCurrentPlan", default: null })
    theCurrentPlan: string;

    @Column({ name: "meeting", default: "No" })
    meeting: string;

    @Column({ name: "status", default: "In Progress" })
    status: string;

    @Column({ name: "createDate", nullable: true })
    createDate: string;

    @Column({ name: "reportAttachment", type: "text", array: true, default: [] })
    reportAttachment: string[];

    @Column({
        name: "created_at",
        type: "timestamptz",
        default: () => "CURRENT_TIMESTAMP",
    })
    created_at: Date;

    @Column({
        name: "updated_at",
        type: "timestamptz",
        default: () => "CURRENT_TIMESTAMP",
    })
    updated_at: Date;

}
