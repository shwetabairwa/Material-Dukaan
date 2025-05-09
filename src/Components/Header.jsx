import React, { useState, useEffect } from "react";
import LoginModal from "./LoginModal";
import logo from "../assets/logo.jpeg"

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const styles = {
    header: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "1rem 1rem",
      backgroundColor: "#fff",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      flexWrap: "wrap",
      position: "relative",
    },
    logo: {
      width:'5rem',
      fontSize: "1.5rem",
      backgroundColor:'#fff',
      fontWeight: "bold",
      color: "#2563eb",
    },
    hamburger: {
      fontSize: "1.5rem",
      background: "none",
      border: "none",
      cursor: "pointer",
      display: isMobile ? "block" : "none",
      marginLeft: "auto",
    },
    nav: {
      display: "flex",
      alignItems: "center",
      gap: "1rem",
    },
    mobileNav: {
      display: "flex",
      flexDirection: "column",
      gap: "0.75rem",
      marginTop: "1rem",
      width: "100%",
    },
    search: {
      padding: "0.6rem 1rem",
      borderRadius: "0.5rem",
      fontSize: "1rem",
      border: "1px solid #ccc",
      width: isMobile ? "100%" : "250px",
      boxSizing: "border-box",
    },
    loginButton: {
      padding: "0.5rem 1rem",
      fontSize: "1rem",
      color: "#c1121f",
      border: "1px solid #c1121f",
      backgroundColor: "#fff",
      cursor: "pointer",
      borderRadius: "0.5rem",
      width: isMobile ? "100%" : "auto",
    },
   
  };

  return (
    <>
      <header style={styles.header}>
        <div style={styles.logo}>
          <img src={logo} style={styles.logo} />
        </div>

        <button onClick={() => setMenuOpen(!menuOpen)} style={styles.hamburger}>
          {menuOpen ? "✖" : "☰"}
        </button>

        {(isMobile && menuOpen) || !isMobile ? (
          <nav style={isMobile ? styles.mobileNav : styles.nav}>
            <input type="text" placeholder="Search..." style={styles.search} />
            <button
              style={styles.loginButton}
              onClick={() => setShowModal(true)}
            >
              Login
            </button>
          </nav>
        ) : null}
      </header>

      {showModal && <LoginModal onClose={() => setShowModal(false)} />}
    </>
  );
};

export default Header;
