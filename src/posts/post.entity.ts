import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { POST_TYPE } from "./enums/postType.enum";
import { POST_STATUS } from "./enums/postStatus.enum";
import { MetaOption } from "../meta-options/meta-option.entity";
import { User } from "../users/user.entity";
import { Tag } from "../tags/tag.entity";

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

  @ManyToMany(() => Tag, (tag) => tag.posts)
  @JoinTable()
  tags?: Tag[];

  @OneToOne(() => MetaOption, (metaOption) => metaOption.post, {
    cascade: true,
  })
  metaOptions?: MetaOption;

  @ManyToOne(() => User, (user) => user.posts)
  author: User;
}
