import {useEffect, useState} from "react";
import type {User} from "../../../types/User.ts";
import {CreateUserForm, UpdateUserForm, DeleteUserForm} from "../components";

export const UserOverview = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [isCreating, setIsCreating] = useState<boolean>(false);
    const [userToUpdate, setUserToUpdate] = useState<User | null>(null);
    const [userToDelete, setUserToDelete] = useState<User | null>(null);

    const fetchUsers = async () => {
        const response = await fetch('http://localhost:3000/users');
        const result = await response.json();
        
        setUsers(result.data);
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    const toggleIsCreating = () => {
        setIsCreating(true);
    }

    const refreshUsers = () => {
        fetchUsers();
        setIsCreating(false);
        setUserToUpdate(null);
        setUserToDelete(null)
    }

    return (
        <div className="page">
            <h1>Users</h1>

            { userToDelete ? ( 
                <DeleteUserForm user={userToDelete} refresh={refreshUsers}/>
            ) : userToUpdate ? (
                <UpdateUserForm user={userToUpdate} refresh={refreshUsers} />
            ) : isCreating ? (
                <CreateUserForm refresh={refreshUsers}/> 
            ) : (
                <>
                    <ul>
                        {users.map((user) => (
                            <li key={user.id}>
                                <a href={`/users/${user.id}/todo-lists`}>
                                    {user.username} 
                                </a>
                                {user.email} 
                                <button onClick={ () => setUserToUpdate(user)}> Update user</button>
                                <button onClick={ () => setUserToDelete(user)}> Delete user</button> 
                            </li>
                        ))}
                    </ul>
                    
                    <button onClick={toggleIsCreating}>
                        Create new user
                    </button>
                </>
            )} 
        </div>
    );

}
