import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import SubPage from "./Screen/SubPage";
import DetailPage from "./Screen/DetailPage";
import ShopPage from "./Screen/ShopPage";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import BottomTabs from "./Components/BottomTabs";
import './global.css';

import { useState, useEffect } from "react";
import Home from "./Pages/Home";
import Category from "./Pages/Category";


// Custom hook to detect mobile view
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

function App() {
  const isMobile = useIsMobile();

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/subpage" element={<SubPage />} />
        <Route path="/detailPage" element={<DetailPage />} />
        <Route path="/shoppage" element={<ShopPage />} />
        <Route path="/category" element={<Category />} />
      </Routes>
      {isMobile ? <BottomTabs /> : <Footer/>}
    </Router>
  );
}

export default App;
