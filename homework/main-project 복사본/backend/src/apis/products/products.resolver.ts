import { Args, Mutation, Resolver, Query, ID } from "@nestjs/graphql";
import { ProductsService } from "./products.service";
import { Product } from "./entities/product.entity";
import { CreateProductInput } from "./dto/createProduct.input";
import { UpdateProductInput } from "./dto/update-product.input";
import { CreateUrlInput } from "./dto/createUrl.input";

@Resolver()
export class ProductsResolver {
  constructor(private readonly productsService: ProductsService) {}
  //조회
  @Query(() => [Product])
  fetchProducts() {
    return this.productsService.findAll();
  }

  @Query(() => Product)
  fetchProduct(
    @Args("productId") productId: string //
  ): Promise<Product> {
    return this.productsService.findOne({ productId });
  }

  //생성
  @Mutation(() => Product)
  createProduct(
    @Args("createProductInput") createProductInput: CreateProductInput //
  ): Promise<Product> {
    return this.productsService.create({ createProductInput });
  }

  //수정
  @Mutation(() => Product)
  async updateProduct(
    @Args("productId") productId: string,
    @Args("updateProductInput") updateProductInput: UpdateProductInput,
    @Args("createUrlInput") CreateUrlInput: CreateUrlInput
  ): Promise<Product> {
    const product = await this.productsService.findOne({ productId });

    // if(product.isSoldout)
    // this.productService.checkSoldout({ product });
    return this.productsService.update({ product, updateProductInput });
  }

  //삭제
  @Mutation(() => Boolean)
  deleteProduct(@Args("productId", { type: () => ID }) productId: string) {
    return this.productsService.delete({ productId });
  }

  @Mutation(() => Boolean)
  restoreProduct(@Args("productId", { type: () => ID }) productId: string) {
    return this.productsService.restore({ productId });
  }
}
