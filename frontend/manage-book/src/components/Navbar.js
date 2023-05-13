import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Navbar() {
    const [isLogin, setIsLogin] = useState(localStorage.getItem("isLogin") || false);
    const [username, setUsername] = useState(null);

    const logout = () => {
        setIsLogin(false);
        localStorage.setItem("isLogin", false);
        localStorage.setItem("user", null);
        setUsername(null);
        window.location.reload(); // reload the page after logout
    };


    useEffect(() => {
        const email = localStorage.getItem("user");
        if (email) {
            const input = email.substring(1, email.length - 1)
            axios
                .get(`http://localhost:8081/auth/${input}`)
                .then((response) => setUsername(response.data.username))
                .catch((error) => console.error(error));
        }
    }, []);

    const [showDiv, setShowDiv] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setShowDiv(true);
        }, 200);

        return () => clearTimeout(timeout);
    }, []);

    return (
        <>
            <header>
                <Link to="/">
                    <h3>Home</h3>
                </Link>
                {showDiv &&
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
