export interface User {
    id: number;
    username: string;
    email: string;
}

export interface CreateUserDTO {
    username: string;
    email: string;
}