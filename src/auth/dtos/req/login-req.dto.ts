import { IsNotEmpty, IsString } from 'class-validator';

export class LoginReqDto {
  @IsNotEmpty()
  @IsString()
  authorizationCode: string;
}
