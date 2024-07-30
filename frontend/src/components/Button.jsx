import React from "react";
import styles from "../styles/Button.module.css";

const Button = ({ onClick, children }) => (
  <button onClick={onClick} className={styles.btn}>
    {children}
  </button>
);

export default Button;
