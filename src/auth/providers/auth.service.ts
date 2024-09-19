import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { UsersService } from "../../users/providers/users.service";

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
  ) {}

  public login(email: string, password: string, id: string) {
    return "login";
  }

  public isAuth() {
    return true;
  }
}
