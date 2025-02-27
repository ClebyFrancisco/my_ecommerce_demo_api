import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';

@Injectable()
export class CartItemService {
  constructor(private prisma: PrismaService) {}

  async create(createCartItemDto: CreateCartItemDto) {
    return this.prisma.cartItem.create({
      data: createCartItemDto,
    });
  }

  async findAll() {
    return this.prisma.cartItem.findMany();
  }

  async findOne(id: string) {
    return this.prisma.cartItem.findUnique({
      where: { id },
    });
  }

  async update(id: string, updateCartItemDto: UpdateCartItemDto) {
    return this.prisma.cartItem.update({
      where: { id },
      data: updateCartItemDto,
    });
  }

  async remove(id: string) {
    return this.prisma.cartItem.delete({
      where: { id },
    });
  }
}
