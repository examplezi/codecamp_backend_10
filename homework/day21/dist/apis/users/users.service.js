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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
let UsersService = class UsersService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    findAll() {
        return this.userRepository.find();
    }
    findOne({ userId }) {
        return this.userRepository.findOne({ where: { id: userId } });
    }
    async create({ email, hashedPassword: password, name, age, }) {
        const user = await this.userRepository.findOne({
            where: { email },
        });
        if (user)
            throw new common_1.ConflictException("이미 등록된 회원입니다.");
        return this.userRepository.save({
            email,
            name,
            age,
        });
    }
    update({ user, updateUserInput }) {
        return this.userRepository.save(Object.assign(Object.assign({}, user), updateUserInput));
    }
    async delete({ userId }) {
        const result = await this.userRepository.softDelete({ id: userId });
        return result.affected ? true : false;
    }
    async restore({ userId }) {
        const result = await this.userRepository.restore({ id: userId });
        return result.affected ? true : false;
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map