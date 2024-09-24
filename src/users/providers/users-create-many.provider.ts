import {
  ConflictException,
  Injectable,
  RequestTimeoutException,
} from "@nestjs/common";
import { User } from "../user.entity";
import { DataSource } from "typeorm";
import { CreateManyUsersDto } from "../dtos/create-many-users.dto";

@Injectable()
export class UsersCreateManyProvider {
  constructor(private readonly dataSource: DataSource) {}

  public async createMany(createManyUsersDto: CreateManyUsersDto) {
    const newUsers: User[] = [];
    let queryRunner = undefined;

    try {
      queryRunner = this.dataSource.createQueryRunner();
      await queryRunner.connect();
      await queryRunner.startTransaction();
    } catch (e) {
      throw new RequestTimeoutException("Could not connect to the database");
    }

    try {
      for (const user of createManyUsersDto.users) {
        const newUser = queryRunner.manager.create(User, user);
        const result = await queryRunner.manager.save(newUser);
        newUsers.push(result);
      }

      await queryRunner.commitTransaction();
    } catch (e) {
      await queryRunner.rollbackTransaction();
      throw new ConflictException("Could not complete the transaction", {
        description: String(e),
      });
    } finally {
      try {
        await queryRunner.release();
      } catch (e) {
        throw new RequestTimeoutException("Could not release the connection", {
          description: String(e),
        });
      }
    }

    return {
      users: newUsers,
    };
  }
}
