import "./ItemTags.css";

function ItemTags({ items }) {
  const maxVisible = 2;
  const visibleItems = items.slice(0, maxVisible);
  const hiddenCount = items.length - visibleItems.length;

  return (
    <div className="item-tags-container">
      {visibleItems.map((item, idx) => (
        <span key={idx} className="item-tag item-tag-green">
          {item}
        </span>
      ))}

      {hiddenCount > 0 && <span className="item-tag item-tag-gray">+{hiddenCount}</span>}
    </div>
  );
}

export default ItemTags;
