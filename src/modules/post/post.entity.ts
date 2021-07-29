import { Column, Entity } from 'typeorm';

import { AbstractEntity } from '../../common/abstract.entity';
import { PostDto } from './dto/post.dto';

@Entity({ name: 'post' })
export class PostEntity extends AbstractEntity<PostDto> {
  @Column({ nullable: true })
  title: string;

  @Column({ nullable: true })
  content: string;

  @Column({ nullable: true, type: 'boolean' })
  publish: boolean;

  @Column({ nullable: true, type: 'timestamp without time zone' })
  publishAt: Date;

  @Column({ nullable: true, type: 'uuid' })
  author: string;

  @Column({ nullable: true, type: 'integer' })
  minutesRead: number;

  @Column({ nullable: true })
  thumbnail: string;

  dtoClass = PostDto;
}
