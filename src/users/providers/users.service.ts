import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { GetUsersParamDto } from "../dtos/get-users-param.dto";
import { AuthService } from "../../auth/providers/auth.service";

@Injectable()
export class UsersService {
  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  public findAll(
    getUsersParamDto: GetUsersParamDto,
    limit: number,
    page: number,
  ) {
    const isAuth = this.authService.isAuth();
    console.log(isAuth);

    return [
      { firstName: "Test1", email: "test@test.com" },
      {
        firstName: "Test2",
        email: "test@test.com",
      },
    ];
  }

  public findOneById(id: string) {
    return {
      id: 2,
      firstName: "Test2",
      email: "test@test.com",
    };
  }
}
