import { User } from 'src/apis/users/entities/user.entity';
export declare class Order {
    id: string;
    payment: boolean;
    user: User;
}
