import React, { Suspense, useEffect, useState } from "react";
import ProductDetailPage from "../Components/ProductDetailPage";
import Footer from "../Components/Footer";
import WhatWeOffer from "../Components/WhatWeOffer";
import BrandPartners from "../Components/BrandPartners";

const AutoSlider = React.lazy(() => import("../Components/AutoSlider"));
const Header = React.lazy(() => import("../Components/Header"));
const HorizontalProductScroll = React.lazy(() =>
  import("../Components/HorizontalProductScroll")
);
const MainCategoryCard = React.lazy(() =>
  import("../Components/MainCategory")
);
const QuickCall = React.lazy(() => import("../Components/QuickCalls"));
const ShopCategory = React.lazy(() => import("../Components/ShopCategory"));

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < breakpoint);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);

  return isMobile;
}
function Home() {
  const isMobile = useIsMobile();
  return (
    <Suspense fallback={<div>Loading page...</div>}>
      <AutoSlider />
      <QuickCall />
      {isMobile ===false &&  <MainCategoryCard />}
      <ShopCategory />
      <BrandPartners />
      <WhatWeOffer />
   
    </Suspense>
  );
}

export default Home;
