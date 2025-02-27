import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './modules/products/products.module';
import { AuthModule } from './modules/auth/auth.module';
import { AddressModule } from './modules/address/address.module';
import { CartService } from './modules/cart/cart.service';
import { CartController } from './modules/cart/cart.controller';
import { CartModule } from './modules/cart/cart.module';
import { CartItemModule } from './modules/cart-item/cart-item.module';

@Module({
  imports: [
    ProductsModule,
    AuthModule,
    AddressModule,
    CartModule,
    CartItemModule,
  ],
  controllers: [AppController, CartController],
  providers: [AppService, PrismaService, CartService],
})
export class AppModule {}
