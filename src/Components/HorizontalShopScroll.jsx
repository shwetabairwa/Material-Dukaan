import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMainCategories } from "../Redux/mainCategorySlice";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLocation } from "react-router-dom";

const HorizontalShopScroll = ({ onCategoryClick }) => {
  const dispatch = useDispatch();
  const scrollRef = useRef(null);
  const scrollAmount = 300;
  const location = useLocation();
  const [activeCategory, setActiveCategory] = useState(null);

  const shopList = location?.state?.shopID || [];

  const { categories, error, status } = useSelector(
    (state) => state.mainCategory
  );

  const handleClick = (cat) => {
    setActiveCategory(cat.row_seq);
    onCategoryClick?.(cat.mainCategory_Name, cat.row_seq);
  };

  useEffect(() => {
    dispatch(getMainCategories());
  }, [dispatch]);

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const filteredCategories = categories.filter((cat) =>
    shopList.includes(Number(cat.row_seq))
  );

  return (
    <>
      <div style={styles.heading}>
        <h3>Fine Things You'll Love</h3>
      </div>

      <div style={styles.container}>
        <button
          onClick={() => scroll("left")}
          style={{ ...styles.scrollButton, ...styles.leftButton }}
        >
          <ChevronLeft />
        </button>

        <div ref={scrollRef} style={styles.scrollArea}>
          <div style={styles.contentArea}>
            {status === "loading" ? (
              <p>Loading...</p>
            ) : filteredCategories.length === 0 ? (
              <p>No matching subcategories found.</p>
            ) : (
              filteredCategories.map((cat) => (
                <div
                  key={cat.row_seq}
                  onClick={() => handleClick(cat)}
                  style={{
                    cursor: "pointer",
                    transform:
                      activeCategory === cat.row_seq
                        ? "scale(1.05)"
                        : "scale(1)",
                    transition: "transform 0.2s ease-in-out",
                  }}
                >
                  <div
                    style={{
                      ...styles.card,
                      border:
                        activeCategory === cat.row_seq
                          ? "1px solid #007bff"
                          : "none",
                    }}
                  >
                    <div style={styles.imageWrapper}>
                      <img
                        src={cat.mainCategory_Image}
                        alt={cat.mainCategory_Name}
                        style={styles.image}
                      />
                    </div>
                  </div>
                  <p
                    style={{
                      ...styles.name,
                      fontWeight:
                        activeCategory === cat.row_seq ? "bold" : "normal",
                      color:
                        activeCategory === cat.row_seq ? "#007bff" : "#000",
                    }}
                  >
                    {cat.mainCategory_Name}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>

        <button
          onClick={() => scroll("right")}
          style={{ ...styles.scrollButton, ...styles.rightButton }}
        >
          <ChevronRight />
        </button>
      </div>
    </>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    margin: "2rem",
    borderRadius: "1rem",
  },
  heading: {
    textAlign: "center",
    marginTop: "5rem",
    fontSize: "1.2rem",
    fontWeight: "600",
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
  },
  leftButton: {
    left: "0px",
  },
  rightButton: {
    right: "0px",
  },
  scrollArea: {
    display: "flex",
    overflowX: "auto",
    scrollBehavior: "smooth",
    padding: "0 50px", // increased padding to prevent hiding behind buttons
    msOverflowStyle: "none", // Hide scrollbar IE/Edge
    scrollbarWidth: "none", // Hide scrollbar Firefox
   
    justifyContent: "center",
  },
  contentArea: {
    display: "flex",
    padding: "1rem",
    gap: "1rem",
    flexWrap: "nowrap",
  },
  card: {
    width: "8rem",
    height: "8rem",
    backgroundColor: "#fff",
    borderRadius: "50%",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
    padding: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    transition: "all 0.2s ease-in-out",
    flexShrink: 0, // prevents shrinking when screen is narrow
  },
  imageWrapper: {
    width: "4rem",
    height: "4rem",
    borderRadius: "50%",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  name: {
    marginTop: "0.5rem",
    fontSize: "14px",
    color: "#000",
    textAlign: "center",
  },
};

// Add media queries for responsiveness
const responsiveStyles = {
  "@media (max-width: 768px)": {
    container: {
      margin: "1rem",
    },
    card: {
      width: "4rem !important",
      height: "4rem !important",
    },
    imageWrapper: {
      width: "3rem !important",
      height: "3rem !important",
    },
    scrollButton: {
      padding: "6px !important",
      top: "45% !important",
    },
  },
};

export default HorizontalShopScroll;
