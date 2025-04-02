import React, { useState, useEffect, ChangeEvent } from "react";
import { createOrder, deleteOrder, getOrders, updateOrder } from "../api/order";
import { Order } from "../api/order/types";
import { Pet } from "../api/pet/types";
import { getPets } from "../api/pet";

export default function Orders() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [pets, setPets] = useState<Pet[]>([]);
    const [editingOrder, setEditingOrder] = useState<Order>();
    const [newOrder, setNewOrder] = useState<Order>({
        petId: 0,
        quantity: 1,
        shipDate: "",
        status: "",
        complete: false,
    });

    useEffect(() => {
        fetchOrders();
        getPets().then((data) => setPets(data));
    }, []);

    const fetchOrders = async (): Promise<void> => {
        const data = await getOrders();
        setOrders(data);
    };

    const createOrderSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!newOrder.petId || !newOrder.status) {
            alert("Please select a pet and status.");
            return;
        }

        createOrder(newOrder)
            .then(() => {
                setNewOrder({
                    petId: 0,
                    quantity: 1,
                    shipDate: "",
                    status: "",
                    complete: false,
                });
            })
            .catch((error) => console.error("Error creating order:", error));
    };

    const deleteOrderSubmit = (id?: number) => {
        deleteOrder(id);
    };

    const editOrder = (order: Order) => {
        setEditingOrder({ ...order });
    };

    const updateOrderSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!editingOrder || !editingOrder.id) return;

        updateOrder(editingOrder.id, editingOrder).then(() => {
            setEditingOrder(undefined);
        });
    };

    const cancelEdit = () => {
        setEditingOrder(undefined);
    };

    const handleNewOrderChange = (
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value, type } = e.target;
        const val = type === "checkbox" ? e.target.checked : value;

        setNewOrder((prev) => ({
            ...prev,
            [name]: val,
        }));
    };

    const handleEditingOrderChange = (
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value, type } = e.target;
        const val = type === "checkbox" ? e.target.checked : value;

        setEditingOrder((prev) => {
            if (!prev) return;
            return { ...prev, [name]: val };
        });
    };

    const formatDate = (dateString: string) => {
        if (!dateString) return "";
        return new Date(dateString).toLocaleString();
    };

    return (
        <div className="container">
            <div className="header">
                <h2>Orders</h2>
                <button onClick={fetchOrders} className="refresh-button">
                    Refresh Pets
                </button>
            </div>

            <ul className="list">
                {orders.map((order) => (
                    <li key={order.id} className="list-item">
                        <div>
                            Pet ID: <strong>{order.petId}</strong> <br />
                            Quantity: {order.quantity} <br />
                            Status: {order.status} <br />
                            Ship Date: {formatDate(order.shipDate)} <br />
                            Complete: {order.complete ? "Yes" : "No"}
                        </div>
                        <div className="button-group">
                            <button
                                className="edit-button"
                                onClick={() => editOrder(order)}
                            >
                                Edit
                            </button>
                            <button
                                className="delete-button"
                                onClick={() => deleteOrderSubmit(order.id)}
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>

            {editingOrder && (
                <div className="form-container">
                    <h3>Edit Order {editingOrder.id}</h3>
                    <form onSubmit={updateOrderSubmit} className="form">
                        <select
                            value={editingOrder.petId}
                            onChange={handleEditingOrderChange}
                            name="petId"
                            required
                        >
                            <option value="" disabled>
                                Select a Pet
                            </option>
                            {pets.map((pet) => (
                                <option key={pet.id} value={pet.id}>
                                    {pet.name}
                                </option>
                            ))}
                        </select>

                        <input
                            autoComplete="off"
                            value={editingOrder.quantity}
                            onChange={handleEditingOrderChange}
                            name="quantity"
                            placeholder="Quantity"
                            type="number"
                            required
                        />

                        <input
                            autoComplete="off"
                            value={
                                editingOrder.shipDate
                                    ? new Date(editingOrder.shipDate)
                                          .toISOString()
                                          .slice(0, 16)
                                    : ""
                            }
                            onChange={handleEditingOrderChange}
                            name="shipDate"
                            placeholder="Ship Date"
                            type="datetime-local"
                            required
                        />

                        <select
                            value={editingOrder.status}
                            onChange={handleEditingOrderChange}
                            name="status"
                            required
                        >
                            <option value="" disabled>
                                Select Status
                            </option>
                            <option value="Placed">Placed</option>
                            <option value="Processing">Processing</option>
                            <option value="Shipped">Shipped</option>
                        </select>

                        <label className="checkbox-label">
                            <input
                                checked={editingOrder.complete}
                                onChange={handleEditingOrderChange}
                                name="complete"
                                type="checkbox"
                            />
                            Complete
                        </label>

                        <button type="submit" className="submit-button">
                            Update Order
                        </button>
                        <button
                            type="button"
                            className="cancel-button"
                            onClick={cancelEdit}
                        >
                            Cancel
                        </button>
                    </form>
                </div>
            )}

            <div className="form-container">
                <h3>Add New Order</h3>
                <form onSubmit={createOrderSubmit} className="form">
                    <select
                        value={newOrder.petId}
                        onChange={handleNewOrderChange}
                        name="petId"
                        required
                    >
                        <option value="" disabled>
                            Select a Pet
                        </option>
                        {pets.map((pet) => (
                            <option key={pet.id} value={pet.id}>
                                {pet.name}
                            </option>
                        ))}
                    </select>

                    <input
                        autoComplete="off"
                        value={newOrder.quantity}
                        onChange={handleNewOrderChange}
                        name="quantity"
                        placeholder="Quantity"
                        type="number"
                        required
                    />

                    <input
                        autoComplete="off"
                        value={newOrder.shipDate}
                        onChange={handleNewOrderChange}
                        name="shipDate"
                        placeholder="Ship Date"
                        type="datetime-local"
                        required
                    />

                    <select
                        value={newOrder.status}
                        onChange={handleNewOrderChange}
                        name="status"
                        required
                    >
                        <option value="" disabled>
                            Select Status
                        </option>
                        <option value="Placed">Placed</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                    </select>

                    <label className="checkbox-label">
                        <input
                            checked={newOrder.complete}
                            onChange={handleNewOrderChange}
                            name="complete"
                            type="checkbox"
                        />
                        Complete
                    </label>

                    <button type="submit" className="submit-button">
                        Create Order
                    </button>
                </form>
            </div>
        </div>
    );
}
