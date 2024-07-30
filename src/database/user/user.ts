import {
  BaseEntity,
  Column,
  Entity,
  Generated,
  PrimaryGeneratedColumn,
} from "typeorm";
@Entity({ name: "user" })
export class User extends BaseEntity {
    @PrimaryGeneratedColumn({ name: "id" })
    @Generated("uuid")
    id: string;

    @Column({ name: "englishName"})
    englishName: string;
    
    @Column({ name: "hebrewName"})
    hebrewName: string;

    @Column({ name: "email"})
    email: string;

    @Column({ name: "cellPhone", default: null})
    cellPhone: string;

    @Column({ name: "numberExt", default: null})
    numberExt: string;

    @Column({ name: "address", default: null})
    address: string;

    @Column({ name: "city", default: null })
    city: string;

    @Column({ name: "state", default: null })
    state: string;

    @Column({ name: "zipcode", default: null})
    zipcode: string;

    @Column({ name: "profileImage", type: "text", array: true, default: []  })
    profileImage: string[];

    @Column({ name: "role"})
    role: string;

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
  isActive: boolean | undefined;
   
}
