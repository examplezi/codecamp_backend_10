import { User } from "./entities/user.entity";
import { UsersService } from "./users.service";
import { IContext } from "src/commons/types/context";
export declare class UsersResolver {
    private readonly usersService;
    constructor(usersService: UsersService);
    fetchUser(context: IContext): string;
    createUser(email: string, password: string, name: string, age: number): Promise<User>;
}
