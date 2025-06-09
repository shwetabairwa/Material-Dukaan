import { ShoppingCart, Heart } from "lucide-react";

const ProductCard = ({
  product,
  screenWidth,
  quantity,
  onAddToCart,
  onIncrement,
  onDecrement,
  navigate,
}) => {
  let description = {};
  let variants = [];

  try {
    description =
      typeof product.ProductDescription === "string"
        ? JSON.parse(product.ProductDescription)
        : product.ProductDescription || {};
  } catch (e) {
    console.error("Invalid ProductDescription JSON:", e);
  }

  try {
    variants =
      typeof product.variants === "string"
        ? JSON.parse(product.variants)
        : product.variants || [];
  } catch (e) {
    console.error("Invalid variants JSON:", e);
  }

  const imageUrl =
    Array.isArray(description?.images) && description.images[0]
      ? description.images[0]
      : "/placeholder.png";

  const variant = variants?.[0];
  const salePrice = variant?.salePrice ?? 0;

  const getResponsiveCardStyle = () => {
    if (screenWidth <= 480) return { width: "100%" };
    if (screenWidth <= 768) return { width: "48%" };
    if (screenWidth <= 1024) return { width: "30%" };
    return { width: "15rem" };
  };

  return (
    <div
      style={{ ...styles.card, ...getResponsiveCardStyle() }}
      onClick={() => navigate("/detailPage", { state: { product } })}
    >
      <div style={styles.imageWrapper}>
        {imageUrl ? (
          <img src={imageUrl} alt={product.productName} style={styles.image} />
        ) : (
          <div style={{ ...styles.image, backgroundColor: "#eee" }}>
            No image
          </div>
        )}
        <div style={styles.heart}>
          <Heart size={16} color="#c1121f" />
        </div>
      </div>

      <div style={styles.info}>
        <h3 style={styles.title}>{product.productName}</h3>
        <p style={styles.subtitle}>
          {description?.shortDescription || "No description available"}
        </p>

        <div style={styles.colorDots}>
          {["#000", "#555", "#999"].map((color, i) => (
            <span key={i} style={{ ...styles.dot, backgroundColor: color }} />
          ))}
        </div>

        <div style={styles.priceRow}>
          <span style={styles.price}>${salePrice.toFixed(2)}</span>

          {quantity === 0 ? (
            <button
              style={styles.button}
              onClick={(e) => onAddToCart(e, product.rowId)}
            >
              <ShoppingCart size={14} />
              Add to cart
            </button>
          ) : (
            <div style={styles.quantityBox} onClick={(e) => e.stopPropagation()}>
              <button
                style={styles.qtyBtn}
                onClick={(e) => onDecrement(e, product.rowId)}
              >
                −
              </button>
              <span style={styles.qtyText}>{quantity}</span>
              <button
                style={styles.qtyBtn}
                onClick={(e) => onIncrement(e, product.rowId)}
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const styles = {
  card: {
    minHeight: "22rem",
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.06)",
    overflow: "hidden",
    padding: "1rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    cursor: "pointer",
    transition: "transform 0.2s ease",
  },
  imageWrapper: {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "10rem",
    marginBottom: "0.8rem",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
    borderRadius: "12px",
  },
  heart: {
    position: "absolute",
    top: "0.6rem",
    right: "0.3rem",
    backgroundColor: "#fff",
    padding: "0.5rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "50%",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
  },
  info: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    flexGrow: 1,
  },
  title: {
    fontSize: "1rem",
    fontWeight: "600",
    color: "#222",
    marginBottom: "0.3rem",
  },
  subtitle: {
    fontSize: "0.85rem",
    color: "#666",
    marginBottom: "0.5rem",
  },
  colorDots: {
    display: "flex",
    gap: "6px",
    marginBottom: "0.5rem",
  },
  dot: {
    width: "12px",
    height: "12px",
    borderRadius: "50%",
    border: "1px solid #ddd",
  },
  priceRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "auto",
  },
  price: {
    fontSize: "1.1rem",
    fontWeight: "700",
    color: "#111",
  },
  button: {
    backgroundColor: "#c1121f",
    color: "#fff",
    fontWeight: "600",
    border: "none",
    borderRadius: "10px",
    padding: "0.5rem 0.8rem",
    fontSize: "0.8rem",
    display: "flex",
    alignItems: "center",
    gap: "0.4rem",
    cursor: "pointer",
  },
  quantityBox: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#f3f3f3",
    borderRadius: "10px",
    padding: "0.3rem 0.5rem",
    gap: "0.5rem",
  },
  qtyBtn: {
    backgroundColor: "#c1121f",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    fontWeight: "bold",
    padding: "0.2rem 0.6rem",
    fontSize: "1rem",
    cursor: "pointer",
  },
  qtyText: {
    fontWeight: "600",
    fontSize: "0.9rem",
  },
};

export default ProductCard;
