import React from "react";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <div className={styles.name}>Flyout</div>
        <div className={styles.tagline}>Find your next hackathon adventure</div>
      </div>
    </header>
  );
};

export default Header;
