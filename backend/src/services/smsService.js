//const axios = require('axios');

/**
 * Service to handle SMS operations using MSG91
 */
//class SMSService {
  /**
   * Send OTP via MSG91
   * @param {string} phone - Phone number (10 digits)
   * @param {string} otp - OTP to send
   * @returns {Promise<Object>} - Response object
   */
 /* static async sendOTP(phone, otp) {
    try {
      // Validate phone number
      if (!phone || phone.length !== 10) {
        return { success: false, message: 'Invalid phone number' };
      }*/

      // In production, send actual SMS
      //if (process.env.NODE_ENV === 'production') {
        /*const response = await axios.post('https://control.msg91.com/api/v5/otp', {
          template_id: process.env.TEMPLATE_ID,
          mobile: `91${phone}`, // Adding country code for India
          authkey: process.env.MSG91_API_KEY,
          otp: otp,
        });*/
        //Start Edit
        /*NODE_ENV=production
        const response = await axios.post(
          'https://control.msg91.com/api/v5/otp',
          {
            template_id: process.env.TEMPLATE_ID,
            mobile: `91${phone}`,
            otp: otp,
          },
          {
            headers: {
              authkey: process.env.MSG91_API_KEY,
              'Content-Type': 'application/json'
            }
          }
        );*/
        //End

        /*return { 
          success: true, 
          message: 'OTP sent successfully',
          data: response.data
        };*/


      // For development, just return success without actually sending SMS
     /* console.log(`[DEV MODE] OTP ${otp} would be sent to +91${phone}`);
      return { 
        success: true, 
        message: 'OTP sent successfully (DEV MODE)',
        data: { otp } // Only in development mode we return OTP
      };
    } catch (error) {
      console.error('Error sending OTP:', error.response?.data || error.message);
      return { 
        success: false, 
        message: 'Failed to send OTP',
        error: error.response?.data || error.message
      };
    }
  }*/

  /**
   * Verify OTP using MSG91 (in production, we would call MSG91's verify API)
   * @param {string} phone - Phone number
   * @param {string} otp - OTP to verify
   * @returns {Promise<Object>} - Response object
   */
 /* static async verifyOTP(phone, otp, storedOTP) {
    try {
      // In production, we might call MSG91's verify API
      // For now, we're just comparing with our stored OTP
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      return { 
        success: otp === storedOTP,
        message: otp === storedOTP ? 'OTP verified successfully' : 'Invalid OTP'
      };
    } catch (error) {
      console.error('Error verifying OTP:', error.message);
      return { 
        success: false, 
        message: 'Failed to verify OTP',
        error: error.message
      };
    }
  }
}

module.exports = SMSService;*/


const axios = require('axios');

/**
 * Service to handle SMS operations using MSG91
 */
class SMSService {
  /**
   * Send OTP via MSG91
   * @param {string} phone - Phone number (10 digits)
   * @param {string} otp - OTP to send
   * @returns {Promise<Object>} - Response object
   */
  static async sendOTP(phone, otp) {
    try {
      // Validate phone number
      if (!phone || phone.length !== 10) {
        return { success: false, message: 'Invalid phone number' };
      }

      if (process.env.NODE_ENV === 'production') {
        // Call MSG91 API in production
        const response = await axios.post(
          'https://control.msg91.com/api/v5/otp',
          {
            template_id: process.env.TEMPLATE_ID,
            mobile: `91${phone}`,
            otp: otp,
          },
          {
            headers: {
              authkey: process.env.MSG91_API_KEY,
              'Content-Type': 'application/json',
            },
          }
        );

        return {
          success: true,
          message: 'OTP sent successfully',
          data: response.data,
        };
      } else {
        // For development, just simulate OTP send
        console.log(`[DEV MODE] OTP ${otp} would be sent to +91${phone}`);
        return {
          success: true,
          message: 'OTP sent successfully (DEV MODE)',
          data: { otp }, // Only in development mode we return OTP
        };
      }
    } catch (error) {
      console.error('Error sending OTP:', error.response?.data || error.message);
      return {
        success: false,
        message: 'Failed to send OTP',
        error: error.response?.data || error.message,
      };
    }
  }

  /**
   * Verify OTP using MSG91 (in production, we would call MSG91's verify API)
   * @param {string} phone - Phone number
   * @param {string} otp - OTP to verify
   * @param {string} storedOTP - The OTP previously stored locally
   * @returns {Promise<Object>} - Response object
   */
  static async verifyOTP(phone, otp, storedOTP) {
    try {
      // In production, you can call MSG91's verify API
      // For now, just compare with locally stored OTP
      await new Promise((resolve) => setTimeout(resolve, 500));

      return {
        success: otp === storedOTP,
        message: otp === storedOTP ? 'OTP verified successfully' : 'Invalid OTP',
      };
    } catch (error) {
      console.error('Error verifying OTP:', error.message);
      return {
        success: false,
        message: 'Failed to verify OTP',
        error: error.message,
      };
    }
  }
}

module.exports = SMSService;

