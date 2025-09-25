import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import ActionButton from "../ActionButton/ActionButton";
import formatMoney from "../../utils/formatMoney";
import formatLocalDate from "../../utils/formatDate";

import styles from "./Mobile.module.css";
import { usePurchase } from "../../context/PurchaseContext/PurchaseContext";

function PurchaseItem({ id, date, market, items, total }) {
  const { dispatch } = usePurchase();

  const formattedDate = formatLocalDate(date, "short");
  const formattedMoney = formatMoney(total);

  const qtdItems = items.length;

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <p>{market}</p>
        <p>{formattedMoney}</p>
      </header>

      <div className={styles.info}>
        <time dateTime={date}>{formattedDate}</time>
        <span>{qtdItems === 1 ? "1 item" : `${qtdItems} itens`}</span>
      </div>

      <footer className={styles.footer}>
        <button className={styles.btnDetails}>
          <MoreHorizIcon sx={{ fontSize: 14 }} />
          <span>Ver detalhes</span>
        </button>

        <div className={styles.actions}>
          <ActionButton Icon={EditIcon} iconColor="#fff" bgColor="#fda212" />
          <ActionButton
            Icon={DeleteIcon}
            iconColor="#fff"
            bgColor="#DD2E48"
            handleClick={() => dispatch({ type: "DELETE_PURCHASE", payload: id })}
          />
        </div>
      </footer>
    </div>
  );
}

export default PurchaseItem;
