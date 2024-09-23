import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  RequestTimeoutException,
} from "@nestjs/common";
import { GetUsersParamDto } from "../dtos/get-users-param.dto";
import { DataSource, Repository } from "typeorm";
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
    private readonly dataSource: DataSource,
  ) {}

  /**
   * The method to get all users from the database
   */
  public findAll(
    getUsersParamDto: GetUsersParamDto,
    limit: number,
    page: number,
  ) {
    throw new HttpException(
      {
        status: HttpStatus.MOVED_PERMANENTLY,
        error: "The API endpoint does not exist",
      },
      HttpStatus.MOVED_PERMANENTLY,
    );
  }

  /**
   * The method to get one specific user by ID from the database
   */
  public async findOneById(id: number) {
    let user = undefined;

    try {
      user = await this.usersRepository.findOneBy({
        id,
      });
    } catch (e) {
      throw new RequestTimeoutException(
        "Unable to process your request at the moment please try later",
        { description: "Error connecting to the database" },
      );
    }

    if (!user) {
      throw new BadRequestException(`The user does not exist`);
    }

    return user;
  }

  public async createUser(createUserDto: CreateUserDto) {
    let existingUser = undefined;

    try {
      existingUser = await this.usersRepository.findOne({
        where: {
          email: createUserDto.email,
        },
      });
    } catch (e) {
      throw new RequestTimeoutException(
        "Unable to process your request at the moment please try later",
        { description: "Error connecting to the database" },
      );
    }

    if (existingUser)
      throw new BadRequestException(
        "The user already exists, please check your email",
      );

    let newUser = this.usersRepository.create(createUserDto);

    try {
      newUser = await this.usersRepository.save(newUser);
    } catch (e) {
      throw new RequestTimeoutException(
        "Unable to process your request at the moment please try later",
        { description: "Error connecting to the database" },
      );
    }

    return newUser;
  }

  public async createMany(createUserDto: CreateUserDto[]) {
    const newUsers: User[] = [];

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      for (const user of createUserDto) {
        const newUser = queryRunner.manager.create(User, user);
        const result = await queryRunner.manager.save(newUser);
        newUsers.push(result);
      }

      await queryRunner.commitTransaction();
    } catch (e) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
