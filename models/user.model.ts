import {CreateUserDTO, User} from '../types/User';
import {Pool, ResultSetHeader, RowDataPacket} from "mysql2/promise";

export class UserModel {
    constructor(private db: Pool) {}

    async findAll(): Promise<User[]> {
        const [rows] = await this.db.query<RowDataPacket[]>("SELECT * FROM users");
        return rows as User[];
    }

    async findById(id: number): Promise<User | undefined> {
        const [rows] = await this.db.query<RowDataPacket[]>(
            "SELECT * FROM users WHERE id = ?",
            [id]
        );
        return rows[0] as User;
    }

    async findByEmail(email: string): Promise<User | undefined> {
        const [rows] = await this.db.query<RowDataPacket[]>(
            "SELECT * FROM users WHERE email = ?",
            [email]
        );
        return rows[0] as User;
    }

    async create(user: CreateUserDTO): Promise<User> {
        const [result] = await this.db.query<ResultSetHeader>(
            "INSERT INTO users(id, username, email) VALUES (NULL, ?, ?)",
            [user.username, user.email]
        )
        return {
            id: result.insertId,
            username: user.username,
            email: user.email,
        };
    }

    async update(id: number, data: Partial<User>): Promise<User | undefined> {
        const existing = await this.findById(id);
        if (!existing) {
            return undefined;
        }

        const updated = { ...existing, ...data };
        await this.db.query<ResultSetHeader>(
            "UPDATE users SET username = ?, email = ? WHERE id = ?",
            [updated.username, updated.email, id]
        )
        return updated;
    }

    async delete(id: number): Promise<boolean> {
        const [result] = await this.db.query<ResultSetHeader>(
            "DELETE FROM users WHERE id = ?",
            [id]
        )
        return result.affectedRows > 0;
    }

}