import React from "react";
import styles from "../styles/Button.module.css"; // Asegúrate de que la ruta sea correcta

const Button = ({ onClick, children }) => (
  <button onClick={onClick} className={styles.btn}>
    {children}
  </button>
);

export default Button;
