import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from '@module/product/product.module';
import { OrderModule } from '@module/order/order.module';

@Module({
  imports: [ProductModule, OrderModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
