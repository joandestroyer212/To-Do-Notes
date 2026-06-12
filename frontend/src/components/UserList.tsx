import type {User} from "../../../types/User.ts";
import type {FC} from "react";

interface UserListProps {
    users: User[];
    toggleIsCreating: VoidFunction;
    updateUser: (username: User) => void;
    deleteUser: (id: number) => void;
}

export const UserList: FC<UserListProps> = ({
    users,
    toggleIsCreating,
    updateUser,
    deleteUser
}) => {
    return (
        <div>
            {users.map((user) => (
                <div key={user.id}>
                    {user.username} - {user.email}
                    <a href={`/users/${user.id}/todo-lists`}></a>

                    <button onClick={() => updateUser(user)}>
                        Edit
                    </button>

                    <button onClick={() => deleteUser(user.id)}>
                        Delete
                    </button>
                </div>
            ))}

            <button onClick={toggleIsCreating}>
                Create new user
            </button>
        </div>
    )
}