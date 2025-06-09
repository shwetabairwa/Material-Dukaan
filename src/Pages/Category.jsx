import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MainCard from "../Cards/MainCard";
import { db } from "../Components/firebase";
import { collection, getDocs } from "firebase/firestore";

const Category = ({ onCategoryClick }) => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [categories, setCategories] = useState([]);
  const [categoriesShop, setCategoriesShop] = useState([]);
  const [hovered, setHovered] = useState(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchMainCategories = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "maincategory"));
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCategories(data);
      } catch (err) {
        console.error("Error fetching main categories:", err);
        setError("Failed to load main categories.");
      }
    };

    fetchMainCategories();
  }, []);

  useEffect(() => {
    const fetchShopCategories = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "shops"));
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCategoriesShop(data);
      } catch (err) {
        console.error("Error fetching shop categories:", err);
        setError("Failed to load shop categories.");
      } finally {
        setLoading(false);
      }
    };

    fetchShopCategories();
  }, []);

  const handleClick = (cat) => {
    setActiveCategory(cat.row_seq);
    onCategoryClick?.(cat.mainCategory_Name, cat.row_seq);
  };

  const getFilteredCategories = (mainCategoryRow) => {
    if (!Array.isArray(mainCategoryRow)) return [];
    return categories.filter((cat) =>
      mainCategoryRow.includes(cat.id)
    );
  };

  const styles = {
    categoryBox: { textAlign: "center", margin: "0.5rem" },
    container: { margin: isMobile ? "0.5rem" : "3rem", marginBottom: "3rem" },
    heading: { marginBottom: "20px", fontSize: isMobile ? "1.2rem" : "1.5rem" },
    gridContainer: {
      display: "grid",
      gridTemplateColumns: isMobile
        ? "repeat(auto-fill, minmax(6rem, 1fr))"
        : "repeat(auto-fill, minmax(13rem, 1fr))",
      gap: "1rem",
    },
  };

  if (loading) return <p>Loading categories...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <div style={styles.heading}>
        <h3>All Categories</h3>
      </div>

      <div style={{ marginBottom: "4rem" }}>
        {Array.isArray(categoriesShop) &&
          categoriesShop.slice(0, 5).map((cat) => {
            let mainCategoryArray = [];

            if (Array.isArray(cat.mainCategoryRow)) {
              mainCategoryArray = cat.mainCategoryRow;
            } else {
              try {
                mainCategoryArray = JSON.parse(cat.mainCategoryRow || "[]");
              } catch (err) {
                console.warn("Invalid JSON in mainCategoryRow for:", cat.name);
              }
            }

            const filteredCategories = getFilteredCategories(mainCategoryArray);

            if (filteredCategories.length === 0) return null; // 🚫 Skip if no matches

            return (
              <div key={cat.rowId || cat.id} style={styles.categoryBox}>
                <p>{cat.name || "Unnamed Category"}</p>
                <div style={styles.gridContainer}>
                  {filteredCategories.map((subCat) => (
                    <MainCard
                      key={subCat.id}
                      cat={subCat}
                      isMobile={isMobile}
                      hovered={hovered}
                      onMouseEnter={() => setHovered(subCat.id)}
                      onMouseLeave={() => setHovered(null)}
                      onClick={() =>
                        navigate("/subpage", {
                          state: {
                            mainCat: subCat.id,
                            header: subCat.mainCategory_Name,
                          },
                        })
                      }
                    />
                  ))}
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Category;
