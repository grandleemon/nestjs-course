import { Injectable } from "@nestjs/common";
import { UsersService } from "../../users/providers/users.service";
import { CreatePostDto } from "../dtos/create-post.dto";
import { MetaOptionsService } from "../../meta-options/providers/meta-options.service";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Post } from "../post.entity";

@Injectable()
export class PostsService {
  constructor(
    private readonly usersService: UsersService,
    private readonly metaOptionsService: MetaOptionsService,
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
  ) {}

  public findAll(userId: string) {
    const user = this.usersService.findOneById(userId);

    return [
      {
        user,
        title: "Title1",
        content: "Content2",
      },
      {
        user,
        title: "Title1",
        content: "Content2",
      },
    ];
  }

  public async create(createPostDto: CreatePostDto) {
    const metaOption = createPostDto.metaOptions
      ? await this.metaOptionsService.create(createPostDto.metaOptions)
      : null;

    const post = this.postsRepository.create(createPostDto);

    if (metaOption) {
      post.metaOptions = metaOption;
    }

    return await this.postsRepository.save(post);
  }
}
