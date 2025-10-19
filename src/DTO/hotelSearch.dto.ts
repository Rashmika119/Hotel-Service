import { IsNumber, IsOptional, IsString, Matches } from "class-validator"

export class hotelSearchDto {
    @IsString()
    @IsOptional()
    name?: string

    @IsString()
    @IsOptional()
    location?: string

    @IsNumber()
    @IsOptional()
    rating?: number

    @IsNumber()
    @IsOptional()
    pricePerNight?: number

    @IsOptional()
    @Matches(/^([0-1]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, {
        message: 'checkInEndTime must be in HH:MM:SS format',
    })
    checkInEndTime?: string;
} 