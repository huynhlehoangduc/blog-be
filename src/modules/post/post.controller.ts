import { Body, Controller, Get, HttpCode, HttpStatus, Post, Query, ValidationPipe } from '@nestjs/common';
import { ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';

import { PageDto } from '../../common/dto/page.dto';
import { UUIDParam } from '../../decorators/http.decorators';
import { UserDto } from '../user/dto/user-dto';
import { PostDto } from './dto/post.dto';
import { PostsPageOptionsDto } from './dto/posts-page-options.dto';
import { PostService } from './post.service';

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
    description: 'Successfully Registered',
  })
  async createPost(@Body() postDto: PostDto): Promise<PostDto> {
    const createPost = await this.postService.createPost(postDto);
    return createPost.toDto<typeof PostDto>();
  }
}
