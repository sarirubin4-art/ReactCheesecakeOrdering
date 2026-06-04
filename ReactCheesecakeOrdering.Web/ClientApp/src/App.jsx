import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './Pages/Home';
import Success from './Pages/Success';
import OrderForm from './Pages/OrderForm';
import ViewOrders from './Pages/ViewOrders'
import dayjs from 'dayjs'
import ViewOrder from './Pages/ViewOrder';
const App = () => {
    return (
        <Layout>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/orderForm' element={<OrderForm />} />
                <Route path='/success' element={<Success />} />
                <Route path='/viewOrders' element={<ViewOrders />} />
                <Route path='/viewOrder' element={<ViewOrder/> }/>
            </Routes>
        </Layout>
    );
}

export default App;