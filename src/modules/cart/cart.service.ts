import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCartDto, UpdateCartDto } from './dto/cart.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class CartService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async create(token: string) {
    const userId = this.getUserIdFromToken(token);
    const existingCart = await this.prisma.cart.findUnique({
      where: { userId: userId },
      include: { items: true },
    });

    if (existingCart) {
      return existingCart;
    }

    return this.prisma.cart.create({
      data: { userId },
    });
  }

  async findAll() {
    return this.prisma.cart.findMany({
      include: { items: true },
    });
  }

  async findOne(id: string) {
    const cart = await this.prisma.cart.findUnique({
      where: { id },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });
    if (!cart) {
      throw new NotFoundException('Cart not found');
    }
    return cart;
  }

  async update(id: string, updateCartDto: UpdateCartDto) {
    return this.prisma.cart.update({
      where: { id },
      data: updateCartDto,
    });
  }

  async remove(id: string) {
    return this.prisma.cart.delete({
      where: { id },
    });
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
