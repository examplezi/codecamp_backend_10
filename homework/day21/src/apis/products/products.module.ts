import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsResolver } from './products.resolver';
import { ProductsService } from './products.service';
import { Module } from '@nestjs/common';
import { Product } from './entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  providers: [
    ProductsService, //
    ProductsResolver,
  ],
})
export class ProductsModule {}
