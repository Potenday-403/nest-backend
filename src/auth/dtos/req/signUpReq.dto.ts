import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class SignUpReqDto {
  @IsNotEmpty()
  @IsNumber()
  age: number;

  @IsNotEmpty()
  @IsString()
  gender: string;

  @IsNotEmpty()
  @IsString()
  occupation: string;
}
