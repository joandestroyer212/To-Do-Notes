
import {CreateTodoListDTO, TodoList} from '../types/Todo-list';
import {Pool, ResultSetHeader, RowDataPacket} from "mysql2/promise";

export class TodoListModel {
    constructor(private db: Pool) {}

    async findAll(user_id: number): Promise<TodoList[]> {
        const [rows] = await this.db.query<RowDataPacket[]>("SELECT * FROM todo_lists WHERE user_id = ?", 
            [user_id]
        );
        return rows as TodoList[];
    }

    async findById(user_id: number, listId: number): Promise<TodoList | undefined> {
        const [rows] = await this.db.query<RowDataPacket[]>(
            "SELECT * FROM todo_lists WHERE id = ? AND user_id = ?",
            [listId, user_id]
        );
        return rows[0] as TodoList | undefined;
    }

    async create(todolist: CreateTodoListDTO): Promise<TodoList> {
        const [result] = await this.db.query<ResultSetHeader>(
            "INSERT INTO todo_lists(user_id, title, description) VALUES (?, ?, ?)",
            [todolist.user_id, todolist.title, todolist.description]
        )
        return {
            id: result.insertId,
            user_id: todolist.user_id,
            title: todolist.title,
            description: todolist.description ?? "",
        };
    }

    async update(user_id: number, listId: number, data: Partial<TodoList>): Promise<TodoList | undefined> {
        const existing = await this.findById(user_id, listId);
        if (!existing) {
            return undefined;
        }

        const updated = { ...existing, ...data };
        await this.db.query<ResultSetHeader>(
            "UPDATE todo_lists SET title = ?,  description = ? WHERE id = ? AND user_id = ?",
            [updated.title, updated.description, listId, user_id]
        )
        return updated;
    }

    async delete(user_id: number, listId: number): Promise<boolean> {
        const [result] = await this.db.query<ResultSetHeader>(
            "DELETE FROM todo_lists WHERE id = ? AND user_id = ?",
            [listId, user_id]
        )
        return result.affectedRows > 0;
    }

}