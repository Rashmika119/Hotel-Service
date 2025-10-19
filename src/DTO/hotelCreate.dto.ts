import { IsNumber, IsString, Matches } from "class-validator";

export class hotelCreateDTO {

    @IsString()
    name: string;

    @IsString()
    location: string;

    @IsNumber()
    rating!: number;

    @IsNumber()
    pricePerNight!: number;

    @IsString()
    @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, { message: 'checkInEndTime must be in HH:mm format' })
    checkInEndTime!: string;

}
