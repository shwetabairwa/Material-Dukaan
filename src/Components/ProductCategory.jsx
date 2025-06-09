import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductCategories } from "../Redux/productCategorySlice";
import { useNavigate } from "react-router-dom";
import ProductCard from "../Cards/ProductCard";
import ProductCardMobile from "../Cards/ProuctCardMobile";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

const ProductCategory = ({ subID }) => {
  console.log('subID: ', subID);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const { categories, status, error } = useSelector(
  //   (state) => state.productCategory
  // );

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const isMobile = screenWidth <= 768;
  const [quantities, setQuantities] = useState({});
  const [categories, setCategories] = useState([]);
  console.log('categories: ', categories);
  useEffect(() => {
    dispatch(getProductCategories());
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [dispatch]);

  if (status === "failed") return <p>Error: {error}</p>;
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
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


  const filteredCategories = categories.filter(
    (cat) => Array.isArray(cat.subCategoryRow) && cat.subCategoryRow.includes(subID)
  );

  if (filteredCategories.length === 0) return <p>No products found.</p>;

  const handleAddToCart = (e, id) => {
    e.stopPropagation();
    setQuantities((prev) => ({ ...prev, [id]: 1 }));
  };

  const increment = (e, id) => {
    e.stopPropagation();
    setQuantities((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const decrement = (e, id) => {
    e.stopPropagation();
    setQuantities((prev) => ({
      ...prev,
      [id]: prev[id] > 1 ? prev[id] - 1 : 0,
    }));
  };

  return (
    <div style={styles.outerWrapper}>
      {filteredCategories.map((cat) =>
        isMobile ? (
          <ProductCardMobile
            key={cat.id}
            product={cat}
            screenWidth={screenWidth}
            quantity={quantities[cat.id] || 0}
            onAddToCart={handleAddToCart}
            onIncrement={increment}
            onDecrement={decrement}
            navigate={navigate}
          />
        ) : (
          <ProductCard
              key={cat.id}
            product={cat}
            screenWidth={screenWidth}
              quantity={quantities[cat.id] || 0}
            onAddToCart={handleAddToCart}
            onIncrement={increment}
            onDecrement={decrement}
            navigate={navigate}
          />
        )
      )}
    </div>
  );
};

const styles = {
  outerWrapper: {
    display: "flex",
    flexWrap: "wrap",
    width: "100%",
    gap: "1rem",
  },
};

export default ProductCategory;
