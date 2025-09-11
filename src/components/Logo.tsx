import React from "react";
import { ChefHat } from "lucide-react";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  withTagline?: boolean;
}

export default function Logo({ size = "md", withTagline = false }: LogoProps) {
  const sizes = {
    sm: {
      text: "text-xl",
      icon: "w-5 h-5"
    },
    md: {
      text: "text-2xl",
      icon: "w-6 h-6"
    },
    lg: {
      text: "text-3xl",
      icon: "w-8 h-8"
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center gap-2">
        <ChefHat className={`${sizes[size].icon} text-primary`} />
        <span className={`${sizes[size].text} font-bold font-display text-primary tracking-tight`}>
          Swadisht
        </span>
      </div>
      {withTagline && (
        <span className="text-xs text-muted-foreground mt-1">Har din ghar jesa swad</span>
      )}
    </div>
  );
}