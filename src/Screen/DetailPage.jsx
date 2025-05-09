import React, { Suspense } from "react";
import ProductDetailPage from "../Components/ProductDetailPage";
import HorizontalProductScroll from "../Components/HorizontalProductScroll";
import BrandPartners from "../Components/BrandPartners";
import Footer from "../Components/Footer";

const AutoSlider = React.lazy(() => import("../Components/AutoSlider"));
const Header = React.lazy(() => import("../Components/Header"));

function DetailPage() {
  return (
    <Suspense fallback={<div>Loading page...</div>}>
  
      <div
        style={{
          backgroundColor: "#FDFDFD",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <ProductDetailPage />
     <BrandPartners/>
      </div>

    </Suspense>
  );
}

export default DetailPage;
