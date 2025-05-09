import React, { useEffect, useState } from "react";
import { Flame, Upload, MessageCircle } from "lucide-react";

const QuickCall = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const styles = {
    container: {
      padding: isMobile ? "20px" : "2rem",
      borderRadius: "12px",
      // boxShadow: isMobile ? undefined: '0 4px 8px rgba(0,0,0,0.1)' ,
      border: "1px solid #ddd", // <-- Added border
      borderRadius: "10px",
      textAlign: "center",
      backgroundColor: "#fff",
      margin: isMobile ? "0.8rem 0.2rem" : "3rem 3rem",
    },

    iconWrapper: {
      fontSize: isMobile ? "30px" : "40px",
      color: "#ff5722",
      marginBottom: "10px",
    },
    heading: {
      margin: 0,
      padding: 0,

      fontWeight: "bold",
      fontSize: isMobile ? "20px" : "24px",
    },
    description: {
      padding: 0,
      marginTop: 10,

      fontSize: isMobile ? "14px" : "16px",
      color: "#444",
    },
    buttonGroup: {
      display: "flex",

      justifyContent: isMobile? "space-between": "center",
      gap: "15px",
      marginTop: "1rem",
      // flexWrap: 'wrap',
      flexdirection: "row",
    },
    button: {
      width: isMobile? "50%" :undefined,
      color: "white",
      border: "none",
      padding: isMobile ? "10px 14px" : "12px 18px",
      borderRadius: "8px",
      display: "flex",
      alignItems: "center",
      gap: "8px",
      fontSize: isMobile ? "14px" : "16px",
      cursor: "pointer",
      minWidth: isMobile ? "130px" : "150px",
      justifyContent: "center",
    },
    whatsappButton: {
      backgroundColor: "#25D366",
    },
    uploadButton: {
      backgroundColor: "#c1121f",
    },
  };

  return (
    <div style={styles.container}>
      <div style={{ width: "100%", textAlign:isMobile?  "left" : 'center'}}>
        <h2 style={styles.heading}>Quick Order</h2>
        <p style={styles.description}>Order in Bulk with wholesale price</p>
      </div>
      <div style={styles.buttonGroup}>
        <button style={{ ...styles.button, ...styles.whatsappButton }}>
          <MessageCircle size={isMobile ? 16 : 18} />
          WhatsApp
        </button>
        <button style={{ ...styles.button, ...styles.uploadButton }}>
          <Upload size={isMobile ? 16 : 18} />
          Upload Image
        </button>
      </div>
    </div>
  );
};

export default QuickCall;
