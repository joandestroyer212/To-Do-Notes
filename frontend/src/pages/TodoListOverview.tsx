import { useEffect, useState } from "react";
import type { TodoList } from "../../../types/Todo-list.ts";
import { CreateTodoListForm, UpdateTodoListForm } from "../components";
import { useParams } from "react-router";

export const TodoListOverview = () => {
    const { user_id } = useParams();
    const [username, setUser] = useState<"string">();

    const [todoLists, setTodoLists] = useState<TodoList[]>([]);
    const [isCreating, setIsCreating] = useState<boolean>(false);
    const [listToUpdate, setListToUpdate] = useState<TodoList | null>(null);

    const fetchTodoLists = async () => {
        const response = await fetch(
            `http://localhost:3000/users/${user_id}/todo-lists`
        );

        const result = await response.json();

        setTodoLists(result.data);
    };

    const fetchUser = async () => {
        const response = await fetch(`http://localhost:3000/users/${user_id}`);
        const result = await response.json();
        
        setUser(result.data.username);
    }

    useEffect(() => {
        fetchTodoLists();
        fetchUser();
    }, [user_id]);

    const refreshLists = () => {
        fetchTodoLists();
        fetchUser();
        setIsCreating(false);
        setListToUpdate(null);
    };

    const toggleIsCreating = () => {
        setIsCreating(!isCreating);
        setListToUpdate(null);
    };

    const deleteList = async (id: number) => {
        await fetch(
            `http://localhost:3000/users/${user_id}/todo-lists/${id}`,
            {
                method: "DELETE",
            }
        );

        refreshLists();
    };

    return (
        <div className="page">
            <h1>To-Do Lists for {username}</h1>

            {listToUpdate ? (
                <UpdateTodoListForm
                    todoList={listToUpdate}
                    refresh={refreshLists}
                />
            ) : isCreating ? (
                <CreateTodoListForm refresh={refreshLists} />
            ) : (
                <>
                    {todoLists.length === 0 ? (
                        <p>No To-Do lists found for this user.</p>
                    ) : (
                        <ul>
                            {todoLists.map((list) => (
                                <li key={list.id}>
                                    <h3>{list.title}</h3>
                                    <p>{list.description}</p>

                                    <button onClick={() => setListToUpdate(list)}>
                                        Update list
                                    </button>

                                    <button onClick={() => deleteList(list.id)}>
                                        Delete list
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}

                    <button onClick={toggleIsCreating}>
                        Create new To-Do list
                    </button>
                    <a href="http://localhost:5173/users">Get Back to Users</a>
                </>
            )}
        </div>
    );
};