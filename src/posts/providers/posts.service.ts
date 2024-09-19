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
    const post = this.postsRepository.create(createPostDto);

    return await this.postsRepository.save(post);
  }
}
