import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Post } from "../posts/post.entity";

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

  @OneToOne(() => Post, (post) => post.metaOptions)
  post: Post;
}
