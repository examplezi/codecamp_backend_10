import {
  HttpException,
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductInput } from './dto/create-product.input';
import {
  IProductServiceCreate,
  IProductsServiceCheckSoldout,
} from './interfaces/products-service.interface';
import { SupportInfo } from 'prettier';
//import { IProductServiceCreate } from './interfaces/products-service.interface';

@Injectable()
export class ProductsService {
  constructor(
    //
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  findOne(productId: IProductsServiceFindOne): Promise<Product> {
    return this.productRepository.findOne({ where: { id: productId } });
  }
  create({ createProductInput }: IProductServiceCreate): Promise<Product> {
    const result = this.productRepository.save({
      ...createProductInput,
      //   name: createProductInput.name,
      //   description: createProductInput.description,
      //   price: createProductInput.price,
      //   name: '마우스',
      //   description: '좋은 마우스',
      //   price: 3000,
    });
    return result; // {id: , name:, desc, price}
  }

  update({
    product,
    updateProductInput,
  }: IProductServiceUpdate): Promise<Product> {
    // this.productRepository.create() //DB접속이랑 관련 없음. 등록 위해서 빈 껍데기 객체 만들기 위해
    // this.productRepository.update()
    // 결과를 객체로 못돌려받는 수정 방법
    //this.productRepository.insert()
    // 결과를 객체로 못돌려받는 수정 방법
    //this.productRepository.save({
    const result = this.productRepository.save({
      ...product, //수정 후 수정되지 않은 다른 결과값까지 모두 받고 싶을 때 사용
      ...updateProductInput,
      //})
      //   name: updateProductInput.name,
      //   price: updateProductInput.price,
      //   description: 'fdfg',
    });
    return result;
  }
  //id가 포함되면 수정, 없으면 등록 (아이디의 유무에 따라 등록 / 수정으로 나뉨)

  checkSoldout({ product }: IProductsServiceCheckSoldout): void {
    //리턴값 없을 때 void
    if (product.isSoldout) {
      throw new UnprocessableEntityException('이미 판매 완료된 상품입니다.');
    }

    // if (product.isSoldout) {
    //   // true
    //   throw new HttpException(
    //     '이미 판매 완료된 상품입니다.',
    //     HttpStatus.UNPROCESSABLE_ENTITY,
    //   ); //예외, UNPROCESSABLE_ENTITY(숫자로 변환됨)
    //}
  }
}
