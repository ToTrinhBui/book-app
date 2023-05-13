import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import Footer from '../components/Footer';
import Require from '../components/Require';

export default function DetailBook() {
    const [isLogin, setIsLogin] = useState(false);
    const { id } = useParams();
    const [book, setBook] = useState(null);

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
  
    // useEffect(() => {
    //   fetch(`http://localhost:8081/books/${id}`)
    //     .then(response => response.json())
    //     .then(data => {
    //         setBook(data)
    //         console.log(data)
    //     })
    //     .catch(error => console.error(error));
    // }, [id]);

    useEffect(() => {
        axios.get(`http://localhost:8081/books/${id}`)
          .then(response => response.data) // Access the data property when use axios lib
          .then(data => {
              setBook(data)
              console.log(data)
          })
          .catch(error => console.error(error));
      }, [id]);      
    

    return (
        <>
            <Navbar />
            <>
                {showDiv && <>
                    {isLogin ?
                        (<>
                            <Card title='Detail Book' isChange={false} data={book}/>
                            <Footer content='Edit' isShow={true} data={book}/>
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