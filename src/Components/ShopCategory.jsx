import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getShopCategories } from "../redux/shopCategorySlice";
import { useNavigate } from "react-router-dom";
import ShopCard from "../Cards/ShopCard";
import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";

const ShopCategory = ({ limit = 5 }) => {
  const navigate = useNavigate();
  const [categories, setShopCategories] = useState([]);
  console.log('categories: ', categories);

  const [hoverIndex, setHoverIndex] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "shops"));
        const categoriesData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setShopCategories(categoriesData);
      } catch (err) {
        console.error("Error fetching categories:", err);
        setError("Failed to load categories.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleMouseEnter = (index) => setHoverIndex(index);
  const handleMouseLeave = () => setHoverIndex(null);

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      padding: isMobile ? "0.1rem" : "3rem",
      margin: '1rem 0.1rem',

    },
    // heading: {
    //   fontSize: isMobile ? "1rem" : "2rem",
    //   textAlign: isMobile ? "left" : "center",
    //   color: "#1f1f1f",
    // },
    gridContainer: {

      display: "grid",
      gridTemplateColumns: isMobile
        ? "repeat(auto-fill, minmax(35%, 1fr))"
        : "repeat(auto-fill, minmax(25%, 1fr))",
      gap: "0.8rem",
    },
    para: {
      margin: 2,
      padding: 0.,
      fontSize: isMobile ? '1rem' : '1.3rem',

    }
  };

  return (
    <div style={styles.container}>
      <div style={{ display: 'flex', flexDirection: 'column', flex: 'wrap', marginBottom: '1rem', textAlign: isMobile ? 'left' : 'center' }}>
        <h4 style={styles.para}>What are you looking for</h4>
        <p style={{ ...styles.para, color: '#aaa' }}>
          Your all home construction need end here
        </p>
      </div>
      <div style={styles.gridContainer}>
        {categories.slice(0, limit).map((cat, i) => {
          let imageUrl = "";
          try {
            imageUrl = cat.specification?.imageUrl;
          } catch (e) {
            console.error("Invalid specification", e);
          }

          const isHovered = hoverIndex === i;

          return (
            <ShopCard
              key={cat.id}
              cat={cat}
              index={i}
              isMobile={isMobile}
              isHovered={isHovered}
              imageUrl={imageUrl}
              onClick={() => {
                const mainCategoryArray =
                  cat.mainCategoryRow || "[]"
                ;
                navigate("/shoppage", { state: { shopID: mainCategoryArray } });
              }}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ShopCategory;
