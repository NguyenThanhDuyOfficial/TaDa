import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Get()
  async findMany() {
    return await this.productService.products()
  }

  @Get(':id')
  async getProductById(@Param('id') id: string) {
    return this.productService.product({ id })
  }

  @Post()
  async create(@Body() productData: { name: string, stock?: number, price?: number }) {
    const { name, stock, price } = productData
    await this.productService.createProduct(
      {
        name,
        stock,
        price
      }
    )
    return
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() productData: { name?: string, stock?: number, price?: number }) {
    await this.productService.updateProduct({ where: { id }, data: productData })
    return
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.productService.delete({ id })
    return
  }
}

