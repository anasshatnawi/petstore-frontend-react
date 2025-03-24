// Pet API functions using axios apiClient

import { apiClient } from "../../lib/apiClient";
import { Pet } from "./types";

export const getPets = async (): Promise<Pet[]> => {
    try {
        const response = await apiClient.get<Pet[]>("getPets");
        return response.data;
    } catch (err: any) {
        alert(err?.response?.data?.message || "Failed to fetch pets");
        throw err;
    }
};

export const createPet = async (pet: Pet): Promise<Pet> => {
    try {
        const response = await apiClient.post<Pet>("addPet", pet);
        return response.data;
    } catch (err: any) {
        alert(err?.response?.data?.message || "Failed to create pet");
        throw err;
    }
};

export const updatePet = async (id: number, pet: Pet): Promise<Pet> => {
    try {
        const response = await apiClient.put<Pet>(`updatePet/${id}`, pet);
        return response.data;
    } catch (err: any) {
        alert(err?.response?.data?.message || "Failed to update pet");
        throw err;
    }
};

export const deletePet = async (id?: number): Promise<void> => {
    try {
        await apiClient.delete<void>(`deletePet/${id}`);
    } catch (err: any) {
        alert(err?.response?.data?.message || "Failed to delete pet");
        throw err;
    }
};
