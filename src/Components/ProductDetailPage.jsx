import { ShoppingCart } from "lucide-react";
import { useLocation } from "react-router-dom";

const ProductDetailPage = () => {
  const { state } = useLocation();
  const { product } = state || {};
  console.log("product: ", product);

  if (!product) return <p>Product not found.</p>;

  const description =
    typeof product.ProductDescription === "string"
      ? JSON.parse(product.ProductDescription)
      : product.ProductDescription;

  const imageUrl = description?.images?.[0];
  const variant = Array.isArray(product.variants)
    ? product.variants[0]
    : JSON.parse(product.variants)[0];

  const salePrice = variant?.salePrice ?? 0;

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        {/* Image section */}
        <div style={styles.imageSection}>
          <img
            src={imageUrl}
            alt={product.productName}
            style={styles.image}
          />
          <div style={styles.pagination}>
            <span style={{ ...styles.dot, backgroundColor: "#000" }} />
            <span style={styles.dot} />
            <span style={styles.dot} />
          </div>
        </div>

        {/* Detail section */}
        <div style={styles.detailsSection}>
          <p style={styles.designer}>SUZANNE GRØNLUND</p>
          <h1 style={styles.title}>{product.productName}</h1>
          <p style={styles.description}>
            Mundo Lounge chair is a Scandinavian design that also reveals a
            sense of humour. The encircling shape of the back creates excellent
            seating comfort while offering integrated armrest.
          </p>
          <p style={styles.price}>${salePrice.toLocaleString()}</p>
          <button style={styles.buyButton}>
            <ShoppingCart size={16} />
            Buy Now
          </button>

          {/* Color Options */}
          <div style={styles.colors}>
            <p style={styles.subTitle}>COLOURS</p>
            <div style={styles.colorOptions}>
              {["#262626", "#b49e83", "#9c9c9c"].map((color, index) => (
                <span
                  key={index}
                  style={{ ...styles.colorDot, backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          {/* Dimensions */}
          <div style={styles.dimensions}>
            <p style={styles.subTitle}>DIMENSIONS AND WEIGHT</p>
            <ul style={styles.dimensionList}>
              <li>Height: 76 / 4285 cm</li>
              <li>Width: 76.5 cm</li>
              <li>Depth: 54 cm</li>
              <li>Seating height: 40.5 cm</li>
              <li>Armrest height: 80.5 cm</li>
              <li>Max weight load: 120 kg</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    background: "#e6edf0",
    padding: "1rem",
    width: "100%",
    minHeight: "80vh",
  },
  container: {
    display: "flex",
    gap: "4rem",
    backgroundColor: "#fff",
    padding: "2rem",
    borderRadius: "1rem",
    width: "94%",
    margin: "0 auto",
    boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
  },
  imageSection: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  image: {
    width: "100%",
    maxHeight: "100%",
    objectFit: "contain",
  },
  pagination: {
    display: "flex",
    gap: "8px",
    marginTop: "1rem",
  },
  dot: {
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    backgroundColor: "#d1d5db",
    cursor: "pointer",
  },
  detailsSection: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    gap: "1rem",
  },
  designer: {
    fontSize: "0.9rem",
    fontWeight: "500",
    color: "#777",
    textTransform: "uppercase",
    letterSpacing: "0.1rem",
  },
  title: {
    fontSize: "2rem",
    fontWeight: "700",
    color: "#111",
    margin: "0.2rem 0",
  },
  description: {
    color: "#555",
    fontSize: "1rem",
    lineHeight: "1.6",
  },
  price: {
    fontSize: "1.5rem",
    fontWeight: "600",
    color: "#222",
    marginTop: "0.5rem",
  },
  buyButton: {
    marginTop: "0.8rem",
    padding: "12px 24px",
    backgroundColor: "#1e3a8a",
    color: "#fff",
    fontSize: "1rem",
    fontWeight: "500",
    border: "none",
    borderRadius: "9999px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    width: "fit-content",
  },
  colors: {
    marginTop: "1.5rem",
  },
  subTitle: {
    fontWeight: "600",
    color: "#333",
    fontSize: "0.95rem",
    marginBottom: "0.5rem",
  },
  colorOptions: {
    display: "flex",
    gap: "10px",
  },
  colorDot: {
    width: "20px",
    height: "20px",
    borderRadius: "50%",
    border: "1px solid #ccc",
  },
  dimensions: {
    marginTop: "1.5rem",
  },
  dimensionList: {
    listStyle: "none",
    padding: 0,
    fontSize: "0.9rem",
    color: "#555",
    lineHeight: "1.8",
  },
};

export default ProductDetailPage;
