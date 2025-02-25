import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async createProduct(
    name: string,
    description: string,
    price: number,
    imageUrl: string,
  ) {
    const newProduct = await this.prisma.product.create({
      data: {
        name,
        description,
        price,
        imageUrl,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    return newProduct;
  }

  async getAll() {
    return this.prisma.product.findMany();
  }
}
