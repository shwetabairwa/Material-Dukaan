import React from "react";

const TopTabBar = ({ subCategories, activeTab, onTabClick }) => {
  return (
    <>
      <div style={styles.tabBar} className="hide-scrollbar">
        {subCategories.map((cat) => {
          const isActive = activeTab === cat.id;
          return (
            <div
              key={cat.id}
              onClick={() => onTabClick(cat.id)}
              style={{
                ...styles.tabItem,
                borderBottom: isActive
                  ? "0.1rem solid #007bff"
                  : "0.1rem solid transparent",
              }}
            >
              <img
                src={cat.subCategory_Image}
                alt={cat.subCategory_Name}
                style={styles.tabImage}
              />
              <span
                style={{
                  ...styles.tabLabel,
                  color: "#666",
                  fontWeight: isActive ? 600 : 400,
                }}
              >
                {cat.subCategory_Name}
              </span>
            </div>
          );
        })}
      </div>

      {/* Hide scrollbar for webkit and others */}
      <style>
        {`
          .hide-scrollbar {
            scrollbar-width: none; /* Firefox */
            -ms-overflow-style: none; /* IE 10+ */
          }
          .hide-scrollbar::-webkit-scrollbar {
            display: none; /* Chrome, Safari, Opera */
          }
        `}
      </style>
    </>
  );
};

const styles = {
  tabBar: {
    display: "flex",
    justifyContent: "flex-start",
    overflowX: "auto",
    borderBottom: "1px solid #ccc",
    height: "auto",
    gap: 10,
    backgroundColor: "#fff",
     padding: "5px 0",
  },
  tabItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    cursor: "pointer",
    transition: "all 0.3s ease",
    marginTop: "0.2rem",
  },
  tabImage: {
    borderRadius: "8px",
    border: "1px solid #ddd",
    width: "5rem",
    objectFit: "cover",
  },
  tabLabel: {
    fontSize: "0.7rem",
    textAlign: "center",
    margin: "5px",
  },
};

export default TopTabBar;
