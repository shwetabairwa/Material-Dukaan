import React from "react";
import { ShoppingCart } from "lucide-react";

const ProductCardMobile = ({
  product,
  quantity,
  onAddToCart,
  onIncrement,
  onDecrement,
  navigate,
}) => {
  let description = {};
  let variant = {};

  try {
    description =
      typeof product.ProductDescription === "string"
        ? JSON.parse(product.ProductDescription)
        : product.ProductDescription || {};

    const variants =
      typeof product.variants === "string"
        ? JSON.parse(product.variants)
        : product.variants || [];

    variant = variants?.[0] || {};
  } catch (error) {
    console.error("Error parsing product data:", error);
  }

  const imageUrl =
    Array.isArray(description?.images) && description.images[0]
      ? description.images[0]
      : "/fallback-image.jpg";

  const salePrice = variant?.salePrice ?? 0;
  const originalPrice = variant?.price ?? 0;

  return (
    <div
      style={styles.card}
      onClick={() =>
        navigate("/detailPage", {
          state: { product },
        })
      }
    >
      <div style={styles.imageContainer}>
        <img
          src={imageUrl}
          alt={product.productName}
          style={styles.image}
        />

        <div style={styles.details}>
          <h3 style={styles.name}>{product.productName}</h3>

          <div style={{ display: "flex", width: "100%", flexDirection: "row", gap: 30, alignItems: "center", justifyContent: "flex-end" }}>
            <div style={styles.priceRow}>
              <span style={styles.salePrice}>₹{salePrice}</span>
              {originalPrice > salePrice && (
                <span style={styles.originalPrice}>₹{originalPrice}</span>
              )}
            </div>

            {quantity === 0 ? (
              <button
                style={styles.addButton}
                onClick={(e) => {
                  e.stopPropagation();
                  onAddToCart(e, product.rowId);
                }}
              >
                <ShoppingCart size={14} style={{ marginRight: 4 }} />
                Add
              </button>
            ) : (
              <div
                style={styles.quantityBox}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  style={styles.quantityBtn}
                  onClick={(e) => onDecrement(e, product.rowId)}
                >
                  −
                </button>
                <span style={styles.quantityValue}>{quantity}</span>
                <button
                  style={styles.quantityBtn}
                  onClick={(e) => onIncrement(e, product.rowId)}
                >
                  +
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  card: {
    width: "100%",
    borderRadius: "10px",
    border: "1px solid #ddd",
    backgroundColor: "#fff",
    display: "flex",
    padding: "0.8rem",
    cursor: "pointer",
    transition: "transform 0.2s ease",
    flexDirection: "column",
  },
  imageContainer: {
    width: "100%",
    borderRadius: "8px",
    overflow: "hidden",
    display: "flex",
    gap: 30,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  image: {
    width: "5rem",
    objectFit: "cover",
  },
  details: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    flex: 1,
  },
  name: {
    fontSize: "14px",
    color: "#222",
    fontWeight: "600",
    marginBottom: "6px",
  },
  priceRow: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
  },
  salePrice: {
    fontSize: "16px",
    fontWeight: "700",
    color: "#b91c1c",
  },
  originalPrice: {
    fontSize: "0.9rem",
    textDecoration: "line-through",
    color: "#888",
  },
  addButton: {
    backgroundColor: "#b91c1c",
    color: "white",
    padding: "0.5rem 0.8rem",
    border: "none",
    borderRadius: "6px",
    fontWeight: "600",
    cursor: "pointer",
    fontSize: "14px",
    alignSelf: "flex-start",
  },
  quantityBox: {
    display: "flex",
    alignItems: "center",
    border: "1.5px solid #b91c1c",
    borderRadius: "6px",
    padding: "4px 10px",
    gap: "12px",
    alignSelf: "flex-start",
  },
  quantityBtn: {
    background: "none",
    border: "none",
    color: "#b91c1c",
    fontSize: "18px",
    fontWeight: "bold",
    cursor: "pointer",
  },
  quantityValue: {
    fontSize: "14px",
    minWidth: "20px",
    textAlign: "center",
    color: "#333",
  },
};

export default ProductCardMobile;
