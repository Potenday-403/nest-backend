import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SignUpReqDto } from './dtos/req/sign-up-req.dto';
import { UserRepository } from './repositories/user.repository';
import { LoginReqDto } from './dtos/req/login-req.dto';
import { KakaoService } from 'src/externals/kakao/kakao.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private kakaoService: KakaoService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async updateUserPersonalInfo(props: {
    id: number;
    signUpReqDto: SignUpReqDto;
  }) {
    const { id, signUpReqDto } = props;
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new HttpException('Cannot find user.', HttpStatus.NOT_FOUND);
    }

    await this.userRepository.updateUserPersonalInfo({ id, ...signUpReqDto });
  }

  async login(loginReqDto: LoginReqDto) {
    const { authorizationCode } = loginReqDto;
    let isNewUser = false;
    const tokenResponse =
      await this.kakaoService.getKakaoToken(authorizationCode);
    const { sub: socialId } = JSON.parse(
      Buffer.from(tokenResponse.id_token, 'base64').toString('binary'),
    );

    const user = await this.userRepository.getUserBySocialId(socialId);

    if (!user) {
      isNewUser = true;
      const newUser = await this.userRepository.createUser(socialId);

      return {
        isNewUser,
        accessToken: this.getAuthToken(newUser.id),
      };
    }

    return {
      isNewUser,
      accessToken: this.getAuthToken(user.id),
    };
  }

  getAuthToken(id: number) {
    const accessToken = this.jwtService.sign(
      { sub: id },
      { expiresIn: this.configService.get('jwt.accessExp') },
    );

    return accessToken;
  }
}
