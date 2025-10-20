import { IsNumber, IsOptional, IsString, Matches } from "class-validator"

export class hotelSearchDto {
    @IsString()
  @IsOptional()
  location?: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsNumber()
  @IsOptional()
  rating?: number;

  @IsNumber()
  @IsOptional()
  pricePerNight?: number;

  @IsOptional()
  @IsString()
  checkInEndTime?: string;
} 