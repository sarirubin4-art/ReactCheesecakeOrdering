import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import axios from 'axios';
import { Link} from 'react-router-dom';

const ViewOrders = () => {
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        const load = async () => {
            const { data } = await axios.get('/api/home/getorders');
            
            setOrders(data);
        }
        load();
    },[])

    return (<div className="container" style={{marginTop:'5px'} }>
        <table className="table table-hover table-bordered">
            <thead>
                <tr>
                    <th>Customer</th>
                    <th>Description</th>
                    <th>Quantity</th>
                    <th>Special Requests</th>
                    <th>Delivery Date</th>
                </tr>
            </thead>
            <tbody>
                {orders.map((o,idx)=> {
                    return <tr key={idx }>
                        <td>
                            <Link to={`/vieworder?id=${o.id}`}>
                                {o.customerName} - {o.email}
                            </Link>
                        </td>
                        <td>{o.baseFlavor} Cheesecake with {o.toppings}</td>
                        <td>{o.quantity}</td>
                        <td>{o.specialRequests}</td>
                        <td>{dayjs(o.deliveryDate).format("MM/DD/YYYY")}</td>
                    </tr>
                })}
            </tbody>
        </table>
    </div>)
}

export default ViewOrders;