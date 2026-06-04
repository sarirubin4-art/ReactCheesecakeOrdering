import React, { useState,useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const ViewOrder = () => {

    const [order, setOrder] = useState({
        name: '',
        email: '',
        baseFlavor: '',
        quantity: 1,
        specialRequests: '',
        deliveryDate: ''
    });

    const id = useParams();

    useEffect(()=>{
        const getOrder = async () => {
            const  data  = axios.get(`/api/home/getorder?${id}`);
            setOrder( data );
        }
        getOrder();
    }, [])

    return (
        <div className="card">
            <div className="card-header">
                <div className="card-title">{order.name}</div>
                <div>{order.email}</div>
            </div>
            <div className="card-body">
                <h5 className="card-title">{order.quantity} Cheesecake{ order.quantity>1?'s':''} with {order.baseFlavor} Base</h5>
                <p className="card-text">Topped with {order.toppings}</p>
                <p className="card-text">{order.specialRequests != '' ? order.specialRequests : ''}</p> 
                <Link to='/vieworders' className='btn btn-light'>Return to all orders</Link>
            </div>
        </div>
    )
}

export default ViewOrder;