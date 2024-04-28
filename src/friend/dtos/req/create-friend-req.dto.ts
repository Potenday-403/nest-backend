import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateFriendReqDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsNumber()
  age: number;

  @IsNotEmpty()
  @IsString()
  gender: string;

  @IsNotEmpty()
  @IsString()
  relationship: string;
}
