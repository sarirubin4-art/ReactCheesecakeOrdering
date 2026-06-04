import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Success = () => {
    const navigate = useNavigate();

    const OnViewAllClick = () => {
        navigate('/vieworders');
    }



    return (
        <div className="card" style={{ width: '100 rem' }} >
            <div className="card-body">
                <h3 className="card-title">Thank you for choosing Dairy Redefined!</h3>
                <h4>Your order has been placed successfully</h4>
                <h5>You will receive a confirmation email shortly.</h5>
                <button className="btn btn-light" onClick={OnViewAllClick}>View All Orders</button>
            </div>
        </div>
    );
}
export default Success;