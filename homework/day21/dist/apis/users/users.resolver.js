"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const user_entity_1 = require("./entities/user.entity");
const users_service_1 = require("./users.service");
const bcrypt = require("bcrypt");
const update_user_input_1 = require("./dto/update-user.input");
let UsersResolver = class UsersResolver {
    constructor(usersService) {
        this.usersService = usersService;
    }
    fetchProducts() {
        return this.usersService.findAll();
    }
    fetchProduct(userId) {
        return this.usersService.findOne({ userId });
    }
    async createUser(email, password, name, age) {
        const hashedPassword = await bcrypt.hash(password, 10);
        return this.usersService.create({ email, hashedPassword, name, age });
    }
    async updateUser(userId, updateUserInput) {
        const user = await this.usersService.findOne({ userId });
        return this.usersService.update({ user, updateUserInput });
    }
    deleteUser(userId) {
        return this.usersService.delete({ userId });
    }
    restoreUser(userId) {
        return this.usersService.restore({ userId });
    }
};
__decorate([
    (0, graphql_1.Query)(() => [user_entity_1.User]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UsersResolver.prototype, "fetchProducts", null);
__decorate([
    (0, graphql_1.Query)(() => user_entity_1.User),
    __param(0, (0, graphql_1.Args)("userId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "fetchProduct", null);
__decorate([
    (0, graphql_1.Mutation)(() => user_entity_1.User),
    __param(0, (0, graphql_1.Args)("email")),
    __param(1, (0, graphql_1.Args)("password")),
    __param(2, (0, graphql_1.Args)("name")),
    __param(3, (0, graphql_1.Args)({ name: "age", type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Number]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "createUser", null);
__decorate([
    (0, graphql_1.Mutation)(() => user_entity_1.User),
    __param(0, (0, graphql_1.Args)("userId")),
    __param(1, (0, graphql_1.Args)("updateUserInput")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_user_input_1.UpdateUserInput]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "updateUser", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    __param(0, (0, graphql_1.Args)("userId", { type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UsersResolver.prototype, "deleteUser", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    __param(0, (0, graphql_1.Args)("userId", { type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UsersResolver.prototype, "restoreUser", null);
UsersResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersResolver);
exports.UsersResolver = UsersResolver;
//# sourceMappingURL=users.resolver.js.map