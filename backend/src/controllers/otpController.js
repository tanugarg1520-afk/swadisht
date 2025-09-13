const SMSService = require('../services/smsService');

// In-memory OTP store (use Redis in production)
const otpStore = {};

/**
 * Controller for OTP operations
 */
class OTPController {
  /**
   * Send OTP to phone number
   * @param {Request} req - Express request object
   * @param {Response} res - Express response object
   */
  static async sendOTP(req, res) {
    try {
      const { phone } = req.body;

      // Validate request
      if (!phone || phone.length !== 10) {
        return res.status(400).json({ 
          success: false, 
          message: "Invalid phone number. Please provide a 10-digit number." 
        });
      }

      // Generate a random 4-digit OTP
      const otp = Math.floor(1000 + Math.random() * 9000).toString();
      
      // Store OTP with expiry
      const expiryTime = new Date();
      expiryTime.setMinutes(expiryTime.getMinutes() + parseInt(process.env.OTP_EXPIRY || 5));
      
      otpStore[phone] = {
        otp,
        expiry: expiryTime
      };

      // Send OTP via SMS service
      const response = await SMSService.sendOTP(phone, otp);

      if (response.success) {
        // In development, send OTP back for testing
        const responseData = {
          success: true,
          message: "OTP sent successfully"
        };
        
        // Only include OTP in non-production environments
        if (process.env.NODE_ENV !== 'production') {
          responseData.otp = otp;
        }
        
        return res.json(responseData);
      } else {
        return res.status(500).json({ 
          success: false, 
          message: "Failed to send OTP. Please try again." 
        });
      }
    } catch (error) {
      console.error("Error in sendOTP:", error);
      return res.status(500).json({ 
        success: false, 
        message: "Internal server error. Please try again later."
      });
    }
  }

  /**
   * Verify OTP
   * @param {Request} req - Express request object
   * @param {Response} res - Express response object
   */
  static async verifyOTP(req, res) {
    try {
      const { phone, otp } = req.body;

      // Validate request
      if (!phone || !otp) {
        return res.status(400).json({ 
          success: false, 
          message: "Phone number and OTP are required." 
        });
      }

      // Check if OTP exists
      if (!otpStore[phone]) {
        return res.status(400).json({ 
          success: false, 
          message: "No OTP requested for this number or OTP has expired." 
        });
      }

      // Check if OTP has expired
      if (new Date() > otpStore[phone].expiry) {
        delete otpStore[phone];
        return res.status(400).json({ 
          success: false, 
          message: "OTP has expired. Please request a new one." 
        });
      }

      // Verify OTP
      const storedOTP = otpStore[phone].otp;
      const verificationResult = await SMSService.verifyOTP(phone, otp, storedOTP);

      if (verificationResult.success) {
        // Clear OTP after successful verification
        delete otpStore[phone];
        
        return res.json({ 
          success: true, 
          message: "OTP verified successfully.",
          // In a real app, we might return user data or a token here
          user: {
            phone,
            // Additional user info would come from a database
            isNewUser: Math.random() > 0.5 // Simulate whether this is a new user
          }
        });
      } else {
        return res.status(400).json({ 
          success: false, 
          message: "Invalid OTP. Please try again." 
        });
      }
    } catch (error) {
      console.error("Error in verifyOTP:", error);
      return res.status(500).json({ 
        success: false, 
        message: "Internal server error. Please try again later."
      });
    }
  }
}

module.exports = OTPController;