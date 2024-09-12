import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";

@Controller("users")
export class UsersController {
  @Get(":id")
  public getUsers(@Param("id") id: string, @Query() query: any) {
    console.log(id);
    console.log(query);
    return "getUsers";
  }

  @Post()
  public createUser(@Body() body: any) {
    console.log(body);
    return "createUser";
  }
}
