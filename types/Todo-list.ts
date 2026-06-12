export interface TodoList {
    id: number;
    user_id: number;
    title: string;
    description: string;
}

export interface CreateTodoListDTO {
    user_id: number;
    title: string;
    description?: string;
}