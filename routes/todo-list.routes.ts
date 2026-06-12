import { Router } from "express";
import { TodoListController } from "../controllers/todo-list.controller";
import { TodoListService } from "../services/todo-list.service";
import { TodoListModel } from "../models/todo-list.model";
import pool from "../config/db";

const todoListModel = new TodoListModel(pool);
const todoListService = new TodoListService(todoListModel);
const todoListController = new TodoListController(todoListService);

const todoListRoutes = Router();

todoListRoutes.get('/users/:user_id/todo-lists', todoListController.getAll);
todoListRoutes.get('/users/:user_id/todo-lists/:listId', todoListController.getById);
todoListRoutes.post('/users/:user_id/todo-lists', todoListController.create);
todoListRoutes.put('/users/:user_id/todo-lists/:listId', todoListController.update);
todoListRoutes.delete('/users/:user_id/todo-lists/:listId', todoListController.delete);

export default todoListRoutes;