import {
  HttpException,
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductCategory } from '../productsCategories/entities/productCategory.entity';
import { ProductSaleslocation } from '../productsSaleslocations/entities/productSaleslocation.entity';
import { Product } from './entities/product.entity';
import {
  IProductsServiceCheckSoldout,
  IProductsServiceCreate,
  IProductsServiceDelete,
  IProductsServiceFindOne,
  IProductsServiceUpdate,
} from './interfaces/products-service.interface';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>, //

    @InjectRepository(ProductSaleslocation)
    private readonly productsSaleslocationsRepository: Repository<ProductSaleslocation>,
  ) {}

  findAll(): Promise<Product[]> {
    return this.productsRepository.find();
  }

  findOne({ productId }: IProductsServiceFindOne): Promise<Product> {
    return this.productsRepository.findOne({
      where: { id: productId },
    });
  }

  async create({
    createProductInput,
  }: IProductsServiceCreate): Promise<Product> {
    const result = this.productsRepository.save({
      ...createProductInput,

      // 하나하나 직접 나열하는 방식
      //   name: '마우스',
      //   description: '좋은 마우스',
      //   price: 3000,
    });
    // 2. 상품과 거래위치를 같이 등록하는 경우
    const { productSaleslocation, ...product } = createProductInput;

    const result = await this.productsSaleslocationsRepository.save({
      ...productSaleslocation,

      // 직접 나열하는 방식
      // address: productSaleslocation.address,
      // addressDetail : productSaleslocation.addressDetail,
      // lat: ...
    });
    // 직접 나열하는 방식
    const result2 = await this.productsRepository.save({
      ...product,
      productSaleslocation: { ...result }, // result 통째로 넣기 vs id만 빼서 넣기

      name: product.name,
      description: product.description,
      productCategory: {
        id: ProductCategoryId,
        //만약에, name까지 받고싶으면 2가지 방법
        // 1. createProductInout에서 카테고리 name도 받아오기
        // 2. productCategoryId를 사용해서 카테고리 name을 조회하기
      },
      price: product.price,
      productSaleslocation: {
        id: result.id,
        // address: result.address,
        // addressDatail: result.addressDetail,
        // lat: (await result).deletedAt,
        // lng: result.lng,
      },
    });

    //최종 결과 돌려주기
    return result2;
  }

  update({
    product,
    updateProductInput,
  }: IProductsServiceUpdate): Promise<Product> {
    // this.productsRepository.create() // DB 접속이랑 관련 없음. 등록을 위해서 빈 껍데기 객체 만들기 위함
    // this.productsRepository.insert() // 결과를 객체로 못 돌려받는 등록 방법
    // this.productsRepository.update() // 결과를 객체로 못 돌려받는 수정 방법

    const result = this.productsRepository.save({
      ...product, // 수정 후 수정되지 않은 다른 결과값까지 모두 받고 싶을 때 사용
      ...updateProductInput,
    });
    return result;
  }

  checkSoldout({ product }: IProductsServiceCheckSoldout): void {
    if (product.isSoldout)
      throw new UnprocessableEntityException('이미 판매 완료된 상품입니다');

    // if (product.isSoldout) {
    //   throw new HttpException(
    //     '이미 판매 완료된 상품입니다.',
    //     HttpStatus.UNPROCESSABLE_ENTITY,
    //   );
    // }
  }

  async delete({ productId }: IProductsServiceDelete): Promise<boolean> {
    // 1. 실제 삭제
    // const result = await this.productsRepository.delete({ id: productId });
    // return result.affected ? true : false;

    // 2. 소프트 삭제(직접 구현) - isDeleted
    // this.productsRepository.update({ id: productId }, { isDeleted: true })

    // 3. 소프트 삭제(직접 구현) - deletedAt
    // this.productsRepository.update({ id: productId }, { deletedAt: new Date() });

    // 4. 소프트 삭제(TypeORM 제공) - softRemove
    // this.productsRepository.softRemove({ id: productId }); // id로만 삭제 가능

    // 5. 소프트 삭제(TypeORM 제공) - softDelete
    const result = await this.productsRepository.softDelete({ id: productId }); // 다른 컬럼으로도 삭제 가능
    return result.affected ? true : false;
  }
}
