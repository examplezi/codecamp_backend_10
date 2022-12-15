import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ProductsService } from './products.service';
//import { CreateBoardInput } from './dto/create-product.input';
import { Product } from './entities/product.entity';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
//import { ProductsService } from './products.service';
@Resolver()
export class ProductsResolver {
  constructor(
    // 12-02 참고//
    private readonly productService: ProductsService,
  ) {}

  @Query(() => [Product])
  fetchProducts(): Promise<Product[]> {
    //다수니까 배열
    return this.productsService.findAll();
  }
  @Query(() => Product)
  fetchProduct(
    @Args('productId') productId: string, //
  ): Promise<Product> {
    return this.productsService.findOne({ productId });
  }

  @Mutation(() => Product)
  createProduct(
    @Args('createProductInput') createProductInput: CreateProductInput,
  ): Promise<Product> {
    return this.productService.create({ createProductInput });
  }

  @Mutation()
  async updateProduct(
    @Args('productId') productId: string,
    @Args('updateProductInput') updateProductInput: UpdateProductInput,
  ): Promise<Product> {
    const product = await this.productService.findOne({ productId });

    // if(product.isSoldout)
    this.productService.checkSoldout({ product });
    return this.productsService.update({ product, updateProductInput });
  }
}
