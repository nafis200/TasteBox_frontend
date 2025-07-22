"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Utensils, Tag } from "lucide-react";
// import { Utensils,Tag,Leaf, Star, } from "lucide-react";
import { useAppDispatch } from "@/redux/hooks";
import { addProduct } from "@/redux/features/cartSlice";
import { useRouter } from "next/navigation";
import { ShoppingCart, Eye } from "lucide-react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const EachCard = ({ product }: any) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleAddProduct = (producted: any) => {
    dispatch(addProduct(producted));
  };

  const handleViewDetails = () => {
    router.push(`/mealcard/${product._id}`);
  };

  return (
    <Card
  key={product._id}
  className="group w-full max-w-xs h-[460px] p-4 bg-background text-foreground shadow-md rounded-lg transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1 hover:border-blue-500 border border-transparent dark:bg-gray-800 dark:shadow-gray-700"
>
  <div className="overflow-hidden rounded-md">
    <Image
      src={product.image}
      alt={product.name}
      width={500}
      height={300}
      className="w-full h-48 object-cover rounded-md transition-transform duration-300 group-hover:scale-105"
    />
  </div>

  <CardContent className="pt-4 flex flex-col justify-between h-[calc(100%-12rem)]">
    <div>
      <h3 className="text-xl font-semibold flex items-center gap-2 text-bold dark:text-white">
        <Tag size={18} className="text-blue-500 dark:text-blue-400" />
        {product.name}
      </h3>

      <p className="text-muted-foreground flex items-center gap-2 dark:text-gray-300">
        <Utensils size={16} className="text-green-500 dark:text-green-400" />
        {product.cuisine}
      </p>

      <p className="mt-2 font-semibold text-foreground dark:text-gray-100">
        ${product.price.toFixed(2)}
      </p>
    </div>

    <div className="mt-4 flex gap-3">
      <Button
        onClick={() => handleAddProduct(product)}
        className="flex-1 bg-blue-600 text-primary-foreground hover:bg-primary/90 dark:hover:bg-primary/80 flex items-center justify-center gap-2 dark:text-white"
      >
        <ShoppingCart size={16} />
        Add to Cart
      </Button>

      <Button
        variant="outline"
        onClick={handleViewDetails}
        className="flex-1 border-blue-600 text-blue-600 hover:bg-primary/10 dark:hover:bg-primary/20 flex items-center justify-center gap-2 dark:text-white"
      >
        <Eye size={16} />
        View
      </Button>
    </div>
  </CardContent>
</Card>

  );
};

export default EachCard;
