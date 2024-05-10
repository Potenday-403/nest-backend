import { IsNotEmpty, IsString, isNotEmpty } from 'class-validator';

export class GetGreetingsByCategoryReqDto {
  @IsNotEmpty()
  @IsString()
  relationship: string;

  @IsNotEmpty()
  @IsString()
  eventType: string;
}
