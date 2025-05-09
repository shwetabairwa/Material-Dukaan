import React, { Suspense, useState } from "react";


import BrandPartners from "../Components/BrandPartners";

import MargePage from "./MargePage";

const AutoSlider = React.lazy(() => import("../Components/AutoSlider"));


function ShopPage() {

  return (
    <Suspense fallback={<div>Loading page...</div>}>
      <AutoSlider />
      <MargePage />
      <BrandPartners />
    </Suspense>
  );
}

export default ShopPage;
