import { Inject, Injectable } from "@nestjs/common";
import { PaginationQueryDto } from "../dtos/pagination-query.dto";
import { ObjectLiteral, Repository } from "typeorm";
import { Paginated } from "../interfaces/paginated.interface";
import { Request } from "express";
import { REQUEST } from "@nestjs/core";

@Injectable()
export class PaginationProvider {
  constructor(
    @Inject(REQUEST)
    private readonly request: Request,
  ) {}

  public async paginateQuery<T extends ObjectLiteral>(
    paginationQueryDto: PaginationQueryDto,
    repository: Repository<T>,
  ): Promise<Paginated<T>> {
    const { page, limit } = paginationQueryDto;

    const results = await repository.find({
      take: limit,
      skip: (page - 1) * limit,
    });

    const baseUrl =
      this.request.protocol + "://" + this.request.headers.host + "/";
    const newUrl = new URL(this.request.url, baseUrl);

    const totalItems = await repository.count();
    const totalPages = Math.ceil(totalItems / limit);
    const nextPage = page === totalPages ? page : page + 1;
    const previousPage = page === 1 ? page : page - 1;

    return {
      data: results,
      links: {
        current: `${newUrl.origin}${newUrl.pathname}?limit=${limit}&page=${page}`,
        first: `${newUrl.origin}${newUrl.pathname}?limit=${limit}&page=1`,
        last: `${newUrl.origin}${newUrl.pathname}?limit=${limit}&page=${totalPages}`,
        next: `${newUrl.origin}${newUrl.pathname}?limit=${limit}&page=${nextPage}`,
        previous: `${newUrl.origin}${newUrl.pathname}?limit=${limit}&page=${previousPage}`,
      },
      meta: {
        currentPage: page,
        itemsPerPage: limit,
        totalItems,
        totalPages,
      },
    };
  }
}
