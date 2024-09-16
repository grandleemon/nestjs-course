import { POST_TYPE } from "../enums/postType.enum";
import { POST_STATUS } from "../enums/postStatus.enum";
import {
  IsArray,
  IsEnum,
  IsISO8601,
  IsJSON,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Matches,
  MinLength,
} from "class-validator";

interface MetaOption {
  key: string;
  value: string;
}

export class CreatePostDto {
  @IsString()
  @MinLength(4)
  @IsNotEmpty()
  title: string;

  @IsEnum(POST_TYPE)
  @IsNotEmpty()
  postType: POST_TYPE;

  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message:
      'A slug should be all small letters and uses only "-" and without spaces. For example "my-url"',
  })
  slug: string;

  @IsEnum(POST_STATUS)
  @IsNotEmpty()
  status: POST_STATUS;

  @IsString()
  @IsOptional()
  content?: string;

  @IsString()
  @IsOptional()
  @IsJSON()
  schema?: string;

  @IsUrl()
  @IsOptional()
  featuredImageUrl?: string;

  @IsISO8601()
  @IsOptional()
  publishOn?: Date;

  @IsOptional()
  @IsArray()
  @IsString({
    each: true,
  })
  @MinLength(3, {
    each: true,
  })
  tags?: string[];

  metaOptions: MetaOption[];
}
