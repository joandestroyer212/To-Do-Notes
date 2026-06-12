import { TodoListModel } from '../models/todo-list.model';
import {CreateTodoListDTO, TodoList} from '../types/Todo-list';

export class TodoListService {
    constructor(private todoListModel: TodoListModel) {}

    async getAllLists(user_id: number): Promise<TodoList[]> {
        return await this.todoListModel.findAll(user_id);
    }

    async getListById(user_id: number, listId: number): Promise<TodoList | undefined> {
        return await this.todoListModel.findById(user_id, listId);
    }

    async createList(data: CreateTodoListDTO): Promise<TodoList> {
        return await this.todoListModel.create(data);
    }

    async updateList(user_id: number, listId: number, data: Partial<TodoList>): Promise<TodoList | undefined> {
        return await this.todoListModel.update(user_id, listId, data);
    }

    async deleteList(user_id: number, listId: number): Promise<boolean> {
        return await this.todoListModel.delete(user_id, listId);
    }

}