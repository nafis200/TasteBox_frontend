
import CartProducts from '@/components/modules/UserDashboard/PaymentCard/CartProducts/CartProducts';
import PaymentDetails from '@/components/modules/UserDashboard/PaymentCard/PaymentDetails';
import React from 'react';

const Cart = () => {
    return (
        <div className="lg:flex md:flex lg:gap-10 lg:px-8 md:gap-6 md:px-4">
            <CartProducts/>
            <PaymentDetails/>
        </div>
    );
};

export default Cart;