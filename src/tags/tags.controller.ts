import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Post,
} from "@nestjs/common";
import { CreateTagDto } from "./dtos/create-tag.dto";
import { TagsService } from "./providers/tags.service";

@Controller("tags")
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Post()
  public createTags(@Body() createTagDto: CreateTagDto) {
    return this.tagsService.create(createTagDto);
  }

  @Delete(":tagId")
  public deleteTag(@Param("tagId", ParseIntPipe) tagId: number) {
    return this.tagsService.delete(tagId);
  }
}
