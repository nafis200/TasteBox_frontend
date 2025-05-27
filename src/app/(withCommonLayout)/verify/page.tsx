"use client";  

import { VerifyOrder } from '@/services/payment';
import { useEffect, useState } from 'react';

const Verify = () => {
  const [order_id, setOrderId] = useState<string | null>(null);  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [orderData, setOrderData] = useState<any[]>([]);  
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const queryParams = new URLSearchParams(window.location.search);
      const orderIdFromUrl = queryParams.get('order_id');
      setOrderId(orderIdFromUrl || "SP67c9fc2e38e7e"); 
    }
  }, []);

  useEffect(() => {
    if (order_id) {
      const fetchOrderData = async () => {
        try {
          setIsLoading(true);
          const data = await VerifyOrder(order_id);  
          setOrderData(data?.data);  
          setIsLoading(false);
        } catch (error) {
          console.error('Error fetching order data:', error);
          setIsLoading(false);
        }
      };

      fetchOrderData();
    }
  }, [order_id]);

  if (isLoading) return <div className="min-h-screen text-center bg-amber-400 dark:bg-amber-700 text-gray-900 dark:text-gray-100">Loading...</div>;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-3xl w-full">
        <h1 className="text-2xl font-semibold text-center mb-4 text-gray-800 dark:text-gray-100">Order Verification</h1>
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="font-bold text-gray-700 dark:text-gray-300">Order ID:</span>
            <span className="text-gray-900 dark:text-gray-100">{orderData[0]?.order_id}</span> 
          </div>
          <div className="flex justify-between">
            <span className="font-bold text-gray-700 dark:text-gray-300">Customer Name:</span>
            <span className="text-gray-900 dark:text-gray-100">{orderData[0]?.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-bold text-gray-700 dark:text-gray-300">Amount:</span>
            <span className="text-gray-900 dark:text-gray-100">{orderData[0]?.amount} {orderData[0]?.currency}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-bold text-gray-700 dark:text-gray-300">Paid Amount:</span>
            <span className="text-gray-900 dark:text-gray-100">{orderData[0]?.received_amount} {orderData[0]?.currency}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-bold text-gray-700 dark:text-gray-300">Payment Method:</span>
            <span className="text-gray-900 dark:text-gray-100">{orderData[0]?.method}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-bold text-gray-700 dark:text-gray-300">Payment Status:</span>
            <span className={`${orderData[0]?.is_verify === 1 ? 'text-green-500 dark:text-green-400' : 'text-red-500 dark:text-red-400'}`}>
              {orderData[0]?.is_verify === 1 ? "Verified" : "Not Verified"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-bold text-gray-700 dark:text-gray-300">Transaction Status:</span>
            <span className="text-gray-900 dark:text-gray-100">{orderData[0]?.sp_message}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-bold text-gray-700 dark:text-gray-300">Invoice No:</span>
            <span className="text-gray-900 dark:text-gray-100">{orderData[0]?.invoice_no}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Verify;
