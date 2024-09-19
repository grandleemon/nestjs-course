import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { POST_TYPE } from "./enums/postType.enum";
import { POST_STATUS } from "./enums/postStatus.enum";
import { MetaOption } from "../meta-options/meta-option.entity";

@Entity({
  name: "posts",
})
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "varchar",
    length: 512,
    nullable: false,
  })
  title: string;

  @Column({
    type: "enum",
    enum: POST_TYPE,
    nullable: false,
    default: POST_TYPE.POST,
  })
  postType: POST_TYPE;

  @Column({
    type: "varchar",
    length: 256,
    unique: true,
    nullable: false,
  })
  slug: string;

  @Column({
    type: "enum",
    enum: POST_STATUS,
    nullable: false,
    default: POST_STATUS.DRAFT,
  })
  status: POST_STATUS;

  @Column({
    type: "text",
    nullable: true,
  })
  content?: string;

  @Column({
    type: "text",
    nullable: true,
  })
  schema?: string;

  @Column({
    type: "varchar",
    length: 1024,
    nullable: true,
  })
  featuredImageUrl?: string;

  @Column({
    type: "timestamp",
    nullable: true,
  })
  publishOn?: Date;

  tags?: string[];

  @OneToOne(() => MetaOption, { cascade: true })
  @JoinColumn()
  metaOptions?: MetaOption;
}
