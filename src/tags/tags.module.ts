import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Tag } from "./tag.entity";
import { TagsController } from "./tags.controller";

@Module({
  imports: [TypeOrmModule.forFeature([Tag])],
  controllers: [TagsController],
})
export class TagsModule {}
