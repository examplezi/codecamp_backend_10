import {
  ConflictException,
  HttpException,
  Injectable,
  UnprocessableEntityException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import axios from "axios";
import { Token } from "graphql";
import { Payment } from "src/apis/payment/entities/payment.entity";
import { Repository } from "typeorm";

@Injectable()
export class IamportService {
  async getToken() {
    const result = await axios.post("https://api.iamport.kr/users/getToken", {
      imp_key: process.env.IAMPORT_API_KEY, // REST API키
      imp_secret: process.env.IAMPORT_API_SECRET, // REST API Secret
    });
    return result.data.response.access_token;
    // try {
    // } catch (error) {
    //   throw new HttpException(
    //     error.response.data.message,
    //     error.response.status
    //   );
    // }
  }

  async checkPaid({ impUid, amount, token }) {
    console.log(impUid, amount, token);
    try {
      const result = await axios.get(
        `https://api.iamport.kr/payments/${impUid}`,
        { headers: { Authorization: token } }
      );
      if (result.data.response.status !== "paid")
        throw new ConflictException("결제 내역이 존재하지 않습니다.");
      if (result.data.response.amount !== amount)
        throw new UnprocessableEntityException("결제 금액이 잘못되었습니다.");
    } catch (error) {
      if (error?.response?.data?.message) {
        console.log("에러입니다.");
        throw new HttpException(
          error.response.data.message,
          error.response.status
        );
      } else {
        throw error;
      }
    }
  }

  async cancel({ impUid, token }) {
    try {
      const result = await axios.post(
        "http://api.iamport.kr/payments/cancel",
        {
          imp_uid: impUid,
        },
        {
          headers: { Authorization: token },
        }
      );
      console.log(result);
      return result.data.response.cancel_amount;
    } finally {
      // catch (error) {
      //   throw new HttpException(
      //     error.response.data.message,
      //     error.response.status
      //   );
      // }
    }
  }

  //함수 뭐?? 값 조회? / 비교
  async validateData({ amount, impUid }) {
    //아임포트에서 토큰 받아오기
    try {
      const getToken = await axios({
        url: "https://api.iamport.kr/users/getToken",
        method: "post", // POST method
        headers: { "Content-Type": "application/json" }, // "Content-Type": "application/json"
        data: {
          imp_key: process.env.IAMPORT_API_KEY, // REST API키
          imp_secret: process.env.IAMPORT_API_SECRET, // REST API Secret
        },
      });

      const access = getToken.data.response.access_token;

      const result = await axios({
        url: `https://api.iamport.kr/payments/${impUid}`, // imp_uid 전달
        method: "get", // GET method
        headers: {
          Authorization: `Bearer ${access}`,
        }, // 인증 토큰 Authorization header에 추가
      });
    } catch (error) {
      if (error.response.status === 404)
        throw new UnprocessableEntityException("없습니다.");
    }
    //const { _amount: _amount, status } = result.data.response;

    // if (status !== "paid") {
    //   throw new UnprocessableEntityException("결제가 완료되지 않았습니다.");
    // }

    // if (amount !== _amount) {
    //   throw new UnprocessableEntityException(
    //     "결제금액 불일치. 위/변조 된 결제"
    //   );
  }

  // async delete({ impUid, amount }) {
  //   const imp_uid = impUid;

  //   // 검증로직들
  //   // 1.아임포트에 요청해서 결제 완료 기록이 존재하는지 확인
  //   const getToken = await axios({
  //     url: "https://api.iamport.kr/users/getToken",
  //     method: "post", // POST method
  //     headers: { "Content-Type": "application/json" }, // "Content-Type": "application/json"
  //     data: {
  //       imp_key: process.env.IAMPORT_API_KEY, // REST API키
  //       imp_secret: process.env.IAMPORT_API_SECRET, // REST API Secret
  //     },
  //   });

  //   const access = getToken.data.response.access_token;
  //   /* 아임포트 REST API로 결제환불 요청 */
  //   const getCancelData = await axios({
  //     url: "https://api.iamport.kr/payments/cancel",
  //     method: "post",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${access}`,
  //     },
  //     data: {
  //       reason: "테스트용", // 가맹점 클라이언트로부터 받은 환불사유
  //       imp_uid, // imp_uid를 환불 `unique key`로 입력
  //       amount, // 가맹점 클라이언트로부터 받은 환불금액
  //       checksum: amount, // [권장] 환불 가능 금액 입력
  //     },
  //   });

  //   const all = getCancelData.data.response.amount;
  // }
}
