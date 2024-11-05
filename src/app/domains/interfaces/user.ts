import { Role } from "./role";
export interface User {
    id: number;
    slug: string;
    username: string;
    password: string;
    role: Role[];

}
