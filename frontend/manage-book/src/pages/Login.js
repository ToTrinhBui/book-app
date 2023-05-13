import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
    const [user, setUser] = useState({
        email: "",
        password: "",
    });
    const [errorMessage, setErrorMessage] = useState(null);

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch("http://localhost:8081/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Failed to login");
                } else {
                    localStorage.setItem("user", JSON.stringify(user.email));
                    localStorage.setItem("isLogin", true);
                    navigate(`/`);
                }
            })
            .catch(error => {
                console.error(error);
                setErrorMessage(`${error.message}. Maybe you do not have an account yet or the password you entered is incorrect.`);
            });
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUser(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <div className="login">
            <div className="left">
                <img src={process.env.PUBLIC_URL + '/images/login.png'} alt="login" />
                <h4>Welcome my friend</h4>
                <p>Just a couple of clicks and we start</p>
            </div>
            <div className="right">
                <h2>Welcome</h2>
                <h1 style={{ color: '#3949AB' }}>Sign in here</h1>
                <form>
                    <div className="input-user">
                        <div className="input-part">
                            <img src={process.env.PUBLIC_URL + '/images/email.png'} alt="email" />
                            <input placeholder="Email" type="text" value={user.email} 
                            onChange={handleChange} name="email"/>
                        </div>
                        <div className="input-part">
                            <img src={process.env.PUBLIC_URL + '/images/lock.png'} alt="password" />
                            <input placeholder="Password" type="password" value={user.password} 
                            onChange={handleChange} name="password"/>
                        </div>
                        {errorMessage && <p className="error-message">{errorMessage}</p>}
                    </div>
                    <button onClick={handleSubmit}>Sign in</button>
                </form>
                <div className="redirect">
                    <p>Have no account yet? <Link to='/register'><span>Sign up</span></Link></p>
                </div>
            </div>
        </div>
    )
}