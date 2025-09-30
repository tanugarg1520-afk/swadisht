/*const axios = require("axios");

class SMSService {
  static async sendOTP(phone, otp) {
    try {
      const response = await axios.post(
        "https://api.msg91.com/api/v5/otp",
        {
          template_id: process.env.MSG91_TEMPLATE_ID,
          mobile: "91" + phone,
          otp: otp,
        },
        {
          headers: {
            authkey: process.env.MSG91_AUTH_KEY,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.type === "success" || response.data.message) {
        return { success: true };
      } else {
        return { success: false, message: response.data };
      }
    } catch (error) {
      console.error("MSG91 Error:", error.response?.data || error.message);
      return { success: false, message: error.message };
    }
  }
}

module.exports = SMSService;*/


const axios = require("axios");

class SMSService {
  /**
   * Send OTP to a phone number
   * @param {string} phone - Mobile number without country code (e.g., 9876543210)
   * @param {string} otp - OTP to send
   * @returns {Promise<{success: boolean, message?: string}>}
   */
  static async sendOTP(phone, otp) {
    // Check if demo mode is enabled
    const isDemo = process.env.DEMO_MODE === "true";

    if (isDemo) {
      // Demo mode: show OTP on console instead of sending SMS
      console.log(`⚠️ DEMO MODE: OTP for ${phone} is ${otp}`);
      return { success: true, message: `OTP (demo) is ${otp}` };
    }

    try {
      // Live mode: send OTP via MSG91
      const response = await axios.post(
        "https://api.msg91.com/api/v5/otp",
        {
          template_id: process.env.MSG91_TEMPLATE_ID,
          mobile: "91" + phone, // Add country code
          otp: otp,
        },
        {
          headers: {
            authkey: process.env.MSG91_AUTH_KEY,
            "Content-Type": "application/json",
          },
        }
      );

      // Check response
      if (response.data.type === "success" || response.data.message) {
        return { success: true };
      } else {
        return { success: false, message: response.data };
      }
    } catch (error) {
      console.error("MSG91 Error:", error.response?.data || error.message);
      return { success: false, message: error.message };
    }
  }
}

module.exports = SMSService;

