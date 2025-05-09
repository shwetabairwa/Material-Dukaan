import React from 'react';

const brands = [
  'https://1000logos.net/wp-content/uploads/2017/03/Nike-Logo.png',
  'https://1000logos.net/wp-content/uploads/2016/10/Apple-Logo.png',
  'https://1000logos.net/wp-content/uploads/2021/05/Google-logo.png',
  'https://1000logos.net/wp-content/uploads/2017/05/Netflix-Logo.png',
  'https://1000logos.net/wp-content/uploads/2017/03/Nike-Logo.png',
  'https://1000logos.net/wp-content/uploads/2016/10/Apple-Logo.png',
  'https://1000logos.net/wp-content/uploads/2021/05/Google-logo.png',

];

const BrandPartners = () => {
  const styles = {
    container: {
      width: '100%',
      margin: '0 auto',
 
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      gap: '2rem',
      backgroundColor: '#f9f9f9',
    },
    card: {
      width: '10rem',
      height: '6rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',

  
  
    },
    image: {
      maxWidth: '5rem',
      maxHeight: '5rem',
      objectFit: 'contain',
      filter: 'grayscale(100%)',
    },
  };

  return (
    <div style={styles.container}>
      {brands.map((logo, index) => (
        <div style={styles.card} key={index}>
          <img src={logo} alt={`Brand ${index}`} style={styles.image} />
        </div>
      ))}
    </div>
  );
};

export default BrandPartners;
