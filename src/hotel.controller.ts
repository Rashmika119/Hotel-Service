import { Body, Controller, Delete, Get, Logger, Param, Post, Put, Query } from '@nestjs/common';
import { HotelService } from './hotel.service';
import type { hotelSearchDto } from './DTO/hotelSearch.dto';
import type { hotelUpdateDto } from './DTO/hotelUpdate.dto';
import { hotelCreateDTO } from './DTO/hotelCreate.dto';

@Controller('hotel')
export class HotelController {
  private readonly logger = new Logger(HotelController.name);
  constructor(private readonly hotelService: HotelService) { }

  @Get()
  async getAllHotels(@Query() param: hotelSearchDto) {

    this.logger.log(`GET /hotel called with query: ${JSON.stringify(param)}`);
    if (Object.keys(param).length) {
      return this.hotelService.hotelSearch(param);
    } else {
      return this.hotelService.getAllHotels();
    }

  }

  @Post()
  async createHotel(@Body() dto:hotelCreateDTO) {
    const {name,location,rating,pricePerNight,checkInEndTime}=dto
    this.logger.debug(`POST /hotel called to create hotel: ${name} at ${location}`);
    return this.hotelService.createHotel(name, location, rating, pricePerNight, checkInEndTime)
  }

  @Get('/:id')
  async getHotelById(@Param() id: string) {
    this.logger.log(`GET /hotel/${id} called`);
    return this.hotelService.getHotelById(id);
  }

  @Put('/:id')
  async updateHotel(
    @Param() id: string,
    @Body() updatedData: hotelUpdateDto
  ) {
    this.logger.debug(`PUT /hotel/${id} called with data: ${JSON.stringify(updatedData)}`);
    return this.hotelService.updateHotel(id, updatedData);
  }

  @Delete('/:id')
  async deleteHotel(
    @Param() id: string
  ) {
    this.logger.warn(`DELETE /hotel/${id} called`);
    this.hotelService.deleteHotel(id)
  }
}

