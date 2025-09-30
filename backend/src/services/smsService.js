const axios = require("axios");

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

module.exports = SMSService;
