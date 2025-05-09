import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMainCategories } from "../Redux/mainCategorySlice";
import { useNavigate } from "react-router-dom";
import MainCard from "../Cards/MainCard";

const MainCategory = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { categories, status, error } = useSelector(
    (state) => state.mainCategory
  );

  const [hovered, setHovered] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    dispatch(getMainCategories());
  }, [dispatch]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);



  if (status === "failed") return <p>Error: {error}</p>;

  const handleMouseEnter = (index) => setHovered(index);
  const handleMouseLeave = () => setHovered(null);

  const styles = {
    container: {
      margin: isMobile ? "0.5rem" : "3rem",
    },
    heading: {
      marginBottom: "20px",
      fontSize: isMobile ? "1.2rem" : "1.5rem",
    },
    gridContainer: {
      display: "grid",
      gridTemplateColumns: isMobile
        ? "repeat(auto-fill, minmax(5rem, 1fr))"
        : "repeat(auto-fill, minmax(13rem, 1fr))",
      gap: "1rem",
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Main Categories</h2>
      <div style={styles.gridContainer}>
        {categories.slice(0, 10).map((cat, index) => (
          <MainCard
            key={cat.row_seq}
            cat={cat}
            index={index}
            isMobile={isMobile}
            hovered={hovered}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={() =>
              navigate("/subpage", {
                state: { mainCat: cat.row_seq, header: cat.mainCategory_Name },
              })
            }
          />
        ))}
      </div>
    </div>
  );
};

export default MainCategory;
