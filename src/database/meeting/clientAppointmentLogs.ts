import { BaseEntity, Column, Entity, Generated, PrimaryGeneratedColumn} from "typeorm";
  @Entity({ name: "ClientAppointmentLogs" })
  export class ClientAppointmentLogs extends BaseEntity {
    @PrimaryGeneratedColumn({ name: "id" })
      @Generated("uuid")
      id: string;
  
    @Column({ name: "appointmentId", nullable: true, type: "uuid" })
    appointmentId: string;

    @Column({ name: "client", nullable: true, type: "uuid" })
    client: string;

    @Column({ name: "therapist", nullable: true, type: "uuid" })
    therapist: string;

    @Column({ name: "comment", nullable: true })
    comment: string;

    @Column({ name: "totalAmount" })
    totalAmount: string;

    @Column({ name: "amountPaid", default: 0 })
    amountPaid: string;

    @Column({ name: "datePaid", nullable: true})
    datePaid: Date;

    @Column({ name: "amountStillOwes", default: 0})
    amountStillOwes: string;
    
    @Column({name: "paymentStatus", default: "Not paid"})
    paymentStatus: string;

    @Column({name: "paymentMethod", nullable: true})
    paymentMethod: string;

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
  