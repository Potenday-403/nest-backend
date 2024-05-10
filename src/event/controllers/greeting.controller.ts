import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Put,
  UseGuards,
} from '@nestjs/common';
import { EventService } from '../event.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { GetGreetingsByCategoryReqDto } from '../dtos/req/get-greetings-by-category.dto';

@Controller('greetings')
export class GreetingController {
  constructor(private eventService: EventService) {}

  @Put('category')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  async getGreetingsByCategories(
    @Body() getGreetingsByCategoryReqDto: GetGreetingsByCategoryReqDto,
  ) {
    return this.eventService.getGreetingsByCategories(
      getGreetingsByCategoryReqDto,
    );
  }
}
