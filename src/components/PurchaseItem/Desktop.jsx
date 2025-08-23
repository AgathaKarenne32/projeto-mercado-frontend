import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import ItemTags from "../ItemTags/ItemTags";
import ActionButton from "../ActionButton/ActionButton";

import styles from "./Desktop.module.css";

function PurchaseItem({ date, market, items, totalPrice }) {
  const fmt = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <tr className={styles.row}>
      <td className={styles.date}>
        <div className={styles.cell}>
          <CalendarTodayIcon sx={{ fontSize: 12 }} />
          <p>{date}</p>
        </div>
      </td>

      <td className={styles.market}>
        <div className={styles.cell}>
          <AddCircleIcon sx={{ fontSize: 16 }} />
          <p>{market}</p>
        </div>
      </td>

      <td>
        <ItemTags items={items} />
      </td>

      <td className={styles.price}>{fmt.format(totalPrice)}</td>

      <td>
        <div className={styles.actions}>
          <ActionButton Icon={VisibilityIcon} iconColor="#fff" bgColor="#2196F3" />
          <ActionButton Icon={EditIcon} iconColor="#fff" bgColor="#FDA212" />
          <ActionButton Icon={DeleteIcon} iconColor="#fff" bgColor="#DD2E48" />
        </div>
      </td>
    </tr>
  );
}

export default PurchaseItem;
