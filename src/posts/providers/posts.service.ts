import { Injectable } from "@nestjs/common";

@Injectable()
export class PostsService {
  public findAll(userId: string) {
    return [
      {
        title: "Title1",
        content: "Content2",
      },
      {
        title: "Title1",
        content: "Content2",
      },
    ];
  }
}
