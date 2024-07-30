import { BaseEntity, Column, Entity, Generated, PrimaryGeneratedColumn} from "typeorm";
  @Entity({ name: "SchoolShareList" })
  export class SchoolShareList extends BaseEntity {
    @PrimaryGeneratedColumn({ name: "id" })
    @Generated("uuid")
    id: string;
  
    @Column({ name: "email", type: "text", array: true, default: [] })
    email: string[];

    @Column({ name: "shareData", type: "jsonb" })
    shareData: any;

    @Column({ name: "shareColumn", type: "jsonb" })
    shareColumn: any;

    @Column({ name: "url"})
    url: string;

    @Column({ name: "IsActive", default: true })
    isActive: boolean;

    @Column({ name: "sharedUrl", nullable: true })
    sharedUrl: string;

    @Column({ name: "sharedBy", })
    sharedBy: string;

    @Column({ name: "linkExpireDate"})
    linkExpireDate: Date;

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
  