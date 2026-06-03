import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';
import { Link } from 'react-router-dom'; 

const Home = () => {

    const [count, setCount] = useState(0);

    const onButtonClick = () => {
        setCount(count + 1);
    }
    
    return (
        <div className="app-container">
            <div className="d-flex flex-column justify-content-center align-items-center">
                <h1>Welcome to Dairy Redefined</h1>
                <h2>Elegantly rich. Delightfully smooth. Simply unforgettable.</h2>
                <Link to='/orderform'>
                <button onClick={onButtonClick} className="btn btn-light mb-3">Click here to redefine your cheesecake</button>
                </Link>
            </div>
        </div>
    );
};

export default Home;