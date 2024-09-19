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

  public async findAll(userId: string) {
    return await this.postsRepository.find();
  }

  public async create(createPostDto: CreatePostDto) {
    const user = await this.usersService.findOneById(createPostDto.authorId);
    const post = this.postsRepository.create(createPostDto);

    if (user) {
      post.author = user;
    } else {
      return `User with id ${createPostDto.authorId} does not exist`;
    }

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
