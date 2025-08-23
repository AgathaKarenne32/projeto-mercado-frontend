import styles from "./ActionButton.module.css";

function ActionButton({ Icon, iconColor, bgColor }) {
  return (
    <button className={styles.button} style={{ backgroundColor: bgColor }}>
      <Icon sx={{ fontSize: 14, color: iconColor }} />
    </button>
  );
}

export default ActionButton;
