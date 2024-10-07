import React from "react";
import styles from "../assets/css/Sidebar.module.css";
import sidebarData from "../assets/data/sidebarData.json";

const Sidebar = ({ onClose, isOpen }) => {
  return (
    <>
      {/* Backdrop */}
      <div
        className={`${styles.backdrop} ${isOpen ? "" : styles.hiddenBackdrop}`}
        onClick={onClose}
      ></div>

      <div className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : ""}`}>
        <button className={styles.closeBtn} onClick={onClose}>
          &times;
        </button>
        <ul className={styles.SideUl}>
          {sidebarData.map((item, index) => (
            <li className={styles.SideLi} key={index}>
              <a href={item.path}>{item.name}</a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
