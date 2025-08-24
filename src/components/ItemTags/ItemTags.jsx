import styles from "./ItemTags.module.css";

function ItemTags({ items }) {
  const maxVisible = 2;
  const visibleItems = items.slice(0, maxVisible);
  const hiddenCount = items.length - visibleItems.length;

  return (
    <div className={styles.container}>
      {visibleItems.map((item, idx) => (
        <span key={idx} className={`${styles.tag} ${styles.greenTag}`}>
          {item.name}
        </span>
      ))}

      {hiddenCount > 0 && <span className={`${styles.tag} ${styles.grayTag}`}>+{hiddenCount}</span>}
    </div>
  );
}

export default ItemTags;
