import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { EventService } from '../event.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { GetUserId } from 'src/shared/decorators/getUserId';
import { CreateEventReqDto } from '../dtos/req/create-event-req.dto';
import { ModifyEventReqDto } from '../dtos/req/modify-event-req.dto';

@Controller('events')
export class EventController {
  constructor(private eventService: EventService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard)
  async createEvent(
    @GetUserId() id: number,
    @Body() createEventReqDto: CreateEventReqDto,
  ) {
    await this.eventService.createEvent({ userId: id, createEventReqDto });
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  async modifyEvent(
    @Param('id') eventId: number,
    @Body() modifyEventReqDto: ModifyEventReqDto,
  ) {
    await this.eventService.modifyEvent({ eventId, modifyEventReqDto });
  }

  @Delete()
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  async deleteEvent(@Body() ids: number[]) {
    await this.eventService.deleteEvents(ids);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  async getEvent(@Param('id') eventId: number) {
    return this.eventService.getEvent(eventId);
  }

  @Get('reminder')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  async getRemindList(@GetUserId() userId: number, @Query('date') date: Date) {
    return this.eventService.getRemindList({ userId, date });
  }

  @Get('calender')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  async getCalender(
    @GetUserId() userId: number,
    @Query('year') year: number,
    @Query('month') month: number,
  ) {
    return this.eventService.getCalender({ userId, year, month });
  }
}
