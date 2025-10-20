import { Body, Controller, Delete, Get, InternalServerErrorException, Logger, Param, Post, Put, Query } from '@nestjs/common';
import { HotelService } from './hotel.service';
import { hotelSearchDto} from './DTO/hotelSearch.dto';
import { hotelUpdateDto } from './DTO/hotelUpdate.dto';
import { hotelCreateDTO } from './DTO/hotelCreate.dto';

@Controller('hotel')
export class HotelController {
  private readonly logger = new Logger(HotelController.name);
  constructor(private readonly hotelService: HotelService) { }

  @Get()
  async getAllHotels(@Query() param: hotelSearchDto) {
    this.logger.log(`GET /hotel called with query: ${JSON.stringify(param)}`);
    try {
      if (Object.keys(param).length) {
        const flights = await this.hotelService.hotelSearch(param);
        this.logger.debug(`Found ${flights.length} flights matching query`);
        return flights;
      } else {
        return this.hotelService.getAllHotels();
      }
    } catch (error) {
      this.logger.error('Error fetching hotels', error.stack);
      throw new InternalServerErrorException('Failed to fetch hotels');
    }

  }

  @Post()
  async createHotel(@Body() dto: hotelCreateDTO) {
    const { name, location, rating, pricePerNight, checkInEndTime } = dto
    this.logger.debug(`POST /hotel called to create hotel: ${name} at ${location}`);
    try {
      return this.hotelService.createHotel(name, location, rating, pricePerNight, checkInEndTime)
    } catch (error) {
      this.logger.error('Error creating hotel', error.stack);
      throw new InternalServerErrorException('Failed to create hotel');
    }
  }

  @Get('/:id')
  async getHotelById(@Param() id: string) {
    this.logger.log(`GET /hotel/${id} called`);
    try {
      return this.hotelService.getHotelById(id);
    } catch (error) {
      this.logger.error(`Error fetching hotel with id ${id}`, error.stack);
      throw new InternalServerErrorException('Failed to fetch hotel');
    }
  }

  @Put('/:id')
  async updateHotel(
    @Param() id: string,
    @Body() updatedData: hotelUpdateDto
  ) {
    this.logger.debug(`PUT /hotel/${id} called with data: ${JSON.stringify(updatedData)}`);
    try {
      return this.hotelService.updateHotel(id, updatedData);
    } catch (error) {
      this.logger.error(`Error updating hotel with id ${id}`, error.stack);
      throw new InternalServerErrorException('Failed to update hotel');
    }
  }

  @Delete('/:id')
  async deleteHotel(@Param('id') id: string) {
    this.logger.warn(`DELETE /hotel/${id} called`);
    try {
      await this.hotelService.deleteHotel(id);
      return { message: `Hotel ${id} deleted successfully` };
    } catch (error) {
      this.logger.error(`Error deleting hotel with id ${id}`, error.stack);
      throw new InternalServerErrorException('Failed to delete hotel');
    }
  }
}

