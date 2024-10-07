import React, { useState } from "react";
import styles from "../assets/css/Navbar.module.css";
import navbarData from "../assets/data/navbarData.json";
import Sidebar from "./Sidebar";

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <nav>
      <div className={styles.navbar}>
        <button className={styles.hamburger} onClick={toggleSidebar}>
          &#9776;
        </button>
        <ul className={styles.navLinks}>
          {navbarData.map((item, index) => (
            <li className={styles.NavLi} key={index}>
              <a href={item.path}>{item.name}</a>
            </li>
          ))}
        </ul>
      </div>

      <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />

      {/*isSidebarOpen && <Sidebar onClose={toggleSidebar} />*/}
    </nav>
  );
};

export default Navbar;
