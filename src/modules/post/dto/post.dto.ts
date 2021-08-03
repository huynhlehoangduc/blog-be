import { ApiPropertyOptional } from '@nestjs/swagger';

import { AbstractDto } from '../../../common/dto/abstract.dto';
import type { PostEntity } from '../post.entity';
import { IsBoolean, IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class PostDto extends AbstractDto {
  @ApiPropertyOptional()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiPropertyOptional()
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiPropertyOptional()
  @IsBoolean()
  publish: boolean;

  @ApiPropertyOptional()
  @IsDate()
  publishAt: Date;

  @ApiPropertyOptional()
  @IsString()
  author: string;

  @ApiPropertyOptional()
  @IsString()
  description: string;

  @ApiPropertyOptional()
  @IsNumber()
  minutesRead: number;

  @ApiPropertyOptional()
  @IsString()
  thumbnail: string;

  constructor(post: PostEntity) {
    super(post);
    this.title = post.title;
    this.content = post.content;
    this.publish = post.publish;
    this.author = post.author;
    this.minutesRead = post.minutesRead;
    this.thumbnail = post.thumbnail;
    this.description = post.description;
  }
}
