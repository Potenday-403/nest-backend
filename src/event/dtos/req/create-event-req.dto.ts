import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateEventReqDto {
  @IsOptional()
  @IsNumber()
  friendId: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  type: string;

  @IsNotEmpty()
  @IsString()
  scheduledAt: Date;

  @IsNotEmpty()
  @IsString()
  priority: string;
}
