import { CashService } from "./services/cash.service.js";
import { ProductService } from "./services/product.service.js";

export class ProductController {
  buyProduct = (req, res) => {
    // 1. 가진 돈이 얼마나 있는지 검증 코드 (10줄 정도 => 2줄 정도)
    //const cashService = new CashService();
    const hasMoney = cashService.checkValue();

    // 2. 중고상품의 판매 완료 여부 검증 코드 (10줄 정도)
    //const productService = new ProductService();
    const isSoldout = this.productService.checkValue();

    // 3. 상품 구매하는 코드
    if (hasMoney && !isSoldout) {
      res.send("상품구매완료");
    }
  };

  refundProduct = (req, res) => {
    // 1. 판매 여부 검증 코드 (10줄 => 2줄)
    const productService = new ProductService();
    const isSoldout = productService.checkValue();

    // 2. 상품 환불하는 코드

    if (isSoldout) {
      res.send("상품환불완료");
    }
  };
}
