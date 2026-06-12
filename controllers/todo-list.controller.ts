import { Request, Response } from 'express';
import { TodoListService } from '../services/todo-list.service';

interface IdParams {
    user_id: string;
    listId: string;
}

export class TodoListController {
    constructor(private todoListService: TodoListService) {}

    getAll = async (req: Request<{ user_id: string }>, res: Response): Promise<void> => {
        const user_id = Number(req.params.user_id);
        const lists = await this.todoListService.getAllLists(user_id);

        res.json({ message: 'List found', data: lists });
    };
    
    getById = async (req: Request<IdParams>, res: Response): Promise<void> => {
            const user_id = Number(req.params.user_id);
            const listId = Number(req.params.listId);

            const list = await this.todoListService.getListById(user_id, listId);
            if (!list) {
                res.status(404).json({ message: 'List not found' });
                return;
            }
            res.json({ message: 'List found', data: list });
        };
    
    create = async (req: Request<{ user_id: string }>, res: Response): Promise<void> => {
        const user_id = Number(req.params.user_id);
        const { title, description } = req.body;

        const list = await this.todoListService.createList({ user_id, title, description });
        res.status(201).json({ message: 'List created', data: list });
    };

    update = async (req: Request<IdParams>, res: Response): Promise<void> => {
            const user_id = Number(req.params.user_id);
            const listId = Number(req.params.listId);

            const list = await this.todoListService.updateList(user_id, listId, req.body);
            if (!list) {
                res.status(404).json({ message: 'List not found' });
                return;
            }
            res.json({ message: 'List updated', data: list });
        };

    delete = async (req: Request<IdParams>, res: Response): Promise<void> => {
            const user_id = Number(req.params.user_id);
            const listId = Number(req.params.listId);

            const deleted = await this.todoListService.deleteList(user_id, listId);
            if (!deleted) {
                res.status(404).json({ message: 'List not found' });
                return;
            }
            res.json({ message: 'List deleted' });
        };
}