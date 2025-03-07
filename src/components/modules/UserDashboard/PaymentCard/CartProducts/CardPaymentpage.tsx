import React from "react";
import { Button } from "@/components/ui/button";
// import { PaymentUser } from "@/services/payment";
import { Minus, Plus, Trash } from "lucide-react";
import Image from "next/image";
import { useAppDispatch } from "@/redux/hooks";
import { decrementOrderQuantity, incrementOrderQuantity, removeProduct } from "@/redux/features/cartSlice";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CardPaymentpage = ({ product }:any) => {

  const dispatch = useAppDispatch();

  const handleIncrementQuantity = (id: string) => {
    dispatch(incrementOrderQuantity(id));
  };

  const handleDecrementQuantity = (id: string) => {
    dispatch(decrementOrderQuantity(id));
  };

  const handleRemoveProduct = (id: string) => {
    dispatch(removeProduct(id));
  };

  // const paymentDetails = {
  //   totalPrice: 200,
  //   name: "Nafis",
  //   phone_number: "01922208141",
  //   address: "Tongi",
  //   email: "n@gmail.com",
  // };

  // const handlePaymentProceed = async() => {
    
  //   const result = await PaymentUser(paymentDetails)
   

  //   if(result?.data){
  //       window.location.href = result.data
  //   }
    
  // };

  return (
    // <div>
    //   <Button
    //     onClick={handlePaymentProceed}
    //     className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700"
    //   >
    //     Go to Payment
    //   </Button>
    // </div>
    <div className="bg-white rounded-lg flex p-5 gap-5">
      <div className="h-full w-32 rounded-md overflow-hidden">
        <Image
          src={product?.image}
          height={200}
          width={200}
          alt="product"
          className="aspect-square object-cover"
        />
      </div>
      <div className="flex flex-col justify-between flex-grow">
        <h1 className="text-xl font-semibold">{product?.name}</h1>
        <hr className="my-1" />
        <div className="flex items-center justify-between">
          <h2>
            Price:
            <span>{product.price}</span>
          </h2>
          <div className="flex items-center gap-2">
            <p className="text-gray-500 font-semibold">Quantity</p>
            <Button
              onClick={() => handleDecrementQuantity(product._id)}
              variant="outline"
              className="size-8 rounded-sm"
            >
              <Minus />
            </Button>
            <p className="font-semibold text-xl p-2">
              {product?.orderQuantity}
            </p>
            <Button
              onClick={() => handleIncrementQuantity(product._id)}
              variant="outline"
              className="size-8 rounded-sm"
            >
              <Plus />
            </Button>
            <Button
              onClick={() => handleRemoveProduct(product._id)}
              variant="outline"
              className="size-8 rounded-sm"
            >
              <Trash className="text-red-500/50" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardPaymentpage;
