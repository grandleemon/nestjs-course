import { Controller, Post } from "@nestjs/common";
import { AuthService } from "./providers/auth.service";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  public login() {
    return this.authService.login("", "", "");
  }
}
