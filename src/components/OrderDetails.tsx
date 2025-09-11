import React from "react";
import { Star, MapPin, Clock, PhoneCall, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";

interface Restaurant {
  id: string;
  name: string;
  logo: string;
  rating: number;
  cuisine: string;
  address: string;
  contactNumber: string;
}

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

interface OrderDetailsProps {
  orderId: string;
  orderDate: string;
  status: 'pending' | 'confirmed' | 'preparing' | 'on_the_way' | 'delivered' | 'cancelled';
  items: OrderItem[];
  totalAmount: number;
  restaurant: Restaurant;
  deliveryAddress: string;
  estimatedDeliveryTime?: string;
}

export default function OrderDetails({
  orderId,
  orderDate,
  status,
  items,
  totalAmount,
  restaurant,
  deliveryAddress,
  estimatedDeliveryTime
}: OrderDetailsProps) {
  // Status mapping for display
  const statusMap = {
    pending: { label: "Pending", color: "bg-yellow-100 text-yellow-800" },
    confirmed: { label: "Confirmed", color: "bg-blue-100 text-blue-800" },
    preparing: { label: "Preparing", color: "bg-blue-100 text-blue-800" },
    on_the_way: { label: "On the way", color: "bg-purple-100 text-purple-800" },
    delivered: { label: "Delivered", color: "bg-green-100 text-green-800" },
    cancelled: { label: "Cancelled", color: "bg-red-100 text-red-800" },
  };

  // Calculate order progress percentage
  const getProgressPercentage = () => {
    const stages = ['pending', 'confirmed', 'preparing', 'on_the_way', 'delivered'];
    if (status === 'cancelled') return 0;
    
    const currentIndex = stages.indexOf(status);
    return currentIndex >= 0 ? (currentIndex / (stages.length - 1)) * 100 : 0;
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
      {/* Order Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm text-gray-500">Order #{orderId}</p>
            <p className="text-sm text-gray-500">{orderDate}</p>
          </div>
          <span 
            className={`px-2 py-1 rounded-full text-xs font-medium ${statusMap[status].color}`}
          >
            {statusMap[status].label}
          </span>
        </div>
      </div>

      {/* Restaurant Details */}
      <div className="p-4 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center">
          <img 
            src={restaurant.logo} 
            alt={restaurant.name} 
            className="w-12 h-12 rounded-full object-cover mr-3"
          />
          <div className="flex-1">
            <h3 className="font-medium">{restaurant.name}</h3>
            <p className="text-sm text-gray-500">{restaurant.cuisine}</p>
            <div className="flex items-center mt-1">
              <div className="bg-green-500 text-white text-xs px-1 rounded flex items-center">
                <Star className="w-3 h-3 mr-0.5" fill="white" />
                <span>{restaurant.rating}</span>
              </div>
            </div>
          </div>
          <a 
            href={`tel:${restaurant.contactNumber}`}
            className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
          >
            <PhoneCall className="w-5 h-5 text-primary" />
          </a>
        </div>
        
        <div className="mt-3 text-sm flex items-start gap-1">
          <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
          <span className="text-gray-600">{restaurant.address}</span>
        </div>
      </div>

      {/* Order Progress (if not delivered yet) */}
      {status !== 'delivered' && status !== 'cancelled' && (
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">
              {estimatedDeliveryTime ? `Estimated delivery by ${estimatedDeliveryTime}` : 'Delivery in progress'}
            </span>
          </div>
          
          <div className="relative h-2 bg-gray-200 rounded-full mt-3">
            <div 
              className="absolute h-2 bg-primary rounded-full" 
              style={{ width: `${getProgressPercentage()}%` }}
            ></div>
          </div>
          
          <div className="flex justify-between mt-1 text-xs text-gray-500">
            <span>Order placed</span>
            <span>Preparing</span>
            <span>On the way</span>
            <span>Delivered</span>
          </div>
        </div>
      )}

      {/* Order Items */}
      <div className="p-4">
        <h4 className="font-medium mb-3">Order Summary</h4>
        <ul className="space-y-3">
          {items.map(item => (
            <li key={item.id} className="flex justify-between">
              <div className="flex items-center">
                <span className="h-5 w-5 bg-gray-100 rounded-full flex items-center justify-center text-xs mr-2">
                  {item.quantity}
                </span>
                <span>{item.name}</span>
              </div>
              <span>₹{item.price * item.quantity}</span>
            </li>
          ))}
        </ul>
        
        <div className="border-t border-gray-200 mt-4 pt-4">
          <div className="flex justify-between font-medium">
            <span>Total</span>
            <span>₹{totalAmount}</span>
          </div>
        </div>
      </div>

      {/* Delivery Address */}
      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <h4 className="font-medium mb-2 text-sm">Delivery Address</h4>
        <p className="text-sm text-gray-600">{deliveryAddress}</p>
      </div>

      {/* Action Buttons */}
      <div className="p-4 border-t border-gray-200 flex gap-2">
        <Button variant="outline" size="sm" className="flex-1">
          Support
        </Button>
        <Button variant="default" size="sm" className="flex-1 flex items-center justify-center">
          Order Details <ChevronRight className="ml-1 w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}