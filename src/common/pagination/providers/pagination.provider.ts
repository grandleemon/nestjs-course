import { Injectable } from "@nestjs/common";
import { PaginationQueryDto } from "../dtos/pagination-query.dto";
import { ObjectLiteral, Repository } from "typeorm";

@Injectable()
export class PaginationProvider {
  public async paginateQuery<T extends ObjectLiteral>(
    paginationQueryDto: PaginationQueryDto,
    repository: Repository<T>,
  ) {
    const { page, limit } = paginationQueryDto;

    return await repository.find({
      take: limit,
      skip: (page - 1) * limit,
    });
  }
}
