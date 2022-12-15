import { CashService } from "./services/cash.service.js";
import { PointService } from "./services/point/service.js.js";

export class CouponController {
  buyCoupon = (res, req) => {
    //의존성
    // 1. 가진 돈이 얼마나 있는지 검증 코드 (10줄 정도 => 2줄 정도)
    const cashService = new CashService();
    const hasMoney = cashService.checkValue();

    // 3. 쿠폰 구매하는 코드
    if (hasMoney) {
      res.send("쿠폰구매완료");
    }
  };
}
