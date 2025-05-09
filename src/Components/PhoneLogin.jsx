

import React, { useState, useEffect } from "react";
import { auth } from "./firebase";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";

function PhoneLogin() {
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);

  useEffect(() => {
    if (!window.recaptchaVerifier) {
", {
        size: "invisible",
        callback: (response) => {
          console.log("reCAPTCHA solved:", response);
        },
      });
      window.recaptchaVerifier.render().then((widgetId) => {
        window.recaptchaWidgetId = widgetId;
      });
    }
  }, []);

  const sendOtp = async () => {
    const appVerifier = window.recaptchaVerifier;

    try {
      const result = await signInWithPhoneNumber(auth, `+91${mobile}`, appVerifier);
      setConfirmationResult(result);
      alert("OTP sent!");
    } catch (error) {
      console.error("Error during signInWithPhoneNumber:", error);
    }
  };

  const verifyOtp = async () => {
    if (!confirmationResult) return;

    try {
      const result = await confirmationResult.confirm(otp);
      alert("Phone verified! ✅");
      console.log("User:", result.user);
    } catch (error) {
      console.error("Invalid OTP:", error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter mobile number"
        value={mobile}
        onChange={(e) => setMobile(e.target.value)}
      />
      <button onClick={sendOtp}>Send OTP</button>

      <input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />
      <button onClick={verifyOtp}>Verify OTP</button>

      {/* Hidden reCAPTCHA container */}
      <div id="recaptcha-container"></div>
    </div>
  );
}

export default PhoneLogin;
