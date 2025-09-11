import React, { useState } from "react";
import { ChevronDown, User, ShoppingCart, LogOut, MapPin, Heart, Settings, Clock } from "lucide-react";

interface UserProfileHeaderProps {
  userName: string;
  userAddress?: string;
}

export default function UserProfileHeader({ userName, userAddress }: UserProfileHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="relative">
      <button 
        onClick={toggleMenu}
        className="flex items-center gap-2 hover:text-primary transition-colors py-2 px-3 rounded-md hover:bg-accent/30"
      >
        <div className="bg-primary/10 h-8 w-8 rounded-full flex items-center justify-center text-primary">
          <User className="h-4 w-4" />
        </div>
        <div className="text-left hidden sm:block">
          <p className="text-sm font-medium leading-tight">{userName}</p>
          <p className="text-xs text-muted-foreground truncate max-w-[120px]">
            {userAddress || "Add address"}
          </p>
        </div>
        <ChevronDown className="h-4 w-4 text-muted-foreground" />
      </button>
      
      {isMenuOpen && (
        <div className="absolute right-0 top-full mt-1 w-64 bg-white rounded-lg shadow-lg border border-accent overflow-hidden z-50">
          <div className="p-3 border-b border-accent/50">
            <p className="font-medium">{userName}</p>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              <MapPin className="h-3 w-3" />
              {userAddress || "Add your address"}
            </p>
          </div>
          
          <nav>
            <ul>
              <li>
                <a 
                  href="/profile" 
                  className="flex items-center gap-2 p-3 hover:bg-accent/30 transition-colors"
                >
                  <User className="h-4 w-4 text-primary" />
                  <span>My Profile</span>
                </a>
              </li>
              <li>
                <a 
                  href="/orders" 
                  className="flex items-center gap-2 p-3 hover:bg-accent/30 transition-colors"
                >
                  <Clock className="h-4 w-4 text-primary" />
                  <span>Order History</span>
                </a>
              </li>
              <li>
                <a 
                  href="/cart" 
                  className="flex items-center gap-2 p-3 hover:bg-accent/30 transition-colors"
                >
                  <ShoppingCart className="h-4 w-4 text-primary" />
                  <span>My Cart</span>
                </a>
              </li>
              <li>
                <a 
                  href="/favorites" 
                  className="flex items-center gap-2 p-3 hover:bg-accent/30 transition-colors"
                >
                  <Heart className="h-4 w-4 text-primary" />
                  <span>Favorites</span>
                </a>
              </li>
              <li>
                <a 
                  href="/settings" 
                  className="flex items-center gap-2 p-3 hover:bg-accent/30 transition-colors"
                >
                  <Settings className="h-4 w-4 text-primary" />
                  <span>Settings</span>
                </a>
              </li>
              <li className="border-t border-accent/50">
                <a 
                  href="/logout" 
                  className="flex items-center gap-2 p-3 hover:bg-accent/30 transition-colors text-red-500"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
}