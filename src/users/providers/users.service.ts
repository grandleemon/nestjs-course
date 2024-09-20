import { Inject, Injectable } from "@nestjs/common";
import { GetUsersParamDto } from "../dtos/get-users-param.dto";
import { Repository } from "typeorm";
import { User } from "../user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUserDto } from "../dtos/create-user.dto";
import { ConfigType } from "@nestjs/config";
import profileConfig from "../config/profile.config";

/**
 * Class to connect to Users table and perform business operations
 */
@Injectable()
export class UsersService {
  /**
   * Injecting usersRepository
   */
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @Inject(profileConfig.KEY)
    private readonly profileConfiguration: ConfigType<typeof profileConfig>,
  ) {}

  public async createUser(createUserDto: CreateUserDto) {
    const existingUser = await this.usersRepository.findOne({
      where: {
        email: createUserDto.email,
      },
    });
    if (existingUser) return;

    const newUser = this.usersRepository.create(createUserDto);

    return await this.usersRepository.save(newUser);
  }

  /**
   * The method to get all users from the database
   */
  public findAll(
    getUsersParamDto: GetUsersParamDto,
    limit: number,
    page: number,
  ) {
    console.log(this.profileConfiguration);
    return [
      { firstName: "Test1", email: "test@test.com" },
      {
        firstName: "Test2",
        email: "test@test.com",
      },
    ];
  }

  /**
   * The method to get one specific user by ID from the database
   */
  public async findOneById(id: number) {
    return await this.usersRepository.findOneBy({
      id,
    });
  }
}
