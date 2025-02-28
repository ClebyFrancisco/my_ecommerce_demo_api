import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrderService {
  constructor(
    private readonly prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async createOrder(token: string) {
    const userId = this.getUserIdFromToken(token);
    const cart = await this.prisma.cart.findUnique({
      where: { userId },
      include: { items: { include: { product: true } } },
    });

    if (!cart || !cart.items.length) {
      throw new NotFoundException('Cart is empty');
    }

    const total = cart.items.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0,
    );

    const order = await this.prisma.order.create({
      data: {
        userId,
        total,
        status: 'PENDING',
        items: {
          create: cart.items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            subtotal: item.product.price * item.quantity,
          })),
        },
      },
    });

    await this.prisma.cartItem.deleteMany({
      where: { cartId: cart.id },
    });

    await this.prisma.cart.delete({
      where: { id: cart.id },
    });

    return order;
  }

  async getOrders(token: string) {
    const userId = this.getUserIdFromToken(token);
    return this.prisma.order.findMany({
      where: { userId },
      include: { items: { include: { product: true } } },
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
