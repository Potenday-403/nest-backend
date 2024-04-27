import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { GetKakaoTokenResDto } from './dtos/get-kakao-token-res.dto';

@Injectable()
export class KakaoService {
  constructor(private configService: ConfigService) {}

  async getKakaoToken(authorizationCode: string): Promise<GetKakaoTokenResDto> {
    const requestBody = {
      grant_type: 'authorization_code',
      client_id: this.configService.get<string>('kakao.clientId'),
      redirect_uri: this.configService.get<string>('kakao.redirectedUri'),
      code: authorizationCode,
    };
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    };
    const url = this.configService.get<string>('kakao.generateTokenUri');

    const response = await axios
      .post(url, requestBody, { headers })
      .then((res) => res.data)
      .catch((err) => {
        throw new HttpException(
          'Error occured during request kakao api, ' + err,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      });

    return response;
  }
}
