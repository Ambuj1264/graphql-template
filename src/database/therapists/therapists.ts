import {
    BaseEntity,
    Column,
    Entity,
    Generated,
    PrimaryGeneratedColumn,
  } from "typeorm";
  @Entity({ name: "Therapists" })
  export class Therapists extends BaseEntity {
      @PrimaryGeneratedColumn({ name: "id" })
      @Generated("uuid")
      id: string;
  
      @Column({ name: "englishName"})
      englishName: string;
      
      @Column({ name: "hebrewName"})
      hebrewName: string;
  
      @Column({ name: "cellPhone"})
      cellPhone: string;
  
      @Column({ name: "numberExt", default: null})
      numberExt: string;
  
      @Column({ type: "jsonb", default: "[]" }) // Change the type to jsonb
        secretary: string[];

        @Column({ type: "jsonb", default: "[]" }) // Change the type to jsonb
        slot: string[];

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
     
  }
  