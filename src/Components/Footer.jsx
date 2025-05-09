import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const styles = {
  footer: {
    backgroundColor: '#0f172a',
    color: '#fff',
    padding: '40px 20px',
    fontFamily: 'Segoe UI, sans-serif',
  },
  footerContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '30px',
    maxWidth: '1200px',
    margin: '0 auto',
    justifyContent: 'space-between',
  },
  footerColumn: {
    flex: '2 0 1 1',
    minWidth: '200px',
    maxWidth: '40%',
  },
  footerTitle: {
    fontSize: '1.5rem',
    fontWeight: 700,
    marginBottom: '10px',
  },
  footerDescription: {
    fontSize: '0.9rem',
    color: '#cbd5e1',
  },
  columnHeading: {
    marginBottom: '10px',
    fontSize: '1rem',
    fontWeight: 600,
  },
  list: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  listItem: {
    marginBottom: '8px',
    fontSize: '0.95rem',
    color: '#cbd5e1',
  },
  paragraph: {
    marginBottom: '8px',
    fontSize: '0.95rem',
    color: '#cbd5e1',
  },
  footerBottom: {
    marginTop: '30px',
    borderTop: '1px solid #1e293b',
    paddingTop: '20px',
    textAlign: 'center',
  },
  bottomText: {
    fontSize: '0.85rem',
    color: '#94a3b8',
  },
  link: {
    color: '#3b82f6',
    textDecoration: 'none',
  },
  socials: {
    marginTop: '10px',
    display: 'flex',
    justifyContent: 'center',
    gap: '15px',
  },
  icon: {
    color: '#cbd5e1',
    cursor: 'pointer',
    transition: 'color 0.3s ease',
  },
};

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.footerContainer}>
        <div style={styles.footerColumn}>
          <h2 style={styles.footerTitle}>Material Dukaan</h2>
          <p style={styles.footerDescription}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor.
          </p>
        </div>

        <div style={styles.footerColumn}>
          <h3 style={styles.columnHeading}>Information</h3>
          <p style={styles.paragraph}>+91-9871617208</p>
          <p style={styles.paragraph}>Materialdukaan@email.com</p>
          <p style={styles.paragraph}>Gurugram, India</p>
        </div>

        <div style={styles.footerColumn}>
          <h3 style={styles.columnHeading}>Navigation</h3>
          <ul style={styles.list}>
            <li style={styles.listItem}>Home</li>
            <li style={styles.listItem}>About Us</li>
            <li style={styles.listItem}>Services</li>
            <li style={styles.listItem}>Features</li>
          </ul>
        </div>
      </div>

      <div style={styles.footerBottom}>
        <p style={styles.bottomText}>
          Copyright ©2020 All rights reserved | Block is made with ❤️ by{' '}
          <a href="#" style={styles.link}>Shweta Bairwa</a>
        </p>
        <div style={styles.socials}>
          <Facebook size={20} style={styles.icon} />
          <Twitter size={20} style={styles.icon} />
          <Instagram size={20} style={styles.icon} />
          <Linkedin size={20} style={styles.icon} />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
