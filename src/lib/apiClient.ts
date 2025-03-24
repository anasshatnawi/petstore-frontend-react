import axios from "axios";
import { SERVER_URL } from "./constans";

export const apiClient = axios.create({
    baseURL: SERVER_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});
