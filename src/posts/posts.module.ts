import { Module } from "@nestjs/common";
import { PostsService } from "./providers/posts.service";
import { PostsController } from "./posts.controller";
import { UsersModule } from "../users/users.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Post } from "./post.entity";
import { MetaOptionsModule } from "../meta-options/meta-options.module";

@Module({
  controllers: [PostsController],
  providers: [PostsService],
  imports: [UsersModule, TypeOrmModule.forFeature([Post]), MetaOptionsModule],
})
export class PostsModule {}
