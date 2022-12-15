import { CreateProductInput } from "../dto/createProduct.input";
import { CreateUrlInput } from "../dto/createUrl.input";
import { UpdateProductInput } from "../dto/update-product.input";
import { Product } from "../entities/product.entity";

export interface IProductsServiceCreate {
  createProductInput: CreateProductInput;
}

export interface IProductsServiceFindOne {
  productId: string;
}

export interface IProductsServiceUpdate {
  product: Product;
  updateProductInput: UpdateProductInput;
}

export interface IProductsServiceCheckSoldout {
  product: Product;
}

export interface IProductsServiceDelete {
  productId: string;
}

export interface IImagesServiceCreate {
  createUrlInput: CreateUrlInput;
}
