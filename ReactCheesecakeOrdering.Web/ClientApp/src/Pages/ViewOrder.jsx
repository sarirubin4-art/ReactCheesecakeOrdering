import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const ViewOrder = () => {

    const { id } = useParams();

    const [order, setOrder] = useState({
        name: '',
        email: '',
        baseFlavor: '',
        quantity: 1,
        specialRequests: '',
        deliveryDate: ''
    });

    useEffect(() => {
        const getOrder = async () => {
            const { data } = await axios.get(`/api/home/getorder?id=${id}`);
            setOrder(data);
            console.log(order);
        }
        getOrder();
    }, [])

    return (
        <div className="card" style={{marginTop:"5px"} } >
            <div className="card-header">
                <div className="card-title"><h1>{order.customerName}</h1></div>
                <div>{order.email}</div>
            </div>
            <div className="card-body">
                <h5 className="card-title">{order.quantity} Cheesecake{order.quantity > 1 ? 's' : ''} with {order.baseFlavor} Base</h5>
                <p className="card-text">Topped with {order.toppings}</p>
                <p className="card-text">{order.specialRequests != '' ? `Special Requests: ${order.specialRequests}` : ''}</p>
                <Link to='/vieworders' className='btn btn-light'>Return to all orders</Link>
            </div>
        </div>
    )
}

export default ViewOrder;