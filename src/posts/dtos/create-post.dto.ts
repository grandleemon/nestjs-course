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
  ValidateNested,
} from "class-validator";
import { CreatePostMetaOptionsDto } from "./create-post-meta-options.dto";
import { Type } from "class-transformer";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreatePostDto {
  @ApiProperty({
    minLength: 4,
    description: "The title of the blog post",
    example: "Title",
  })
  @IsString()
  @MinLength(4)
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    enum: POST_TYPE,
  })
  @IsEnum(POST_TYPE)
  @IsNotEmpty()
  postType: POST_TYPE;

  @ApiProperty({
    example: "my-url",
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message:
      'A slug should be all small letters and uses only "-" and without spaces. For example "my-url"',
  })
  slug: string;

  @ApiProperty({
    enum: POST_STATUS,
  })
  @IsEnum(POST_STATUS)
  @IsNotEmpty()
  status: POST_STATUS;

  @ApiPropertyOptional({
    example: "content of the post",
  })
  @IsString()
  @IsOptional()
  content?: string;

  @ApiPropertyOptional({
    description:
      "Serialize your JSON object or a validation error will be thrown",
    example: '{"json":"value"}',
  })
  @IsString()
  @IsOptional()
  @IsJSON()
  schema?: string;

  @ApiPropertyOptional({
    description: "A url path to your image",
    example: "http://example.com/images/image-1.png",
  })
  @IsUrl()
  @IsOptional()
  featuredImageUrl?: string;

  @ApiPropertyOptional({
    description: "The date of publishing of the blog post",
    example: "2024-09-17T06:38:47.910Z",
  })
  @IsISO8601()
  @IsOptional()
  publishOn?: Date;

  @ApiPropertyOptional({
    description: "Array of tags passed as array of string values",
    example: ["tag1", "tag2"],
  })
  @IsOptional()
  @IsArray()
  @IsString({
    each: true,
  })
  @MinLength(3, {
    each: true,
  })
  tags?: string[];

  @ApiPropertyOptional({
    type: "array",
    required: false,
    items: {
      type: "object",
      properties: {
        key: {
          type: "string",
          description:
            "The key can be any string identifier for your meta option",
          example: "test-key",
        },
        value: {
          type: "any",
          description: "Any value you want to save to the key",
          example: true,
        },
      },
    },
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreatePostMetaOptionsDto)
  metaOptions?: CreatePostMetaOptionsDto[];
}
