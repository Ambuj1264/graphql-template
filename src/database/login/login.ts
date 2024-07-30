import { 
  BaseEntity, 
  Column,
  DeleteDateColumn, 
  Entity, 
  Generated, 
  PrimaryGeneratedColumn 
} from "typeorm";

@Entity({ name: "Login" })
export class Login extends BaseEntity {
  @PrimaryGeneratedColumn({ name: "id" })
  @Generated("uuid")
  id: string;

  @Column({ name: "EntityOid", type: "uuid" })
  userId: string;

  @Column({ name: "LoginName" })
  loginName: string;

  @Column({ name: "ScreenName", default: null })
  screenName: string;

  @Column({ name: "Password" })
  password: string;

  @Column({ name: "LastLoginDate", default: null })
  lastLoginDate: Date;

  @Column({name: "LastLoginDetails", type: "jsonb", nullable: true})
  lastLoginDetails: any;

  @Column({ name: "DatePwChanged", default: null })
  datePwChanged: Date;

  @Column({ name: "LinkDate", default: null })
  linkDate: Date;

  @Column({ name: "tokenId", default: null })
  tokenId: string;
  
  @Column({ name: "IsPending" })
  isPending: boolean;

  @Column({ name: "IsActive", default: true })
  isActive: boolean;

  @Column({ name: "IsDeleted", default: false  })
  isDeleted: boolean;

  @DeleteDateColumn({ 
    name: "deletedAt",
    type: "timestamptz", 
    nullable: true })
    deletedAt: Date;

  @Column({ name: "AccountIsLocked" })
  accountIsLocked: boolean;
  @Column({
        name: "createdAt",
        type: "timestamptz",
        default: () => "CURRENT_TIMESTAMP",
    })
  createdAt: Date;
  static isActive: boolean | undefined;
}
