import React from 'react';

const WhatWeOffer = () => {
  const sectionStyle = {
    padding: '6rem 2rem',
    textAlign: 'center',
    backgroundColor: '#ffffff',
    fontFamily: 'Arial, sans-serif',
  };

  const headingStyle = {
    fontSize: '1.75rem',
    fontWeight: '700',
    marginBottom: '1rem',
    color: '#111827',
  };

  const subTextStyle = {
    fontSize: '1rem',
    color: '#6b7280',
    maxWidth: '600px',
    margin: '0 auto 2rem',
    lineHeight: '1.7',
  };

  const quoteIconStyle = {
    fontSize: '5rem',
    color: '#e5e7eb',
    marginBottom: '-1rem',
  };

  const avatarStyle = {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    margin: '1rem auto 0.5rem',
  };

  const nameStyle = {
    fontWeight: '700',
    fontSize: '1rem',
    color: '#111827',
  };

  const roleStyle = {
    fontSize: '0.9rem',
    color: '#6b7280',
  };

  const dotsContainer = {
    marginTop: '1.5rem',
    display: 'flex',
    justifyContent: 'center',
    gap: '0.5rem',
  };

  const dotStyle = (active) => ({
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    backgroundColor: active ? '#3b82f6' : '#d1d5db',
  });

  return (
    <section style={sectionStyle}>
      <h2 style={headingStyle}>WHAT OUR CUSTOMERS SAY</h2>
      <p style={subTextStyle}>
        Encourage your fans to add videos to their own YouTube account and let you know the link – you can add these videos to your channel as Favorites and create a playlist of customer reviews.
      </p>
      <div style={quoteIconStyle}>“</div>
      <img
        src="https://randomuser.me/api/portraits/men/32.jpg"
        alt="Jhon Jhonson"
        style={avatarStyle}
      />
      <div style={nameStyle}>Jhon Jhonson</div>
      <div style={roleStyle}>Photographer</div>
      <div style={dotsContainer}>
        <div style={dotStyle(true)}></div>
        <div style={dotStyle(false)}></div>
        <div style={dotStyle(false)}></div>
      </div>
    </section>
  );
};

export default WhatWeOffer;
