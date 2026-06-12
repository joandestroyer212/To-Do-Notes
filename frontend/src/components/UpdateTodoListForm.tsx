import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import type { FC } from "react";
import type { TodoList, CreateTodoListDTO } from "../../../types/Todo-list.ts";

interface UpdateTodoListFormProps {
    todoList: TodoList;
    refresh: VoidFunction;
}

export const UpdateTodoListForm: FC<UpdateTodoListFormProps> = ({
    todoList,
    refresh,
}) => {
    const { user_id } = useParams();

    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<CreateTodoListDTO>({
        defaultValues: {
            title: todoList.title,
            description: todoList.description,
        },
    });

    const updateList = async (data: CreateTodoListDTO) => {
        await fetch(
            `http://localhost:3000/users/${user_id}/todo-lists/${todoList.id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            }
        );

        refresh();
    };

    return (
        <form onSubmit={handleSubmit(updateList)}>
            <input
                placeholder="Title"
                {...register("title", { required: "Title is required" })}
            />

            {errors.title && <span>{errors.title.message}</span>}

            <input className="long_text"
                placeholder="Description"
                {...register("description")}
            />

            <button type="submit">
                Update List
            </button>
        </form>
    );
};