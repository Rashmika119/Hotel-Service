import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { Hotel } from './hotel.entity';
import { hotelSearchDto } from './hotelSearch.dto';
import { hotelUpdateDto } from './hotelUpdate.dto';


@Injectable()
export class HotelService {
    private readonly logger = new Logger(HotelService.name);

  constructor(
    @InjectRepository(Hotel)
    private readonly hotelRepo: Repository<Hotel>,
  ) { }

  async getAllHotels(): Promise<Hotel[]> {
        this.logger.log('Fetching all hotels');
    return await this.hotelRepo.find();
  }
  async createHotel(
    name: string,
    location: string,
    rating: number,
    pricePerNight: number,
    checkInEndTime: string
  ): Promise<Hotel> {
    
    const hotel = this.hotelRepo.create({
      name,
      location,
      rating,
      pricePerNight,
      checkInEndTime
    });
    await this.hotelRepo.save(hotel);
    this.logger.debug(`Hotel created: ${name} at ${location}`);
    return hotel;
  }


  async deleteHotel(id: string): Promise<void> {
    const result = await this.hotelRepo.delete(id);

    if (result.affected === 0) {
      this.logger.warn(`Attempted to delete non-existent hotel with ID: ${id}`);
      throw new NotFoundException(`Hotel with is ${id} not found`)
    }
    this.logger.log(`Deleted hotel with ID: ${id}`);

  }


  async hotelSearch(hotelSearchDto: hotelSearchDto): Promise<Hotel[]> {
    const { name, location, rating, pricePerNight,checkInEndTime } = hotelSearchDto;
        this.logger.log(`Searching hotels with criteria: ${JSON.stringify(hotelSearchDto)}`);

    const query = this.hotelRepo.createQueryBuilder('hotel')

    if (name) {
      query.andWhere('hotel.name LIKE :name', {
        name: `%${name}%`,
      })
    }
    if (location) {
      query.andWhere('hotel.location LIKE :location', {
        location: `%${location}%`,
      })
    }

    if (rating) {
      query.andWhere('hotel.rating LIKE :rating', {
        rating: `%${rating}%`,
      })
    }
    if (pricePerNight) {
      query.andWhere('hotel.pricePerNight LIKE :pricePerNight', {
        pricePerNight: `%${pricePerNight}%`,
      })
    }
    if (checkInEndTime) {
      query.andWhere('hotel.checkInEndTime LIKE :checkInEndTime', {
        checkInEndTime: `%${checkInEndTime}%`,
      })
    }
    const hotels= await query.getMany();
        this.logger.log(`Found ${hotels.length} hotel(s) matching search criteria`);
        return hotels

  }
  async getHotelById(id: string): Promise<Hotel> {
    const hotel = await this.hotelRepo.findOne({ where: { id } })
    if (!hotel) {
      this.logger.warn(`Hotel with ID ${id} not found`);
      throw new NotFoundException(`Hotel with ID ${id} not found`);
    }
    this.logger.log(`Fetched hotel with ID: ${id}`);
    return hotel;

  }

  async updateHotel(id: string, hotelUpdatedto: hotelUpdateDto): Promise<Hotel> {
    const hotel = await this.getHotelById(id);
    Object.assign(hotel, hotelUpdatedto);
    const updatedHotel = await this.hotelRepo.save(hotel);
    this.logger.debug(`Updated hotel with ID: ${id}`);
    return updatedHotel;

  }
}

