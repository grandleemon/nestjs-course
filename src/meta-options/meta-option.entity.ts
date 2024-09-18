import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("meta_options")
export class MetaOption {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "json",
    nullable: false,
  })
  metaValue: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
