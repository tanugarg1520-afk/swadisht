import React, { useState } from "react";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

enum LoginStep {
  PHONE = 'phone',
  OTP = 'otp'
}

export default function SimpleLoginForm() {
  const [step, setStep] = useState<LoginStep>(LoginStep.PHONE);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVendor, setIsVendor] = useState(false);
  const [timerCount, setTimerCount] = useState(0);
  
  // OTP input refs
  const inputRefs = React.useRef<(HTMLInputElement | null)[]>([]);
  
  // Handle phone number input
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 10) {
      setPhoneNumber(value);
    }
  };
  
  // Handle OTP input
  const handleOtpChange = (index: number, value: string) => {
    // Only allow digits
    if (!/^\d*$/.test(value)) return;
    
    // Update OTP array
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    
    // Auto-focus next input
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };
  
  // Handle key down in OTP input
  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Move to previous input on backspace
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };
  
  // Handle login button click
  const handleLoginClick = () => {
    setIsSubmitting(true);
    
    // Simulate OTP sending
    setTimeout(() => {
      setStep(LoginStep.OTP);
      setIsSubmitting(false);
      
      // Focus first OTP input
      setTimeout(() => {
        inputRefs.current[0]?.focus();
      }, 100);
      
      // Start timer
      let count = 30;
      setTimerCount(count);
      const interval = setInterval(() => {
        count--;
        setTimerCount(count);
        if (count === 0) clearInterval(interval);
      }, 1000);
    }, 1500);
  };
  
  // Handle verify button click
  const handleVerifyClick = () => {
    setIsSubmitting(true);
    
    // Simulate verification
    setTimeout(() => {
      // Navigate to home page after verification
      window.location.href = "/home";
    }, 1500);
  };
  
  // Handle resend OTP
  const handleResendOtp = () => {
    if (timerCount > 0) return;
    
    // Reset timer
    let count = 30;
    setTimerCount(count);
    const interval = setInterval(() => {
      count--;
      setTimerCount(count);
      if (count === 0) clearInterval(interval);
    }, 1000);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          {step === LoginStep.PHONE ? 'Login to Swadisht' : 'Verify OTP'}
        </h2>
        {step === LoginStep.PHONE && (
          <p className="text-gray-600 mt-1">Enter your phone number to receive an OTP</p>
        )}
        {step === LoginStep.OTP && (
          <p className="text-gray-600 mt-1">
            We've sent a 4-digit code to <span className="font-medium">+91 {phoneNumber}</span>
          </p>
        )}
      </div>
      
      {step === LoginStep.PHONE && (
        <>
          <div className="mb-6">
            <div className="flex">
              <div className="bg-gray-100 flex items-center justify-center px-4 border border-gray-300 border-r-0 rounded-l-md">
                <span className="text-gray-500">+91</span>
              </div>
              <input
                type="tel"
                value={phoneNumber}
                onChange={handlePhoneChange}
                placeholder="Phone number"
                className="w-full p-3 border border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                maxLength={10}
              />
            </div>
          </div>
          
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              id="vendorToggle"
              checked={isVendor}
              onChange={(e) => setIsVendor(e.target.checked)}
              className="mr-2 h-4 w-4"
            />
            <label htmlFor="vendorToggle" className="text-sm text-gray-600">
              Register as a Restaurant/Vendor
            </label>
          </div>
          
          <Button
            onClick={handleLoginClick}
            disabled={phoneNumber.length !== 10 || isSubmitting}
            className="w-full h-12"
          >
            {isSubmitting ? (
              "Sending OTP..."
            ) : (
              <span className="flex items-center justify-center">
                Continue <ArrowRight className="ml-2 h-4 w-4" />
              </span>
            )}
          </Button>
          
          <div className="mt-6 text-center">
            <p className="text-gray-500 text-sm">
              By continuing, you agree to our{" "}
              <a href="/terms" className="text-primary hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="/privacy" className="text-primary hover:underline">
                Privacy Policy
              </a>
            </p>
          </div>
        </>
      )}
      
      {step === LoginStep.OTP && (
        <>
          <div className="mb-6">
            <div className="flex justify-center space-x-3">
              {[0, 1, 2, 3].map((index) => (
                <input
                  key={index}
                  type="text"
                  maxLength={1}
                  value={otp[index]}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  ref={(el) => (inputRefs.current[index] = el)}
                  className="w-14 h-14 text-center text-2xl border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              ))}
            </div>
            <div className="text-center mt-4">
              <button
                onClick={handleResendOtp}
                disabled={timerCount > 0}
                className="text-primary text-sm hover:underline disabled:text-gray-400 disabled:no-underline"
              >
                {timerCount > 0 ? `Resend OTP in ${timerCount}s` : "Resend OTP"}
              </button>
            </div>
          </div>
          
          <Button
            onClick={handleVerifyClick}
            disabled={otp.some(digit => !digit) || isSubmitting}
            className="w-full h-12"
          >
            {isSubmitting ? "Verifying..." : "Verify & Continue"}
          </Button>
          
          <div className="mt-4 text-center">
            <button
              onClick={() => setStep(LoginStep.PHONE)}
              className="text-sm text-gray-600 hover:text-primary"
            >
              Use a different phone number
            </button>
          </div>
        </>
      )}
      
      <div className="mt-6 flex items-center">
        <div className="flex-grow border-t border-gray-200"></div>
        <div className="px-3 text-gray-500 text-sm">or continue with</div>
        <div className="flex-grow border-t border-gray-200"></div>
      </div>
      
      <button className="mt-6 w-full flex items-center justify-center gap-2 border border-gray-300 rounded-md p-2 hover:bg-gray-50 transition-colors">
        <svg className="w-5 h-5" viewBox="0 0 24 24">
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
      </button>
    </div>
  );
}