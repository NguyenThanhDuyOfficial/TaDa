import { PrismaService } from "@module/prisma/prisma.service";
import { Injectable } from "@nestjs/common";
import { Prisma, Order } from "@/generated/prisma/client";


@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) { }

  orders() {
    return this.prisma.order.findMany()
  }
  order(where: Prisma.OrderWhereUniqueInput) {
    return this.prisma.order.findUnique({ where })
  }

  createOrder(data: Prisma.OrderCreateInput): Promise<Order> {
    return this.prisma.order.create({ data })
  }

  updateOrder(params: { where: Prisma.OrderWhereUniqueInput, data: Prisma.OrderUpdateInput }) {
    const { where, data } = params
    return this.prisma.order.update({ where, data })
  }

  deleteOrder(where: Prisma.OrderWhereUniqueInput) {
    return this.prisma.order.delete({ where })
  }

}
