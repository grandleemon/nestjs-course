import { Injectable } from "@nestjs/common";
import { UsersService } from "../../users/providers/users.service";

@Injectable()
export class PostsService {
  constructor(private readonly usersService: UsersService) {}

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
}
