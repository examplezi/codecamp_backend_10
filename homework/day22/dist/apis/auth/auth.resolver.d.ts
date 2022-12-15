import { UsersService } from "../users/users.service";
import { AuthService } from "./auth.service";
export declare class AuthResolver {
    private readonly usersService;
    private readonly authService;
    constructor(usersService: UsersService, authService: AuthService);
    login(email: string, password: string): Promise<string>;
}
