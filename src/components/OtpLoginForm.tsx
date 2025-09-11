import React, { useState } from "react";
import { Button } from "./ui/button";
import { Phone, User, LogIn, ArrowRight } from "lucide-react";

// Steps for the login flow
enum LoginStep {
  PHONE_NUMBER = 'phone_number',
  OTP_VERIFICATION = 'otp_verification',
  USER_DETAILS = 'user_details'
}

export default function OtpLoginForm() {
  // State for multi-step form
  const [currentStep, setCurrentStep] = useState<LoginStep>(LoginStep.PHONE_NUMBER);
  
  // Form data
  const [formData, setFormData] = useState({
    phone: "",
    otp: "",
    name: "",
    userType: "consumer",
    form_name: "Swadisht OTP Login"
  });
  
  // UI states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null);
  const [timerCount, setTimerCount] = useState(60);
  const [otpSent, setOtpSent] = useState(false);

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  // Handle user type selection
  const handleUserTypeChange = (type: string) => {
    setFormData(prev => ({
      ...prev,
      userType: type
    }));
  };

  // Submit phone number and request OTP
  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate OTP sending
    setTimeout(() => {
      setOtpSent(true);
      setIsSubmitting(false);
      setCurrentStep(LoginStep.OTP_VERIFICATION);
      
      // Start countdown timer
      let count = 60;
      setTimerCount(count);
      const interval = setInterval(() => {
        count--;
        setTimerCount(count);
        if (count <= 0) {
          clearInterval(interval);
        }
      }, 1000);
    }, 1500);
  };

  // Verify OTP
  const handleOtpVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate OTP verification (in a real app, this would validate with a backend)
    // For demo, we'll consider any 4-digit OTP valid
    setTimeout(() => {
      if (formData.otp.length === 4) {
        // If this is first-time login, ask for more details
        setCurrentStep(LoginStep.USER_DETAILS);
      } else {
        // OTP verification failed
        setSubmitStatus("error");
      }
      setIsSubmitting(false);
    }, 1500);
  };

  // Complete the registration
  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      // In a real app, you'd send this data to your server
      const formDataObj = new FormData();
      formDataObj.append('phone', formData.phone);
      formDataObj.append('name', formData.name);
      formDataObj.append('userType', formData.userType);
      formDataObj.append('form_name', formData.form_name);
      
      const response = await fetch("https://api.new.website/api/submit-form/", {
        method: "POST",
        body: formDataObj,
      });
      
      if (response.ok) {
        setSubmitStatus("success");
        // In a real app, redirect to dashboard
        window.location.href = "/home";
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Resend OTP
  const handleResendOtp = () => {
    if (timerCount > 0) return;
    
    setOtpSent(true);
    let count = 60;
    setTimerCount(count);
    const interval = setInterval(() => {
      count--;
      setTimerCount(count);
      if (count <= 0) {
        clearInterval(interval);
      }
    }, 1000);
  };

  // Render the phone number input step
  const renderPhoneNumberStep = () => (
    <form onSubmit={handlePhoneSubmit} className="space-y-6">
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold text-primary mb-2">Login to Swadisht</h2>
        <p className="text-muted-foreground">Enter your phone number to receive an OTP</p>
      </div>
      
      <div>
        <label htmlFor="phone" className="block text-sm font-medium mb-1 flex items-center">
          <Phone className="w-4 h-4 mr-2 text-muted-foreground" />
          Phone Number
        </label>
        <div className="flex">
          <span className="inline-flex items-center px-3 py-2 border border-r-0 border-input rounded-l-md bg-muted text-muted-foreground">
            +91
          </span>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            required
            pattern="[0-9]{10}"
            maxLength={10}
            placeholder="10-digit mobile number"
            className="w-full px-3 py-2 border border-input rounded-r-md focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          We'll send a 4-digit code to verify your number
        </p>
      </div>
      
      <Button
        type="submit"
        disabled={isSubmitting || formData.phone.length !== 10}
        className="w-full flex items-center justify-center gap-2"
      >
        {isSubmitting ? "Sending OTP..." : "Get OTP"}
        {!isSubmitting && <ArrowRight className="w-4 h-4" />}
      </Button>

      <div className="flex items-center my-4">
        <div className="flex-grow border-t border-gray-200"></div>
        <span className="flex-shrink mx-4 text-gray-400 text-xs">or continue with</span>
        <div className="flex-grow border-t border-gray-200"></div>
      </div>

      <Button 
        variant="outline" 
        type="button" 
        className="w-full flex items-center justify-center gap-2"
      >
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
        Continue with Google
      </Button>
    </form>
  );

  // Render the OTP verification step
  const renderOtpVerificationStep = () => (
    <form onSubmit={handleOtpVerify} className="space-y-6">
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold text-primary mb-2">Verify OTP</h2>
        <p className="text-muted-foreground">
          We've sent a 4-digit code to <span className="font-medium">+91 {formData.phone}</span>
        </p>
      </div>
      
      <div>
        <label htmlFor="otp" className="block text-sm font-medium mb-3">
          Enter 4-digit OTP
        </label>
        <div className="flex justify-center">
          <input
            type="text"
            id="otp"
            name="otp"
            value={formData.otp}
            onChange={handleInputChange}
            required
            pattern="[0-9]{4}"
            maxLength={4}
            className="w-48 px-3 py-2 text-center text-xl tracking-widest border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
        <div className="text-center mt-3">
          <button
            type="button"
            onClick={handleResendOtp}
            disabled={timerCount > 0}
            className="text-primary text-sm hover:underline disabled:text-muted-foreground disabled:no-underline disabled:cursor-not-allowed"
          >
            {timerCount > 0 ? `Resend OTP in ${timerCount}s` : "Resend OTP"}
          </button>
        </div>
      </div>
      
      <Button
        type="submit"
        disabled={isSubmitting || formData.otp.length !== 4}
        className="w-full flex items-center justify-center gap-2"
      >
        {isSubmitting ? "Verifying..." : "Verify & Continue"}
        {!isSubmitting && <ArrowRight className="w-4 h-4" />}
      </Button>

      <button
        type="button"
        onClick={() => setCurrentStep(LoginStep.PHONE_NUMBER)}
        className="w-full text-sm text-muted-foreground hover:text-primary"
      >
        Use a different phone number
      </button>

      {submitStatus === "error" && (
        <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
          Invalid OTP. Please try again.
        </div>
      )}
    </form>
  );

  // Render the user details step
  const renderUserDetailsStep = () => (
    <form onSubmit={handleFinalSubmit} className="space-y-6">
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold text-primary mb-2">Complete Your Profile</h2>
        <p className="text-muted-foreground">
          Just a few more details to get started
        </p>
      </div>
      
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
          required
          className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
          placeholder="Your full name"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-2">I am a</label>
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <input
              type="radio"
              id="consumer"
              name="userType"
              value="consumer"
              checked={formData.userType === "consumer"}
              onChange={() => handleUserTypeChange("consumer")}
              className="mr-2 h-4 w-4 text-primary focus:ring-primary/50"
            />
            <label htmlFor="consumer" className="text-sm">Consumer</label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              id="restaurant"
              name="userType"
              value="restaurant"
              checked={formData.userType === "restaurant"}
              onChange={() => handleUserTypeChange("restaurant")}
              className="mr-2 h-4 w-4 text-primary focus:ring-primary/50"
            />
            <label htmlFor="restaurant" className="text-sm">Restaurant</label>
          </div>
        </div>
      </div>
      
      <Button
        type="submit"
        disabled={isSubmitting || !formData.name}
        className="w-full flex items-center justify-center gap-2"
      >
        {isSubmitting ? "Creating Account..." : "Create Account"}
        {!isSubmitting && <LogIn className="w-4 h-4" />}
      </Button>

      {submitStatus === "success" && (
        <div className="p-3 bg-green-100 border border-green-400 text-green-700 rounded text-sm">
          Account created successfully! Redirecting...
        </div>
      )}
      
      {submitStatus === "error" && (
        <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
          There was an error creating your account. Please try again.
        </div>
      )}
    </form>
  );

  // Render the appropriate step
  return (
    <div className="w-full max-w-md mx-auto p-6 rounded-xl bg-white/95 backdrop-blur-sm shadow-xl border border-accent">
      {currentStep === LoginStep.PHONE_NUMBER && renderPhoneNumberStep()}
      {currentStep === LoginStep.OTP_VERIFICATION && renderOtpVerificationStep()}
      {currentStep === LoginStep.USER_DETAILS && renderUserDetailsStep()}
    </div>
  );
}