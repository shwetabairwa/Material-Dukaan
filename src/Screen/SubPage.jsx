import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSubCategories } from "../Redux/subCategorySlice";
import { useLocation } from "react-router-dom";
import ProductCategoryCard from "../Components/ProductCategory";
import SubCategorySidebar from "../Components/SubCategorySideBar";
import TopTabBar from "../Components/TopTabBar";

const SubPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { mainCat, header } = location.state || {};
  const {
    categories: subCategories,
    status,
    error,
  } = useSelector((state) => state.subCategory);
  const [activeTab, setActiveTab] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); // Mobile check

  // Watch for window resize
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    dispatch(getSubCategories());
  }, [dispatch]);

  const filteredSubCategories = useMemo(() => {
    return subCategories.filter(
      (subCat) =>
        subCat.mainCategoryRow &&
        subCat.mainCategoryRow.includes(mainCat)
    );
  }, [subCategories, mainCat]);

  useEffect(() => {
    if (filteredSubCategories.length > 0) {
      setActiveTab(filteredSubCategories[0].row_seq);
    }
  }, [filteredSubCategories]);

  const activeSubCategory = useMemo(() => {
    return filteredSubCategories.find((sub) => sub.row_seq === activeTab);
  }, [filteredSubCategories, activeTab]);

  if (status === "failed") return <p>Error: {error}</p>;

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          height: "100vh",
        }}
      >
        {isMobile ? (
          <TopTabBar
            subCategories={filteredSubCategories}
            activeTab={activeTab}
            onTabClick={setActiveTab}
          />
        ) : (
          <SubCategorySidebar
            subCategories={filteredSubCategories}
            activeTab={activeTab}
            onTabClick={setActiveTab}
          />
        )}

        <div className="content-area">
          {activeSubCategory ? (
            <ProductCategoryCard subID={activeSubCategory.row_seq} />
          ) : (
            <p>Select a subcategory to view content.</p>
          )}
        </div>
      </div>

      <style>
        {`
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .content-area {
            flex: 1;
            padding: 1rem;
            overflow-y: auto;
            height: 100vh;
          }
        `}
      </style>
    </>
  );
};

export default SubPage;
