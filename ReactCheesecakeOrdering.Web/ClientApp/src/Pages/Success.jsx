import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

const Success = (order) => {
    const navigate = useNavigate();
    return (
        <div class="card" style="width: 100rem;">
                <div class="card-body">
                    <h3 class="card-title">Your order has been placed</h3>
                    <h4>{order.quantity} {order.base} Cheesecake{order.quantity > 1 ? "s" : ''} topped with {order.toppings} coming right up!!</h4>
                    <h4>Your order will be delivered on {dayjs(order.deliveryDate).format("mm/dd/yyyy")}.</h4>
                    <button className="btn btn-light" onClick={navigate("/viewOrders")}>View All Orders</button>
                </div>
        </div>
    );
}
export default Success;