import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Trim } from '../../../decorators/transforms.decorator';

export class PostFormDto {
  @ApiPropertyOptional()
  @IsString()
  @IsNotEmpty()
  @Trim()
  title: string;

  @ApiPropertyOptional()
  @IsString()
  @IsNotEmpty()
  @Trim()
  content: string;

  @ApiPropertyOptional()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiPropertyOptional()
  @IsBoolean()
  publish: boolean;

  @ApiPropertyOptional()
  @IsNumber()
  minutesRead: number;

  @ApiPropertyOptional()
  @IsString()
  @Trim()
  thumbnail: string;
}
