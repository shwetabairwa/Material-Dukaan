import React, { useState } from 'react';
import {
  Home,
  Shapes,
  ShoppingCart,
  User
} from 'lucide-react'; // Lucide icons
import { useLocation, useNavigate } from 'react-router-dom';

const tabs = [
    { label: 'Home', icon: Home, path: '/' },
    { label: 'Category', icon: Shapes, path: '/category' },
    { label: 'Cart', icon: ShoppingCart, path: '/detailPage' },
    { label: 'Profile', icon: User, path: '/shoppage' }
  ];

function BottomTabs() {
    const navigate = useNavigate();
    const location = useLocation();

  const [selected, setSelected] = useState(0);

  return (
    <div style={styles.container}>
      {/* Style 1 - Underline */}

      <div style={styles.tabBar}>
      {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = location.pathname === tab.path;

          return (
            <div
              key={tab.label}
              style={{ ...styles.tabItem, position: 'relative', zIndex: 1 }}
              onClick={() => navigate(tab.path)}
            >
              {/* {isActive === i && <div style={styles.highlight} />} */}
              <Icon size={24} color={isActive ? '#4d4dff' : '#333'} />
              <div style={styles.label}>{tab.label}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const styles = {
  container: {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    borderTop: "1px solid #ddd",
    display: "flex",
    justifyContent: "space-around",
    height: "60px",
    zIndex: 1000,
    // boxShadow: "0 -2px 6px rgba(0,0,0,0.05)",
    flexDirection: 'column',
    gap: '40px',
    fontFamily: 'sans-serif',
  },
  tabBar: {
    background: '#fff',
    borderRadius: '20px',
    padding: '12px 0',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'relative',
  },
  tabItem: {
    flex: 1,
    textAlign: 'center',
    cursor: 'pointer',
    position: 'relative',
  },
  label: {
    fontSize: '12px',
    marginTop: '4px',
    color: '#555',
  },
  underline: {
    height: '3px',
    width: '24px',
    backgroundColor: '#4d4dff',
    borderRadius: '4px',
    margin: '6px auto 0',
  },
  // bump: {
  //   position: 'absolute',
  //   top: '-10px',
  //   left: '50%',
  //   transform: 'translateX(-50%)',
  //   width: '16px',
  //   height: '16px',
  //   background: '#fff',
  //   borderRadius: '10px',
  //   boxShadow: '0 -2px 6px rgba(0, 0, 0, 0.2)',
  // },
  highlight: {
    position: 'absolute',
    top: '6px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '60%',
    height: '80%',
    backgroundColor: 'rgba(77, 77, 255, 0.15)',
    borderRadius: '14px',
    zIndex: -1,
  },
};

export default BottomTabs;
