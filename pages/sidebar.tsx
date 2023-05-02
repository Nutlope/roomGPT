import React, { useState } from "react";
import styles from "../styles/Sidebar.module.css";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.sidebarWrapper}>
      <nav className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
        <ul>
          <li>Link 1</li>
          <li>Link 2</li>
          <li>Link 3</li>
        </ul>
      </nav>
      <div
        className={`flex flex-col ${
          isOpen ? "ml-64" : ""
        } transition-all duration-300 ease-in-out`}
      >
        <button onClick={handleToggle}>Toggle Sidebar</button>
        <h1>Main Content</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam at
          ultrices eros, vel consectetur velit. Suspendisse rutrum ante ut urna
          viverra pretium. Donec euismod pharetra nisi at blandit. Vivamus sit
          amet faucibus massa. Etiam eget semper nulla, eu dignissim elit. Duis
          tincidunt elit nec magna consequat malesuada.{" "}
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
