import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <div className={styles.grid}>
          <div className={styles.section}>
            <h3>Product</h3>
            <ul>
              <li>Features</li>
              <li>Pricing</li>
              <li>API</li>
              <li>Integration</li>
            </ul>
          </div>
          <div className={styles.section}>
            <h3>Resources</h3>
            <ul>
              <li>Documentation</li>
              <li>Guides</li>
              <li>Support</li>
              <li>Status</li>
            </ul>
          </div>
          <div className={styles.section}>
            <h3>Company</h3>
            <ul>
              <li>About</li>
              <li>Blog</li>
              <li>Careers</li>
              <li>Contact</li>
            </ul>
          </div>
          <div className={styles.section}>
            <h3>Legal</h3>
            <ul>
              <li>Privacy</li>
              <li>Terms</li>
              <li>Security</li>
            </ul>
          </div>
        </div>
        <div className={styles.bottom}>
          <div className={styles.copyright}>
            © 2024 Flyout. All rights reserved.
          </div>
          <div className={styles.social}>
            <span>GitHub</span>
            <span>Twitter</span>
            <span>Discord</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 