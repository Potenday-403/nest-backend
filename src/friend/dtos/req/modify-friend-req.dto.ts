import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class ModifyFriendReqDto {
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
