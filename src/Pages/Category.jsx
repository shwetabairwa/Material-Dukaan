import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMainCategories } from "../Redux/mainCategorySlice";
import { getShopCategories } from "../Redux/shopCategorySlice";
import MainCard from "../Cards/MainCard";
import { useNavigate } from "react-router-dom";

const Category = ({ onCategoryClick }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const { categories, status } = useSelector((state) => state.mainCategory);
  const { categories: categoriesShop } = useSelector((state) => state.shopCategory);
  const handleMouseEnter = (index) => setHovered(index);
  const handleMouseLeave = () => setHovered(null);
  const [hovered, setHovered] = useState(null);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    dispatch(getShopCategories());
    dispatch(getMainCategories());
  }, [dispatch]);

  const handleClick = (cat) => {
    setActiveCategory(cat.row_seq);
    onCategoryClick?.(cat.mainCategory_Name, cat.row_seq);
  };

 
const styles = {
  
  categoryBox: {
    textalign:'center',
    margin: "0.5rem",

  },
  container: {

    margin: isMobile ? "0.5rem" : "3rem",
    marginBottom:'3rem',
    
  },
  heading: {
    
    marginBottom: "20px",
    fontSize: isMobile ? "1.2rem" : "1.5rem",
    
  },
  gridContainer: {
    display: "grid",
    gridTemplateColumns: isMobile
    ? "repeat(auto-fill, minmax(6rem, 1fr))"
    : "repeat(auto-fill, minmax(13rem, 1fr))",
    gap: "1rem",
 
  },
};
  // Function to handle filtering main categories based on shop categories
  const getFilteredCategories = (mainCategoryRow) => {
    if (!Array.isArray(mainCategoryRow)) return [];

    return categories.filter((cat) =>
      mainCategoryRow.includes(parseInt(cat.row_seq))
    );
  };

  return (
    <>
      <div style={styles.heading}>
        <h3>All Categories</h3>
      </div>

      <div style={{marginBottom:'4rem'}}>
        {Array.isArray(categoriesShop) &&
          categoriesShop.slice(0, 5).map((cat) => {
            const mainCategoryArray = JSON.parse(cat.mainCategoryRow || "[]");
            const filteredCategories = getFilteredCategories(mainCategoryArray);
            return (
              <div key={cat.rowId} style={styles.categoryBox}>
                <p>{cat.name || "Unnamed Category"}</p>
                <div style={styles.gridContainer}>
                  {filteredCategories.length > 0 ? (
                    filteredCategories.map((subCat) => (
                      <MainCard
                      key={subCat.row_seq}
                      cat={subCat}
                  
                      isMobile={isMobile}
                      hovered={hovered}
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                      onClick={() =>
                        navigate("/subpage", {
                          state: { mainCat: subCat.row_seq, header: subCat.mainCategory_Name },
                        })
                      }
                    />
                    ))
                  ) : (
                    <p>No subcategories found.</p>
                  )}
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};


export default Category;
