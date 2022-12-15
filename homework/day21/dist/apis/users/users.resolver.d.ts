import { User } from "./entities/user.entity";
import { UsersService } from "./users.service";
import { UpdateUserInput } from "./dto/update-user.input";
export declare class UsersResolver {
    private readonly usersService;
    constructor(usersService: UsersService);
    fetchProducts(): Promise<User[]>;
    fetchProduct(userId: string): Promise<User>;
    createUser(email: string, password: string, name: string, age: number): Promise<User>;
    updateUser(userId: string, updateUserInput: UpdateUserInput): Promise<User>;
    deleteUser(userId: string): Promise<boolean>;
    restoreUser(userId: string): Promise<boolean>;
}
