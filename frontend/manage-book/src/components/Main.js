import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Main() {
    const [isLogin, setIsLogin] = useState(false);
    const [items, setItems] = useState([]);

    useEffect(() => {
        const login = JSON.parse(localStorage.getItem('isLogin'));
        setIsLogin(login);
    }, []);

    useEffect(() => {
        axios.get('http://localhost:8081/books')
            .then(response => (
                setItems(response.data)
            ))
            .catch(error =>
                console.error(error)
            );
    }, []);

    return (
        <div className="container main">
            <div className="title">
                <div className="flex1">
                    <div className="heading">
                        <h5>EXPLORE YOUR BOOK WORLD</h5>
                        <h2>Book List</h2>
                    </div>
                    {isLogin && <Link to='/add'><p className="inputAdd">Add book</p></Link>}
                </div>
            </div>
            <div className="main-table">
                <table>
                    <thead>
                        <tr>
                            <th >ID</th>
                            <th >Book Name</th>
                            <th >Author</th>
                            {isLogin &&
                                <>
                                    <th></th>
                                    <th></th>
                                </>
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {items.map(item => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.title}</td>
                                <td>{item.author}</td>
                                {isLogin &&
                                    <>
                                        <td className="link" ><Link to={`/view/${item.id}`} >View</Link></td >
                                        <td className="link"><Link to={`/delete/${item.id}`} >Delete</Link></td>
                                    </>
                                }
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>
        </div >
    )
}