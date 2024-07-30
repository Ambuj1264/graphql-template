import { BaseEntity, Column, Entity, Generated, PrimaryGeneratedColumn} from "typeorm";
  @Entity({ name: "SecretaryTherapistMeeting" })
  export class SecretaryTherapistMeeting extends BaseEntity {
    @PrimaryGeneratedColumn({ name: "id" })
      @Generated("uuid")
      id: string;
  
    @Column({ name: "therapistId", })
    therapistId: string;

    @Column({ name: "clientId", type: "uuid", nullable: true})
    clientId: string;

    @Column({ name: "reportId", nullable: true })
    reportId: string;
    
    @Column({ name: "title", nullable: true})
    title: string;

    @Column({ name: "appointmentTime", nullable: true})
    appointmentTime: Date;

    @Column({ name: "reason"})
    reason: string;
    
    @Column({name: "price"})
    price: number;

    @Column({name: "fatherName"})
    fatherName: string;

    @Column({name: "inCharge", nullable: true})
    inCharge: string;

    @Column({name: "cell"})
    cell: string;

    @Column({name: "frequency"})
    frequency: string;

    @Column({name: "recurringPrice"})
    recurringPrice: number;

    @Column({ name: "description"})
    description: string;

    @Column({ name: "userName", nullable: true})
    userName: string;

    @Column({ name: "appointmentType", default: "appointment"})
    appointmentType: string;

    @Column({ name: "attachment", type: "text", array: true, default: [] })
    attachment: string[];

    @Column({ name: "status", default: "Booked"})
    status: string;

    @Column({name: "otherBillingNote", nullable: true})
    otherBillingNote: string;

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
  