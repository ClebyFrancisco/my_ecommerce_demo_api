import { Controller, Get, Post, Body, Req, Headers } from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/address.dto';

@Controller('address')
export class AddressController {
  constructor(private addressService: AddressService) {}

  @Post()
  async upsertAddress(
    @Headers('Authorization') authHeader: string,
    @Body() createAddressDto: CreateAddressDto,
  ) {
    const token = authHeader.replace('Bearer ', '');
    return this.addressService.upsertAddress(token, createAddressDto);
  }

  @Get()
  async getAddress(@Headers('Authorization') authHeader: string) {
    const token = authHeader.replace('Bearer ', '');
    return this.addressService.getAddress(token);
  }
}
