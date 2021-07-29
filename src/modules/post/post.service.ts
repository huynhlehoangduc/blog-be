import { Injectable } from '@nestjs/common';
import { PostRepository } from './post.repository';
import { ValidatorService } from '../../shared/services/validator.service';
import { AwsS3Service } from '../../shared/services/aws-s3.service';
import { FindConditions } from 'typeorm';
import { PostEntity } from './post.entity';
import { PostDto } from './dto/post.dto';
import { PostsPageOptionsDto } from './dto/posts-page-options.dto';
import { PageDto } from '../../common/dto/page.dto';

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

  async createPost(postDto: PostDto): Promise<PostEntity> {
    const post = this.postRepository.create(postDto);
    return this.postRepository.save(post);
  }

  /*async updateUser(id: string, postDto: PostDto): Promise<PostEntity> {
    return this.postRepository.update(id, postDto);
  }*/

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
