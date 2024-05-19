import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateTributeReqDto {
  @IsNotEmpty()
  @IsNumber()
  friendId: number;

  @IsNotEmpty()
  @IsString()
  eventType: string;

  @IsNotEmpty()
  @IsString()
  tributeName: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsBoolean()
  isReceived: boolean;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  date: Date;
}
