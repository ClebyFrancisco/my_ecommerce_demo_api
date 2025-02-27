import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAddressDto, UpdateAddressDto } from './dto/address.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AddressService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async upsertAddress(token: string, createAddressDto: CreateAddressDto) {
    const userId = this.getUserIdFromToken(token);

    const existingAddress = await this.prisma.address.findUnique({
      where: { userId },
    });

    if (existingAddress) {
      return this.prisma.address.update({
        where: { userId },
        data: createAddressDto,
      });
    } else {
      return this.prisma.address.create({
        data: {
          ...createAddressDto,
          userId,
        },
      });
    }
  }

  async getAddress(token: string) {
    const userId = this.getUserIdFromToken(token);

    const address = await this.prisma.address.findUnique({ where: { userId } });
    if (!address) throw new NotFoundException('Endereço não encontrado');
    return address;
  }

  private getUserIdFromToken(token: string): string {
    try {
      const decoded = this.jwtService.decode(token);
      return decoded.sub;
    } catch (error) {
      throw new UnauthorizedException('Token inválido');
    }
  }
}
