import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Tag } from "../tag.entity";
import { In, Repository } from "typeorm";
import { CreateTagDto } from "../dtos/create-tag.dto";

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagsRepository: Repository<Tag>,
  ) {}

  public async getMultipleTagsById(tagsIds: number[]) {
    return await this.tagsRepository.find({
      where: {
        id: In(tagsIds),
      },
    });
  }

  public async create(createTagDto: CreateTagDto) {
    const tag = this.tagsRepository.create(createTagDto);

    return await this.tagsRepository.save(tag);
  }

  public async delete(tagId: number) {
    await this.tagsRepository.delete(tagId);

    return {
      deleted: true,
      id: tagId,
    };
  }
}
