import React, { useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getSubCategories } from "../redux/subCategorySlice";

const styles = {
  container: {
    position: "relative",
    width: "90%",
    margin: "2rem auto",
    backgroundColor: "#e6edf0",
    padding: "4rem 2rem",
    borderRadius: "1rem",
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
    left: "10px",
  },
  rightButton: {
    right: "10px",
  },
  scrollArea: {
    display: "flex",
    overflowX: "auto",
    scrollBehavior: "smooth",
    padding: "0 40px",
    msOverflowStyle: "none",
    scrollbarWidth: "none",
  },
  contentArea: {
    display: "flex",
    gap: "20px",
  },
  card: {
    minWidth: "10rem",
    height: "10rem",
    backgroundColor: "#fff",
    borderRadius: "50%",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
    padding: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  imageWrapper: {
    width: "6rem",
    height: "6rem",
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

const HorizontalSubScroll = ({ mainCategory, }) => {
  const scrollRef = useRef(null);
  const dispatch = useDispatch();
  const { categories, status } = useSelector((state) => state.subCategory);
  const scrollAmount = 300;

  useEffect(() => {
    dispatch(getSubCategories());
  }, [dispatch]);


  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const filteredCategories = categories.filter((cat) => {
    try {
      const parsed = JSON.parse(cat.mainCategoryRow);
      return parsed.some((id) => mainCategory.includes(Number(id)));
    } catch (err) {
      return false;
    }
  });

  return (
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
              <div key={cat.row_seq}>
                <div style={styles.card}>
                  <div style={styles.imageWrapper}>
                    <img
                      src={cat.subCategory_Image}
                      alt={cat.subCategory_Name}
                      style={styles.image}
                    />
                  </div>
                </div>
                <p style={styles.name}>{cat.subCategory_Name}</p>
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
  );
};

export default HorizontalSubScroll;
