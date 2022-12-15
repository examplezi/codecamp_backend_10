import { Repository } from "typeorm";
import { Product } from "./entities/product.entity";
import { IProductsServiceCreate, IProductsServiceFindOne, IProductsServiceUpdate } from "./interfaces/products-service.interface";
export declare class ProductsService {
    private readonly productRepository;
    constructor(productRepository: Repository<Product>);
    findAll(): Promise<Product[]>;
    findOne({ productId }: IProductsServiceFindOne): Promise<Product>;
    create({ createProductInput }: IProductsServiceCreate): Promise<Product>;
    update({ product, updateProductInput, }: IProductsServiceUpdate): Promise<Product>;
    delete({ productId }: {
        productId: any;
    }): Promise<boolean>;
    restore({ productId }: {
        productId: any;
    }): Promise<boolean>;
}
