import React from "react";

const SubCategorySidebar = ({ subCategories, activeTab, onTabClick }) => {
  return (
    <>
      <div style={styles.sidebar} className="hide-scrollbar">
        {subCategories.map((cat) => {
          const isActive = activeTab === cat.id;
          return (
            <div
              key={cat.id}
              onClick={() => onTabClick(cat.id)}
              style={{
                ...styles.tabItem,
                //  backgroundColor: isActive ? "#f0f8ff" : "transparent",
                borderRight: isActive
                  ? "0.2rem solid #007bff"
                  : "0.2rem solid transparent",
              }}
            >
              <img
                src={cat.subCategory_Image}///subCategory_Image
                alt={cat.subCategory_Name}
                style={styles.tabImage}
              />
              <span
                style={{
                  ...styles.tabLabel,
                 color: isActive ? "#007bff" : "#333",
                  fontWeight: isActive ? 600 : 400,
                }}
              >
                {cat.subCategory_Name}
              </span>
            </div>
          );
        })}
      </div>

      {/* Hide scrollbar */}
      <style>
        {`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}
      </style>
    </>
  );
};

const styles = {
  sidebar: {
    position: "sticky",
    top: 0,
    display: "flex",
    flexDirection: "column",
    overflowY: "auto",
    // width: "7rem",
    height: "100vh",
    borderRight: "1px solid #ccc",
    scrollbarWidth: "none",
  },
  tabItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
     padding: "5px",
    cursor: "pointer",
    borderRadius: "0.3rem",
    transition: "all 0.3s ease",
  },
  tabImage: {
    width: "5rem",
    height: "5rem",
    borderRadius: "8px",
    objectFit: "cover",
  },
  tabLabel: {
    fontSize: "12px",
    textAlign: "center",
    marginTop: "8px",
  },
};

export default SubCategorySidebar;
