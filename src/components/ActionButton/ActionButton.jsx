import styles from "./ActionButton.module.css";

function ActionButton({ Icon, iconColor, bgColor, handleClick }) {
  return (
    <button className={styles.button} style={{ backgroundColor: bgColor }} onClick={handleClick}>
      <Icon sx={{ fontSize: 14, color: iconColor }} />
    </button>
  );
}

export default ActionButton;
