import axios from "axios";
import httpStatus from "http-status";
import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import server from "../environment";


export const AuthContext = createContext({});

const client = axios.create({
    baseURL: `http://localhost:8000/api/v1/users`
});



export const AuthProvider = ({ children }) => {

    const authContext = useContext(AuthContext);


    const [userData, setUserData] = useState(authContext);


    const router = useNavigate();

    const handleRegister = async (name, username, password) => {
        try {
            let request = await client.post("/register", {
                name: name,
                username: username,
                password: password
            })


            if (request.status === httpStatus.CREATED) {
                return request.data.message;
            }
        } catch (err) {
            throw err;
        }
    }

   const handleLogin = async (username, password) => {
    try {
        let request = await client.post("/login", {
            username,
            password
        });

        console.log("Login response:", request.data);

        if (request.status === httpStatus.OK && request.data?.token) {
            localStorage.setItem("token", request.data.token);
            router("/home");
        } else {
            console.warn("Login failed: No token received.");
        }

    } catch (err) {
        if (err.response) {
            console.error("Login failed:", err.response.data?.message || err.response.statusText);
            alert(err.response.data?.message || "Login failed");
        } else if (err.request) {
            console.error("No response from server:", err.message);
        } else {
            console.error("Unexpected error:", err.message);
        }
    }
};


    const getHistoryOfUser = async () => {
        try {
            let request = await client.get("/get_all_activity", {
                params: {
                    token: localStorage.getItem("token")
                }
            });
            return request.data
        } catch
         (err) {
            throw err;
        }
    }

    const addToUserHistory = async (meetingCode) => {
        try {
            let request = await client.post("/add_to_activity", {
                token: localStorage.getItem("token"),
                meeting_code: meetingCode
            });
            return request
        } catch (e) {
            throw e;
        }
    }


    const data = {
        userData, setUserData, addToUserHistory, getHistoryOfUser, handleRegister, handleLogin
    }

    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    )

}