import { Controller, Get, HttpCode, HttpStatus, Query, ValidationPipe } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { PostsPageOptionsDto } from './dto/posts-page-options.dto';
import { PageDto } from '../../common/dto/page.dto';
import { PostDto } from './dto/post.dto';
import { PostService } from './post.service';
import { UUIDParam } from '../../decorators/http.decorators';
import { UserDto } from '../user/dto/user-dto';

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
}
