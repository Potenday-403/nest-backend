import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { SignUpReqDto } from './dtos/req/sign-up-req.dto';
import { LoginReqDto } from './dtos/req/login-req.dto';
import { GetUserId } from 'src/shared/decorators/getUserId';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard)
  async signUp(@GetUserId() id: number, @Body() signUpReqDto: SignUpReqDto) {
    await this.authService.updateUserPersonalInfo({ id, signUpReqDto });
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginReqDto: LoginReqDto) {
    await this.authService.login(loginReqDto);
  }
}
