import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card from '../components/Card';
import Require from '../components/Require';

export default function EditBook() {
    const [isLogin, setIsLogin] = useState(false);
    const { id } = useParams();
    const [book, setBook] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const login = JSON.parse(localStorage.getItem('isLogin'));
        setIsLogin(login);
        console.log(login)
    }, []);

    const [showDiv, setShowDiv] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setShowDiv(true);
        }, 200);

        return () => clearTimeout(timeout);
    }, []);

    useEffect(() => {
        fetch(`http://localhost:8081/books/${id}`)
            .then(response => response.json())
            .then(data => {
                setBook(data)
                console.log(data)
            })
            .catch(error => console.error(error));
    }, [id]);

    function handleSave(formData) {
        console.log(formData);
        fetch((`http://localhost:8081/books/${id}`), {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Failed to edit book");
                } else {
                    navigate(`/`);
                }
            })
            .catch(error => {
                console.error(error);
            });
    }

    return (
        <>
            <Navbar />
            <>
                {showDiv && <>
                    {isLogin ?
                        (<>
                            <Card title='Edit Book' isChange={true} data={book} onSave={handleSave}/>
                            <Footer content='Save' isShow={true} data={book} />
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
