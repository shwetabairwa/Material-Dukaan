import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMainCategories } from "../redux/mainCategorySlice";
import { getSubCategories } from "../redux/subCategorySlice";

const Page = () => {
  const dispatch = useDispatch();
  const { categories, status, error } = useSelector(
    (state) => state.mainCategory
  );
  const {
    categories: subCategories,
    status: subStatus,
    error: subError,
  } = useSelector((state) => state.subCategory);

  const [activeTab, setActiveTab] = useState(17); // Default selected row_seq

  useEffect(() => {
    dispatch(getMainCategories());
    dispatch(getSubCategories());
  }, [dispatch]);

  useEffect(() => {
    if (
      categories?.length > 0 &&
      !categories.some((cat) => cat.row_seq === 24)
    ) {
      setActiveTab(categories[0].row_seq);
    }
  }, [categories]);

  const handleTabClick = (row_seq) => {
    setActiveTab(row_seq);
  };

  const activeCategory = categories.find((cat) => cat.row_seq === activeTab);
  const filteredSubCategories = subCategories.filter((subCat) => {
    const mainCategoryRows = JSON.parse(subCat.mainCategoryRow);
    return mainCategoryRows.includes(activeTab.toString());
  });

  if (status === "loading" || subStatus === "loading") return <p>Loading...</p>;
  if (status === "failed" || subStatus === "failed")
    return <p>Error: {error || subError}</p>;

  return (
    <div style={{ display: "flex",  }}>
      {/* Vertical Tabs */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          overflowY: "auto",
          borderRight: "1px solid #ccc",

          scrollbarWidth: "none",
        }}
        className="hide-scrollbar"
      >
        {categories.slice(0, 15).map((cat) => {
          const isActive = activeTab === cat.row_seq;
          return (
            <div
              key={cat.row_seq}
              onClick={() => handleTabClick(cat.row_seq)}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap:'1rem',
                padding: "10px",
                cursor: "pointer",
                borderRadius:'0.3rem',
              

                 backgroundColor: isActive ? "#f0f8ff" : "transparent",
                borderRight: isActive
                  ? "0.5rem solid #007bff"
                  : "0.5rem solid transparent",
                transition: "all 0.3s ease",
              }}
            >
              <img
                src={cat.mainCategory_Image}
                alt={cat.mainCategory_Name}
                style={{
                  width: "5rem",
                  height: "5rem",
                  borderRadius: "8px",

                  objectFit: "cover",
                }}
              />
              <span
                style={{
                  fontSize: "14px",
                  color: isActive ? "#007bff" : "#333",
                  fontWeight: isActive ? "600" : "400",
                }}
              >
                {cat.mainCategory_Name}
              </span>
            </div>
          );
        })}
      </div>

      {/* Content Area */}
      <div style={{ flex: 1, padding: "1rem" }}>
        {activeCategory ? (
          <h2>{activeCategory.mainCategory_Name}</h2>
        ) : (
          <p>Select a category to view content.</p>
        )}

        {/* Filtered SubCategories */}
        <div style={{ marginTop: "1.5rem" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(10rem, 1fr))",
              gap: "2rem",
            }}
          >
            {filteredSubCategories.slice(0, 12).map((cat) => (
              <div
                key={cat.row_seq}
                style={{
                  height: "10rem",
                  backgroundColor: "#ffffff",
                  borderRadius: "20px",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
                  padding: "10px",
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    width: "6rem",
                    height: "6rem",
                    overflow: "hidden",
                    alignSelf: "center",
                  }}
                >
                  <img
                    src={cat.SubCategory_Image}
                    alt={cat.subCategory_Name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <div style={{ textAlign: "center" }}>
                  <p style={{ fontSize: "14px", color: "#666" }}>
                    {cat.subCategory_Name}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Hide scrollbar with CSS */}
      <style>
        {`
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>
    </div>
  );
};

export default Page;