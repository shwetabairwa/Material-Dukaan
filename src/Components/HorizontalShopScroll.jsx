import React, { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLocation } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";


const HorizontalShopScroll = ({ onCategoryClick }) => {
  // console.log('onCategoryClick: ', onCategoryClick);
  const scrollRef = useRef(null);
  const scrollAmount = 300;
  const location = useLocation();

  const [activeCategory, setActiveCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const shopList = location?.state?.shopID || [];
  console.log('shopList: ', shopList);

  const [categories1, setCategories] = useState([]);
  console.log('categoriesMain: ', categories1);
  // console.log("🚀 shopList:", shopList);


  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "maincategory"));
        const categoriesData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCategories(categoriesData);
      } catch (err) {
        console.error("Error fetching categories:", err);
        setError("Failed to load categories.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // ✅ Filter based on Firestore document ID
  // const filteredCategories = categories.filter((cat) =>
  //   shopList.map(String).includes(String(cat.id))
  // );
  // const handleClick = (cat) => {
  //   setActiveCategory(cat.id);
  //   onCategoryClick?.(cat.mainCategory_Name, cat.id);
  // };

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };



  return (
    <>
      <div style={styles.heading}>
        <h3>Fine Things You'll Love</h3>
      </div>

      <div style={styles.container}>
        <button onClick={() => scroll("left")} style={{ ...styles.scrollButton, ...styles.leftButton }}>
          <ChevronLeft />
        </button>

        <div ref={scrollRef} style={styles.scrollArea}>
          <div style={styles.contentArea}>
            {loading ? (
              <p>Loading...</p>
            ) : filteredCategories.length === 0 ? (
                <p>No matching categories found.</p>
            ) : (
              filteredCategories.map((cat) => (
                <div
                  key={cat.id}
                  onClick={() => handleClick(cat)}
                  style={{
                    cursor: "pointer",
                    transform: activeCategory === cat.id ? "scale(1.05)" : "scale(1)",
                    transition: "transform 0.2s ease-in-out",
                  }}
                >
                  <div
                    style={{
                      ...styles.card,
                      border: activeCategory === cat.id ? "1px solid #007bff" : "none",
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
                      fontWeight: activeCategory === cat.id ? "bold" : "normal",
                      color: activeCategory === cat.id ? "#007bff" : "#000",
                    }}
                  >
                    {cat.mainCategory_Name}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>

        <button onClick={() => scroll("right")} style={{ ...styles.scrollButton, ...styles.rightButton }}>
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
  leftButton: { left: "0px" },
  rightButton: { right: "0px" },
  scrollArea: {
    display: "flex",
    overflowX: "auto",
    scrollBehavior: "smooth",
    padding: "0 50px",
    msOverflowStyle: "none",
    scrollbarWidth: "none",
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
    flexShrink: 0,
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

export default HorizontalShopScroll;
