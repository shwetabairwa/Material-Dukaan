import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MainCard from "../Cards/MainCard";
import { db } from "./firebase";
import { getDocs, collection } from "firebase/firestore";

const MainCategory = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hovered, setHovered] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

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

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (loading) return <p>Loading categories...</p>;
  if (error) return <p>Error: {error}</p>;
  if (categories.length === 0) return <p>No categories found.</p>;

  const handleMouseEnter = (index) => setHovered(index);
  const handleMouseLeave = () => setHovered(null);

  return (
    <div style={{ margin: isMobile ? "0.5rem" : "3rem" }}>
      <h2
        style={{
          marginBottom: "20px",
          fontSize: isMobile ? "1.2rem" : "1.5rem",
        }}
      >
        Main Categories
      </h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile
            ? "repeat(auto-fill, minmax(5rem, 1fr))"
            : "repeat(auto-fill, minmax(13rem, 1fr))",
          gap: "1rem",
        }}
      >
        {categories.slice(0, 10).map((cat, index) => (
          <MainCard
            key={cat.id || index}
            cat={cat}
            index={index}
            isMobile={isMobile}
            hovered={hovered === index}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
            onClick={() =>
              navigate("/subpage", {
                state: {
                  mainCat: cat.row_seq,
                  header: cat.mainCategory_Name || cat.MainCategory_Name,
                },
              })
            }
          />
        ))}
      </div>
    </div>
  );
};

export default MainCategory;
