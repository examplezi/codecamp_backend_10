"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GqlAuthAccessGuard = void 0;
const graphql_1 = require("@nestjs/graphql");
const passport_1 = require("@nestjs/passport");
class GqlAuthAccessGuard extends (0, passport_1.AuthGuard)("access") {
    getRequest(context) {
        const gqlContext = graphql_1.GqlExecutionContext.create(context);
        return gqlContext.getContext().req;
    }
}
exports.GqlAuthAccessGuard = GqlAuthAccessGuard;
//# sourceMappingURL=gql-auth.guard.js.map