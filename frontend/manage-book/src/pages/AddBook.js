import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card from '../components/Card';
import Require from '../components/Require';

export default function AddBook() {
    const [isLogin, setIsLogin] = useState(false);

    const navigate = useNavigate();

    function handleSave(formData) {
        console.log(formData);
        fetch("http://localhost:8081/books/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Failed to add book");
                } else {
                    navigate(`/`);
                }
            })
            .catch(error => {
                console.error(error);
            });
    }

    useEffect(() => {
        const login = JSON.parse(localStorage.getItem('isLogin'));
        setIsLogin(login);
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
            <Navbar />
            <>
                {showDiv && <>
                    {isLogin ?
                        (<>
                            <Card title='Add Book' isChange={true} onSave={handleSave} />
                            <Footer content='Save' isShow={true}/>
                        </>) :
                        (<>
                            <Require />
                        </>)
                    }
                </>
                }
            </>
        </>
    );
}
