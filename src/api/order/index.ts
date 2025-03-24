// Order API functions using axios apiClient

import { apiClient } from "../../lib/apiClient";
import { Order } from "./types";

export const getOrders = async (): Promise<Order[]> => {
    try {
        const response = await apiClient.get<Order[]>("getOrders");
        return response.data;
    } catch (err: any) {
        alert(err?.response?.data?.message || "Failed to fetch orders");
        throw err;
    }
};

export const createOrder = async (order: Order): Promise<Order> => {
    try {
        const response = await apiClient.post<Order>("addOrder", order);
        return response.data;
    } catch (err: any) {
        alert(err?.response?.data?.message || "Failed to create order");
        throw err;
    }
};

export const updateOrder = async (id: number, order: Order): Promise<Order> => {
    try {
        const response = await apiClient.put<Order>(`updateOrder/${id}`, order);
        return response.data;
    } catch (err: any) {
        alert(err?.response?.data?.message || "Failed to update order");
        throw err;
    }
};

export const deleteOrder = async (id?: number): Promise<void> => {
    try {
        await apiClient.delete<void>(`deleteOrder/${id}`);
    } catch (err: any) {
        alert(err?.response?.data?.message || "Failed to delete order");
        throw err;
    }
};
