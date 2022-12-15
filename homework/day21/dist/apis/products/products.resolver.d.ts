import { ProductsService } from "./products.service";
import { Product } from "./entities/product.entity";
import { CreateProductInput } from "./dto/createProduct.input";
import { UpdateProductInput } from "./dto/update-product.input";
export declare class ProductsResolver {
    private readonly productsService;
    constructor(productsService: ProductsService);
    fetchProducts(): Promise<Product[]>;
    fetchProduct(productId: string): Promise<Product>;
    createProduct(createProductInput: CreateProductInput): Promise<Product>;
    updateProduct(productId: string, updateProductInput: UpdateProductInput): Promise<Product>;
    deleteProduct(productId: string): Promise<boolean>;
    restoreProduct(productId: string): Promise<boolean>;
}
