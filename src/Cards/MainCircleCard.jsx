import React from "react";

const MainCircleCard = ({ cat, isActive, onClick }) => {
  return (
    <div
      onClick={() => onClick(cat)}
      style={{
        cursor: "pointer",
        transform: isActive ? "scale(1.05)" : "scale(1)",
        transition: "transform 0.2s ease-in-out",
      }}
    >
      <div
        style={{
          width: "8rem",
          height: "8rem",
          backgroundColor: "#fff",
          borderRadius: "50%",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
          padding: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          transition: "all 0.2s ease-in-out",
          flexShrink: 0,
          border: isActive ? "1px solid #007bff" : "none",
        }}
      >
        <div
          style={{
            width: "4rem",
            height: "4rem",
            borderRadius: "50%",
            overflow: "hidden",
          }}
        >
          <img
            src={cat.mainCategory_Image}
            alt={cat.mainCategory_Name}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
      </div>
      <p
        style={{
          marginTop: "0.5rem",
          fontSize: "14px",
          color: isActive ? "#007bff" : "#000",
          fontWeight: isActive ? "bold" : "normal",
          textAlign: "center",
        }}
      >
        {cat.mainCategory_Name}
      </p>
    </div>
  );
};

export default MainCircleCard;
