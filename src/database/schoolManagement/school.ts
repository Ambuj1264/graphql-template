
import {
  BaseEntity,
  Column,
  Entity,
  Generated,
  PrimaryGeneratedColumn
} from "typeorm";
@Entity({ name: "School" })
export class School extends BaseEntity {
  @PrimaryGeneratedColumn({ name: "id" })
  @Generated("uuid")
  id: string;

  @Column({ name: "typeOfSchool", default: null })
  typeOfSchool: string;

  @Column({ name: "region" })
  region: string;

  @Column({ name: "schoolName" })
  schoolName: string;

  @Column({ name: "roshYeshivah" })
  roshYeshivah: string;

  @Column({ name: "ryContact" })
  ryContact: string;

  @Column({ name: "menahel" })
  menahel: string;

  @Column({ name: "menahelNumber" })
  menahelNumber: string;

  @Column({ name: "yeshivahAddress", default: null })
  yeshivahAddress: string;

  @Column({ name: "officeAddress", default: null })
  officeAddress: string;

  @Column({ name: "email", default: null })
  email: string;

  @Column({ name: "dormitory", nullable: true })
  dormitory: string;

  @Column({ name: "mashgiach", nullable: true})
  mashgiach: string;

  @Column({ name: "yeshivahHours", type: "text", array: true, default: []  })
  yeshivahHours: string[];

  @Column({ name: "transportation", default: null })
  transportation: string;

  @Column({ name: "visitedWhen", default: null })
  visitedWhen: string;

  @Column({ name: "createdBy" })
  createdBy: string;

  @Column({ name: "chasidish", default: null })
  chasidish: string;

  @Column({ name: "boxy", default: null })
  boxy: string;

  @Column({ name: "levelOfLearning", default: null })
  levelOfLearning: string;

  @Column({ name: "pureness", default: null })
  pureness: string;

  @Column({ name: "relationshipStaffWithBuchrim", default: null })
  relationshipStaffWithBuchrim: string;

  @Column({ name: "schoolApplication", type: "text", array: true, default: []  })
  schoolApplication: string[];

  @Column({ name: "reports", nullable: true })
  reports: string;
  
  @Column({
    name: "createdAt",
    type: "timestamptz",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @Column({
    name: "dateOfReportsUpdated",
    type: "timestamptz",
    default: () => "CURRENT_TIMESTAMP",
  })
  dateOfReportsUpdated: Date;

}
