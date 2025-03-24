// User API functions using axios apiClient

import { apiClient } from "../../lib/apiClient";
import { User } from "./types";

export const getUsers = async (): Promise<User[]> => {
    try {
        const response = await apiClient.get<User[]>("getUsers");
        return response.data;
    } catch (err: any) {
        alert(err?.response?.data?.message || "Failed to fetch users");
        throw err;
    }
};

export const createUser = async (user: User): Promise<User> => {
    try {
        const response = await apiClient.post<User>("addUser", user);
        return response.data;
    } catch (err: any) {
        alert(err?.response?.data?.message || "Failed to create user");
        throw err;
    }
};

export const updateUser = async (id: number, user: User): Promise<User> => {
    try {
        const response = await apiClient.put<User>(`updateUser/${id}`, user);
        return response.data;
    } catch (err: any) {
        alert(err?.response?.data?.message || "Failed to update user");
        throw err;
    }
};

export const deleteUser = async (id?: number): Promise<void> => {
    try {
        await apiClient.delete<void>(`deleteUser/${id}`);
    } catch (err: any) {
        alert(err?.response?.data?.message || "Failed to delete user");
        throw err;
    }
};
