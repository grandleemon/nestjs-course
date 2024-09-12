import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from "@nestjs/common";

@Controller("users")
export class UsersController {
  @Get(":id?")
  public getUsers(
    @Param("id", ParseIntPipe) id: number | undefined,
    @Query("limit", new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query("page", new DefaultValuePipe(1), ParseIntPipe) page: number,
  ) {
    console.log(id);
    console.log(limit);
    console.log(page);
    return "getUsers";
  }

  @Post()
  public createUser(@Body() body: any) {
    console.log(body);
    return "createUser";
  }
}
