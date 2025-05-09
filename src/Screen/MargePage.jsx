import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSubCategories } from "../Redux/subCategorySlice";
import { useLocation } from "react-router-dom";
import ProductCategoryCard from "../Components/ProductCategory";
import SubCategorySidebar from "../Components/SubCategorySideBar";
import Header from "../Components/Header";
import HorizontalShopScroll from "../Components/HorizontalShopScroll"; // ✅ Import the scroll

const MargePage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const initialMainCat = location?.state?.mainCat || null;
  const initialHeader = location?.state?.header || "";
  const shopList = location?.state?.shopID || [];

  const [mainCat, setMainCat] = useState(initialMainCat);
  const [header, setHeader] = useState(initialHeader);
  const [activeTab, setActiveTab] = useState(null);

  const {
    categories: subCategories,
    status,
    error,
  } = useSelector((state) => state.subCategory);

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

  const handleMainCategoryChange = (categoryName, rowSeq) => {
    setMainCat(rowSeq);
    setHeader(categoryName);
  };

  if (status === "failed") return <p>Error: {error}</p>;

  return (
    <>
      {/* Horizontal Scroll Component */}
     
      <HorizontalShopScroll
        onCategoryClick={handleMainCategoryChange}
      />

      {/* Header */}
      <div style={{ padding: "0.5rem", borderBottom: "1px solid #ccc" }}>
        <h2>{header}</h2>
      </div>

      {/* Layout */}
      <div style={{ display: "flex", height: "100vh" }}>
        <SubCategorySidebar
          subCategories={filteredSubCategories}
          activeTab={activeTab}
          onTabClick={setActiveTab}
        />

        <div className="content-area">
          {activeSubCategory ? (
            <ProductCategoryCard subID={activeSubCategory.row_seq} />
          ) : (
            <p>Select a subcategory to view content.</p>
          )}
        </div>
      </div>

      {/* Scrollbar CSS */}
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

export default MargePage;
