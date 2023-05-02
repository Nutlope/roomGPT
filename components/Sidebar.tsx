import React, { useState } from "react";
import styles from "./Sidebar.module.css";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.sidebarWrapper}>
      <button onClick={handleToggle}>Toggle Sidebar</button>
      <nav className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
        <ul>
          <li>Link 1</li>
          <li>Link 2</li>
          <li>Link 3</li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
