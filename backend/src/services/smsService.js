const axios = require("axios");

class SMSService {
  static async sendOTP(phone, otp) {
    try {
      const response = await axios.get("https://api.msg91.com/api/v5/otp", {
        params: {
          template_id: process.env.MSG91_TEMPLATE_ID, // Get from MSG91 dashboard
          mobile: "91" + phone, // Add country code
          authkey: process.env.MSG91_AUTH_KEY,
          otp: otp,
        },
      });

      // MSG91 success response
      if (response.data.type === "success") {
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
