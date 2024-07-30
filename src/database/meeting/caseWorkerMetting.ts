import { BaseEntity, Column, Entity, Generated, PrimaryGeneratedColumn} from "typeorm";
  @Entity({ name: "CaseWorkerStudentMetting" })
  export class CaseWorkerStudentMetting extends BaseEntity {
    @PrimaryGeneratedColumn({ name: "id" })
      @Generated("uuid")
      id: string;
  
    @Column({ name: "caseworkerId", })
    caseworkerId: string;

    @Column({ name: "studentId", nullable: true, type: "uuid" })
    studentId: string;

    @Column({ name: "reportId", nullable: true })
    reportId: string;

    @Column({ name: "title", nullable: true })
    title: string;

    @Column({ name: "meetingStartDate", nullable: true})
    meetingStartDate: Date;
  
    @Column({name: "fatherName"})
    fatherName: string;

    @Column({name: "cell"})
    cell: string;

    @Column({ name: "description"})
    description: string;

    @Column({ name: "attachment", type: "text", array: true, default: [] })
    attachment: string[];

    @Column({ name: "status", default: "Booked"})
    status: string;

    @Column({ name: "userName", nullable: true})
    userName: string;

    @Column({ name: "meetingType", default: "Meeting"})
    meetingType: string;

    @Column({ name: "startTime", type: "time", nullable: true })
    startTime: string; 

    @Column({ name: "endTime", type: "time", nullable: true })
    endTime: string; 

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
  