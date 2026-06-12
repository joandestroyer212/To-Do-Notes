import {useForm} from "react-hook-form";
import type {CreateUserDTO, User} from "../../../types/User.ts";
import type {FC} from "react";

interface UpdateUserFormProps {
    user: User;
    refresh: VoidFunction;
}

export const UpdateUserForm: FC<UpdateUserFormProps> = ({ user, refresh }) => {
    const {
        handleSubmit,
        register,
        formState: {
            errors
        }
    } = useForm<CreateUserDTO>(
        {
            defaultValues: {
                username: user.username,
                email: user.email,
            },
        }
    );

    const updateUser = async (data: CreateUserDTO) => {
        await fetch(`http://localhost:3000/users/${user.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
        refresh();
    }



    return (
        <form onSubmit={handleSubmit(updateUser)}>
            <input placeholder={"Username"} {...register("username", {required: "Name is required"})} />
            {errors.username && <span>{errors.username.message}</span>}

            <input className="long_text" placeholder={"Email"} {...register("email", {required: "Email is required"})} />
            {errors.email && <span>{errors.email.message}</span>}

            <button type={'submit'}>Update User</button>
        </form>
    )
}