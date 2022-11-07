import React from "react";
import styles from "../styles/Tabs.module.css";

export default function Tabs({ showMensT, setShowMensT }) {
  return (
    <div className={styles.tabsContainer}>
      <button
        className="toggleButton" 
        onClick={()=>{setShowMensT(true);}}
      >
        <h3 style={ showMensT? { color: "black" } : { color: "grey" }}>MEN</h3>
      </button>

      <div className={styles.Toggleborder}></div>

      <button
        className="toggleButton"
        onClick={()=>{setShowMensT(false);}}
      >
        <h3 style={ showMensT? { color: "grey" } : { color: "black" }}>WOMEN</h3>
      </button>
    </div>
  );
}
