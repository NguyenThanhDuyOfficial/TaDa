import { Injectable } from '@nestjs/common';
import { CreateProductDto, PatchProductDto } from './product.controller';
import { PrismaService } from '@module/prisma/prisma.service';
import { Product, Prisma } from '@/generated/prisma/client';


@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) { }

  products(): Promise<Product[]> {
    return this.prisma.product.findMany()
  }

  product(where: Prisma.ProductWhereUniqueInput): Promise<Product | null> {
    return this.prisma.product.findUnique({ where })
  }

  createProduct(data: Prisma.ProductCreateInput): Promise<Product> {
    return this.prisma.product.create({
      data
    })
  }

  updateProduct(params: {
    where: Prisma.ProductWhereUniqueInput, data: Prisma.ProductUpdateInput
  }): Promise<Product> {
    const { where, data } = params
    return this.prisma.product.update({
      where,
      data
    })
  }

  delete(where: Prisma.ProductWhereUniqueInput): Promise<Product> {
    return this.prisma.product.delete({ where })
  }
}
