import React, { useState, useEffect } from "react";
import { User } from "../api/user/types";
import { createUser, deleteUser, getUsers, updateUser } from "../api/user";

const UsersComponent: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [editingUser, setEditingUser] = useState<User>();
    const [newUser, setNewUser] = useState<User>({
        username: "",
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        status: "",
    });

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = () => {
        getUsers().then((data) => {
            setUsers(data);
        });
    };

    const handleCreateUser = (e: React.FormEvent) => {
        e.preventDefault();
        createUser(newUser).then(() => {
            fetchUsers();
            setNewUser({
                username: "",
                firstname: "",
                lastname: "",
                email: "",
                phone: "",
                status: "",
            });
        });
    };

    const handleDeleteUser = (id?: number) => {
        if (!id) return;
        deleteUser(id).then(() => fetchUsers());
    };

    const handleEditUser = (user: User) => {
        setEditingUser({ ...user });
    };

    const handleUpdateUser = (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingUser || !editingUser.id) return;

        updateUser(editingUser.id, editingUser).then(() => {
            fetchUsers();
            setEditingUser(undefined);
        });
    };

    const handleCancelEdit = () => {
        setEditingUser(undefined);
    };

    const handleNewUserChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setNewUser((prev) => ({ ...prev, [name]: value }));
    };

    const handleEditingUserChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setEditingUser((prev) =>
            prev ? { ...prev, [name]: value } : undefined
        );
    };

    return (
        <div className="container">
            <h2>Users</h2>

            <ul className="list">
                {users.map((user) => (
                    <li key={user.id} className="list-item">
                        <div>
                            <strong>{user.username}</strong>
                            <br />
                            {user.firstname} {user.lastname}
                            <br />
                            Email: {user.email}
                            <br />
                            Phone: {user.phone}
                            <br />
                            Status: {user.status}
                        </div>
                        <div className="button-group">
                            <button
                                className="edit-button"
                                onClick={() => handleEditUser(user)}
                            >
                                Edit
                            </button>
                            <button
                                className="delete-button"
                                onClick={() => handleDeleteUser(user.id)}
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>

            {/* EDIT FORM */}
            {editingUser && (
                <div className="form-container">
                    <h3>Edit User {editingUser.id}</h3>
                    <form onSubmit={handleUpdateUser} className="form">
                        <input
                            type="text"
                            value={editingUser.username}
                            onChange={handleEditingUserChange}
                            name="username"
                            placeholder="Username"
                            required
                        />
                        <input
                            type="text"
                            value={editingUser.firstname}
                            onChange={handleEditingUserChange}
                            name="firstname"
                            placeholder="First Name"
                            required
                        />
                        <input
                            type="text"
                            value={editingUser.lastname}
                            onChange={handleEditingUserChange}
                            name="lastname"
                            placeholder="Last Name"
                            required
                        />
                        <input
                            type="email"
                            value={editingUser.email}
                            onChange={handleEditingUserChange}
                            name="email"
                            placeholder="Email"
                            required
                        />
                        <input
                            type="text"
                            value={editingUser.phone}
                            onChange={handleEditingUserChange}
                            name="phone"
                            placeholder="Phone"
                        />
                        <select
                            value={editingUser.status}
                            onChange={handleEditingUserChange}
                            name="status"
                            required
                        >
                            <option value="" disabled>
                                Select Status
                            </option>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>

                        <button type="submit" className="submit-button">
                            Update User
                        </button>
                        <button
                            type="button"
                            className="cancel-button"
                            onClick={handleCancelEdit}
                        >
                            Cancel
                        </button>
                    </form>
                </div>
            )}

            {/* CREATE FORM */}
            <div className="form-container">
                <h3>Create New User</h3>
                <form onSubmit={handleCreateUser} className="form">
                    <input
                        type="text"
                        value={newUser.username}
                        onChange={handleNewUserChange}
                        name="username"
                        placeholder="Username"
                        required
                    />
                    <input
                        type="text"
                        value={newUser.firstname}
                        onChange={handleNewUserChange}
                        name="firstname"
                        placeholder="First Name"
                        required
                    />
                    <input
                        type="text"
                        value={newUser.lastname}
                        onChange={handleNewUserChange}
                        name="lastname"
                        placeholder="Last Name"
                        required
                    />
                    <input
                        type="email"
                        value={newUser.email}
                        onChange={handleNewUserChange}
                        name="email"
                        placeholder="Email"
                        required
                    />
                    <input
                        type="text"
                        value={newUser.phone}
                        onChange={handleNewUserChange}
                        name="phone"
                        placeholder="Phone"
                    />
                    <select
                        value={newUser.status}
                        onChange={handleNewUserChange}
                        name="status"
                        required
                    >
                        <option value="" disabled>
                            Select Status
                        </option>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                    </select>

                    <button type="submit" className="submit-button">
                        Create User
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UsersComponent;
