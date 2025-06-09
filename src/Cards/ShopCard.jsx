import React from "react";

const ShopCard = ({
  cat,
  index,
  isMobile,
  isHovered,
  imageUrl,
  onClick,
  onMouseEnter,
  onMouseLeave,
}) => {
  const styles = {
    card: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: "#fff",
      border: "1px solid #ddd", // <-- Added border
      borderRadius: "10px",  
      padding: isMobile ? "0rem 0.4rem" : "0.1rem 1.3rem",
      cursor: "pointer",
      transition: "all 0.3s ease",
      width: isMobile ? "90%" : "88%",
      height: isMobile ? "6rem" : "20rem",
    },    
    
    cardHovered: {
      boxShadow: "0 6px 16px rgba(0, 0, 0, 0.15)",
      transform: "translateY(-4px)",
    },
    text: {
      fontSize: isMobile ? "1rem" : "1.4rem",
      fontWeight: 500,
      color: "#1e2b4f",
      maxWidth: "100%",
      overflow: "hidden",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
    },
    image: {
      alignItems:'flex-end',
      width: isMobile ? "40%" : "50%",
      height: isMobile ? "100%" : "100%",
      objectFit: "contain",
    },
  };

  return (
    <div
      key={cat.rowId}
      onClick={onClick}
      onMouseEnter={() => onMouseEnter(index)}
      onMouseLeave={onMouseLeave}
      style={{
        ...styles.card,
        ...(isHovered && styles.cardHovered),
      }}
    >
      <div style={{width:'50%', height:'100%', display:'flex', justifyContent:'flex-start'}}>
      <p style={styles.text}>{cat.name}</p>
      </div>
      <img
        src={imageUrl || "/placeholder.png"}
        alt={cat.name || "Shop Category"}
        style={styles.image}
      />
    </div>
  );
};

export default ShopCard;
