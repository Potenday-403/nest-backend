import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { EventService } from './event.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { GetUserId } from 'src/shared/decorators/getUserId';
import { CreateEventReqDto } from './dtos/req/create-event-req.dto';

@Controller('events')
export class EventController {
  constructor(private eventService: EventService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard)
  async createEvent(
    @GetUserId() id: number,
    createEventReqDto: CreateEventReqDto,
  ) {
    await this.eventService.createEvent({ userId: id, createEventReqDto });
  }
}
