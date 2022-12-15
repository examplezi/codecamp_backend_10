import { ExecutionContext } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { AuthGuard } from "@nestjs/passport";
//gql에서 guard를 직접적으로 사용하지 못하기 때문에 중간단계를 만들어 줌
export class GqlAuthAccessGuard extends AuthGuard("access") {
  getRequest(context: ExecutionContext) {
    const gqlContext = GqlExecutionContext.create(context);
    return gqlContext.getContext().req;
  }
}

export class GqlAuthRefreshGuard extends AuthGuard("refresh") {
  getRequest(context: ExecutionContext) {
    const gqlContext = GqlExecutionContext.create(context);
    return gqlContext.getContext().req;
  }
}
