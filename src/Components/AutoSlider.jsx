import React, { useEffect, useRef, useState } from "react";
import img1 from "../assets/1.png";
import img2 from "../assets/2.png";
import img3 from "../assets/3.png";
import img4 from "../assets/4.png";
import img5 from "../assets/5.png";
import img6 from "../assets/6.png";
import img7 from "../assets/7.png";

const AutoSlider = () => {
  const slides = [
    { image: img1, label: "Slide 1" },
    { image: img2, label: "Slide 2" },
    { image: img3, label: "Slide 3" },
    { image: img4, label: "Slide 4" },
    { image: img5, label: "Slide 5" },
    { image: img6, label: "Slide 6" },
    { image: img7, label: "Slide 7" },
  ];

  const [index, setIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const intervalRef = useRef(null);
  const totalSlides = slides.length;

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    startAutoSlide();
    return () => clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    if (index === totalSlides) {
      const timeout = setTimeout(() => {
        setIsTransitioning(false);
        setIndex(0);
      }, 500); // matches transition
      return () => clearTimeout(timeout);
    } else {
      setIsTransitioning(true);
    }
  }, [index, totalSlides]);

  const startAutoSlide = () => {
    intervalRef.current = setInterval(() => {
      setIndex((prev) => prev + 1);
    }, 3000);
  };

  const styles = {
    container: {
      margin: isMobile ? "0.8rem  0rem" : "1rem",
      overflow: "hidden",
      borderRadius: "10px",
      position: "relative",
    },
    slider: {
      display: "flex",
      height: isMobile ? "11rem" : "50vh",
      width: `${(totalSlides + 1) * 100}%`,
      transform: `translateX(-${index * (100 / (totalSlides + 1))}%)`,
      transition: isTransitioning ? "transform 0.5s ease-in-out" : "none",
    },
    slide: {
      width: `${100 / (totalSlides + 1)}%`,
    
      
      minHeight: "200px",
      flexShrink: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    image: {
      width: "100%",
      height: "100%",
      // objectFit: isMobile ? "fill" : 'fill',
      borderRadius: "10px",
    },
    dotsContainer: {
      position: "absolute",
      bottom: "10px",
      left: "50%",
      transform: "translateX(-50%)",
      display: "flex",
      gap: "8px",
    },
    dot: (active) => ({
      width: "10px",
      height: "10px",
      borderRadius: "50%",
      backgroundColor: active ? "#fff" : "#ccc",
      cursor: "pointer",
      transition: "background-color 0.3s",
    }),
  };

  const handleDotClick = (i) => {
    setIsTransitioning(true);
    setIndex(i);
    clearInterval(intervalRef.current);
    startAutoSlide();
  };

  return (
    <div style={styles.container}>
      <div style={styles.slider}>
        {slides.map((slide, i) => (
          <div key={i} style={styles.slide}>
            <img src={slide.image} alt={slide.label} style={styles.image} />
          </div>
        ))}
        {/* Clone of first slide for seamless transition */}
        <div style={styles.slide}>
          <img src={slides[0].image} alt={slides[0].label} style={styles.image} />
        </div>
      </div>
      <div style={styles.dotsContainer}>
        {slides.map((_, i) => (
          <div
            key={i}
            style={styles.dot(index === i || (index === totalSlides && i === 0))}
            onClick={() => handleDotClick(i)}
          />
        ))}
      </div>
    </div>
  );
};

export default AutoSlider;
