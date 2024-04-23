import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) {}

    @Post("/signup")
    @HttpCode(HttpStatus.OK)
    @UseGuards(JwtAuthGuard)
    async signUp(@Body() signUpReqDto: )
}
