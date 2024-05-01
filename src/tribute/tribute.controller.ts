import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { TributeService } from './tribute.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ModifyTributeReqDto } from './dtos/req/modify-tribute-req.dto';
import { CreateTributeReqDto } from './dtos/req/create-tribute-req.dto';

@Controller('tribute')
export class TributeController {
  constructor(private tributeService: TributeService) {}

  @Put(':tributeId')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  async modifyTribute(
    @Param('tributeId') tributeId: number,
    @Body() modifyTributeReqDto: ModifyTributeReqDto,
  ) {
    return this.tributeService.modifyTribute({
      tributeId,
      modifyTributeReqDto,
    });
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard)
  async createTribute(@Body() createTributeReqDto: CreateTributeReqDto) {
    return this.tributeService.createTribute(createTributeReqDto);
  }
}
