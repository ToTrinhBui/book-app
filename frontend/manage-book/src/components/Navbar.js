import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Loading from "./Loading";

export default function Navbar() {
    const [isLogin, setIsLogin] = useState(false);
    const [username, setUsername] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const logout = () => {
        setIsLogin(false);
        localStorage.setItem("isLogin", false);
        localStorage.setItem("user", null);
        setUsername(null);
        window.location.reload(); // reload the page after logout
    };

    useEffect(() => {
        const fetchData = async () => {
            const email = localStorage.getItem('user');
            if (email) {
                const input = email.substring(1, email.length - 1);
                try {
                    const response = await axios.get(`http://localhost:8081/auth/${input}`);
                    setUsername(response.data.username);
                    setIsLoading(false);
                } catch (error) {
                    console.error(error);
                }
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const login = JSON.parse(localStorage.getItem('isLogin'));
        setIsLogin(login);
    }, []);
    
    return (
        <>
            <header>
                <Link to="/">
                    <h3>Home</h3>
                </Link>
                {isLoading ?
                    <Loading /> :
                    <div className="user">
                        {isLogin && username ? (
                            <>
                                <h3>{username}</h3>
                                <h3 onClick={logout} style={{ cursor: "pointer" }}>
                                    Logout
                                </h3>
                            </>
                        ) : (
                            <>
                                <Link to="/login">
                                    <h3>Login</h3>
                                </Link>
                                <Link to="/register">
                                    <h3>Register</h3>
                                </Link>
                            </>
                        )}
                    </div>
                }

            </header>
        </>
    );
}
