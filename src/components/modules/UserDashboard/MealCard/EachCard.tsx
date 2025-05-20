"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Utensils,Tag } from "lucide-react";
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
      className="w-full max-w-xs p-4 bg-white shadow-md rounded-lg transition-all hover:shadow-xl"
    >
      <Image
        src={product.image}
        alt={product.name}
        width={500}
        height={300}
        className="w-full h-48 object-cover rounded-md"
      />
      <CardContent className="pt-4">
        <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
          <Tag size={18} className="text-blue-500" />
          {product.name}
        </h3>
        <p className="text-gray-500 flex items-center gap-2">
          <Utensils size={16} className="text-green-500" /> {product.cuisine}
        </p>
        {/* <div className="mt-2">
          <p className="text-sm font-semibold flex items-center gap-2">
            <Leaf size={16} className="text-orange-500" /> Ingredients:
          </p>
          <p className="text-gray-600 text-sm">{product.ingredient.join(", ")}</p>
        </div>
        <div className="mt-2">
          <p className="text-sm font-semibold flex items-center gap-2">
            <Leaf size={16} className="text-red-500" /> Dietary Preferences:
          </p>
          <p className="text-gray-600 text-sm">{product.dietary_preferences.join(", ")}</p>
        </div>
        <div className="flex items-center mt-2">
          <Star size={18} fill="orange" stroke="orange" />
          <span className="ml-2 text-sm text-gray-600">{product.rating}</span>
        </div> */}
        <p className="mt-2 text-gray-800 font-semibold">${product.price.toFixed(2)}</p>
        <div className="mt-4 flex gap-3">
          <Button
            onClick={() => handleAddProduct(product)}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2"
          >
            <ShoppingCart size={16} />
            Add to Cart
          </Button>
          <Button
            variant="outline"
            onClick={handleViewDetails}
            className="flex-1 border-blue-600 text-blue-600 hover:bg-blue-50 flex items-center justify-center gap-2"
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
