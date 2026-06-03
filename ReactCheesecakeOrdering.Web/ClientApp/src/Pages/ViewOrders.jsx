import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import axios from 'axios';

const ViewOrders = () => {
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        const load = async () => {
            const { data } = await axios.get('/api/home/getorders');
            
            setOrders(data);
        }
        load();
    },[])

    return (<div className="container">
        <table className="table table-hover table-bordered">
            <thead>
                <tr>
                    <th>Customer</th>
                    <th>Description</th>
                    <th>Quantity</th>
                    <th>Delivery Date</th>
                </tr>
            </thead>
            <tbody>
                {orders.map(o => {
                    return <tr>
                        <td>{o.name}</td>
                        <td>{o.base} Cheesecake with {o.toppings}</td>
                        <td>{o.quantity}</td>
                        <td>{dayjs(o.deliveryDate).format("mm/dd/yyyy")}</td>
                    </tr>
                })}
            </tbody>
        </table>
    </div>)
}

export default ViewOrders;