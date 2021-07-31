import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UploadedFile,
} from '@nestjs/common';

import { IFile } from '../../interfaces';
import { FileManagementService } from './file-management.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ApiFile } from '../../decorators/swagger.schema';
import type { ManagedUpload } from 'aws-sdk/lib/s3/managed_upload';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Controller('file-management')
@ApiTags('file-management')
export class FileManagementController {
  constructor(private readonly fileManagementService: FileManagementService) {}

  @Post('post-img-s3')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'Post img success' })
  @ApiFile({ name: 'file' })
  postImgS3(@UploadedFile() file: IFile): Observable<ManagedUpload.SendData> {
    return from(this.fileManagementService.postImgS3(file));
  }
}
