import React, { useState } from "react";
import styles from "../assets/css/Sidebar.module.css";
import sidebarData from "../assets/data/sidebarData.json";

const Sidebar = ({ onClose, isOpen }) => {
  const [activeMenu, setActiveMenu] = useState(null);

  const toggleSubmenu = (index) => {
    setActiveMenu(activeMenu === index ? null : index); // Toggle submenu
  };

  return (
    <>
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
            <li key={index} className={styles.SideLi}>
              <div
                className={styles.menuItem}
                onClick={(e) => {
                  if (item.submenu && item.submenu.length > 0) {
                    e.preventDefault();
                    toggleSubmenu(index);
                  }
                }}
              >
                <a
                  href={item.path}
                  onClick={(e) => {
                    if (item.submenu && item.submenu.length > 0) {
                      e.preventDefault();
                      toggleSubmenu(index);
                    }
                  }}
                >
                  {item.name}
                </a>
                {item.submenu && item.submenu.length > 0 && (
                  <span
                    style={{ color: "white" }}
                    className={styles.arrowIcon}
                    onClick={() => toggleSubmenu(index)}
                  >
                    {activeMenu === index ? "▼" : "▶"}
                  </span>
                )}
              </div>

              {/* Submenu */}
              {activeMenu === index && item.submenu && (
                <ul
                  className={`${styles.submenu} ${
                    activeMenu === index ? styles.submenuOpen : ""
                  }`}
                >
                  {item.submenu.map((subItem, subIndex) => (
                    <li key={subIndex} className={styles.submenuItem}>
                      <a href={subItem.path}>{subItem.name}</a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
