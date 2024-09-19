import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from "@nestjs/common";
import { PostsService } from "./providers/posts.service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreatePostDto } from "./dtos/create-post.dto";
import { PatchPostDto } from "./dtos/patch-post.dto";

@Controller("posts")
@ApiTags("Posts")
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get(":userId?")
  public getPosts(@Param("userId") userId: string) {
    return this.postsService.findAll(userId);
  }

  @ApiOperation({
    summary: "Creates a new blog post",
  })
  @ApiResponse({
    status: 201,
    description: "Post created successfully",
  })
  @Post()
  public createPost(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  @ApiOperation({
    summary: "Updates an existing blog post",
  })
  @ApiResponse({
    status: 200,
    description: "Post updated successfully",
  })
  @Patch()
  public updatePost(@Body() patchPostDto: PatchPostDto) {
    console.log(patchPostDto);
  }

  @Delete(":postId")
  public deletePost(@Param("postId", ParseIntPipe) postId: number) {
    return this.postsService.delete(postId);
  }
}
