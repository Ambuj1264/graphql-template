import {
    BaseEntity,
    Column,
    Entity,
    Generated,
    PrimaryGeneratedColumn,
  } from "typeorm";
  
  @Entity({ name: "CaseWorkerChat" })
  export class CaseWorkerChat extends BaseEntity {
    @PrimaryGeneratedColumn({ name: "id" })
    @Generated("uuid")
    id: string;
  
    @Column({ name: "message", nullable: true })
    message: string;
  
    @Column({ name: "attachment", type: "text", array: true, default: [] })
    attachment: string[];

    @Column({ name: "threadId", nullable: true })
    threadId: string;
  
    @Column({ name: "senderId" })
    senderId: string;
  
    @Column({ name: "receiverId" })
    receiverId: string;

    @Column({ name: "isRead", default: false })  
    isRead: boolean;
  
    @Column({ name: "isDelete", default: false })  
    isDelete: boolean;
  
    @Column({                   
      name: "createdAt",
      type: "timestamptz",
      default: () => "CURRENT_TIMESTAMP",
    })
    createdAt: Date;
  }
  