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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const seller_entity_1 = require("../../sellers/entities/seller.entity");
const typeorm_1 = require("typeorm");
const origin_entity_1 = require("../../origins/entities/origin.entity");
const order_entity_1 = require("../../orders/entities/order.entity");
const productSub_entity_1 = require("../../productsSubs/entities/productSub.entity");
const color_entity_1 = require("../../colors/entities/color.entity");
const graphql_1 = require("@nestjs/graphql");
let Product = class Product {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], Product.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], Product.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], Product.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], Product.prototype, "material", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], Product.prototype, "delivery_fee", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => origin_entity_1.Origin),
    (0, graphql_1.Field)(() => origin_entity_1.Origin),
    __metadata("design:type", origin_entity_1.Origin)
], Product.prototype, "origin", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => seller_entity_1.Seller),
    (0, graphql_1.Field)(() => seller_entity_1.Seller),
    __metadata("design:type", seller_entity_1.Seller)
], Product.prototype, "seller", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => productSub_entity_1.ProductSub),
    (0, graphql_1.Field)(() => productSub_entity_1.ProductSub),
    __metadata("design:type", productSub_entity_1.ProductSub)
], Product.prototype, "productsub", void 0);
__decorate([
    (0, typeorm_1.JoinColumn)(),
    (0, typeorm_1.OneToOne)(() => order_entity_1.Order),
    (0, graphql_1.Field)(() => order_entity_1.Order),
    __metadata("design:type", order_entity_1.Order)
], Product.prototype, "order", void 0);
__decorate([
    (0, typeorm_1.JoinTable)(),
    (0, typeorm_1.ManyToMany)(() => color_entity_1.Color, (colors) => colors.products),
    (0, graphql_1.Field)(() => [color_entity_1.Color]),
    __metadata("design:type", Array)
], Product.prototype, "colors", void 0);
Product = __decorate([
    (0, typeorm_1.Entity)(),
    (0, graphql_1.ObjectType)()
], Product);
exports.Product = Product;
//# sourceMappingURL=product.entity.js.map