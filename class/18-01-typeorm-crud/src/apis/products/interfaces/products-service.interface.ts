import { CreateProductInput } from '../dto/create-product.input';
import { Product } from '../entities/product.entity';

export interface IProductServiceCreate {
  createProductInput: CreateProductInput;
}

export interface IProductsServiceFindOne {
  product: Product;
  updateProductInput: UpadateProductInput;
}

export interface IProductsServiceCheckSoldout {
  product: Product;
}
