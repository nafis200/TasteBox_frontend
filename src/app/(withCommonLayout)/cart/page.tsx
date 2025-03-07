
import CartProducts from '@/components/modules/UserDashboard/PaymentCard/CartProducts/CartProducts';
import PaymentDetails from '@/components/modules/UserDashboard/PaymentCard/PaymentDetails';
import React from 'react';

const Cart = () => {
    return (
        <div className="lg:flex md:flex">
            <CartProducts/>
            <PaymentDetails/>
        </div>
    );
};

export default Cart;