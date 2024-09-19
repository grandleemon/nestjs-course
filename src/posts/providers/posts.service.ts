import { Injectable } from "@nestjs/common";
import { UsersService } from "../../users/providers/users.service";
import { CreatePostDto } from "../dtos/create-post.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Post } from "../post.entity";

@Injectable()
export class PostsService {
  constructor(
    private readonly usersService: UsersService,
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
    const post = this.postsRepository.create(createPostDto);

    return await this.postsRepository.save(post);
  }
}
