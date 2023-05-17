import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import Footer from '../components/Footer';
import Require from '../components/Require';
import Loading from '../components/Loading';

export default function DetailBook() {
    const [isLogin, setIsLogin] = useState(false);
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const login = JSON.parse(localStorage.getItem('isLogin'));
        setIsLogin(login);
    }, []);

    // useEffect(() => {
    //   fetch(`http://localhost:8081/books/${id}`)
    //     .then(response => response.json())
    //     .then(data => {
    //         setBook(data)
    //         console.log(data)
    //     })
    //     .catch(error => console.error(error));
    // }, [id]);

    // useEffect(() => {
    //     axios.get(`http://localhost:8081/books/${id}`)
    //       .then(response => response.data) // Access the data property when use axios lib
    //       .then(data => {
    //           setBook(data)
    //           console.log(data)
    //       })
    //       .catch(error => console.error(error));
    //   }, [id]);    

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



    return (
        <>
            <Navbar />
            <>
                {isLoading ?
                    (<div className='padding'>
                        <Loading />
                    </div>)
                    :
                    (<>
                        {isLogin ?
                            (<>
                                <Card title='Detail Book' isChange={false} data={book} />
                                <Footer content='Edit' isShow={true} data={book} />
                            </>) :
                            (<>
                                <Require />
                            </>)
                        }
                    </>)
                }
            </>
        </>
    );
}