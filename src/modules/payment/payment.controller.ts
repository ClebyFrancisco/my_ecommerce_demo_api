import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { PaymentService } from './payment.service';

@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post(':orderId')
  async createPayment(
    @Param('orderId') orderId: string,
    @Body('method') method: string,
  ) {
    return this.paymentService.createPayment(orderId, method);
  }

  @Get(':orderId')
  async getPayment(@Param('orderId') orderId: string) {
    return this.paymentService.getPayment(orderId);
  }
}
