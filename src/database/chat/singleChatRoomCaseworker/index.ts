import {
    BaseEntity,
    Column,
    Entity,
    Generated,
    PrimaryGeneratedColumn,
  } from "typeorm";
  
  @Entity({ name: "SingleChatRoomCaseworker" })
  export class SingleChatRoomCaseworker extends BaseEntity {
    @PrimaryGeneratedColumn({ name: "id" })
    @Generated("uuid")
    id: string; 

    @Column({ name: "participants", type: "text", array: true})
    participants: string[];  
     
    @Column({ name: "isDelete", default: false })  
    isDelete: boolean;
  
    @Column({                   
      name: "createdAt",
      type: "timestamptz",
      default: () => "CURRENT_TIMESTAMP",
    })
    createdAt: Date;
  }
  