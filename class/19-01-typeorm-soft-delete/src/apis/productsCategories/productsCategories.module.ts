import { Module } from '@nestjs/common';
import { ProductCategoriesService } from './productsCategories.service';
import { ProductCategoriesResolver } from './productsCategories.resolver';
import { ProductCategory } from './entities/productCategory.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductCategory, //
    ]),
  ],
  providers: [
    ProductCategoriesResolver, //
    ProductCategoriesService,
  ],
})
export class ProductCategoriesModule {}
