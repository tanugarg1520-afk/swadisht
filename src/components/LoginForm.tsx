import React, { useState } from "react";
import { Button } from "./ui/button";
import { LogIn, UserPlus, Mail, Phone, User, Facebook, CircleUser } from "lucide-react";

export default function LoginForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [userType, setUserType] = useState("consumer");
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    phone: "",
    agreeTerms: false,
    form_name: "Swadisht Login"
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === "checkbox" ? checked : value 
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Create FormData object for proper multipart form handling
      const formDataObj = new FormData();
      // Add each form field to the FormData object
      formDataObj.append('email', formData.email);
      formDataObj.append('name', formData.name);
      formDataObj.append('phone', formData.phone);
      formDataObj.append('form_name', formData.form_name);
      // Convert boolean to string for the checkbox
      formDataObj.append('agreeTerms', formData.agreeTerms ? 'true' : 'false');
      formDataObj.append('userType', userType);
      
      const response = await fetch("https://api.new.website/api/submit-form/", {
        method: "POST",
        body: formDataObj, // Use FormData object directly, no need for Content-Type header
      });

      if (response.ok) {
        setSubmitStatus("success");
        // In a real app, we would redirect to the home page after successful login
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleLoginMode = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 rounded-xl bg-white/90 backdrop-blur-sm shadow-xl border border-accent">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-primary">
          {isLogin ? "Login to Swadisht" : "Create Account"}
        </h2>
        <p className="text-muted-foreground mt-1">
          {isLogin ? "Welcome back!" : "Join our delicious journey"}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1 flex items-center">
            <Mail className="w-4 h-4 mr-2 text-muted-foreground" />
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent"
            placeholder="your@email.com"
          />
        </div>

        {!isLogin && (
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1 flex items-center">
              <User className="w-4 h-4 mr-2 text-muted-foreground" />
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required={!isLogin}
              className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent"
              placeholder="Your Name"
            />
          </div>
        )}

        <div>
          <label htmlFor="phone" className="block text-sm font-medium mb-1 flex items-center">
            <Phone className="w-4 h-4 mr-2 text-muted-foreground" />
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent"
            placeholder="Your phone number"
          />
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <input
              type="radio"
              id="consumer"
              name="userType"
              checked={userType === "consumer"}
              onChange={() => setUserType("consumer")}
              className="mr-2 h-4 w-4 text-primary focus:ring-primary/50"
            />
            <label htmlFor="consumer" className="text-sm">Consumer</label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              id="customer"
              name="userType"
              checked={userType === "customer"}
              onChange={() => setUserType("customer")}
              className="mr-2 h-4 w-4 text-primary focus:ring-primary/50"
            />
            <label htmlFor="customer" className="text-sm">Restaurant</label>
          </div>
        </div>

        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="terms"
              name="agreeTerms"
              type="checkbox"
              checked={formData.agreeTerms}
              onChange={handleInputChange}
              required
              className="h-4 w-4 text-primary focus:ring-primary/50 rounded"
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="terms" className="text-sm text-gray-600">
              I agree to the <a href="#" className="text-primary hover:underline">Terms and Conditions</a>
            </label>
          </div>
        </div>

        <input type="hidden" name="form_name" value={formData.form_name} />
        
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            "Processing..."
          ) : isLogin ? (
            <>
              <LogIn className="w-4 h-4" /> Login
            </>
          ) : (
            <>
              <UserPlus className="w-4 h-4" /> Sign Up
            </>
          )}
        </Button>

        <div className="flex items-center my-4">
          <div className="flex-grow border-t border-gray-200"></div>
          <span className="flex-shrink mx-4 text-gray-400 text-sm">or continue with</span>
          <div className="flex-grow border-t border-gray-200"></div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" type="button" className="flex items-center justify-center gap-2">
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
              <path d="M1 1h22v22H1z" fill="none" />
            </svg>
            Google
          </Button>
          <Button variant="outline" type="button" className="flex items-center justify-center gap-2">
            <Facebook className="w-4 h-4 text-blue-600" />
            Facebook
          </Button>
        </div>

        <div className="text-center mt-4">
          <button
            type="button"
            onClick={toggleLoginMode}
            className="text-primary hover:underline text-sm font-medium"
          >
            {isLogin ? "Need an account? Sign up" : "Already have an account? Log in"}
          </button>
        </div>

        {submitStatus === "success" && (
          <div className="p-3 bg-green-100 border border-green-400 text-green-700 rounded">
            {isLogin ? "Login successful!" : "Account created successfully!"}
          </div>
        )}

        {submitStatus === "error" && (
          <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            There was an error. Please try again.
          </div>
        )}
      </form>
    </div>
  );
}