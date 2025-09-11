import React, { useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import DishCard from "./DishCard";

// Simulated dish data
const SAMPLE_DISHES = [
  {
    id: "1",
    name: "Butter Chicken",
    description: "Tender chicken cooked in a rich tomato and butter gravy with aromatic spices.",
    price: 260,
    imageUrl: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=600&auto=format&fit=crop&q=80",
    isVeg: false,
    calories: 450,
    rating: 4.9
  },
  {
    id: "2",
    name: "Paneer Tikka",
    description: "Marinated cottage cheese cubes grilled to perfection with bell peppers and onions.",
    price: 180,
    imageUrl: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=600&auto=format&fit=crop&q=80",
    isVeg: true,
    calories: 320,
    rating: 4.5
  },
  {
    id: "3",
    name: "Chicken Biryani",
    description: "Fragrant basmati rice cooked with tender chicken pieces and aromatic spices.",
    price: 280,
    imageUrl: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=600&auto=format&fit=crop&q=80",
    isVeg: false,
    calories: 520,
    rating: 4.8
  },
  {
    id: "4",
    name: "Vegetable Samosa",
    description: "Crispy pastry filled with spiced potatoes and peas, served with mint chutney.",
    price: 80,
    imageUrl: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&auto=format&fit=crop&q=80",
    isVeg: true,
    calories: 220,
    rating: 4.7
  },
  {
    id: "5",
    name: "Dal Makhani",
    description: "Creamy black lentils slow-cooked with butter and cream, finished with a touch of spices.",
    price: 190,
    imageUrl: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&auto=format&fit=crop&q=80",
    isVeg: true,
    calories: 320,
    rating: 4.5
  },
  {
    id: "6",
    name: "Aloo Tikki",
    description: "Spiced potato patties served with yogurt and tamarind chutney.",
    price: 100,
    imageUrl: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=600&auto=format&fit=crop&q=80",
    isVeg: true,
    calories: 180,
    rating: 4.3
  }
];

export default function DishSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState(SAMPLE_DISHES);
  const [isSearchActive, setIsSearchActive] = useState(false);

  // Filter dishes based on search term
  useEffect(() => {
    if (!searchTerm.trim()) {
      setSearchResults(SAMPLE_DISHES);
      setIsSearchActive(false);
      return;
    }

    setIsSearchActive(true);
    const filteredResults = SAMPLE_DISHES.filter(
      dish =>
        dish.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dish.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(filteredResults);
  }, [searchTerm]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  return (
    <div className="w-full">
      {/* Search Input */}
      <div className="relative mb-6">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-muted-foreground" />
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search for dishes..."
          className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent"
        />
        {searchTerm && (
          <button
            onClick={clearSearch}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
          </button>
        )}
      </div>

      {/* Search Results */}
      {isSearchActive && (
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">
              Search Results {searchResults.length > 0 && `(${searchResults.length})`}
            </h2>
            {searchResults.length > 0 && (
              <button
                onClick={clearSearch}
                className="text-sm text-primary hover:underline"
              >
                Clear Search
              </button>
            )}
          </div>

          {searchResults.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {searchResults.map(dish => (
                <DishCard
                  key={dish.id}
                  name={dish.name}
                  description={dish.description}
                  price={dish.price}
                  imageUrl={dish.imageUrl}
                  isVeg={dish.isVeg}
                  calories={dish.calories}
                  rating={dish.rating}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-gray-500 mb-2">No dishes found matching "{searchTerm}"</p>
              <p className="text-sm text-gray-400">
                Try searching for a different dish or cuisine
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}