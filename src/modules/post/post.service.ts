import { Injectable, NotFoundException } from '@nestjs/common';
import type { FindConditions } from 'typeorm';
import type { UpdateResult } from 'typeorm/query-builder/result/UpdateResult';

import type { PageDto } from '../../common/dto/page.dto';
import { AwsS3Service } from '../../shared/services/aws-s3.service';
import { ValidatorService } from '../../shared/services/validator.service';
import type { PostDto } from './dto/post.dto';
import type { PostFormDto } from './dto/post-form.dto';
import type { PostsPageOptionsDto } from './dto/posts-page-options.dto';
import type { PostEntity } from './post.entity';
import { PostRepository } from './post.repository';

@Injectable()
export class PostService {
  constructor(
    public readonly postRepository: PostRepository,
    public readonly validatorService: ValidatorService,
    public readonly awsS3Service: AwsS3Service,
  ) {}

  /**
   * Find single post
   * @param findData
   * @return Promise<PostEntity>
   */
  findOne(findData: FindConditions<PostEntity>): Promise<PostEntity> {
    return this.postRepository.findOne(findData);
  }

  async createPost(postFormDto: PostFormDto): Promise<PostEntity> {
    const post = this.postRepository.create(postFormDto);
    return this.postRepository.save(post);
  }

  async updatePost(id: string, postFormDto: PostFormDto): Promise<PostDto> {
    const post = await this.findOne({ id });
    if (!post) {
      throw new NotFoundException();
    }
    return this.postRepository.save({ ...post, ...postFormDto });
  }

  async getPosts(
    pageOptionsDto: PostsPageOptionsDto,
  ): Promise<PageDto<PostDto>> {
    const queryBuilder = this.postRepository.createQueryBuilder('post');
    const { items, pageMetaDto } = await queryBuilder.paginate(pageOptionsDto);

    return items.toPageDto(pageMetaDto);
  }

  async getPost(id: string): Promise<PostDto> {
    const queryBuilder = this.postRepository.createQueryBuilder('post');

    queryBuilder.where('post.id = :id', { id });

    const postEntity = await queryBuilder.getOne();

    return postEntity.toDto();
  }
}
