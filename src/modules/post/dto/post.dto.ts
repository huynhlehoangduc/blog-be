import { ApiPropertyOptional } from '@nestjs/swagger';

import { AbstractDto } from '../../../common/dto/abstract.dto';
import type { PostEntity } from '../post.entity';

export class PostDto extends AbstractDto {
  @ApiPropertyOptional()
  title: string;

  @ApiPropertyOptional()
  content: string;

  @ApiPropertyOptional()
  publish: boolean;

  @ApiPropertyOptional()
  author: number;

  @ApiPropertyOptional()
  minutesRead: number;

  @ApiPropertyOptional()
  thumbnail: string;

  constructor(post: PostEntity) {
    super(post);
    this.title = post.title;
    this.content = post.content;
    this.publish = post.publish;
    this.author = post.author;
    this.minutesRead = post.minutesRead;
    this.thumbnail = post.thumbnail;
  }
}
