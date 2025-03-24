import React, { useState, useEffect } from "react";
import { createPet, deletePet, getPets, updatePet } from "../api/pet";
import { Pet } from "../api/pet/types";

type FrontPet = {
    id?: number;
    name: string;
    category: string;
    tags: string;
    photoUrls: string;
    status: string;
};

export default function Pets() {
    const [pets, setPets] = useState<Pet[]>([]);
    const [editingPet, setEditingPet] = useState<FrontPet>();
    const [newPet, setNewPet] = useState<FrontPet>({
        name: "",
        category: "",
        tags: "",
        photoUrls: "",
        status: "",
    });

    useEffect(() => {
        fetchPets();
    }, []);

    const fetchPets = async (): Promise<void> => {
        const data = await getPets();
        setPets(data);
    };

    const handleNewPetChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >
    ): void => {
        const { name, value } = e.target;
        setNewPet((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleEditingPetChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >
    ): void => {
        const { name, value } = e.target;
        if (editingPet) {
            setEditingPet((prev) => ({
                ...prev!,
                [name]: value,
            }));
        }
    };

    const createPetHandler = async (
        e: React.FormEvent<HTMLFormElement>
    ): Promise<void> => {
        e.preventDefault();

        await createPet({
            ...newPet,
            photoUrls: newPet.photoUrls
                .split(",")
                .filter((url) => url.trim() !== ""),
        });

        fetchPets();
        setNewPet({
            name: "",
            category: "",
            tags: "",
            photoUrls: "",
            status: "",
        });
    };

    const deletePetHandler = async (id?: number): Promise<void> => {
        if (!id) return;

        await deletePet(id);
        fetchPets();
    };

    const editPet = (pet: Pet): void => {
        setEditingPet({
            ...pet,
            photoUrls: pet.photoUrls.join(","),
        });
    };

    const updatePetHandler = async (
        e: React.FormEvent<HTMLFormElement>
    ): Promise<void> => {
        e.preventDefault();

        if (!editingPet || !editingPet.id) return;

        await updatePet(editingPet.id, {
            ...editingPet,
            photoUrls: editingPet.photoUrls
                .split(",")
                .filter((url) => url.trim() !== ""),
        });

        fetchPets();
        setEditingPet(undefined);
    };

    const cancelEdit = (): void => {
        setEditingPet(undefined);
    };

    return (
        <div className="container">
            <h2>Pets</h2>

            <ul className="list">
                {pets.map((pet) => (
                    <li key={pet.id} className="list-item">
                        <div>
                            <strong>{pet.name}</strong> <br />
                            Category: {pet.category} <br />
                            Tags: {pet.tags} <br />
                            Status: <strong>{pet.status}</strong>
                        </div>
                        <div className="button-group">
                            <button
                                className="edit-button"
                                onClick={() => editPet(pet)}
                            >
                                Edit
                            </button>
                            <button
                                className="delete-button"
                                onClick={() => deletePetHandler(pet.id)}
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>

            {/* EDIT FORM */}
            {editingPet && (
                <div className="form-container">
                    <h3>Edit Pet {editingPet.id}</h3>
                    <form onSubmit={updatePetHandler} className="form">
                        <input
                            type="text"
                            value={editingPet.name}
                            onChange={handleEditingPetChange}
                            name="name"
                            placeholder="Name"
                            required
                        />
                        <select
                            value={editingPet.category}
                            onChange={handleEditingPetChange}
                            name="category"
                            required
                        >
                            <option value="Dog">Dog</option>
                            <option value="Cat">Cat</option>
                            <option value="Bunny">Bunny</option>
                        </select>
                        <input
                            type="text"
                            value={editingPet.tags}
                            onChange={handleEditingPetChange}
                            name="tags"
                            placeholder="Tags"
                            required
                        />
                        <textarea
                            value={editingPet.photoUrls}
                            onChange={handleEditingPetChange}
                            name="photoUrls"
                            placeholder="Photo URLs (comma separated)"
                        ></textarea>
                        <select
                            value={editingPet.status}
                            onChange={handleEditingPetChange}
                            name="status"
                            required
                        >
                            <option value="Available">Available</option>
                            <option value="Pending">Pending</option>
                            <option value="Sold">Sold</option>
                        </select>

                        <button type="submit" className="submit-button">
                            Update Pet
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

            {/* CREATE FORM */}
            <div className="form-container">
                <h3>Add New Pet</h3>
                <form onSubmit={createPetHandler} className="form">
                    <input
                        value={newPet.name}
                        onChange={handleNewPetChange}
                        name="name"
                        placeholder="Name"
                        required
                    />
                    <select
                        value={newPet.category}
                        onChange={handleNewPetChange}
                        name="category"
                        required
                    >
                        <option value="" disabled>
                            Select Category
                        </option>
                        <option value="Dog">Dog</option>
                        <option value="Cat">Cat</option>
                        <option value="Bunny">Bunny</option>
                    </select>
                    <input
                        value={newPet.tags}
                        onChange={handleNewPetChange}
                        name="tags"
                        placeholder="Tags"
                        required
                    />
                    <textarea
                        value={newPet.photoUrls}
                        onChange={handleNewPetChange}
                        name="photoUrls"
                        placeholder="Photo URLs (comma separated)"
                    ></textarea>
                    <select
                        value={newPet.status}
                        onChange={handleNewPetChange}
                        name="status"
                        required
                    >
                        <option value="" disabled>
                            Select Status
                        </option>
                        <option value="Available">Available</option>
                        <option value="Pending">Pending</option>
                        <option value="Sold">Sold</option>
                    </select>
                    <button type="submit" className="submit-button">
                        Create Pet
                    </button>
                </form>
            </div>
        </div>
    );
}
