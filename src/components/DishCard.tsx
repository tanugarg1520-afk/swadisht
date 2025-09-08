import React from "react";
import { ShoppingCart, Info } from "lucide-react";
import { Button } from "./ui/button";

interface DishCardProps {
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  isVeg: boolean;
  calories?: number;
  rating?: number;
}

export default function DishCard({
  name,
  description,
  price,
  imageUrl,
  isVeg,
  calories,
  rating
}: DishCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-accent overflow-hidden transition-all hover:shadow-md group">
      <div className="relative overflow-hidden">
        <img
          src={imageUrl}
          alt={name}
          className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm p-1 rounded-md">
          <div 
            className={`h-4 w-4 rounded-full border flex items-center justify-center ${
              isVeg ? "border-green-600" : "border-red-600"
            }`}
          >
            <div 
              className={`h-2 w-2 rounded-full ${
                isVeg ? "bg-green-600" : "bg-red-600"
              }`}
            ></div>
          </div>
        </div>
        {rating && (
          <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-medium flex items-center gap-1">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-3 w-3 text-yellow-500" 
              fill="currentColor" 
              viewBox="0 0 24 24"
            >
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
            {rating}
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-display font-semibold text-lg line-clamp-1">{name}</h3>
          <span className="font-medium text-primary">₹{price}</span>
        </div>
        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{description}</p>
        {calories && (
          <div className="text-xs text-muted-foreground mb-3">
            {calories} calories
          </div>
        )}
        <div className="flex gap-2">
          <Button 
            variant="default" 
            size="sm" 
            className="flex-1 gap-1"
          >
            <ShoppingCart className="h-4 w-4" /> Add
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="px-2"
          >
            <Info className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}