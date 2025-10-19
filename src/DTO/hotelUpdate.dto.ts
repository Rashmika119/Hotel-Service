import { IsOptional, IsString } from "class-validator"

export class hotelUpdateDto{
   
    @IsString()
    @IsOptional()
    location?: string

    @IsString()
    @IsOptional()
    rating?: number

    @IsString()
    @IsOptional()
    pricePerNight?: number

    @IsString()
    @IsOptional()
    checkInEndTime?: string
}