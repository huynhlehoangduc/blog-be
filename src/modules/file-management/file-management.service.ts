import { Injectable } from '@nestjs/common';
import type { ManagedUpload } from 'aws-sdk/lib/s3/managed_upload';

import { FileNotImageException } from '../../exceptions/file-not-image.exception';
import type { IFile } from '../../interfaces';
import { AwsS3Service } from '../../shared/services/aws-s3.service';
import { ValidatorService } from '../../shared/services/validator.service';

@Injectable()
export class FileManagementService {
  constructor(
    private readonly awsS3Service: AwsS3Service,
    private readonly validatorService: ValidatorService,
  ) {}

  postImgS3(file: IFile): Promise<ManagedUpload.SendData> {
    if (file && !this.validatorService.isImage(file.mimetype)) {
      throw new FileNotImageException();
    }
    return this.awsS3Service.uploadImageGetUrl(file);
  }
}
