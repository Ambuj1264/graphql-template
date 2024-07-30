import { BaseEntity, Column, Entity, Generated, PrimaryGeneratedColumn} from "typeorm";
  @Entity({ name: "Role" })
  export class Role extends BaseEntity {
    @PrimaryGeneratedColumn({ name: "id" })
      @Generated("uuid")
      id: string;
  
    @Column({ name: "role", })
      role: string;

    @Column({ name: "roleConstraint" })
      roleConstraint: string;
    
    @Column({ name: "navMenu", type: "jsonb" })
    navMenu: any;
    
    @Column({ name: "rolePermissions", type: "jsonb" })
    rolePermissions: any;

    @Column({ name: "IsActive", default: true })
    isActive: boolean;

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
  