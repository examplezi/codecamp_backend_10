import { Injectable } from '@nestjs/common';
import { ProductCategory } from './entities/productCategory.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IProductCategoriesServiceCreate } from './interfaces/products-categories-service.interface';

@Injectable()
export class ProductCategoriesService {
  constructor(
    @InjectRepository(ProductCategory)
    private readonly productsCategoriesRepository: Repository<ProductCategory>,
  ) {}
  create({ name }: IProductCategoriesServiceCreate): Promise<ProductCategory> {
    // DB에 카테고리 등록

    //this.productsCategoriesRepository.save({
    const result = this.productsCategoriesRepository.save({ name }); //shortpropertyhand
    return result;
    // })
  }
}
