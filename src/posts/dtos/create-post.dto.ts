import { POST_TYPE } from "../enums/postType.enum";
import { STATUS } from "../enums/postStatus.enum";

interface MetaOption {
  key: string;
  value: string;
}

export class CreatePostDto {
  title: string;
  postType: POST_TYPE;
  slug: string;
  status: STATUS;
  content?: string;
  schema?: string;
  featuredImageUrl?: string;
  publishOn: Date;
  tags: string[];
  metaOptions: MetaOption[];
}
