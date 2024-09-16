import { Injectable } from "@nestjs/common";
import { GetUsersParamDto } from "../dtos/get-users-param.dto";

@Injectable()
export class UsersService {
  public findAll(
    getUsersParamDto: GetUsersParamDto,
    limit: number,
    page: number,
  ) {
    return [
      { firstName: "Test1", email: "test@test.com" },
      {
        firstName: "Test2",
        email: "test@test.com",
      },
    ];
  }

  public findIneById(id: number) {
    return {
      id: 2,
      firstName: "Test2",
      email: "test@test.com",
    };
  }
}
