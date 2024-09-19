import { Injectable } from "@nestjs/common";
import { UsersService } from "../../users/providers/users.service";
import { CreatePostDto } from "../dtos/create-post.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Post } from "../post.entity";
import { TagsService } from "../../tags/providers/tags.service";
import { PatchPostDto } from "../dtos/patch-post.dto";

@Injectable()
export class PostsService {
  constructor(
    private readonly usersService: UsersService,
    private readonly tagsService: TagsService,
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
  ) {}

  public async findAll(userId: string) {
    return await this.postsRepository.find({
      relations: {
        metaOptions: true,
        author: true,
        tags: true,
      },
    });
  }

  public async create(createPostDto: CreatePostDto) {
    const user = await this.usersService.findOneById(createPostDto.authorId);
    const tags = await this.tagsService.getMultipleTagsById(createPostDto.tags);

    const post = this.postsRepository.create({
      ...createPostDto,
      author: user,
      tags,
    });

    return await this.postsRepository.save(post);
  }

  public async update(patchPostDto: PatchPostDto) {
    const tags = await this.tagsService.getMultipleTagsById(patchPostDto.tags);
    const post = await this.postsRepository.findOneBy({
      id: patchPostDto.id,
    });

    post.title = patchPostDto.title ?? post.title;
    post.content = patchPostDto.content ?? post.content;
    post.status = patchPostDto.status ?? post.status;
    post.postType = patchPostDto.postType ?? post.postType;
    post.slug = patchPostDto.slug ?? post.slug;
    post.featuredImageUrl =
      patchPostDto.featuredImageUrl ?? post.featuredImageUrl;
    post.publishOn = patchPostDto.publishOn ?? post.publishOn;
    post.tags = tags;

    return await this.postsRepository.save(post);
  }

  public async delete(postId: number) {
    await this.postsRepository.delete(postId);

    return {
      deleted: true,
      id: postId,
    };
  }
}
