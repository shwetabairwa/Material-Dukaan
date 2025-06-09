import React, { useEffect, useState } from "react";
import { auth } from "./firebase"; // ✅ Make sure this is correct
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import axios from "axios";

const styles = {
  backdrop: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },
  content: {
    position: "relative",
    backgroundColor: "#fff",
    padding: "2.5rem",
    borderRadius: "10px",
    width: "90%",
    maxWidth: "400px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
    textAlign: "center",
  },
  subtitle: {
    color: "#333",
    fontSize: "1.2rem",
    fontWeight: 600,
    marginBottom: "2rem",
  },
  input: {
    width: "82%",
    padding: "0.8rem",
    borderRadius: "4px",
    border: "1px solid #ccc",
    marginBottom: "1rem",
    fontSize: "1rem",
  },
  continueButton: {
    width: "90%",
    padding: "0.8rem",
    backgroundColor: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    fontWeight: "bold",
    fontSize: "1rem",
    cursor: "pointer",
  },
};

const LoginModal = ({ onClose }) => {
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loginData, setLoginData] = useState(null);
  const [error, setError] = useState(null);

  // const fetchLoginData = async (token) => {
  //   try {
  //     const response = await axios.get(
  //       `https://partnerappbackend-production.up.railway.app/auth/verify/${token}`
  //     );
  //     return response.data;
  //   } catch (error) {
  //     console.error(error.response?.data || error.message);
  //     throw new Error("Failed to fetch login data");
  //   }
  // };

  useEffect(() => {
    if (!window.recaptchaVerifier && auth) {
      try {
        window.recaptchaVerifier = new RecaptchaVerifier(
          "recaptcha-container",
          {
            size: "invisible",
            callback: (response) => {
              console.log("reCAPTCHA solved:", response);
            },
          },
          auth
        );
  
        window.recaptchaVerifier.render().then((widgetId) => {
          window.recaptchaWidgetId = widgetId;
          console.log("reCAPTCHA initialized with widgetId:", widgetId);
        });
      } catch (err) {
        console.error("Failed to initialize reCAPTCHA:", err);
      }
    }
  }, []);
  

  const handleSendOtp = async () => {
    if (!/^\d{10}$/.test(mobile)) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }

    setLoading(true);
    try {
      const appVerifier = window.recaptchaVerifier;
      const fullPhoneNumber = `+91${mobile}`;
      const confirmationResult = await signInWithPhoneNumber(
        auth,
        fullPhoneNumber,
        appVerifier
      );
      window.confirmationResult = confirmationResult;
      setIsOtpSent(true);
      alert("OTP has been sent to your mobile.");
    } catch (error) {
      console.error("Error sending OTP:", error);
      alert("Failed to send OTP. Check phone number or reCAPTCHA.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!/^\d{6}$/.test(otp)) {
      alert("Please enter a 6-digit OTP.");
      return;
    }

    setLoading(true);
    try {
      const result = await window.confirmationResult.confirm(otp);
      const user = result.user;
      const token = await user.getIdToken(true);
      const loginResponse = await fetchLoginData(token);
      setLoginData(loginResponse);
      alert("Login successful!");
      onClose();
    } catch (error) {
      console.error("OTP verification failed:", error);
      if (error.code === "auth/invalid-verification-code") {
        alert("Incorrect OTP. Please try again.");
      } else if (error.code === "auth/code-expired") {
        alert("OTP expired. Please resend.");
      } else {
        alert("Failed to verify OTP. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOtpSent) {
      document.querySelector("input[placeholder='Enter OTP']")?.focus();
    }
  }, [isOtpSent]);

  return (
    <div style={styles.backdrop} onClick={onClose}>
      <div style={styles.content} onClick={(e) => e.stopPropagation()}>
        <div style={styles.subtitle}>Log in or Sign up</div>

        {!isOtpSent ? (
          <>
            <input
              type="tel"
              placeholder="Enter mobile number"
              style={styles.input}
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              maxLength={10}
            />
            <div id="recaptcha-container"></div>
            <button
              style={styles.continueButton}
              onClick={handleSendOtp}
              disabled={loading}
            >
              {loading ? "Sending..." : "Continue"}
            </button>
          </>
        ) : (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              style={styles.input}
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              maxLength={6}
            />
            <button
              style={styles.continueButton}
              onClick={handleVerifyOtp}
              disabled={loading}
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginModal;
