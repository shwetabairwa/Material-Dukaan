import React, { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCategoryCard from "./ProductCategory";

const HorizontalProductScroll = ({ activeSubCategory, onLoad }) => {
  const scrollRef = useRef(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = isMobile ? 200 : 300;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const styles = {
    container: {
      position: "relative",
      margin: isMobile ? "1rem" : "2rem",
      borderRadius: "1rem",
    },
    heading: {
      textAlign: "center",
      margin: isMobile ? "1rem" : "2rem",
      fontSize: isMobile ? "1.25rem" : "1.5rem",
      fontWeight: 600,
    },
    scrollButton: {
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      background: "#fff",
      border: "none",
      padding: "8px",
      borderRadius: "50%",
      boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
      cursor: "pointer",
      zIndex: 10,
      display: isMobile ? "none" : "block",
    },
    leftButton: {
      left: "10px",
    },
    rightButton: {
      right: "10px",
    },
    scrollArea: {
      display: "flex",
      overflowX: "auto",
      scrollBehavior: "smooth",
      padding: isMobile ? "0 10px" : "0 40px",
      msOverflowStyle: "none",
      scrollbarWidth: "none",
    },
    contentArea: {
      display: "flex",
      width: "100%",
      gap: isMobile ? "10px" : "20px",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.heading}>
        <h2>Our Trending Products</h2>
      </div>

      <button
        onClick={() => scroll("left")}
        style={{ ...styles.scrollButton, ...styles.leftButton }}
      >
        <ChevronLeft />
      </button>

      <div
        ref={scrollRef}
        style={styles.scrollArea}
        className="no-scrollbar"
      >
        <div style={styles.contentArea}>
          <ProductCategoryCard subID={92} />
          {/* You can render more cards dynamically here */}
        </div>
      </div>

      <button
        onClick={() => scroll("right")}
        style={{ ...styles.scrollButton, ...styles.rightButton }}
      >
        <ChevronRight />
      </button>
    </div>
  );
};

export default HorizontalProductScroll;
