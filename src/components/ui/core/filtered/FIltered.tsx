
"use client";
import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const dietaryOptions = [
  "medium rare",
  "tuna",
  "salad",
  "gluten-free",
  "keto",
  "duck breast",
  "gratin potato",
  "cherry sauce",
  "haddock",
  "smoked French bacon",
];

const cuisineOptions = ["dessert", "pizza", "salad", "popular", "drinks"];

export default function Filtered() {
  const [price, setPrice] = useState([0]);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSearchQuery = (query: string, value: string | number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(query, value.toString());
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="p-6 bg-white rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Filter</h2>
        {searchParams.toString().length > 0 && (
          <Button
            onClick={() => router.push(`${pathname}`, { scroll: false })}
            size="sm"
            className="bg-black hover:bg-gray-700 ml-5"
          >
            Clear Filters
          </Button>
        )}
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-4">Price</h2>
        <div className="flex items-center justify-between text-sm mb-2">
          <span>$0</span>
          <span>$500000</span>
        </div>
        <Slider
          max={100}
          step={1}
          onValueChange={(value) => {
            setPrice(value);
            handleSearchQuery("price", value[0]);
          }}
          className="w-full"
        />
        <p className="text-sm mt-2">Selected Price: ${price[0]}</p>
      </div>

      {/* Dietary Filter */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-4">Dietary</h2>
        <RadioGroup className="space-y-2">
          {dietaryOptions.map((diet) => (
            <div key={diet} className="flex items-center space-x-2">
              <RadioGroupItem
                onClick={() => handleSearchQuery("dietary_preferences", diet)}
                value={diet}
                id={diet}
              />
              <Label htmlFor={diet} className="text-gray-500 font-light">
                {diet}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* Cuisine Filter */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-4">Cuisine</h2>
        <RadioGroup className="space-y-2">
          {cuisineOptions.map((cuisine) => (
            <div key={cuisine} className="flex items-center space-x-2">
              <RadioGroupItem
                onClick={() => handleSearchQuery("cuisine", cuisine)}
                value={cuisine}
                id={cuisine}
              />
              <Label htmlFor={cuisine} className="text-gray-500 font-light">
                {cuisine}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-4">Rating</h2>
        <RadioGroup className="space-y-3">
          {[5, 4, 3, 2, 1].map((rating) => (
            <div key={rating} className="flex items-center space-x-2">
              <RadioGroupItem
                onClick={() => handleSearchQuery("rating", rating)}
                value={`${rating}`}
                id={`rating-${rating}`}
              />
              <Label htmlFor={`rating-${rating}`} className="flex items-center">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star
                    size={18}
                    key={i}
                    fill={i < rating ? "orange" : "lightgray"}
                    stroke={i < rating ? "orange" : "lightgray"}
                  />
                ))}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
}
