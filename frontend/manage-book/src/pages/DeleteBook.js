import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card from '../components/Card';
import Require from '../components/Require';
import Loading from '../components/Loading';

export default function DeleteBook() {
    const [isLogin, setIsLogin] = useState(false);
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        const login = JSON.parse(localStorage.getItem('isLogin'));
        setIsLogin(login);
        console.log(login)
    }, []);

    useEffect(() => {
        const fetchBookData = async () => {
            try {
                const response = await axios.get(`http://localhost:8081/books/${id}`);
                const data = response.data;
                setBook(data);
                setIsLoading(false);
                console.log(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchBookData();
    }, [id]);

    function handleSave(formData) {
        console.log(formData);
        fetch((`http://localhost:8081/books/${id}`), {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Failed to delete book");
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
                {isLoading ?
                    (<div className='padding'>
                    <Loading />
                </div>)
                    :
                    <>
                        {isLogin ?
                            (<>
                                <Card
                                    title='Are you sure you want to delete this book?'
                                    isChange={false}
                                    data={book}
                                    onSave={handleSave}
                                />
                                <Footer content='Delete' isShow={true} data={book} />
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
