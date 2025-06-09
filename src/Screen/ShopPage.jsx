import React, { Suspense, useState } from "react";


import BrandPartners from "../Components/BrandPartners";

import MargePage from "./MargePage";
import HorizontalProductScroll from "../Components/HorizontalProductScroll";
import ShopCategory from "../Components/ShopCategory";


const AutoSlider = React.lazy(() => import("../Components/AutoSlider"));


function ShopPage() {

  return (
    <Suspense fallback={<div>Loading page...</div>}>
      <AutoSlider />
      <MargePage />
    {/* <ShopCategory/> */}
      <BrandPartners />
    </Suspense>
  );
}

export default ShopPage;
