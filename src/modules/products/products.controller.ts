import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Post('create')
  async createProduct(
    @Body('name') name: string,
    @Body('description') description: string,
    @Body('price') price: number,
    @Body('imageUrl') imageUrl: string,
  ) {
    return this.productsService.createProduct(
      name,
      description,
      price,
      imageUrl,
    );
  }

  @Get()
  async getAll() {
    return this.productsService.getAll();
  }
}
