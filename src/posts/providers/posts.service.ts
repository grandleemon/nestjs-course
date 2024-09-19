import { Injectable } from "@nestjs/common";
import { UsersService } from "../../users/providers/users.service";
import { CreatePostDto } from "../dtos/create-post.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Post } from "../post.entity";
import { MetaOptionsService } from "../../meta-options/providers/meta-options.service";

@Injectable()
export class PostsService {
  constructor(
    private readonly usersService: UsersService,
    private readonly metaOptionsService: MetaOptionsService,
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

  public async delete(postId: number) {
    const post = await this.postsRepository.findOneBy({
      id: postId,
    });

    await this.postsRepository.delete(postId);

    await this.metaOptionsService.delete(post.metaOptions.id);

    return {
      deleted: true,
      id: postId,
    };
  }
}
