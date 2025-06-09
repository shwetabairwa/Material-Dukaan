import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSubCategories } from "../Redux/subCategorySlice";
import { useLocation } from "react-router-dom";
import ProductCategoryCard from "../Components/ProductCategory";
import SubCategorySidebar from "../Components/SubCategorySideBar";
import TopTabBar from "../Components/TopTabBar";
import { db } from "../Components/firebase";
import { collection, getDocs } from "firebase/firestore";

const SubPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { mainCat, header } = location.state || {};
  // console.log('mainCat: ', mainCat);
  // const {
  //   categories: subCategories,
  //   status,
  //   error,
  // } = useSelector((state) => state.subCategory);
  const [activeTab, setActiveTab] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); // Mobile check
  const [subCategories, setSubCategories] = useState([]);
  // console.log('subCategories: ', subCategories);
  // Watch for window resize


  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "subcategory"));
        const categoriesData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setSubCategories(categoriesData);
      } catch (err) {
        console.error("Error fetching categories:", err);
        setError("Failed to load categories.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

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
        Array.isArray(subCat.mainCategoryRow) &&
        subCat.mainCategoryRow.includes(mainCat)
    );
  }, [subCategories, mainCat]);

  useEffect(() => {
    if (filteredSubCategories.length > 0) {
      setActiveTab(filteredSubCategories.id);
    }
  }, [filteredSubCategories]);

  const activeSubCategory = useMemo(() => {

    return filteredSubCategories.find((sub) => sub.id === activeTab);
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
            <ProductCategoryCard subID={activeSubCategory.id} />
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
