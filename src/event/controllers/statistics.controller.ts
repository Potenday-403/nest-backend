import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Query,
  UseGuards,
} from '@nestjs/common';
import { EventService } from '../event.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { GetUserId } from 'src/shared/decorators/getUserId';

@Controller('statistics')
export class StatisticsController {
  constructor(private eventService: EventService) {}

  @Get('me')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  async getStatisticsByDate(
    @GetUserId() userId: number,
    @Query('year') year: number,
    @Query('month') month: number,
  ) {
    return this.eventService.getStatisticsByDate({ userId, year, month });
  }
}
