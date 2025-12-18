
export interface User {
    id: string;
    username: string;
    password: string;
}

export interface Link {
    id: string;
    name: string;
    userId: string;
    url: string;
    active: boolean;
}