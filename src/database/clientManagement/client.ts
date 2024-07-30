import {
    BaseEntity,
    Column,
    Entity,
    Generated,
    PrimaryGeneratedColumn,
  } from "typeorm";
  
  @Entity({ name: "Client" })
  export class Client extends BaseEntity {
    @PrimaryGeneratedColumn({ name: "id" })
    @Generated("uuid")
    id: string;
  
    @Column({ name: "email", default: null })
    email: string;
  
    @Column({ name: "firstName" })
    firstName: string;
  
    @Column({ name: "lastName" })
    lastName: string;
  
    @Column({ name: "fatherName" })
    fatherName: string;
  
    @Column({ name: "cell" })
    cell: string;
  
    @Column({ name: "title"})
    title: string;
  
    @Column({ name: "reason" })
    reason: string;
  
    @Column({ name: "active", default: "Yes" })
    active: string;

    @Column({ name: "firstPrice", default: 0 })
    firstPrice: string;
  
    @Column({ name: "followUpPrice", default: 0})
    followUpPrice: string;
  
    @Column({ name: "firstNotes", type: "jsonb", nullable: true })
    firstNotes: any;

    @Column({ name: "attachment", type: "text", array: true, default: [] })
    attachment: string[];

    @Column({ name: "kehilah", default: null })
    kehilah: string;
  
    @Column({ name: "yeshivah" , default: null})
    yeshivah: string;

    @Column({ name: "parents", default: null })
    parents: string;
  
    @Column({ name: "inCharge", default: null })
    inCharge: string;

    @Column({ name: "billingDepartment"})
    billingDepartment: string;

    @Column({ name: "selectTherapist" })
    selectTherapist: string;
    
    @Column({ name: "frequency" })
    frequency: string;

    @Column({ name: "createDate", nullable: true })
    createDate: string;

    @Column({name: "createdBy", nullable: true})
    createdBy: string;

    @Column({ name: "otherBillingNote", nullable: true })
    otherBillingNote: string;

    @Column({
      name: "createdAt",
      type: "timestamptz",
      default: () => "CURRENT_TIMESTAMP",
    })
    createdAt: Date;
  
    @Column({
      name: "updatedAt",
      type: "timestamptz",
      default: () => "CURRENT_TIMESTAMP",
    })
    updatedAt: Date;
      appointmentTime: Date;
  }
  