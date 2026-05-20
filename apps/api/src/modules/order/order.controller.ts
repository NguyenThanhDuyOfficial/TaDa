import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { OrderService } from "./order.service";
import { Prisma, OrderStatus } from "@/generated/prisma/client";


@Controller('orders')
export class OrderController {
  constructor(private orderService: OrderService) { }

  @Get()
  async findOrders() {
    return await this.orderService.orders()
  }
  @Get(':id')
  async findOrderById(@Param('id') id: string) {
    return await this.orderService.order({ id })
  }

  @Post()
  async create(@Body() orderData: {
    totalAmount: number, items: {
      create: Array<{ productId: string, quantity: number, price: number }>
    }
  }) {
    const { totalAmount, items } = orderData
    await this.orderService.createOrder({
      totalAmount,
      items
    })
    return
  }

  @Patch(':id')
  async updateOrderStatus(@Param('id') id: string, @Body() orderData: { status: OrderStatus }) {
    return await this.orderService.updateOrder({ where: { id }, data: orderData })
  }

  @Delete(':id')
  async deleteOrder(@Param('id') id: string) {
    await this.orderService.deleteOrder({ id })
  }
}
