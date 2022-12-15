import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Product } from "./entities/product.entity";
import {
  IProductsServiceCreate,
  IProductsServiceFindOne,
  IProductsServiceUpdate,
} from "./interfaces/products-service.interface";

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>
  ) {}

  findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  findOne({ productId }: IProductsServiceFindOne): Promise<Product> {
    return this.productRepository.findOne({ where: { id: productId } });
  }

  create({ createProductInput }: IProductsServiceCreate): Promise<Product> {
    const result = this.productRepository.save({ ...createProductInput });

    return result;
  }

  update({
    product,
    updateProductInput,
  }: IProductsServiceUpdate): Promise<Product> {
    return this.productRepository.save({
      ...product, //
      ...updateProductInput,
    });
  }

  async delete({ productId }) {
    const result = await this.productRepository.softDelete({ id: productId });

    return result.affected ? true : false;
  }

  async restore({ productId }) {
    const result = await this.productRepository.restore({ id: productId });

    return result.affected ? true : false;
  }
}
//     const result = this.productRepository.save({
//       ...product, //수정 후 수정되지 않은 다른 결과값까지 모두 받고 싶을 때 사용
//       ...updateProductInput,

//     });
//     return result;
//   }
