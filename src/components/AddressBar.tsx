import React from "react";
import { MapPin, Edit } from "lucide-react";
import { Button } from "./ui/button";

interface AddressBarProps {
  address?: string;
  onEdit?: () => void;
}

export default function AddressBar({ 
  address = "Please add your delivery address",
  onEdit 
}: AddressBarProps) {
  const hasAddress = address !== "Please add your delivery address";

  return (
    <div className="bg-white border border-accent rounded-lg p-3 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-2">
        <div className={`p-2 rounded-full ${hasAddress ? 'bg-primary/10' : 'bg-muted'}`}>
          <MapPin className={`h-5 w-5 ${hasAddress ? 'text-primary' : 'text-muted-foreground'}`} />
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Delivery Address</p>
          <p className={`text-sm ${hasAddress ? 'font-medium' : 'text-muted-foreground italic'}`}>
            {address}
          </p>
        </div>
      </div>
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={onEdit}
        className="h-8 w-8 p-0"
      >
        <Edit className="h-4 w-4" />
      </Button>
    </div>
  );
}