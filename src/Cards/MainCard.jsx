
const MainCard = ({
  cat,
  index,
  isMobile,
  hovered,
  onMouseEnter,
  onMouseLeave,
  onClick,
}) => {
  const styles = {
    card: {
      backgroundColor: "#ffffff",
      height: isMobile ? "6rem" : "11rem",
      borderRadius: "10px",
      border: "1px solid #ddd",
      padding: isMobile ? "0.3rem" : "1rem",
      position: "relative",
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
      cursor: "pointer",
      transition: "all 0.3s ease",
      transform: hovered === index ? "scale(1.05)" : "scale(1)",
    },
    imageContainer: {
      width: isMobile ? "4rem" : "8rem",
      height: isMobile ? "4rem" : "8rem",
      borderRadius: "50%",
      overflow: "hidden",
      alignSelf: "center",
      justifyContent: 'center'
    },
    image: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
    },
    textContainer: {
      textAlign: "center",
    },
    categoryName: {

      fontSize: isMobile ? "14px" : "14px",
      color: "#666",

    },
  };

  return (
    <>
      <div>
        <div
          onClick={onClick}
          onMouseEnter={() => onMouseEnter(index)}
          onMouseLeave={onMouseLeave}
          style={styles.card}
        >

          <div style={styles.imageContainer}>
            <img
              src={cat.mainCategory_Image}
              alt={cat.mainCategory_Name}
              style={styles.image}
            />
          </div>

        </div>
        <div style={styles.textContainer}>
          <p style={styles.categoryName}>{cat.mainCategory_Name}</p>
        </div>
      </div>
    </>
  );
};

export default MainCard;
