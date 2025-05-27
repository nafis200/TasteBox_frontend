import React from "react";
import { Button } from "@/components/ui/button";
// import { PaymentUser } from "@/services/payment";
import { Minus, Plus, Trash } from "lucide-react";
import Image from "next/image";
import { useAppDispatch } from "@/redux/hooks";
import { decrementOrderQuantity, incrementOrderQuantity, removeProduct } from "@/redux/features/cartSlice";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CardPaymentpage = ({ product }: any) => {

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


  return (
  
    <div className="bg-white dark:bg-gray-800 rounded-lg flex p-5 gap-5">
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
        <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{product?.name}</h1>
        <hr className="my-1 border-gray-300 dark:border-gray-700" />
        <div className="flex items-center justify-between">
          <h2 className="text-gray-700 dark:text-gray-300">
            Price:
            <span>{product.price}</span>
          </h2>
          <div className="flex items-center gap-2">
            <p className="text-gray-500 font-semibold dark:text-gray-400">Quantity</p>
            <Button
              onClick={() => handleDecrementQuantity(product._id)}
              variant="outline"
              className="size-8 rounded-sm"
            >
              <Minus />
            </Button>
            <p className="font-semibold text-xl p-2 text-gray-900 dark:text-gray-100">
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
