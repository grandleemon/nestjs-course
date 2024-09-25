import {
  BadRequestException,
  Injectable,
  RequestTimeoutException,
} from "@nestjs/common";
import { UsersService } from "../../users/providers/users.service";
import { CreatePostDto } from "../dtos/create-post.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Post } from "../post.entity";
import { TagsService } from "../../tags/providers/tags.service";
import { PatchPostDto } from "../dtos/patch-post.dto";
import { GetPostsDto } from "../dtos/get-posts.dto";
import { PaginationProvider } from "../../common/pagination/providers/pagination.provider";
import { Paginated } from "../../common/pagination/interfaces/paginated.interface";

@Injectable()
export class PostsService {
  constructor(
    private readonly usersService: UsersService,
    private readonly tagsService: TagsService,
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
    private readonly paginationProvider: PaginationProvider,
  ) {}

  public async findAll(
    userId: string,
    postQuery: GetPostsDto,
  ): Promise<Paginated<Post>> {
    const { limit, page } = postQuery;

    return await this.paginationProvider.paginateQuery(
      { page, limit },
      this.postsRepository,
    );
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
    let tags = undefined;
    let post = undefined;

    try {
      tags = await this.tagsService.getMultipleTagsById(patchPostDto.tags);
    } catch (e) {
      throw new RequestTimeoutException(
        "Unable to process your request at the moment please try later",
        { description: "Error connecting to the database" },
      );
    }

    if (!tags || tags.length !== patchPostDto.tags.length) {
      throw new BadRequestException(
        "Please check your tags Ids and ensure they are correct",
      );
    }

    try {
      post = await this.postsRepository.findOneBy({
        id: patchPostDto.id,
      });
    } catch (e) {
      throw new RequestTimeoutException(
        "Unable to process your request at the moment please try later",
        { description: "Error connecting to the database" },
      );
    }

    if (!post) {
      throw new BadRequestException("The post ID does not exist");
    }

    post.title = patchPostDto.title ?? post.title;
    post.content = patchPostDto.content ?? post.content;
    post.status = patchPostDto.status ?? post.status;
    post.postType = patchPostDto.postType ?? post.postType;
    post.slug = patchPostDto.slug ?? post.slug;
    post.featuredImageUrl =
      patchPostDto.featuredImageUrl ?? post.featuredImageUrl;
    post.publishOn = patchPostDto.publishOn ?? post.publishOn;
    post.tags = tags;

    try {
      await this.postsRepository.save(post);
    } catch (e) {
      throw new RequestTimeoutException(
        "Unable to process your request at the moment please try later",
        { description: "Error connecting to the database" },
      );
    }

    return post;
  }

  public async delete(postId: number) {
    await this.postsRepository.delete(postId);

    return {
      deleted: true,
      id: postId,
    };
  }
}
