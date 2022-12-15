import { Seller } from 'src/apis/sellers/entities/seller.entity';
import { Origin } from 'src/apis/origins/entities/origin.entity';
import { Order } from 'src/apis/orders/entities/order.entity';
import { ProductSub } from 'src/apis/productsSubs/entities/productSub.entity';
import { Color } from 'src/apis/colors/entities/color.entity';
export declare class Product {
    id: string;
    name: string;
    price: number;
    material: string;
    delivery_fee: number;
    origin: Origin;
    seller: Seller;
    productsub: ProductSub;
    order: Order;
    colors: Color[];
}
