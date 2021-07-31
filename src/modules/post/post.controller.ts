import { Body, Controller, Delete, Get, HttpCode, HttpStatus, NotFoundException, Post, Put, Query, ValidationPipe } from '@nestjs/common';
import { ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';

import { PageDto } from '../../common/dto/page.dto';
import { UUIDParam } from '../../decorators/http.decorators';
import { UserDto } from '../user/dto/user-dto';
import { PostDto } from './dto/post.dto';
import { PostFormDto } from './dto/post-form.dto';
import { PostsPageOptionsDto } from './dto/posts-page-options.dto';
import { PostService } from './post.service';
import { UpdateResult } from 'typeorm/query-builder/result/UpdateResult';

@Controller('posts')
@ApiTags('posts')
export class PostController {
  constructor(private postService: PostService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get post list',
    type: PageDto,
  })
  getPosts(
    @Query(new ValidationPipe({ transform: true }))
    pageOptionsDto: PostsPageOptionsDto,
  ): Promise<PageDto<PostDto>> {
    return this.postService.getPosts(pageOptionsDto);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get users list',
    type: UserDto,
  })
  getPost(@UUIDParam('id') id: string): Promise<PostDto> {
    return this.postService.getPost(id);
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: PostDto,
    description: 'Create post',
  })
  async createPost(@Body() postFormDto: PostFormDto): Promise<PostDto> {
    const createPost = await this.postService.createPost(postFormDto);
    return createPost.toDto<typeof PostDto>();
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: PostDto,
    description: 'Update post',
  })
  async updatePost(@UUIDParam('id') id: string, @Body() postFormDto: PostFormDto): Promise<PostDto> {
    return this.postService.updatePost(id, postFormDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Delete post',
  })
  async deletePost(@UUIDParam('id') id: string): Promise<unknown> {
    return this.postService.deletePost(id);
}
}
