import type {User, CreateUserDTO} from "../../../types/User.ts";
import type {FC} from "react";

interface DeleteUserFormProps {
    user: User;
    refresh: VoidFunction;
}

export const DeleteUserForm: FC<DeleteUserFormProps> = ({ user, refresh }) => {

    const deleteUser = async (data: CreateUserDTO) => {
        await fetch(`http://localhost:3000/users/${user.id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
        refresh();
    }

    deleteUser(user);
}