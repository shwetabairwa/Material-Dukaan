import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductCategories } from "../Redux/productCategorySlice";
import { useNavigate } from "react-router-dom";
import ProductCard from "../Cards/ProductCard";
import ProductCardMobile from "../Cards/ProuctCardMobile";

const ProductCategory = ({ subID }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { categories, status, error } = useSelector(
    (state) => state.productCategory
  );

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const isMobile = screenWidth <= 768;
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    dispatch(getProductCategories());
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [dispatch]);

  if (status === "failed") return <p>Error: {error}</p>;

  const filteredCategories = categories.filter(
    (cat) => String(cat.subCategoryRow) === String(subID)
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
            key={cat.rowId}
            product={cat}
            screenWidth={screenWidth}
            quantity={quantities[cat.rowId] || 0}
            onAddToCart={handleAddToCart}
            onIncrement={increment}
            onDecrement={decrement}
            navigate={navigate}
          />
        ) : (
          <ProductCard
            key={cat.rowId}
            product={cat}
            screenWidth={screenWidth}
            quantity={quantities[cat.rowId] || 0}
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
